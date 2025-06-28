import { useState, useRef, useEffect } from "react";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { loginWithGoogle } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

export default function ProfileMenu() {
    const { user, clearUser } = useUserStore();
    const { clearLetters } = useLetterStore();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        clearLetters();
        localStorage.removeItem("user");
        setOpen(false);
        navigate("/list");
    };

    const handleLogin = async () => {
        await loginWithGoogle();
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="absolute right-5 top-3 z-50" ref={menuRef}>
            <div className="relative flex items-center justify-center w-8 h-8">
                {user ? (
                    <>
                        <img
                            src={user.photoURL}
                            alt="프로필"
                            className="w-7 h-7 rounded-full object-cover cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                        {open && (
                            <div className="absolute right-0 mt-17 w-20 bg-white border border-gray-300 rounded-md shadow-lg text-sm">
                                <button
                                    className="w-full px-4 py-2 text-red-500 text-xs hover:bg-red-50 hover:rounded-md"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <BsPersonCircle
                        className="w-6 h-6 text-main cursor-pointer"
                        onClick={handleLogin}
                    />
                )}
            </div>
        </div>
    );
}
