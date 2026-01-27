import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
    const { user, logout } = useAuth(); // Assuming logout is exposed or I need to add it


    console.log(user);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-4xl mb-4">
                    <img src={user?.avatarUrl} alt="Profile avatar User" className="w-full h-full rounded-full object-cover" />
                </div>
                <h2 className="text-xl font-bold">{user?.email}</h2>
                <p className="text-gray-500 text-sm mb-6">Miembro desde hace poco</p>

                <button
                    onClick={() => window.location.reload()} // Temporary logout via reload or just a placeholder
                    className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-medium"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
