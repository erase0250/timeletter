export default function LetterForm({
    title,
    content,
    openDate,
    onChangeTitle,
    onChangeContent,
    onChangeOpenDate,
    onSubmit,
    buttonText = "",
}) {
    return (
        <form
            onSubmit={onSubmit}
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
                    onChange={onChangeTitle}
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
                <input
                    id="openDate"
                    type="date"
                    value={openDate}
                    onChange={onChangeOpenDate}
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
                    onChange={onChangeContent}
                    className="w-full h-56 border border-[#cdc2b4] rounded-md p-3 text-sm resize-none outline-main bg-white"
                    placeholder={`지금의 마음을 솔직하게 전해주세요.\n\n• 현재 어떤 기분인가요?\n• 미래의 나에게 말하고 싶은 일이 있나요?\n• 지금 고민하고 있는 것이 있나요?\n• 달성하고 싶은 목표가 있나요?`}
                    maxLength={1000}
                />
                <div className="text-right text-[10px] text-gray-400">
                    {content.length} / 1000
                </div>
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                className="mt-6 w-full py-2 rounded-full bg-main text-white text-sm shadow-sm hover:brightness-130 transition"
            >
                {buttonText}
            </button>
        </form>
    );
}
