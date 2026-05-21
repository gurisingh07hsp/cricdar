'use client';

import { useState } from 'react';
import { ApiMatch, PointsTableEntry } from '@/types/cricket';
import { SeriesSquadTeam } from '@/lib/league-mappers';
import PointsTableDisplay from '@/app/(main)/series/[seriesId]/_components/PointsTableDisplay';
import MatchPreviewCard from '@/components/common/MatchPreviewCard';
import { mapApiMatchToMatchPreview } from '@/lib/data-mappers';
import LeagueSquadsDisplay from './LeagueSquadsDisplay';
import LeagueStatsSummary from './LeagueStatsSummary';
import { RiFileList3Line, RiMedalLine, RiTeamLine, RiBarChart2Line } from 'react-icons/ri';

type Tab = 'overview' | 'points' | 'matches' | 'squads';

const TABS: { id: Tab; label: string; icon: typeof RiMedalLine }[] = [
  { id: 'overview', label: 'Overview', icon: RiBarChart2Line },
  { id: 'points', label: 'Points Table', icon: RiMedalLine },
  { id: 'matches', label: 'Matches', icon: RiFileList3Line },
  { id: 'squads', label: 'Squads', icon: RiTeamLine },
];

export default function LeagueDetailTabs({
  pointsTable,
  matchList,
  squads,
  matchCount,
  teamCount,
}: {
  pointsTable: PointsTableEntry[];
  matchList: ApiMatch[];
  squads: SeriesSquadTeam[];
  matchCount: number;
  teamCount: number;
}) {
  const [tab, setTab] = useState<Tab>('overview');

  const liveMatches = matchList.filter((m) => m.matchStarted && !m.matchEnded);
  const upcomingMatches = matchList.filter((m) => !m.matchStarted);
  const finishedMatches = matchList.filter((m) => m.matchEnded);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-app-border pb-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === id
                ? 'bg-app-primary text-white'
                : 'bg-app-surface text-app-text-muted hover:text-app-text border border-app-border'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <section>
          <h2 className="text-2xl font-bold text-app-text-base mb-4">Season at a glance</h2>
          <LeagueStatsSummary
            points={pointsTable}
            matchCount={matchCount}
            teamCount={teamCount}
          />
          {pointsTable.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-app-text mb-3">Top of the table</h3>
              <PointsTableDisplay points={pointsTable.slice(0, 5)} />
            </div>
          )}
        </section>
      )}

      {tab === 'points' && <PointsTableDisplay points={pointsTable} />}

      {tab === 'matches' && (
        <section className="space-y-10">
          {liveMatches.length > 0 && (
            <MatchSection title="Live" matches={liveMatches} />
          )}
          {upcomingMatches.length > 0 && (
            <MatchSection title="Upcoming" matches={upcomingMatches} />
          )}
          {finishedMatches.length > 0 && (
            <MatchSection title="Results" matches={finishedMatches} />
          )}
          {!matchList.length && (
            <p className="text-app-text-muted text-center py-8">No matches listed for this season.</p>
          )}
        </section>
      )}

      {tab === 'squads' && <LeagueSquadsDisplay squads={squads} />}
    </div>
  );
}

function MatchSection({ title, matches }: { title: string; matches: ApiMatch[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-app-text-base mb-4 flex items-center">
        <RiFileList3Line className="w-6 h-6 mr-2 text-app-secondary" />
        {title}
        <span className="ml-2 text-sm font-normal text-app-text-muted">({matches.length})</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {matches.map((match) => (
          <MatchPreviewCard key={match.id} {...mapApiMatchToMatchPreview(match)} />
        ))}
      </div>
    </div>
  );
}
