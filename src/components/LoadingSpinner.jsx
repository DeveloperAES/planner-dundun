export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-full min-h-[200px] w-full">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
    );
}
