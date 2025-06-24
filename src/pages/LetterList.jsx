import LetterCard from "../components/LetterCard";
import LetterTab from "../components/LetterTab";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function LetterList() {
    return (
        <Layout>
            <Header type="list" />
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
        </Layout>
    );
}
