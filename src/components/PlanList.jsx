import PlanItem from "./PlanItem";

export default function PlanList({ plans }) {
    if (!plans.length) {
        return <p className="text-center text-gray-500">No hay planes aún</p>;
    }

    return (
        <div className="grid gap-4">
            {plans.map(plan => (
                <PlanItem key={plan.id} plan={plan} />
            ))}
        </div>
    );
}
