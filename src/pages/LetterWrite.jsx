import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useState } from "react";
import LetterForm from "../components/LetterForm";
import { format } from "date-fns";
import useUserStore from "../stores/userStore";
import { saveLetterToFirestore } from "../api/firestore";

export default function LetterWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [openDate, setOpenDate] = useState(null);
    const navigate = useNavigate();
    const { user } = useUserStore();

    // 열람일 변경 핸들러
    const handleOpenDateChange = (date) => {
        setOpenDate(date);
    };

    // 편지 작성 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // -> 폼의 기본 제출 동작인 '새로고침, 서버 전송' 막음

        // 날짜 포맷
        const createdAt = format(new Date(), "yyyy-MM-dd");
        const openAt = format(openDate, "yyyy-MM-dd");

        const newLetter = {
            title, // 제목
            content, // 내용
            createdAt, // 편지 작성일
            openAt, // 편지 열람일
            isLock: new Date(openDate) > new Date(), // 편지 잠금: 열람일이 오늘보다 미래면 잠금 상태 처리
        };

        try {
            if (user) {
                // 로그인 -> Firestore에 저장
                await saveLetterToFirestore(user.uid, newLetter);
            } else {
                // 비로그인 -> 로컬스토리지에 저장
                const stored =
                    JSON.parse(localStorage.getItem("letters")) || [];
                const localLetter = { id: Date.now(), ...newLetter };
                localStorage.setItem(
                    "letters",
                    JSON.stringify([localLetter, ...stored])
                );
            }

            navigate("/send");
        } catch (error) {
            alert("편지 저장에 실패했어요. 다시 시도해 주세요.");
            console.error(error);
        }
    };

    return (
        <Layout>
            <Header type="default" title="새 편지 쓰기" backTo="/list" />
            <LetterForm
                title={title}
                content={content}
                openDate={openDate}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeContent={(e) => setContent(e.target.value)}
                onChangeOpenDate={handleOpenDateChange}
                onSubmit={handleSubmit}
                buttonText="편지 보내기"
            />
        </Layout>
    );
}
