import { useState } from "react";

export default function Login({ onLogin, loading }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">
                Planner Pareja 💕
            </h2>

            <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded hover:opacity-90"
            >
                {loading ? "Entrando..." : "Login"}
            </button>
        </form>
    );
}
