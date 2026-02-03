import { useNavigate } from "react-router-dom";
import { getCategoryById } from "../constants/categories";

export default function PlanCard({ plan }) {
    const navigate = useNavigate();

    // Colors based on status
    const getStatusColor = (status) => {
        if (status === 'completed') return 'bg-green-100 text-green-600';
        if (status === 'in-progress') return 'bg-orange-100 text-orange-600';
        return 'bg-purple-100 text-purple-600';
    };

    const getStatusText = (status) => {
        if (status === 'completed') return 'Completado';
        if (status === 'in-progress') return 'En Curso';
        return 'Pendiente';
    };

    const category = getCategoryById(plan.category);

    return (
        <div
            onClick={() => navigate(`/planes/${plan.id}`)}
            className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 hover:shadow-lg transition-all cursor-pointer active:scale-98"
        >
            <div className="flex gap-3">
                {/* Category Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${category.iconBg}`}>
                    {category.icon}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 text-base line-clamp-1">{plan.title}</h3>
                        <div className="flex gap-1 shrink-0">
                            {plan.budget && (
                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                    S/. {plan.budget}
                                </span>
                            )}
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(plan.status)}`}>
                                {getStatusText(plan.status)}
                            </span>
                        </div>
                    </div>

                    {plan.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{plan.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                            {plan.date ? new Date(plan.date).toLocaleDateString('es-ES', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : (
                                <span className="text-yellow-500 font-bold bg-yellow-50 px-2 py-0.5 rounded-lg">Idea 💡</span>
                            )}
                        </span>

                        {/* Category badge */}
                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${category.bgClass} ${category.textClass}`}>
                            {category.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
