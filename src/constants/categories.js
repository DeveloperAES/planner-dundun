export const CATEGORIES = [
    {
        id: 'date',
        name: 'Citas',
        icon: '💑',
        bgClass: 'bg-pink-100',
        textClass: 'text-pink-600',
        borderClass: 'border-pink-200',
        iconBg: 'bg-pink-50'
    },
    {
        id: 'travel',
        name: 'Viajes',
        icon: '✈️',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-600',
        borderClass: 'border-blue-200',
        iconBg: 'bg-blue-50'
    },
    {
        id: 'celebration',
        name: 'Celebraciones',
        icon: '🎉',
        bgClass: 'bg-purple-100',
        textClass: 'text-purple-600',
        borderClass: 'border-purple-200',
        iconBg: 'bg-purple-50'
    },
    {
        id: 'home',
        name: 'En Casa',
        icon: '🏠',
        bgClass: 'bg-green-100',
        textClass: 'text-green-600',
        borderClass: 'border-green-200',
        iconBg: 'bg-green-50'
    },
    {
        id: 'shopping',
        name: 'Compras',
        icon: '🛍️',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-600',
        borderClass: 'border-orange-200',
        iconBg: 'bg-orange-50'
    },
    {
        id: 'activities',
        name: 'Actividades',
        icon: '⚽',
        bgClass: 'bg-red-100',
        textClass: 'text-red-600',
        borderClass: 'border-red-200',
        iconBg: 'bg-red-50'
    },
    {
        id: 'dining',
        name: 'Restaurantes',
        icon: '🍽️',
        bgClass: 'bg-yellow-100',
        textClass: 'text-yellow-600',
        borderClass: 'border-yellow-200',
        iconBg: 'bg-yellow-50'
    },
    {
        id: 'gifts',
        name: 'Regalos',
        icon: '🎁',
        bgClass: 'bg-teal-100',
        textClass: 'text-teal-600',
        borderClass: 'border-teal-200',
        iconBg: 'bg-teal-50'
    },
];

export const getCategoryById = (id) => {
    return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[0];
};

export const DEFAULT_CATEGORY = CATEGORIES[0];
