import Header from "../components/Header";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LetterLocked() {
    const { id } = useParams();
    const [letter, setLetter] = useState(null);
    const [remainingDays, setRemainingDays] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const found = stored.find((item) => item.id === Number(id));
        setLetter(found);

        if (found) {
            const today = new Date(); // 오늘 날짜
            const openDate = new Date(found.openAt); // 편지 열람일
            const diffTime = openDate.getTime() - today.getTime(); // '편지 열람일 - 오늘 날짜' 계산
            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 계산한 날짜를 일수로 바꾸기
            setRemainingDays(daysLeft);
        }
    }, [id]);

    if (!letter) return null;

    return (
        <Layout>
            <Header type="default" title="편지 잠금" />

            {/* 내용 */}
            <div className="flex flex-col items-center justify-center text-center mt-50 gap-5">
                <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-main rounded-full mb-10 shadow-md">
                    <img
                        src="/icons/lock.svg"
                        alt="잠금 아이콘"
                        className="w-8 h-8"
                    />
                </div>
                <p className="text-main">
                    이 편지는{" "}
                    <span className="font-semibold">{remainingDays}일 뒤</span>
                    에 열람할 수 있어요.
                </p>
            </div>
        </Layout>
    );
}
