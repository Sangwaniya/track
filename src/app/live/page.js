'use client';
export default function Redirecting() {
    return <div className=" text-center fixed bottom-0 left-1/2 transform -translate-x-1/2">
        <button className=" bg-[#201d27] transform -translate-y bottom-4 mb-4 text-white py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors mt-6 shadow-sm px-6" onClick={() => window.location.href = '/'}>Search Roadways</button>
    </div>;
}