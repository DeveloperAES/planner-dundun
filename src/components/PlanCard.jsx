import { useNavigate } from "react-router-dom";

export default function PlanCard({ plan }) {
    const navigate = useNavigate();

    // Colors based on status or random for now
    const getStatusColor = (status) => {
        if (status === 'completed') return 'bg-green-100 text-green-600';
        if (status === 'in-progress') return 'bg-orange-100 text-orange-600';
        return 'bg-purple-100 text-purple-600'; // pending
    };

    const getStatusText = (status) => {
        if (status === 'completed') return 'Completado';
        if (status === 'in-progress') return 'En Curso';
        return 'Pendiente';
    }

    return (
        <div
            onClick={() => navigate(`/planes/${plan.id}`)}
            className="bg-white p-4 rounded-2xl mb-4 border border-gray-50 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer active:scale-[0.98] transform duration-200"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(plan.status)}`}>
                <span className="text-xl">📝</span>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-gray-800 line-clamp-1">{plan.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{plan.description || "Sin descripción"}</p>
                {plan.address && <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">📍 {plan.address}</p>}

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <span>📅 {new Date(plan.date || Date.now()).toLocaleDateString('es-ES')}</span>
                    {plan.imageUrls && plan.imageUrls.length > 0 && <span>📷 {plan.imageUrls.length}</span>}
                    {plan.status === 'in-progress' && (
                        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">En Curso</span>
                    )}
                </div>
            </div>
            <button
                className="text-gray-300 hover:text-purple-600 p-2"
                onClick={(e) => {
                    e.stopPropagation();
                    // Future: Open menu
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </button>
        </div>
    );
}
