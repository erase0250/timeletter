import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getLettersFromFirestore } from "../api/firestore";

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
            <div className="flex-1 px-6 pt-3 pb-6">
                <div className="rounded-md shadow-sm border border-[#eee5da] p-4 bg-white">
                    {/* 제목 */}
                    <h1 className="text-main text-xl font-bold mb-4">
                        {letter.title}
                    </h1>

                    {/* 내용 + 배경 밑줄 */}
                    <div
                        className="text-[14px] text-gray-700 leading-[22px] whitespace-pre-wrap rounded-md px-1 pb-5"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                to bottom,
                                transparent 0px,
                                transparent 21px,
                                rgba(0, 0, 0, 0.2) 22px
                            )`,
                            backgroundPosition: "0 22px", // 밑줄 위치
                            backgroundSize: "100% 22px",
                        }}
                    >
                        {letter.content}
                    </div>

                    {/* 작성일 */}
                    <p className="text-xs text-gray-400 text-right mt-2">
                        {safeFormatDate(letter.createdAt)} 작성
                    </p>
                </div>
            </div>

            {/* 수정/삭제 버튼 */}
            <div className="flex gap-2 justify-end px-6 pb-6">
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-main text-main text-xs hover:bg-main hover:text-white transition"
                    onClick={() => navigate(`/edit/${id}`)}
                >
                    <MdEdit className="w-3 h-3" />
                    수정
                </button>
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-main text-white text-xs hover:brightness-120 transition"
                    onClick={handleDelete}
                >
                    <RiDeleteBinLine className="w-3 h-3" />
                    삭제
                </button>
            </div>
        </Layout>
    );
}
