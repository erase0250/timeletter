export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#FFFDF7] flex justify-center relative">
            <div className="w-[420px] min-h-screen shadow-lg max-h-screen overflow-y-auto ">
                {children}
            </div>
        </div>
    );
}
