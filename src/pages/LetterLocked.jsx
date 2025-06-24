import Header from "../components/Header";
import Layout from "../components/Layout";

export default function LetterLocked() {
    return (
        <Layout>
            <Header type="default" title="편지 잠금" />

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
        </Layout>
    );
}
