import { IoIosArrowBack } from "react-icons/io";

export default function LetterLocked() {
    return (
        <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
            {/* 헤더 */}
            <div className="h-14 relative flex items-center px-5 bg-white border-b border-gray-200">
                <div className="cursor-pointer">
                    <IoIosArrowBack className="w-6 h-6 text-main" />
                </div>
                <h2 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-main">
                    편지 잠금
                </h2>
            </div>

            {/* 내용 */}
            <div className="flex flex-col items-center justify-center text-center mt-50 gap-5">
                <div className="w-[80px] h-[80px] flex items-center justify-center border-2 border-main rounded-full mb-10 shadow-md">
                    <img
                        src="./icons/lock.svg"
                        alt="잠금 아이콘"
                        className="w-8 h-8"
                    />
                </div>
                <p className="text-main">
                    이 편지는 <span className="font-semibold">3일 뒤</span>에
                    열람할 수 있습니다.
                </p>
            </div>
        </div>
    );
}
