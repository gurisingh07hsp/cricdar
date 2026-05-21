import { PointsTableEntry } from '@/types/cricket';
import { RiMedalLine, RiTrophyLine, RiTeamLine } from 'react-icons/ri';

export default function LeagueStatsSummary({
  points,
  matchCount,
  teamCount,
}: {
  points: PointsTableEntry[];
  matchCount: number;
  teamCount: number;
}) {
  const leader = points[0];
  const mostWins = [...points].sort((a, b) => b.won - a.won)[0];

  const cards = [
    {
      label: 'Teams',
      value: String(teamCount || points.length),
      icon: RiTeamLine,
    },
    {
      label: 'Matches in season',
      value: String(matchCount),
      icon: RiTrophyLine,
    },
    ...(leader
      ? [
          {
            label: 'Table leader',
            value: `${leader.teamShortName} (${leader.points} pts)`,
            icon: RiMedalLine,
          },
        ]
      : []),
    ...(mostWins
      ? [
          {
            label: 'Most wins',
            value: `${mostWins.teamShortName} (${mostWins.won})`,
            icon: RiTrophyLine,
          },
        ]
      : []),
  ];

  if (!points.length && !matchCount) {
    return (
      <p className="text-app-text-muted text-center py-6">
        Season statistics will appear once standings and matches are available from the API.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-app-surface rounded-lg border border-app-border p-4 shadow-md"
        >
          <card.icon className="w-6 h-6 text-app-secondary mb-2" />
          <p className="text-xs uppercase tracking-wide text-app-text-muted">{card.label}</p>
          <p className="text-lg font-bold text-app-text mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
