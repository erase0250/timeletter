import { useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import LetterTab from "../components/LetterTab";
import LetterCard from "../components/LetterCard";
import AddLetterButton from "../components/AddLetterButton";
import Sidebar from "../components/Sidebar";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { getLettersFromFirestore } from "../api/firestore";
import ProfileMenu from "../components/ProfileMenu";

export default function LetterList() {
    const [activeTab, setActiveTab] = useState("전체");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useUserStore();
    const { letters, setLetters, clearLetters } = useLetterStore();

    useEffect(() => {
        const fetchLetters = async () => {
            let updatedLetters = [];

            if (user) {
                const firestoreLetters = await getLettersFromFirestore(
                    user.uid
                );
                updatedLetters = firestoreLetters.map((letter) => {
                    const today = new Date();
                    const openDate = new Date(letter.openAt);
                    today.setHours(0, 0, 0, 0);
                    openDate.setHours(0, 0, 0, 0);

                    if (openDate <= today && letter.isLock) {
                        return { ...letter, isLock: false };
                    }
                    return letter;
                });
                setLetters(updatedLetters);
            } else {
                const stored =
                    JSON.parse(localStorage.getItem("letters")) || [];
                updatedLetters = stored.map((letter) => {
                    const today = new Date();
                    const openDate = new Date(letter.openAt);
                    today.setHours(0, 0, 0, 0);
                    openDate.setHours(0, 0, 0, 0);

                    if (openDate <= today && letter.isLock) {
                        return { ...letter, isLock: false };
                    }
                    return letter;
                });

                // 로컬스토리지도 같이 업데이트
                localStorage.setItem("letters", JSON.stringify(updatedLetters));
                setLetters(updatedLetters);
            }
        };

        fetchLetters();
        return () => clearLetters();
    }, [user, setLetters, clearLetters]);

    const filteredLetters = letters.filter((letter) => {
        if (activeTab === "전체") return true;
        if (activeTab === "열람가능") return !letter.isLock;
        if (activeTab === "잠금 중") return letter.isLock;
    });

    return (
        <Layout>
            <div className="relative">
                <Header
                    type="list"
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />
                <ProfileMenu />
            </div>
            {isSidebarOpen && (
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            )}

            <LetterTab onTabChange={setActiveTab} />

            {/* 편지 개수 텍스트 */}
            <p className="px-5 text-[12px] text-gray-500 ml-1 mb-2">
                총{" "}
                <span className="font-semibold text-main">
                    {filteredLetters.length}
                </span>
                {activeTab === "전체"
                    ? "개의 편지를 작성했어요."
                    : activeTab === "열람가능"
                    ? "개의 편지를 볼 수 있어요."
                    : "개의 편지가 잠겨 있어요."}
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
