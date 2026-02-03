import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanById, addPlanImages, removePlanImage, updatePlanStatus } from "../services/planService";
import { uploadFile } from "../services/storageService";
import LoadingSpinner from "../components/LoadingSpinner";
import GalleryCarousel from "../components/GalleryCarousel";
import { getCategoryById } from "../constants/categories";

export default function PlanDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [carouselIndex, setCarouselIndex] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [statusMenuOpen, setStatusMenuOpen] = useState(false);
    const fileInputRef = useRef(null);

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

    const handleImageClick = (index) => {
        setCarouselIndex(index);
    };

    const handleCloseCarousel = () => {
        setCarouselIndex(null);
    };

    const handleAddImages = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = files.map(file => uploadFile({ file }));
            const results = await Promise.all(uploadPromises);
            const imageUrls = results.map(r => r.url);

            await addPlanImages(id, imageUrls);

            // Update local state
            setPlan(prev => ({
                ...prev,
                imageUrls: [...(prev.imageUrls || []), ...imageUrls]
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Error al subir imágenes");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDeleteImage = async (imageUrl) => {
        try {
            await removePlanImage(id, imageUrl);

            // Update local state
            setPlan(prev => ({
                ...prev,
                imageUrls: (prev.imageUrls || []).filter(url => url !== imageUrl)
            }));
        } catch (error) {
            console.error("Error deleting image:", error);
            throw error;
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await updatePlanStatus(id, newStatus);
            setPlan(prev => ({ ...prev, status: newStatus }));
            setStatusMenuOpen(false);

            // Show celebration when completing
            if (newStatus === 'completed') {
                alert('🎉 ¡Plan completado!');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar el estado');
        }
    };

    const category = getCategoryById(plan?.category);

    return (
        <div className="p-6 pb-24 max-w-md mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white z-10 py-2">
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800 line-clamp-1">Detalles</h1>
                <div className="ml-auto flex gap-2 items-center relative">
                    {/* Category Badge */}
                    <span className={`hidden sm:flex px-2 py-1 rounded-lg text-xs font-bold items-center gap-1 ${category.bgClass} ${category.textClass}`}>
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </span>

                    {/* Status Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(plan.status)}`}
                        >
                            {getStatusText(plan.status)} ▾
                        </button>

                        {statusMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setStatusMenuOpen(false)} />
                                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[150px]">
                                    <button
                                        onClick={() => handleStatusChange('pending')}
                                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${plan.status === 'pending' ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-700'
                                            }`}
                                    >
                                        <span>Pendiente</span>
                                        {plan.status === 'pending' && <span>✓</span>}
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('in-progress')}
                                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${plan.status === 'in-progress' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700'
                                            }`}
                                    >
                                        <span>En Progreso</span>
                                        {plan.status === 'in-progress' && <span>✓</span>}
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('completed')}
                                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${plan.status === 'completed' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700'
                                            }`}
                                    >
                                        <span>Completado</span>
                                        {plan.status === 'completed' && <span>✓</span>}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <div>
                    <div className="flex items-start gap-3 mb-2">
                        {/* Category icon (mobile) */}
                        <div className={`sm:hidden w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${category.iconBg}`}>
                            {category.icon}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
                        </div>
                    </div>
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

                {plan.budget && (
                    <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100">
                        <div className="bg-white p-2 rounded-lg text-green-600 shadow-sm text-lg">💰</div>
                        <div>
                            <p className="text-xs text-green-600/70 font-bold uppercase tracking-wider">Presupuesto Estimado</p>
                            <p className="text-green-800 font-bold text-lg">S/. {plan.budget}</p>
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
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            Galería
                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{plan.imageUrls?.length || 0}</span>
                        </h3>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Agregar fotos"
                        >
                            {uploading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAddImages}
                        className="hidden"
                    />

                    {plan.imageUrls && plan.imageUrls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {plan.imageUrls.map((url, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-40 group relative cursor-pointer">
                                    <img
                                        src={url}
                                        alt={`Foto ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        onClick={() => handleImageClick(i)}
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

            {/* Carousel Modal */}
            {carouselIndex !== null && plan.imageUrls && (
                <GalleryCarousel
                    images={plan.imageUrls}
                    initialIndex={carouselIndex}
                    onClose={handleCloseCarousel}
                    onDelete={handleDeleteImage}
                />
            )}
        </div>
    );
}
