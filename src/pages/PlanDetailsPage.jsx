import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanById } from "../services/planService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlanDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlan = async () => {
            try {
                const data = await getPlanById(id);
                setPlan(data);
            } catch (error) {
                console.error("Error loading plan:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPlan();
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <LoadingSpinner />
        </div>
    );

    if (!plan) return <div className="p-6 text-center text-gray-500">Plan no encontrado 😕</div>;

    const getStatusText = (status) => {
        if (status === 'completed') return 'Completado';
        if (status === 'in-progress') return 'En Curso';
        return 'Pendiente';
    };

    const getStatusColor = (status) => {
        if (status === 'completed') return 'bg-green-100 text-green-600';
        if (status === 'in-progress') return 'bg-orange-100 text-orange-600';
        return 'bg-purple-100 text-purple-600';
    };

    return (
        <div className="p-6 pb-24 max-w-md mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white z-10 py-2">
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800 line-clamp-1">Detalles</h1>
                <div className="ml-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(plan.status)}`}>
                        {getStatusText(plan.status)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span>📅 {new Date(plan.date || Date.now()).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                {plan.address && (
                    <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-3">
                        <div className="bg-white p-2 rounded-lg text-purple-600 shadow-sm">📍</div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Dirección</p>
                            <p className="text-gray-800 font-medium">{plan.address}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plan.address)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-600 text-xs font-bold mt-1 inline-block hover:underline"
                            >
                                Ver en Mapa
                            </a>
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Descripción</h3>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                        {plan.description || "Sin descripción adicional."}
                    </p>
                </div>

                {/* Gallery */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-between">
                        Galería
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{plan.imageUrls?.length || 0}</span>
                    </h3>

                    {plan.imageUrls && plan.imageUrls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {plan.imageUrls.map((url, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-40 group relative">
                                    <img
                                        src={url}
                                        alt={`Foto ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        onClick={() => window.open(url, '_blank')}
                                    />
                                    {/* Overlay for zoom hint */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <span className="text-4xl grayscale opacity-50">📷</span>
                            <p className="text-gray-400 text-sm mt-2">No hay fotos aún</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
