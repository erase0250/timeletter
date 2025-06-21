import { MdNotes } from "react-icons/md";
import LetterCard from "../components/LetterCard";
import LetterTab from "../components/LetterTab";

export default function LetterList() {
    return (
        <div className="min-h-screen bg-[#FFFDF7]">
            {/* 헤더 -> 컴포넌트로 */}
            <div className="h-14 relative flex items-center px-5 mb-5 bg-white border-b border-gray-200">
                <div className="cursor-pointer">
                    <MdNotes className="w-6 h-6 text-main" />
                </div>
                <h2 className="font-mapo absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-main">
                    Timeletter
                </h2>
            </div>

            {/* 탭 */}
            <LetterTab />

            {/* 편지 개수 텍스트 */}
            <p className="px-5 text-[12px] text-gray-500 ml-1 mb-2 ">
                총 <span className="font-semibold text-main">2개</span>의 편지를
                작성했어요.
            </p>

            {/* 편지 카드 리스트 */}
            <ul className="px-5 flex flex-col gap-3">
                <LetterCard
                    title={"제목제목"}
                    content={"내용내용내용"}
                    isLock={true}
                    createdAt={"2025.05.16"}
                    openAt={"2025.06.16"}
                />
                <LetterCard
                    title={"제목제목"}
                    content={"내용내용내용"}
                    isLock={false}
                    createdAt={"2025.05.16"}
                    openAt={"2025.06.16"}
                />
            </ul>
        </div>
    );
}
