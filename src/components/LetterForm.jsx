import { addDays } from "date-fns";
import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    // 날짜 계산 (내일부터 선택 가능하게)
    const tomorrow = addDays(new Date(), 1);

    // 유효성 검사
    const isFormValid =
        title.trim() !== "" && openDate !== null && content.trim() !== "";

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-9 text-main px-5 pb-10 pt-2"
        >
            {/* 제목 */}
            <div>
                <label
                    htmlFor="title"
                    className="text-sm font-semibold block mb-1 text-main"
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
                    className="text-sm font-semibold block mb-1 text-main"
                >
                    언제 열어볼까요?
                </label>
                <div className="relative">
                    <DatePicker
                        id="openDate"
                        locale={ko}
                        selected={openDate}
                        onChange={onChangeOpenDate}
                        placeholderText="날짜를 선택하세요"
                        dateFormat="yyyy.MM.dd"
                        minDate={tomorrow}
                        className="w-[380px] pl-9 border border-[#cdc2b4] rounded-md px-3 py-2 text-sm outline-main bg-white text-main"
                        renderCustomHeader={({
                            date,
                            decreaseMonth,
                            increaseMonth,
                        }) => {
                            const isMinMonth =
                                date.getFullYear() === tomorrow.getFullYear() &&
                                date.getMonth() === tomorrow.getMonth();

                            return (
                                <div className="flex justify-between items-center px-3 py-2">
                                    <button
                                        type="button"
                                        onClick={decreaseMonth}
                                        disabled={isMinMonth}
                                        className={`text-sm px-2 py-1 hover:text-main ${
                                            isMinMonth ? "invisible" : ""
                                        }`}
                                    >
                                        ←
                                    </button>
                                    <span className="text-sm font-semibold text-main">
                                        {date.getFullYear()}년{" "}
                                        {date.getMonth() + 1}월
                                    </span>
                                    <button
                                        type="button"
                                        onClick={increaseMonth}
                                        className="text-sm px-2 py-1 hover:text-main"
                                    >
                                        →
                                    </button>
                                </div>
                            );
                        }}
                    />
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-main">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-main"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>
                <p className="text-xs text-gray-400 ml-1 mt-1">
                    날짜는 내일부터 선택할 수 있어요
                </p>
            </div>

            {/* 본문 */}
            <div>
                <label
                    htmlFor="content"
                    className="text-sm font-semibold block mb-1 text-main"
                >
                    미래의 나에게
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={onChangeContent}
                    className="w-full h-62 border border-[#cdc2b4] rounded-md p-3 text-sm resize-none outline-main bg-white"
                    placeholder={`지금의 마음을 솔직하게 전해주세요.\n\n• 현재 어떤 기분인가요?\n• 지금 고민하고 있는 것이 있나요?\n• 달성하고 싶은 목표가 있나요?\n• 미래의 나에게 무슨 말을 해주고 싶나요?`}
                    maxLength={1000}
                />
                <div className="text-right text-[10px] text-gray-400">
                    {content.length} / 1000
                </div>
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                className={`w-full py-2 rounded-full text-white text-sm shadow-sm transition ${
                    isFormValid
                        ? "bg-main hover:brightness-130"
                        : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
            >
                {buttonText}
            </button>
        </form>
    );
}
