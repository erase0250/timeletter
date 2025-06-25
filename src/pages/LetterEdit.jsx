import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import LetterForm from "../components/LetterForm";

export default function LetterEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [openDate, setOpenDate] = useState("");

    // 기존 편지 데이터 불러오기
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const found = stored.find((l) => l.id === Number(id));
        if (!found) return;

        setTitle(found.title);
        setContent(found.content);
        setOpenDate(found.openAt);
    }, [id]);

    // 수정 완료 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const updated = stored.map((letter) =>
            letter.id === Number(id)
                ? {
                      ...letter,
                      title,
                      content,
                      openAt: openDate,
                      isLock: new Date(openDate) > new Date(),
                  }
                : letter
        );

        localStorage.setItem("letters", JSON.stringify(updated));
        navigate("/list");
    };

    return (
        <Layout>
            <Header type="default" title="편지 수정하기" />
            <LetterForm
                title={title}
                content={content}
                openDate={openDate}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeContent={(e) => setContent(e.target.value)}
                onChangeOpenDate={(e) => setOpenDate(e.target.value)}
                onSubmit={handleSubmit}
                buttonText="수정 완료"
            />
        </Layout>
    );
}
