import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPlansByCouple } from "../services/planService";
import PlanCard from "../components/PlanCard";

export default function PlansPage() {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        if (!user) return;
        const loadPlans = async () => {
            const data = await getPlansByCouple(user.coupleId);
            setPlans(data);
        };
        loadPlans();
    }, [user]);

    // Mock data for "In Progress" or visual variety if empty
    const displayPlans = plans.length > 0 ? plans : [
        { id: 1, title: 'Cena Romántica', description: 'Restaurante italiano', status: 'pending' },
        { id: 2, title: 'Viaje a la Playa', description: 'Fin de semana', status: 'in-progress' },
        { id: 3, title: 'Comprar regalos', description: 'Para navidad', status: 'completed' },
    ];

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

            {/* Horizontal Scroll / Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-2">
                {/* Mock "In Progress" Card */}
                <div className="min-w-[200px] bg-blue-50 p-4 rounded-2xl">
                    <div className="flex justify-between mb-2">
                        <span className="bg-white p-2 rounded-lg text-blue-500">🏖️</span>
                        <span className="text-gray-400 text-xs">2d left</span>
                    </div>
                    <h4 className="font-bold text-gray-700 mb-1">Viaje a la Playa</h4>
                    <p className="text-xs text-gray-500 mb-3">Preparar maletas</p>
                    <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-2/3"></div>
                    </div>
                </div>
                <div className="min-w-[200px] bg-orange-50 p-4 rounded-2xl">
                    <div className="flex justify-between mb-2">
                        <span className="bg-white p-2 rounded-lg text-orange-500">🎁</span>
                        <span className="text-gray-400 text-xs">5d left</span>
                    </div>
                    <h4 className="font-bold text-gray-700 mb-1">Regalo Aniversario</h4>
                    <p className="text-xs text-gray-500 mb-3">Comprar online</p>
                    <div className="w-full bg-orange-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full w-1/3"></div>
                    </div>
                </div>
            </div>


            {/* Task Groups / List */}
            <div className="flex justify-between items-center mb-4 mt-4">
                <h3 className="text-xl font-bold text-gray-800">Todos los planes 📋</h3>
                <span className="bg-purple-100 text-purple-600 text-xs font-bold px-2 py-1 rounded-lg">{displayPlans.length}</span>
            </div>

            <div>
                {displayPlans.map((plan, i) => (
                    <PlanCard key={plan.id || i} plan={plan} />
                ))}
            </div>
        </div>
    );
}
