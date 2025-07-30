import { getSeriesList } from '@/lib/cricketdata-api';
import SeriesFilterControls from './_components/SeriesFilterControls';
import SeriesPreviewCard from '@/components/common/SeriesPreviewCard';
import { mapApiSeriesToSeriesPreview } from '@/lib/data-mappers';
import { RiErrorWarningLine } from 'react-icons/ri';

// Force the page to be dynamic to ensure it re-renders with new search params
export const dynamic = 'force-dynamic';

export default async function SeriesListPage({ searchParams }: { searchParams?: { status?: string } }) {
    const params = await searchParams;
    const currentStatus = params?.status?.toLowerCase() || 'all';

    const apiSeries = await getSeriesList();

    if (!apiSeries) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <RiErrorWarningLine className="w-16 h-16 mx-auto text-app-primary opacity-50" />
                <h2 className="mt-4 text-2xl font-bold">Failed to Load Series</h2>
                <p className="text-app-text-muted mt-2">Could not fetch data from the API. Please check your API key and network connection.</p>
            </div>
        );
    }

    // First, map all series data to get a calculated status for each.
    const allMappedSeries = apiSeries.map(mapApiSeriesToSeriesPreview);

    // Now, filter the series based on the calculated status.
    const filteredSeries = allMappedSeries.filter(series => {
        if (currentStatus === 'all') return true;
        // Handle the case where the filter value is 'completed' but the status is 'Finished'
        if (currentStatus === 'completed') {
            return series.status.toLowerCase() === 'finished';
        }
        return series.status.toLowerCase() === currentStatus;
    });

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <header className="text-center mb-8 md:mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-app-primary">Browse Series</h1>
                <p className="text-lg text-app-text-muted mt-2">Explore international and domestic cricket series and tournaments.</p>
            </header>
            <div className="mb-8 flex justify-center">
                <SeriesFilterControls />
            </div>

            {filteredSeries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Render the pre-filtered list */}
                    {filteredSeries.map(series => (
                        <SeriesPreviewCard key={series.id} {...series} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-app-text-muted">No series found for the "{currentStatus}" filter.</p>
                </div>
            )}
        </div>
    );
}