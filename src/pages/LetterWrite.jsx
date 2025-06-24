import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useState } from "react";

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

            {/* 폼 영역 */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 text-main px-5 pb-10"
            >
                {/* 제목 */}
                <div>
                    <label
                        htmlFor="title"
                        className="text-sm font-medium block mb-1 text-main"
                    >
                        편지 제목
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-[#cdc2b4] rounded-md px-3 py-2 text-sm outline-main bg-white"
                        placeholder="제목을 입력하세요"
                    />
                </div>

                {/* 열람 날짜 */}
                <div>
                    <label
                        htmlFor="openDate"
                        className="text-sm font-medium block mb-1 text-main"
                    >
                        언제 열어볼까요?
                    </label>
                    {/* ////////////////////////////////// */}
                    {/* react-datepicker 쓰기 */}
                    {/* 에러처리!!!!! */}
                    <input
                        id="openDate"
                        type="date"
                        value={openDate}
                        onChange={(e) => setOpenDate(e.target.value)}
                        className="w-full border border-[#cdc2b4] rounded-md px-3 py-2 text-sm outline-main bg-white"
                    />
                    <p className="text-[10px] text-gray-400 ml-1 mt-1">
                        날짜는 내일부터 선택할 수 있어요
                    </p>
                </div>

                {/* 본문 */}
                <div>
                    <label
                        htmlFor="content"
                        className="text-sm font-medium block mb-1 text-main"
                    >
                        미래의 나에게
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-56 border border-[#cdc2b4] rounded-md p-3 text-sm resize-none outline-main bg-white"
                        placeholder={`지금의 마음을 솔직하게 전해주세요.\n\n• 현재 어떤 기분인가요?\n• 미래의 나에게 말하고 싶은 일이 있나요?\n• 지금 고민하고 있는 것이 있나요?\n• 달성하고 싶은 목표가 있나요?`}
                        maxLength={1000}
                    />
                    <div className="text-right text-[10px] text-gray-400 ">
                        0 / 1000
                    </div>
                </div>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    onClick={() => navigate("/list")}
                    className="mt-6 w-full py-2 rounded-full bg-main text-white text-sm shadow-sm hover:brightness-130 transition"
                >
                    편지 보내기
                </button>
            </form>
        </Layout>
    );
}
