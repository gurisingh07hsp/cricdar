"use client";

import { useRouter, useSearchParams } from 'next/navigation';

const FilterButton = ({ status, children, isActive }: { status: string; children: React.ReactNode; isActive: boolean; }) => {
    const router = useRouter();

    const handleFilterClick = () => {
        const href = status.toLowerCase() === 'all' ? '/series' : `/series?status=${status.toLowerCase()}`;
        router.push(href);
    };

    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer";
    const activeClasses = "bg-app-primary text-app-text-on-primary shadow-md";
    const inactiveClasses = "bg-app-card-bg hover:bg-app-surface";

    return (
        <button onClick={handleFilterClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};

export default function SeriesFilterControls() {
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get('status')?.toLowerCase() || 'all';

    // Using 'completed' for the filter value to match your original component
    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Finished', value: 'completed' }
    ];

    return (
        <div className="flex flex-wrap items-center gap-3 p-2 bg-app-surface rounded-full">
            {filters.map(filter => (
                <FilterButton
                    key={filter.value}
                    status={filter.value}
                    isActive={currentStatus === filter.value}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </div>
    );
}