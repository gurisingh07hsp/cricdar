import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLeagueBySlug } from '@/lib/leagues';
import { getLeaguePageData } from '@/lib/cricketdata-api';
import { mapSeriesPointsToTable } from '@/lib/league-mappers';
import LeagueHeader from './_components/LeagueHeader';
import LeagueDetailTabs from './_components/LeagueDetailTabs';
import { RiErrorWarningLine } from 'react-icons/ri';

export const dynamic = 'force-dynamic';

export default async function LeagueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const league = getLeagueBySlug(slug);

  if (!league) {
    notFound();
  }

  const data = await getLeaguePageData(league);
  const pointsTable = mapSeriesPointsToTable(data.points);
  const teamCount = data.info?.squads ?? data.squads.length ?? pointsTable.length;
  const matchCount = data.info?.matches ?? data.matchList.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <LeagueHeader league={league} seriesInfo={data.info ?? undefined} />

      {!data.seriesId ? (
        <div className="bg-app-surface rounded-lg border border-app-border p-8 text-center">
          <RiErrorWarningLine className="w-12 h-12 mx-auto text-app-secondary opacity-70" />
          <h2 className="text-xl font-bold mt-4 text-app-text">Season data unavailable</h2>
          <p className="text-app-text-muted mt-2 max-w-md mx-auto">
            {league.name} is not in the current live feed. Check back when the season is active, or
            browse other leagues below.
          </p>
          <Link
            href="/leagues"
            className="inline-block mt-6 text-app-secondary hover:text-app-secondary-hover font-medium"
          >
            &larr; All leagues
          </Link>
        </div>
      ) : (
        <LeagueDetailTabs
          pointsTable={pointsTable}
          matchList={data.matchList}
          squads={data.squads}
          matchCount={matchCount}
          teamCount={teamCount}
        />
      )}

      <div className="mt-12 text-center">
        <Link
          href="/leagues"
          className="text-app-secondary hover:text-app-secondary-hover font-medium"
        >
          &larr; Back to all leagues
        </Link>
      </div>
    </div>
  );
}
