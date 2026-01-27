export default function PlanItem({ plan }) {
    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-lg">{plan.title}</h3>
            <p className="text-sm text-gray-600">{plan.description}</p>
            <p className="text-xs mt-1 text-gray-400">{plan.date}</p>
        </div>
    );
}
