import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPlan, addPlanImages } from "../services/planService";
import { uploadFile } from "../services/storageService";
import { CATEGORIES } from "../constants/categories";

export default function AddPlanPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("date");
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        // Generate previews
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !date) return alert("Por favor completa los campos requeridos");

        setLoading(true);
        try {
            // 1) Subir imágenes a ImgBB primero
            let imageUrls = [];
            if (files.length > 0) {
                const uploaded = await Promise.all(
                    files.map((file) => uploadFile({ file }))
                );
                imageUrls = uploaded.map(x => x.url);
            }

            // 2) Crear el plan con las imágenes ya listas
            await createPlan({
                title,
                description,
                address,
                date,
                imageUrls,
                category,
                coupleId: user.coupleId,
                createdBy: user.uid
            });

            navigate("/planes");
        } catch (error) {
            console.error("Error creating plan:", error);
            alert("Hubo un error al crear el plan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Nuevo Plan ✨</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4 scrollbar-hide">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Título</label>
                    <input
                        type="text"
                        placeholder="Ej. Cena en la playa"
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Dirección</label>
                    <input
                        type="text"
                        placeholder="Ej. Av. Larco 123"
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Fecha</label>
                    <input
                        type="datetime-local"
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-600"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Categoría</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setCategory(cat.id)}
                                className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${category === cat.id
                                    ? `${cat.bgClass} ${cat.textClass} border-2 ${cat.borderClass} shadow-sm`
                                    : 'bg-gray-50 text-gray-600 border-2 border-transparent'
                                    }`}
                            >
                                <span className="text-lg">{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Descripción</label>
                    <textarea
                        placeholder="Detalles, ubicación, notas..."
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all h-24 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Imágenes</label>
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="w-full bg-purple-50 hover:bg-purple-100 p-4 rounded-2xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                            <span className="text-purple-600 font-medium">Subir fotos</span>
                        </label>
                    </div>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {previews.map((src, i) => (
                            <img key={i} src={src} alt="preview" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                        ))}
                    </div>
                )}

                <div className="mt-4 pb-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6A5AE0] text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 active:scale-95 transition-all flex justify-center items-center gap-2"
                    >
                        {loading ? "Guardando..." : "Guardar Plan"}
                        {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    </button>
                </div>
            </form>
        </div>
    );
}
