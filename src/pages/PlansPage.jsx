import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPlansByCouple } from "../services/planService";
import PlanCard from "../components/PlanCard";
import { CATEGORIES } from "../constants/categories";

export default function PlansPage() {
    // Auth
    const { user } = useAuth();

    // Data state
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

    // Filter state
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const PLANS_PER_PAGE = 6;

    // Load plans
    useEffect(() => {
        if (!user) return;

        const loadPlans = async () => {
            setLoadingPlans(true);
            const data = await getPlansByCouple(user.coupleId);
            setPlans(data);
            setLoadingPlans(false);
        };

        loadPlans();
    }, [user]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedStatus]);

    // Fallback (no mock data anymore)
    const displayPlans = plans.length > 0 ? plans : [];

    // Filter logic
    const filteredPlans = displayPlans.filter(plan => {
        const categoryMatch =
            selectedCategory === "all" || plan.category === selectedCategory;
        const statusMatch =
            selectedStatus === "all" || plan.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredPlans.length / PLANS_PER_PAGE);
    const startIndex = (currentPage - 1) * PLANS_PER_PAGE;
    const endIndex = startIndex + PLANS_PER_PAGE;
    const paginatedPlans = filteredPlans.slice(startIndex, endIndex);
    const hasMore = currentPage < totalPages;

    // Count helpers
    const getCategoryCount = (categoryId) => {
        if (categoryId === "all") return displayPlans.length;
        return displayPlans.filter(p => p.category === categoryId).length;
    };

    const getStatusCount = (status) => {
        if (status === "all") return displayPlans.length;
        return displayPlans.filter(p => p.status === status).length;
    };

    console.log("Mirar planes cargados", plans);

    const inProgressPlans = plans.filter(
        plan => plan.status === "in-progress"
    );


    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        {/* Avatar Placeholder */}
                        <div className="w-full h-full bg-purple-200 flex items-center justify-center text-xl">
                            <img src={user?.avatarUrl} alt="Avatar User" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-semibold">Hola!</p>
                        <h2 className="text-lg font-bold text-gray-800">{user?.name || "Partner"}</h2>
                    </div>
                </div>
                <button className="bg-white p-2 rounded-full shadow-sm text-gray-600 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>

            {/* Banner Card */}
            <div className="bg-[#6A5AE0] rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg shadow-purple-200">
                <div className="relative z-10 w-2/3">
                    <p className="text-sm font-medium opacity-90 mb-1">Metas de pareja</p>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">Casi listo! Sigue así 🚀</h3>
                    <button className="bg-white text-[#6A5AE0] px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                        Ver Progreso
                    </button>
                </div>
                {/* Radial Progress Placeholder */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin-slow flex items-center justify-center text-xs font-bold">
                        85%
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-gray-800">En Progreso 📌</h3>
            </div>


            {/* Horizontal Scroll / Cards - Removed mock data */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-2">
                {inProgressPlans.length > 0 ? (
                    inProgressPlans.map(plan => (
                        <div
                            key={plan.id}
                            className="min-w-[200px] bg-blue-50 p-4 rounded-2xl"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="bg-white p-2 rounded-lg text-blue-500">
                                    📌
                                </span>
                                <span className="text-gray-400 text-xs">
                                    En progreso
                                </span>
                            </div>

                            <h4 className="font-bold text-gray-700 mb-1">
                                {plan.title}
                            </h4>

                            <p className="text-xs text-gray-500 mb-3">
                                {plan.description || "Sin descripción"}
                            </p>

                            <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-2/3"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm">
                        No hay planes en progreso 🚧
                    </p>
                )}
            </div>





            {/* Category Filter - Moved */}
            <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${selectedCategory === 'all'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <span className="text-lg">♾️</span> <span className="ml-1 opacity-75">({getCategoryCount('all')})</span>
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                ? `${cat.bgClass} ${cat.textClass} border-2 ${cat.borderClass} shadow-sm`
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span className="text-lg">{cat.icon} {cat.name}</span>
                            <span className="opacity-75">({getCategoryCount(cat.id)})</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                    {selectedCategory === 'all' && selectedStatus === 'all' ? 'Todos los planes' : 'Resultados'} 📋
                </h3>
                <span className="bg-purple-100 text-purple-600 text-xs font-bold px-2 py-1 rounded-lg">
                    {filteredPlans.length}
                </span>
            </div>

            <div>
                {paginatedPlans.length > 0 ? (
                    paginatedPlans.map((plan, i) => (
                        <PlanCard key={plan.id || i} plan={plan} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <div className="text-6xl mb-4 opacity-50">📭</div>
                        <p className="text-gray-400 font-medium mb-2">No hay planes con estos filtros</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSelectedStatus('all');
                            }}
                            className="text-purple-600 text-sm font-semibold hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {hasMore && paginatedPlans.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setCurrentPage(page => page + 1)}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-md"
                    >
                        Cargar más ({filteredPlans.length - endIndex} restantes)
                    </button>
                </div>
            )}
        </div>
    );
}
