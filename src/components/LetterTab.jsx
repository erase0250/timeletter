import { useState } from "react";

const tabs = ["전체", "열람가능", "잠금 중"];

export default function LetterTab({ onTabChange }) {
    const [activeTab, setActiveTab] = useState("전체");

    const handleClick = (tab) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    };

    return (
        <div className="flex px-5 mb-4">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                    <button
                        key={tab}
                        onClick={() => handleClick(tab)}
                        className={`px-4 py-1.5 rounded-full transition-all duration-300
                            ${
                                isActive
                                    ? "bg-[#F2ECE4] text-main font-semibold text-sm"
                                    : "bg-transparent text-gray-300 text-sm"
                            }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}
