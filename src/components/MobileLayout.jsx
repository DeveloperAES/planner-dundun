import BottomNav from "./BottomNav";

export default function MobileLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center overflow-hidden">
            <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl flex flex-col">
                <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
                    {children}
                </main>
                <BottomNav />
            </div>
        </div>
    );
}
