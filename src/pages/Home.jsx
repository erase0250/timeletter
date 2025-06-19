export default function Home() {
    return (
        <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center">
            {/* 로고 아이콘 */}
            <img
                src="icons/logo.svg"
                alt="Timeletter 로고"
                className="w-[65px] h-[35px] mb-10"
            />

            {/* 타이틀 */}
            <h1 className="font-mapo text-3xl text-main">Timeletter</h1>
            <p className="text-sm font-light text-main mt-1 mb-20">
                미래의 나에게 보내는 작은 용기
            </p>

            {/* 버튼 */}
            <button className="w-full max-w-[240px] h-7 bg-main text-white rounded-full text-[12px] font-light mb-2 shadow-sm hover:brightness-130 transition">
                편지 쓰기
            </button>
            <button className="w-full max-w-[240px] h-7 border border-main rounded-full text-[12px] font-light flex items-center justify-center gap-3 bg-white shadow-sm hover:bg-neutral-100 transition">
                <img src="icons/google.svg" alt="Google" className="w-3 h-3" />
                Google 계정으로 로그인
            </button>
        </div>
    );
}
