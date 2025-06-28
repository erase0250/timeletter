import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header
                type="default"
                title="존재하지 않는 페이지"
                backTo="/list"
            />

            <div className="flex flex-col items-center justify-center py-20">
                <DotLottieReact
                    src="https://lottie.host/04df3f3c-8cbb-4726-b432-106528932187/U1bFPBxpnd.lottie"
                    loop
                    autoplay
                    className="w-60 h-60"
                />
                <button
                    onClick={() => navigate("/list")}
                    className="w-full max-w-[280px] h-8 bg-main text-white rounded-full text-[12px] mb-2 shadow-sm hover:brightness-130 transition"
                >
                    메인으로 이동
                </button>
            </div>
        </Layout>
    );
}
