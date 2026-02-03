import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        {
            path: "/planes", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            )
        },
        {
            path: "/calendar", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
            )
        },
        {
            path: "/add", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            ), special: true
        },
        {
            path: "/coupons", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
            )
        },
        {
            path: "/profile", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            )
        },
    ];

    return (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center pb-6 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] z-50">
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center justify-center transition-all duration-300 ${item.special
                        ? "bg-purple-600 text-white w-12 h-12 rounded-full -mt-8 shadow-lg shadow-purple-300 transform hover:scale-105"
                        : isActive(item.path) ? "text-purple-600" : "text-gray-400 hover:text-purple-400"
                        }`}
                >
                    {item.icon}
                </Link>
            ))}
        </div>
    );
}
