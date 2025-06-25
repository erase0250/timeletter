import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useState } from "react";
import LetterForm from "../components/LetterForm";

export default function LetterWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [openDate, setOpenDate] = useState("");
    const navigate = useNavigate();

    // 편지 작성 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // -> 폼의 기본 제출 동작인 '새로고침, 서버 전송' 막음

        const newLetter = {
            id: Date.now(), // 편지 아이디: 현재 시간을 ms단위 숫자로 반환한 걸 사용
            title, // 제목
            content, // 내용
            createdAt: new Date().toISOString().slice(0, 10), // 편지 작성일: yyyy-mm-dd 형식
            openAt: openDate, // 편지 열람일
            isLock: new Date(openDate) > new Date(), // 편지 잠금: 열람일이 오늘보다 미래면 잠금 상태 처리
        };

        // 로컬스토리지에 저장된 기존 편지 가져오기
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        // 새로운 편지 맨 앞에 추가 후 저장
        localStorage.setItem("letters", JSON.stringify([newLetter, ...stored]));

        navigate("/list");
    };

    return (
        <Layout>
            <Header type="default" title="새 편지 쓰기" />
            <LetterForm
                title={title}
                content={content}
                openDate={openDate}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeContent={(e) => setContent(e.target.value)}
                onChangeOpenDate={(e) => setOpenDate(e.target.value)}
                onSubmit={handleSubmit}
                buttonText="편지 보내기"
            />
        </Layout>
    );
}
