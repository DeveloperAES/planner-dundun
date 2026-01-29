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
                        <span className={`shrink-0 px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(plan.status)}`}>
                            {getStatusText(plan.status)}
                        </span>
                    </div>

                    {plan.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{plan.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                            {new Date(plan.date || Date.now()).toLocaleDateString('es-ES', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
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
