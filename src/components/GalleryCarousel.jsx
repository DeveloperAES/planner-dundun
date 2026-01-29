import { useEffect, useState } from "react";

export default function GalleryCarousel({ images, initialIndex = 0, onClose, onDelete }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, onClose]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta foto?")) {
            setIsDeleting(true);
            try {
                await onDelete(images[currentIndex]);

                // If it was the last image, close carousel
                if (images.length === 1) {
                    onClose();
                } else {
                    // Move to previous image or stay at 0
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    }
                }
            } catch (error) {
                console.error("Error deleting image:", error);
                alert("Error al eliminar la imagen");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (!images || images.length === 0) {
        onClose();
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-full transition-colors disabled:opacity-50"
                    title="Eliminar foto"
                >
                    {isDeleting ? (
                        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={onClose}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    title="Cerrar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" x2="6" y1="6" y2="18" />
                        <line x1="6" x2="18" y1="6" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Main Image */}
            <div
                className="relative max-w-7xl max-h-screen px-20 w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Navigation Arrows */}
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                )}

                {currentIndex < images.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-4 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Bottom Counter */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>
        </div>
    );
}
