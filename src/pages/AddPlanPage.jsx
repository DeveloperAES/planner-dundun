import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createPlan } from "../services/planService";

export default function AddPlanPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !date) return alert("Por favor completa los campos requeridos");

        setLoading(true);
        try {
            await createPlan({
                title,
                description,
                date,
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
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Nuevo Plan ✨</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                <div className="space-y-2">
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

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Fecha</label>
                    <input
                        type="datetime-local"
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-600"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Descripción (Opcional)</label>
                    <textarea
                        placeholder="Detalles, ubicación, notas..."
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all h-32 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mt-auto pb-4">
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
