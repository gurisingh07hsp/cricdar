import { getAllLeagues } from '@/lib/leagues';
import LeaguePreviewCard from '@/components/common/LeaguePreviewCard';

export const dynamic = 'force-dynamic';

export default function LeaguesListPage() {
  const leagues = getAllLeagues();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-app-primary">Cricket Leagues</h1>
        <p className="text-lg text-app-text-muted mt-2 max-w-2xl mx-auto">
          Points tables, fixtures, squads, and standings for the world&apos;s top T20 franchise
          competitions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {leagues.map((league) => (
          <LeaguePreviewCard key={league.slug} league={league} />
        ))}
      </div>
    </div>
  );
}
