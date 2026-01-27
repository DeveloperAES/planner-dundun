import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/planes");
        } catch (error) {
            alert("Error logging in");
        }
    };

    return (
        <div className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-md bg-white p-8 flex flex-col h-screen justify-between relative overflow-hidden">

                {/* Decorative Blobs */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

                <div className="flex-1 flex flex-col justify-center items-center z-10">
                    <div className="mb-10 relative">
                        {/* Placeholder Illustration - Using emojis/divs for now to look "Wow" without assets */}
                        <div className="text-[120px] leading-none animate-bounce-slow">
                            <img src="https://i.ibb.co/zHCz1nj3/1729551244239-6315e2a3-4702-42a2-b2ec-8a579884ee9a-6936906708785-1-removebg-preview.png" alt="" />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/5 blur-xl rounded-full"></div>
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Planner Dun Dun salidas <span className="text-purple-600">💕</span>
                    </h1>
                    <p className="text-gray-500 text-center mb-10 max-w-xs">
                        Organiza tus planes, viaja y construye recuerdos juntos.
                    </p>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                        <div className="group">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="w-full bg-gray-50 text-gray-800 p-4 rounded-2xl border-none focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full bg-gray-50 text-gray-800 p-4 rounded-2xl border-none focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-[#6A5AE0] hover:bg-[#5b4dc7] text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-200 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? "Entrando..." : "Comenzar"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
