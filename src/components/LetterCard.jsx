import { useNavigate } from "react-router-dom";

// ❓ 날짜 포맷 안전하게 처리하는 함수
function safeFormatDate(value) {
    if (!value) return "";

    if (typeof value === "object" && value.seconds && value.toDate) {
        return value.toDate().toLocaleDateString();
    }

    try {
        return new Date(value).toLocaleDateString();
    } catch {
        return "";
    }
}

export default function LetterCard({
    id,
    title,
    content,
    isLock,
    createdAt, // 작성일
    openAt, // 열람 예정일
}) {
    const navigate = useNavigate();

    // 클릭 시 편지 상태에 따라 상세페이지 또는 잠금페이지로 이동
    const handleClick = () => {
        if (isLock) {
            navigate(`/locked/${id}`);
        } else {
            navigate(`/letter/${id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border border-[#eee5da] rounded-md p-3 shadow-sm cursor-pointer"
        >
            <h2 className="text-main font-semibold mb-1 truncate">{title}</h2>

            <p className="text-gray-500 text-xs line-clamp-2 mb-3">{content}</p>

            <div className="flex items-center gap-2">
                <span
                    className={`flex items-center gap-2 px-2 py-1 rounded-sm text-xs font-semibold ${
                        isLock
                            ? "bg-[#F2ECE4] text-main"
                            : "bg-[#e1efe1] text-green-700"
                    }`}
                >
                    <img
                        src={isLock ? "./icons/lock.svg" : "./icons/unlock.svg"}
                        className="w-[10px]"
                        alt={isLock ? "잠금 중" : "열람가능"}
                    />
                    {isLock ? "잠금 중" : "열람가능"}
                </span>

                <span className="text-gray-400 text-xs">
                    {safeFormatDate(createdAt)} → {safeFormatDate(openAt)}
                </span>
            </div>
        </div>
    );
}
