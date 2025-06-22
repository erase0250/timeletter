import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LetterWrite from "./pages/LetterWrite";
import LetterList from "./pages/LetterList";
import LetterLocked from "./pages/LetterLocked";

function App() {
    return (
        <div className="min-h-screen flex justify-center bg-[#F8F1E8]">
            <div className="w-[420px] min-h-screen shadow-lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/write" element={<LetterWrite />} />
                    <Route path="/list" element={<LetterList />} />
                    {/* ⬇️ 테스트 */}
                    <Route path="/locked" element={<LetterLocked />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
