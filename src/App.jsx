import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LetterWrite from "./pages/LetterWrite";
import LetterList from "./pages/LetterList";
import LetterLocked from "./pages/LetterLocked";
import LetterDetail from "./pages/LetterDetail";
import LetterEdit from "./pages/LetterEdit";
import LetterSendAnimation from "./components/LetterSendAnimation";
import useUserStore from "./stores/userStore";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

function App() {
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            useUserStore.getState().setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="min-h-screen flex justify-center bg-[#F8F1E8]">
            <div className="w-[420px] min-h-screen shadow-lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/write" element={<LetterWrite />} />
                    <Route path="/list" element={<LetterList />} />
                    <Route path="/letter/:id" element={<LetterDetail />} />
                    <Route path="/locked/:id" element={<LetterLocked />} />
                    <Route path="/edit/:id" element={<LetterEdit />} />
                    <Route path="/send" element={<LetterSendAnimation />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
