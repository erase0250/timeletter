import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

export default function LetterDetail() {
    const { id } = useParams();
    const [letter, setLetter] = useState(null);
    const navigate = useNavigate();

    // 편지 삭제 핸들러
    const handleDelete = () => {
        if (
            !window.confirm(
                "정말 이 편지를 삭제할까요? 삭제한 편지는 되돌릴 수 없어요."
            )
        )
            return;

        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const updated = stored.filter((item) => item.id !== Number(id));
        localStorage.setItem("letters", JSON.stringify(updated));

        navigate("/list");
    };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("letters")) || [];
        const found = stored.find((l) => l.id === Number(id));
        setLetter(found);
    }, [id]);

    if (!letter) {
        return (
            <Layout>
                <Header type="default" title="편지 상세" />
                <div className="p-6 text-center text-gray-500">
                    편지를 찾을 수 없습니다.
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Header type="default" title="편지 상세" />

            {/* 편지 본문 */}
            <div className="flex-1 px-6 pt-3 pb-6">
                <div className="rounded-md shadow-sm border border-[#eee5da] p-4 bg-white">
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

            {/* 수정/삭제 버튼 */}
            <div className="flex gap-2 justify-end px-6 pb-6">
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full border border-main text-main text-xs hover:bg-main hover:text-white transition"
                    onClick={() => navigate(`/edit/${id}`)}
                >
                    <MdEdit className="w-3 h-3" />
                    수정
                </button>
                <button
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-main text-white text-xs hover:brightness-120 transition"
                    onClick={handleDelete}
                >
                    <RiDeleteBinLine className="w-3 h-3" />
                    삭제
                </button>
            </div>
        </Layout>
    );
}
