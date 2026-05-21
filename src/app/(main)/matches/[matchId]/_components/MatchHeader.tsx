import { ApiMatch, ScorecardEntry } from '@/types/cricket';
import { CricScoreMatch } from '@/lib/cricscore-mappers';
import {
  buildTeamDisplays,
  getLiveSummary,
} from '@/lib/match-display';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';

const MatchHeader = ({
  match,
  scorecard = [],
  cricScore,
}: {
  match: ApiMatch;
  scorecard?: ScorecardEntry[];
  cricScore?: CricScoreMatch | null;
}) => {
  const teams = buildTeamDisplays(match, scorecard, cricScore);
  const live = getLiveSummary(match, scorecard, teams);
  const isLive = match.matchStarted && !match.matchEnded;

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (isLive || s.includes('live')) return 'bg-red-600 text-white';
    if (s.includes('won') || s.includes('drawn') || s.includes('result')) {
      return 'bg-green-600 text-white';
    }
    return 'bg-blue-600 text-white';
  };

  const formatBigScore = (t: (typeof teams)[0]) => {
    if (t.runs === undefined || t.wickets === undefined) return null;
    const ov = t.overs !== undefined ? ` (${t.overs})` : '';
    return `${t.shortName} ${t.runs} - ${t.wickets}${ov}`;
  };

  const battingTeam = teams.find((t) => t.isBatting) ?? teams.find((t) => t.runs !== undefined);

  return (
    <div className="bg-app-surface rounded-xl shadow-lg border border-app-border overflow-hidden">
      {/* Title row */}
      <div className="px-4 md:px-6 py-4 border-b border-app-border">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-base md:text-xl font-bold text-app-text-base leading-snug">
              {match.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-app-text-muted">
              {match.venue && (
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-3 h-3 shrink-0" />
                  {match.venue}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaRegCalendarAlt className="w-3 h-3 shrink-0" />
                {new Date(match.dateTimeGMT || match.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(match.status)} ${isLive ? 'animate-pulse' : ''}`}
          >
            {isLive && <RiLiveLine className="w-3.5 h-3.5" />}
            <span>{match.status}</span>
          </div>
        </div>
      </div>

      {/* Teams + live panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Left: team scores */}
        <div className="lg:col-span-3 p-4 md:p-6 space-y-3 border-b lg:border-b-0 lg:border-r border-app-border">
          {teams.map((team, idx) => (
            <div
              key={team.name}
              className={`flex items-center justify-between gap-4 rounded-lg border p-4 transition-colors ${
                team.isBatting
                  ? 'border-app-primary/40 bg-app-primary/5'
                  : 'border-app-border bg-app-card-bg'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={team.logo || '/default-logo.png'}
                  alt={team.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-app-text-base truncate">{team.name}</h3>
                  <p className="text-xs text-app-text-muted">
                    {team.isBatting ? 'Batting' : idx === 0 ? 'Team 1' : 'Team 2'}
                    {team.isBatting && isLive && (
                      <span className="ml-2 text-red-500 font-semibold">• LIVE</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                {team.scoreLabel !== 'Yet to bat' ? (
                  <>
                    <p className="text-2xl md:text-3xl font-bold text-app-text-base tabular-nums">
                      {team.runs !== undefined && team.wickets !== undefined
                        ? `${team.runs}/${team.wickets}`
                        : team.scoreLabel.split(' ')[0]}
                    </p>
                    {team.overs !== undefined && team.overs !== '' && (
                      <p className="text-sm text-app-text-muted tabular-nums">
                        ({team.overs} ov)
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm font-medium text-app-text-muted">Yet to bat</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right: live score summary (reference-style) */}
        <div className="lg:col-span-2 p-4 md:p-6 bg-app-card-bg/80">
          {battingTeam && battingTeam.runs !== undefined ? (
            <div className="space-y-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-app-text-base tabular-nums tracking-tight">
                  {formatBigScore(battingTeam)}
                </p>
                {live.crr && (
                  <p className="text-sm text-app-text-muted mt-1">
                    CRR: <span className="font-semibold text-app-text-base">{live.crr}</span>
                  </p>
                )}
              </div>

              <p className="text-sm font-medium text-red-600">{match.status}</p>

              {live.batters.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-app-text-muted uppercase mb-2">
                    Batter
                  </p>
                  <div className="rounded-lg border border-app-border overflow-hidden text-sm">
                    <div className="grid grid-cols-[1fr_repeat(5,2.5rem)] gap-0 bg-app-surface/80 text-xs text-app-text-muted px-2 py-1.5">
                      <span>Name</span>
                      <span className="text-right">R</span>
                      <span className="text-right">B</span>
                      <span className="text-right">4s</span>
                      <span className="text-right">6s</span>
                      <span className="text-right">SR</span>
                    </div>
                    {live.batters.map((b, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_repeat(5,2.5rem)] gap-0 px-2 py-2 border-t border-app-border"
                      >
                        <span className="text-app-primary font-medium truncate pr-1">
                          {b.batsman} *
                        </span>
                        <span className="text-right tabular-nums">{b.runs}</span>
                        <span className="text-right tabular-nums">{b.balls}</span>
                        <span className="text-right tabular-nums">{b.fours}</span>
                        <span className="text-right tabular-nums">{b.sixes}</span>
                        <span className="text-right tabular-nums">{b.sr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {live.bowlers.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-app-text-muted uppercase mb-2">
                    Bowler
                  </p>
                  <div className="rounded-lg border border-app-border overflow-hidden text-sm">
                    <div className="grid grid-cols-[1fr_repeat(5,2.5rem)] gap-0 bg-app-surface/80 text-xs text-app-text-muted px-2 py-1.5">
                      <span>Name</span>
                      <span className="text-right">O</span>
                      <span className="text-right">M</span>
                      <span className="text-right">R</span>
                      <span className="text-right">W</span>
                      <span className="text-right">Econ</span>
                    </div>
                    {live.bowlers.map((b, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_repeat(5,2.5rem)] gap-0 px-2 py-2 border-t border-app-border"
                      >
                        <span className="text-app-primary font-medium truncate pr-1">
                          {b.bowler} *
                        </span>
                        <span className="text-right tabular-nums">{b.overs}</span>
                        <span className="text-right tabular-nums">{b.maidens}</span>
                        <span className="text-right tabular-nums">{b.runs}</span>
                        <span className="text-right tabular-nums">{b.wickets}</span>
                        <span className="text-right tabular-nums">{b.economy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center text-center py-8">
              <p className="text-app-text-muted text-sm">
                {match.matchStarted
                  ? 'Score updates will appear here shortly.'
                  : 'Match has not started yet.'}
              </p>
              <p className="text-xs text-red-600 mt-2 font-medium">{match.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
