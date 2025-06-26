import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LetterWrite from "./pages/LetterWrite";
import LetterList from "./pages/LetterList";
import LetterLocked from "./pages/LetterLocked";
import LetterDetail from "./pages/LetterDetail";
import LetterEdit from "./pages/LetterEdit";
import LetterSendAnimation from "./components/LetterSendAnimation";
import "./App.css";

function App() {
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
                </Routes>
            </div>
        </div>
    );
}

export default App;
