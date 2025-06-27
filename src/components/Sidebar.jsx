import { FaSun, FaInfoCircle, FaEnvelope, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useLetterStore from "../stores/letterStore";
import { loginWithGoogle } from "../hooks/useAuth";

export default function Sidebar({ onClose }) {
    const { user, clearUser } = useUserStore();
    const { clearLetters } = useLetterStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        clearLetters();
        localStorage.removeItem("user");
        onClose();
        navigate("/list");
    };

    const handleLogin = async () => {
        await loginWithGoogle();
        onClose();
    };

    return (
        <div className="absolute inset-0 bg-black/30 z-30" onClick={onClose}>
            <div
                className="absolute top-0 left-0 h-full w-[200px] bg-white shadow-md z-40 p-5 flex flex-col"
                onClick={(e) => e.stopPropagation()} // 사이드바 내부 클릭 시 닫히지 않도록
            >
                {/* 로고 */}
                <img
                    src="icons/logo.svg"
                    alt="Timeletter 로고"
                    className="w-12 h-12 mb-10 mx-auto"
                />

                {/* 메뉴 리스트 */}
                <ul className="flex flex-col gap-4 text-sm  text-main">
                    <li className="flex items-center gap-2 cursor-pointer hover:text-main">
                        <FaSun className="w-4 h-4" />
                        테마 설정 (⚠️)
                    </li>
                    <li
                        className="flex items-center gap-2 cursor-pointer hover:text-main"
                        onClick={() => {
                            // navigate("/about");
                            onClose();
                        }}
                    >
                        <FaInfoCircle className="w-4 h-4" />
                        Timeletter 소개 (⚠️)
                    </li>
                    <li>
                        <a
                            href="mailto:erase0250@gmail.com"
                            className="flex items-center gap-2 hover:text-main"
                        >
                            <FaEnvelope className="w-4 h-4" />
                            피드백 보내기
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/erase0250/timeletter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-main"
                        >
                            <FaGithub className="w-4 h-4" />
                            GitHub / v1.0.0
                        </a>
                    </li>
                </ul>

                {/* 로그인/로그아웃 버튼 */}
                {user ? (
                    <div className="flex flex-col gap-2 mt-10">
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-500 border border-red-300 px-3 py-1 rounded-full hover:bg-red-50 transition"
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="text-sm text-main border border-main px-3 py-1 rounded-full hover:bg-main hover:text-white transition mt-10"
                    >
                        로그인
                    </button>
                )}
            </div>
        </div>
    );
}
