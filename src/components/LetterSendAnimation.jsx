import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LetterSendAnimation() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/list");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 bg-[#FFFDF7] z-50 flex items-center justify-center">
            <img
                src="/icons/logo.svg"
                alt="Timeletter 로고"
                className="w-20 h-20 animate-fly-up"
            />
        </div>
    );
}
