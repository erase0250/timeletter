import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import dummyLetters from "../data/dummyLetters";

export default function LetterDetail() {
    const { id } = useParams();

    // 더미데이터용
    const letter = dummyLetters.find((letter) => letter.id === Number(id));

    return (
        <Layout>
            <Header type="default" title="편지 상세" />

            {/* 편지 본문 */}
            <div className="flex-1 px-6 py-3">
                <div className="rounded-md shadow-sm border border-[#eee5da] p-4 bg-[#FAF6F0]">
                    {/* 작성일 */}
                    <p className="text-xs text-gray-400 mb-1">
                        {letter.createdAt} 작성
                    </p>

                    {/* 제목 */}
                    <h1 className="text-main text-xl font-bold mb-4">
                        {letter.title}
                    </h1>

                    {/* 내용 + 배경 밑줄 */}
                    <div
                        className="text-[14px] text-gray-700 leading-[22px] whitespace-pre-wrap rounded-md px-1 pb-5"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                to bottom,
                                transparent 0px,
                                transparent 21px,
                                rgba(0, 0, 0, 0.08) 22px
                            )`,
                            backgroundPosition: "0 22px", // 밑줄 위치
                            backgroundSize: "100% 22px",
                        }}
                    >
                        {letter.content}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
