import { IoIosArrowBack } from "react-icons/io";
import { MdNotes } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Header({
    type = "default",
    title = "",
    onOpenSidebar,
    backTo = null,
}) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backTo) {
            navigate(backTo);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="h-14 relative flex items-center px-5 bg-white border-b border-gray-200 mb-3">
            {/* LetterList 페이지 헤더 */}
            {type === "list" ? (
                <div className="cursor-pointer" onClick={onOpenSidebar}>
                    <MdNotes className="w-6 h-6 text-main" />
                </div>
            ) : (
                // 나머지 페이지 헤더
                <div onClick={handleBack} className="cursor-pointer">
                    <IoIosArrowBack className="w-6 h-6 text-main" />
                </div>
            )}

            <h2
                className={`absolute left-1/2 -translate-x-1/2 font-semibold text-main ${
                    type === "list" ? "text-xl font-mapo" : "text-base"
                }`}
            >
                {type === "list" ? "Timeletter" : title}
            </h2>
        </div>
    );
}
