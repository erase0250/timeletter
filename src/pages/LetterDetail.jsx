import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getLettersFromFirestore } from "../api/firestore";
import html2canvas from "html2canvas";

// ❓ 날짜 포맷 안전하게 처리하는 함수
function safeFormatDate(value) {
    if (!value) return "";

    if (typeof value === "object" && value.seconds && value.toDate) {
        return value.toDate().toLocaleDateString();
    }

    try {
        return new Date(value).toLocaleDateString();
    } catch {
        return "";
    }
}

export default function LetterDetail() {
    const { id } = useParams();
    const [letter, setLetter] = useState(null);
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { letters, setLetters } = useLetterStore();
    const letterRef = useRef(null);

    // 이미지 저장 핸들러
    const handleSaveImage = async () => {
        if (!letterRef.current) return;

        try {
            const canvas = await html2canvas(letterRef.current, {
                scale: 3,
                useCORS: true,
            });
            const dataUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${letter.title || "letter"}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("이미지 저장 실패:", error);
        }
    };

    // 편지 삭제 핸들러
    const handleDelete = async () => {
        if (
            !window.confirm(
                "정말 이 편지를 삭제할까요? 삭제한 편지는 되돌릴 수 없어요."
            )
        )
            return;

        if (user) {
            // Firestore 삭제 처리
            try {
                await deleteDoc(doc(db, "users", user.uid, "letters", id));
                const updated = letters.filter(
                    (item) => String(item.id) !== id
                );
                setLetters(updated);
                navigate("/list");
            } catch (error) {
                console.error("Firestore 삭제 오류:", error);
                alert("삭제에 실패했어요. 다시 시도해 주세요.");
            }
        } else {
            // 로컬스토리지 삭제 처리
            const stored = JSON.parse(localStorage.getItem("letters")) || [];
            const updated = stored.filter((item) => item.id !== Number(id));
            localStorage.setItem("letters", JSON.stringify(updated));
            navigate("/list");
        }
    };

    useEffect(() => {
        const loadIfNeeded = async () => {
            if (user && letters.length === 0) {
                const fetched = await getLettersFromFirestore(user.uid);
                setLetters(fetched);
            }
        };
        loadIfNeeded();
    }, [user, letters.length, setLetters]);

    useEffect(() => {
        let found;

        if (user) {
            // 로그인 -> zustand
            found = letters.find((item) => String(item.id) === id);
        } else {
            // 비로그인 -> 로컬스토리지
            const stored = JSON.parse(localStorage.getItem("letters")) || [];
            found = stored.find((l) => l.id === Number(id));
        }

        setLetter(found);
    }, [id, user, letters]);

    if (!letter) {
        return (
            <Layout>
                <Header type="default" title="편지 상세" backTo="/list" />
                <div className="p-6 text-center text-gray-500">
                    편지를 찾을 수 없습니다.
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Header type="default" title="편지 상세" backTo="/list" />

            {/* 편지 본문 */}
            <div className="flex items-center justify-center py-4">
                <div
                    ref={letterRef}
                    style={{
                        width: "360px",
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #eee5da",
                            borderRadius: "10px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            padding: "14px",
                            backgroundColor: "#fff",
                        }}
                    >
                        <h1
                            style={{
                                color: "#4e3f34",
                                fontSize: "22px",
                                fontWeight: "bold",
                                marginBottom: "16px",
                            }}
                        >
                            {letter.title}
                        </h1>
                        <div
                            style={{
                                fontSize: "14px",
                                color: "#374151",
                                lineHeight: "22px",
                                borderRadius: "4px",
                                padding: "4px",
                            }}
                        >
                            {letter.content}
                        </div>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#9CA3AF",
                                textAlign: "right",
                                marginTop: "8px",
                            }}
                        >
                            {safeFormatDate(letter.createdAt)} 작성
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 justify-end px-8">
                {/* 저장 버튼 */}
                <button
                    className="flex items-center justify-center w-8 h-8 rounded-sm border border-[#a58a6a] text-[#a58a6a] hover:bg-[#a58a6a]/10 transition"
                    onClick={handleSaveImage}
                    title="이미지 저장"
                >
                    <FiDownload className="w-4 h-4" />
                </button>

                {/* 수정 버튼 */}
                <button
                    className="flex items-center justify-center w-8 h-8 rounded-sm border border-[#a58a6a] text-[#a58a6a] hover:bg-[#a58a6a]/10 transition"
                    onClick={() => navigate(`/edit/${id}`)}
                    title="수정"
                >
                    <RiEdit2Fill className="w-4 h-4" />
                </button>

                {/* 삭제 버튼 */}
                <button
                    className="flex items-center justify-center w-8 h-8 rounded-sm border border-[#a58a6a] text-[#a58a6a] hover:bg-[#a58a6a]/10 transition"
                    onClick={handleDelete}
                    title="삭제"
                >
                    <AiFillDelete className="w-4 h-4" />
                </button>
            </div>
        </Layout>
    );
}
