import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AddLetterButton() {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/write")}
            className="absolute bottom-6 right-7 w-13 h-13 rounded-full bg-main text-white shadow-lg flex items-center justify-center hover:brightness-130 transition"
        >
            <HiPlus className="w-5 h-5" />
        </div>
    );
}
