import { useAuth } from "../hooks/useAuth";
import { uploadFile } from "../services/storageService";
import { updateUserAvatar } from "../services/authService";
import { useState } from "react";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [uploading, setUploading] = useState(false);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Upload to ImgBB
            const { url } = await uploadFile({ file });

            // 2. Update Firestore
            await updateUserAvatar(user.uid, url);

            // 3. User feedback (reload to see change for now as AuthContext might not catch it instantly depending on implementation)
            alert("Foto de perfil actualizada ✨");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la foto");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="relative">
                    <label
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 overflow-hidden border-4 border-white shadow-lg cursor-pointer hover:opacity-80 transition-opacity ${uploading ? 'opacity-50' : ''}`}
                    >
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-purple-100 flex items-center justify-center">👤</div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            disabled={uploading}
                            className="hidden"
                        />
                    </label>
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="absolute bottom-4 right-0 bg-white p-1.5 rounded-full shadow-md text-xs border border-gray-100 pointer-events-none">
                        ✏️
                    </div>
                </div>

                <h2 className="text-xl font-bold">{user?.email}</h2>
                <p className="text-gray-500 text-sm mb-6">Miembro desde hace poco</p>

                <button
                    onClick={logout}
                    className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-medium"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
