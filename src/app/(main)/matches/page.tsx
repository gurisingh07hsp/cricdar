import { getAllMatches } from '@/lib/cricketdata-api';
import MatchFilterControls from './_components/MatchFilterControls';
import MatchPreviewCard from '@/components/common/MatchPreviewCard';
import { RiErrorWarningLine } from 'react-icons/ri';
import { mapApiMatchToMatchPreview } from '@/lib/data-mappers';

// FIX: Add this line to force the page to be dynamic and not cached.
export const dynamic = 'force-dynamic';

export default async function MatchesPage({ searchParams }: { searchParams?: { status?: string } }) {
  const params = await searchParams;
  const currentStatus = params?.status?.toLowerCase() || 'all';
  const apiMatches = await getAllMatches();

  if (!apiMatches) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <RiErrorWarningLine className="w-16 h-16 mx-auto text-app-primary opacity-50" />
        <h2 className="mt-4 text-2xl font-bold">Failed to Load Matches</h2>
        <p className="text-app-text-muted mt-2">Could not fetch data from the API. Please check your API key and network connection.</p>
      </div>
    );
  }

  const allMatches = apiMatches.map(mapApiMatchToMatchPreview);

  const filteredMatches = allMatches.filter(match => {
    if (currentStatus === 'all') return true;
    return match.status.toLowerCase() === currentStatus;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-app-primary">Match Centre</h1>
        <p className="text-lg text-app-text-muted mt-2">Browse all live, upcoming, and finished matches.</p>
      </header>
      <div className="mb-8 flex justify-center">
        <MatchFilterControls />
      </div>
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMatches.map(match => (
            <MatchPreviewCard key={match.id} {...match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-app-text-muted">No matches found for the "{currentStatus}" filter.</p>
        </div>
      )}
    </div>
  );
}