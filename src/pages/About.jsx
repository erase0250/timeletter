import Layout from "../components/Layout";
import Header from "../components/Header";
import AboutCard from "../components/AboutCard";

export default function About() {
    return (
        <Layout>
            <Header type="default" title="Timeletter 소개" backTo="/list" />

            <div className="px-6 py-8 text-gray-700">
                <div className="text-center mb-12">
                    <div className="bg-white w-18 h-18 rounded-full mx-auto flex items-center justify-center shadow-lg mb-6">
                        <img
                            src="/icons/logo.svg"
                            alt="Timeletter Logo"
                            className="w-12 h-12"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-main mb-2">
                        미래의 나에게 보내는 편지
                    </h1>
                    <p className="text-xs text-gray-600 leading-5 max-w-[300px] mx-auto">
                        Timeletter는 지금 이 순간의 마음을 담아
                    </p>
                    <p className="text-xs text-gray-600 max-w-[300px] mx-auto">
                        미래의 나에게 따뜻한 편지를 전하는 서비스입니다.
                    </p>
                </div>

                <div className="space-y-4">
                    <AboutCard
                        title="✉️ 시간을 담은 편지"
                        content="원하는 날짜에 열어볼 편지를 써보세요. 오늘의 생각과
                            감정이 미래의 나에게 따뜻한 위로가 될 거예요."
                    />
                    <AboutCard
                        title="🔐 소중한 추억 보관"
                        content="구글 계정으로 로그인하면 클라우드에 안전하게
                            보관되고, 로그인 없이도 기기에 저장할 수 있어요."
                    />
                    <AboutCard
                        title="💗 추억을 간직하는 방법"
                        content="작성한 편지를 이미지로 저장해서 언제든 다시 볼 수
                            있어요. 특별한 순간을 영원히 간직하세요."
                    />
                </div>

                <div className="mt-10 text-center">
                    <div className="mt-4">
                        <a
                            href="https://github.com/erase0250/timeletter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 underline"
                        >
                            Github / v1.0.0
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
