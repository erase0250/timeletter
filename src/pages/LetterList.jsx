import LetterCard from "../components/LetterCard";
import LetterTab from "../components/LetterTab";
import Header from "../components/Header";
import Layout from "../components/Layout";
// import dummyLetters from "../data/dummyLetters";
import { useEffect, useState } from "react";
import AddLetterButton from "../components/AddLetterButton";

export default function LetterList() {
    const [activeTab, setActiveTab] = useState("전체");
    const [letters, setLetters] = useState([]);

    // 로컬스토리지에서 편지 불러오기
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        setLetters(stored);
    }, []);

    // 선택된 탭에 따라 해당 편지 필터링
    const filteredLetters = letters.filter((letter) => {
        if (activeTab === "전체") return true;
        if (activeTab === "열람가능") return !letter.isLock;
        if (activeTab === "잠금 중") return letter.isLock;
    });

    return (
        <Layout>
            <Header type="list" />
            <LetterTab onTabChange={setActiveTab} />
            {/* 편지 개수 텍스트 */}
            <p className="px-5 text-[12px] text-gray-500 ml-1 mb-2">
                총{" "}
                <span className="font-semibold text-main">
                    {filteredLetters.length}
                </span>
                개의 편지를 작성했어요.
            </p>

            {/* 편지 카드 리스트 */}
            <ul className="px-5 flex flex-col gap-3 mb-10">
                {filteredLetters.map((letter) => (
                    <LetterCard
                        key={letter.id}
                        id={letter.id}
                        title={letter.title}
                        content={letter.content}
                        isLock={letter.isLock}
                        createdAt={letter.createdAt}
                        openAt={letter.openAt}
                    />
                ))}
            </ul>

            <div className="flex justify-center mb-10">
                <img src="./icons/logo.svg" className="w-12 h-12 opacity-30" />
            </div>
            <AddLetterButton />
        </Layout>
    );
}
