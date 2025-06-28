import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import LetterForm from "../components/LetterForm";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function LetterEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [openDate, setOpenDate] = useState("");

    const { user } = useUserStore();
    const { letters, setLetters } = useLetterStore();

    // 기존 편지 데이터 불러오기
    useEffect(() => {
        const load = async () => {
            if (user) {
                const ref = doc(db, "users", user.uid, "letters", id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setTitle(data.title);
                    setContent(data.content);

                    // Firestore Timestamp를 Date 객체로 변환
                    const openAtRaw = data.openAt;
                    const openDateObj = openAtRaw?.toDate
                        ? openAtRaw.toDate()
                        : new Date(openAtRaw);
                    setOpenDate(openDateObj);
                }
            } else {
                const stored =
                    JSON.parse(localStorage.getItem("letters")) || [];
                const found = stored.find((l) => l.id === Number(id));
                if (!found) return;

                setTitle(found.title);
                setContent(found.content);
                setOpenDate(new Date(found.openAt));
            }
        };
        load();
    }, [id, user]);

    // 수정 완료 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isLock;

        if (user) {
            const ref = doc(db, "users", user.uid, "letters", id);
            const snap = await getDoc(ref);
            const prev = snap.data();

            // 기존 편지가 열람가능 상태였다면 그대로 유지
            isLock =
                prev?.isLock === false
                    ? false
                    : new Date(openDate).setHours(0, 0, 0, 0) >
                      new Date().setHours(0, 0, 0, 0);

            try {
                await updateDoc(ref, {
                    title,
                    content,
                    openAt: openDate,
                    isLock,
                });

                const updated = letters.map((l) =>
                    String(l.id) === id
                        ? { ...l, title, content, openAt: openDate, isLock }
                        : l
                );
                setLetters(updated);
                navigate("/list");
            } catch (error) {
                console.error("Firestore 수정 실패:", error);
                alert("수정에 실패했어요. 다시 시도해 주세요.");
            }
        } else {
            const stored = JSON.parse(localStorage.getItem("letters")) || [];
            const prev = stored.find((l) => l.id === Number(id));
            isLock =
                prev?.isLock === false
                    ? false
                    : new Date(openDate).setHours(0, 0, 0, 0) >
                      new Date().setHours(0, 0, 0, 0);

            const updated = stored.map((letter) =>
                letter.id === Number(id)
                    ? {
                          ...letter,
                          title,
                          content,
                          openAt: openDate,
                          isLock,
                      }
                    : letter
            );
            localStorage.setItem("letters", JSON.stringify(updated));
            navigate("/list");
        }
    };

    return (
        <Layout>
            <Header type="default" title="편지 수정하기" backTo="/list" />
            <LetterForm
                title={title}
                content={content}
                openDate={openDate}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeContent={(e) => setContent(e.target.value)}
                onChangeOpenDate={(value) => setOpenDate(value)}
                onSubmit={handleSubmit}
                buttonText="수정 완료"
            />
        </Layout>
    );
}
