import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createCoupon } from "../services/couponService";
import { uploadFile } from "../services/storageService";

const EMOJIS = ['🎟️', '💆‍♂️', '💆‍♀️', '🍿', '🍔', '🍺', '🍷', '🎮', '🏖️', '🧹', '🎲', '💋'];

export default function AddCouponPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedIcon, setSelectedIcon] = useState(EMOJIS[0]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return alert("Ingresa un título");

        setLoading(true);
        try {
            let imageUrl = null;
            if (file) {
                const uploaded = await uploadFile({ file });
                imageUrl = uploaded.url;
            }

            await createCoupon({
                title,
                description,
                quantity: Number(quantity),
                icon: selectedIcon,
                image: imageUrl,
                coupleId: user.coupleId,
                createdBy: user.uid
            });
            navigate("/coupons");
        } catch (error) {
            console.error("Error creating coupon:", error);
            alert("Error al crear cupón");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 h-full flex flex-col bg-white min-h-screen">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Nuevo Cupón 🎟️</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-6">

                {/* Icon Selection */}
                <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-3">Elige un ícono</label>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {EMOJIS.map(emoji => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => setSelectedIcon(emoji)}
                                className={`w-12 h-12 flex items-center justify-center text-2xl rounded-2xl transition-all shrink-0 ${selectedIcon === emoji
                                    ? 'bg-purple-100 border-2 border-purple-500 scale-110'
                                    : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Título del Vale</label>
                    <input
                        type="text"
                        placeholder="Ej. Vale por un masaje de espalda"
                        className="w-full bg-gray-50 p-4 rounded-2xl border-transparent focus:bg-white focus:border-purple-200 focus:ring-2 focus:ring-purple-100 outline-none transition-all font-medium"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Cantidad de Usos</label>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl w-max">
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 bg-white rounded-xl shadow-sm text-purple-600 font-bold active:scale-90 transition-transform"
                        >
                            -
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                        <button
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 bg-white rounded-xl shadow-sm text-purple-600 font-bold active:scale-90 transition-transform"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 ml-1 mt-1">¿Cuántas veces se puede canjear?</p>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Imagen (Opcional)</label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            id="coupon-image"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="coupon-image"
                            className={`block w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${preview ? 'border-purple-200 bg-purple-50 h-48' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 p-8 text-center'
                                }`}
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                    <span className="text-2xl">📷</span>
                                    <span className="text-sm font-medium">Toca para agregar foto</span>
                                </div>
                            )}
                        </label>
                        {preview && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFile(null);
                                    setPreview(null);
                                }}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-600 ml-1">Descripción (Opcional)</label>
                    <textarea
                        placeholder="Condiciones, detalles, etc..."
                        className="w-full bg-gray-50 p-4 rounded-2xl border-transparent focus:bg-white focus:border-purple-200 focus:ring-2 focus:ring-purple-100 outline-none transition-all h-24 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 active:scale-95 transition-all text-lg mt-8"
                >
                    {loading ? "Creando..." : "Crear Cupón ✨"}
                </button>
            </form>
        </div>
    );
}
