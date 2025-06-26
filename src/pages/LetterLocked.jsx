import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function LetterLocked() {
    const { id } = useParams();
    const [letter, setLetter] = useState(null);
    const [remainingDays, setRemainingDays] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const found = stored.find((item) => item.id === Number(id));

        if (!found) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // 오늘 날짜 기준을 00:00으로 고정
        const openDate = new Date(found.openAt);
        openDate.setHours(0, 0, 0, 0); // 열람일도 00:00으로 고정

        // 열람일이 오늘이거나 이미 열람가능 편지일 경우 상세페이지로 이동
        if (openDate <= today || found.isLock === false) {
            navigate(`/letter/${id}`);
            return;
        }

        // 남은 날짜 계산
        const diffTime = openDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRemainingDays(daysLeft);

        setLetter(found);
    }, [id, navigate]);

    if (!letter) return null;

    // 미리보기 핸들러
    const handlePreview = () => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const updated = stored.map((item) =>
            item.id === Number(id) ? { ...item, isLock: false } : item
        );
        localStorage.setItem("letters", JSON.stringify(updated));

        // replace 옵션 추가 -> 히스토리에서 잠금페이지 제거
        navigate(`/letter/${id}`, { replace: true });
    };

    return (
        <Layout>
            <Header type="default" title="편지 잠금" />

            {/* 내용 */}
            <div className="flex flex-col items-center justify-center text-center mt-50 gap-5">
                <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-main rounded-full mb-5 shadow-md">
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

                {/* 미리보기 버튼 */}
                <button
                    onClick={handlePreview}
                    className="text-xs text-gray-400 underline hover:text-main transition"
                >
                    지금 미리 열어보기
                </button>
            </div>
        </Layout>
    );
}
