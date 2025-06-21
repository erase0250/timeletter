export default function LetterCard({
    title,
    content,
    isLock,
    createdAt, // 작성일
    openAt, // 열람 예정일
}) {
    return (
        <div className="bg-white border border-[#eee5da] rounded-md p-3 shadow-sm">
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
                    {createdAt} → {openAt}
                </span>
            </div>
        </div>
    );
}
