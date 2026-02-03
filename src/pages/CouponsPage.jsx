import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCouponsByCouple } from "../services/couponService";
import CouponCard from "../components/CouponCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CouponsPage() {
    const { user } = useAuth();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        loadCoupons();
    }, [user]);

    const loadCoupons = async () => {
        setLoading(true);
        try {
            const data = await getCouponsByCouple(user.coupleId);
            setCoupons(data);
        } catch (error) {
            console.error("Error loading coupons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRedeemSuccess = (couponId) => {
        // Update local state to decrement count
        setCoupons(prev => prev.map(c => {
            if (c.id === couponId) {
                return { ...c, redeemedCount: (c.redeemedCount || 0) + 1 };
            }
            return c;
        }));
    };

    return (
        <div className="p-6 pb-24 min-h-screen bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Cuponera 🎟️</h1>
                    <p className="text-sm text-gray-500">¡Canjea tus premios!</p>
                </div>
                <Link to="/coupons/add" className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200 active:scale-90 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <LoadingSpinner />
                </div>
            ) : coupons.length > 0 ? (
                <div className="grid gap-4">
                    {coupons.map(coupon => (
                        <CouponCard
                            key={coupon.id}
                            coupon={coupon}
                            onRedeem={handleRedeemSuccess}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="text-5xl mb-4 grayscale opacity-50">🎟️</div>
                    <h3 className="font-bold text-gray-800 mb-2">Sin cupones aún</h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-[200px] mx-auto">
                        Crea vales divertidos para tu pareja. ¡Empieza ahora!
                    </p>
                    <Link
                        to="/coupons/add"
                        className="text-purple-600 font-bold bg-purple-50 px-6 py-3 rounded-xl hover:bg-purple-100 transition-colors inline-block"
                    >
                        Crear Primer Cupón
                    </Link>
                </div>
            )}
        </div>
    );
}
