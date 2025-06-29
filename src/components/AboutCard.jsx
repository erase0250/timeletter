export default function AboutCard({ title, content }) {
    return (
        <div className="bg-white border border-[#eee5da] p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-main mb-1">{title}</h3>
            <p className="text-xs text-gray-600 leading-5">{content}</p>
        </div>
    );
}
