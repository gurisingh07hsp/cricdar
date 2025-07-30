"use client";

// Import useRouter from next/navigation
import { useRouter, useSearchParams } from 'next/navigation';

const FilterButton = ({ status, children }: { status: string; children: React.ReactNode }) => {
    // We still use useSearchParams to determine the active state
    const searchParams = useSearchParams();
    const router = useRouter(); // Get the router instance

    const currentStatus = searchParams.get('status')?.toLowerCase() || 'all';
    const isActive = currentStatus === status.toLowerCase();

    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer";
    const activeClasses = "bg-app-primary text-app-text-on-primary shadow-md";
    const inactiveClasses = "bg-app-card-bg hover:bg-app-surface";

    const handleFilterClick = () => {
        const href = status.toLowerCase() === 'all' ? '/matches' : `/matches?status=${status.toLowerCase()}`;
        // Use router.push() to navigate. This will correctly trigger a re-render
        // on the server component with the new search params.
        router.push(href);
    };

    return (
        // Change from a Link to a button with an onClick handler
        <button onClick={handleFilterClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};

export default function MatchFilterControls() {
    const filters = ['All', 'Live', 'Upcoming', 'Finished'];
    return (
        <div className="flex flex-wrap items-center gap-3 p-2 bg-app-surface rounded-full">
            {filters.map(filter => (
                <FilterButton key={filter} status={filter}>{filter}</FilterButton>
            ))}
        </div>
    );
}