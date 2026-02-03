import { useState } from "react";
import { redeemCoupon } from "../services/couponService";

export default function CouponCard({ coupon, onRedeem }) {
    const [loading, setLoading] = useState(false);
    const remaining = coupon.quantity - coupon.redeemedCount;
    const isExhausted = remaining <= 0;

    const handleRedeem = async () => {
        if (isExhausted || loading) return;

        const confirm = window.confirm(`¿Seguro que quieres canjear "${coupon.title}"? Te queda(n) ${remaining} uso(s).`);
        if (!confirm) return;

        setLoading(true);
        try {
            await redeemCoupon(coupon.id);
            if (onRedeem) onRedeem(coupon.id);

            // Open WhatsApp
            const text = `¡Hola amor! 😍 Acabo de canjear mi cupón: *${coupon.title}* 🎟️. ¡Avísame cuándo lo hacemos valer!`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');

        } catch (error) {
            console.error("Error redeeming coupon:", error);
            alert("Error al canjear el cupón");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${isExhausted ? 'border-gray-200 opacity-70 grayscale' : 'border-purple-200'}`}>

            {/* Background Image / Header */}
            {coupon.image && (
                <div className="h-32 w-full relative">
                    <img src={coupon.image} alt={coupon.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {/* Badge on Image */}
                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${isExhausted ? 'bg-gray-100 text-gray-500' : 'bg-white text-purple-600'}`}>
                        {isExhausted ? 'Agotado' : `${remaining} restantes`}
                    </div>
                </div>
            )}

            <div className={`p-4 ${coupon.image ? 'pt-2' : ''}`}>
                {/* Ticket Cutout Effect (only if no image or adjusted) */}
                {!coupon.image && (
                    <>
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border-r-2 border-purple-200"></div>
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border-l-2 border-purple-200"></div>
                    </>
                )}

                <div className="flex justify-between items-start mb-2">
                    <div>
                        {!coupon.image && <span className="text-2xl block mb-1">{coupon.icon || '🎟️'}</span>}
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{coupon.title}</h3>
                    </div>
                    {!coupon.image && (
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${isExhausted ? 'bg-gray-100 text-gray-500' : 'bg-purple-100 text-purple-600'}`}>
                            {isExhausted ? 'Agotado' : `${remaining} restantes`}
                        </div>
                    )}
                </div>

                {coupon.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{coupon.description}</p>
                )}

                <button
                    onClick={handleRedeem}
                    disabled={isExhausted || loading}
                    className={`w-full py-2 rounded-xl font-bold text-sm transition-all ${isExhausted
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-95'
                        }`}
                >
                    {loading ? 'Canjeando...' : isExhausted ? 'Ya usado' : 'Canjear Cupón'}
                </button>
            </div>
        </div>
    );
}
