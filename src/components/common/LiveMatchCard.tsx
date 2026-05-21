import Link from 'next/link';
import { MatchPreviewProps } from '@/types/cricket';
import { RiBroadcastLine } from 'react-icons/ri';

function TeamRow({
  name,
  shortName,
  logoUrl,
  score,
  overs,
  isLive,
}: {
  name: string;
  shortName: string;
  logoUrl?: string;
  score?: string;
  overs?: string;
  isLive?: boolean;
}) {
  const hasScore = score && score !== 'Yet to bat' && score !== '—';

  return (
    <div
      className={`flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg ${
        isLive ? 'bg-red-500/5 border border-red-500/20' : ''
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-full bg-white border border-app-border shrink-0 overflow-hidden shadow-sm">
          {logoUrl ? (
            <img src={logoUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-app-text-muted">
              {shortName.slice(0, 3)}
            </div>
          )}
        </div>
        <span className="font-semibold text-sm text-app-text-base truncate">{name}</span>
      </div>
      <div className="text-right shrink-0 min-w-[4.5rem]">
        {hasScore ? (
          <>
            <p className="text-lg font-bold tabular-nums text-app-text-base leading-none">
              {score}
            </p>
            {overs && (
              <p className="text-[11px] text-app-text-muted tabular-nums mt-0.5">({overs} ov)</p>
            )}
          </>
        ) : score === 'Yet to bat' ? (
          <p className="text-xs text-app-text-muted font-medium">Yet to bat</p>
        ) : score === '—' ? (
          <p className="text-lg font-bold text-app-text-muted">—</p>
        ) : (
          <p className="text-xs text-app-text-muted">—</p>
        )}
      </div>
    </div>
  );
}

export default function LiveMatchCard({
  id,
  team1,
  team2,
  status,
  result,
  seriesName,
  matchType,
}: MatchPreviewProps) {
  const isLive = status === 'Live';
  const t1Batting = !!team1.score && team1.score !== 'Yet to bat';
  const t2Batting = !!team2.score && team2.score !== 'Yet to bat';

  return (
    <Link
      href={`/matches/${id}`}
      className="group block min-w-[300px] sm:min-w-[340px] flex-1 max-w-md bg-white rounded-xl border border-app-border shadow-sm hover:shadow-md hover:border-app-primary/30 transition-all overflow-hidden"
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-3 py-2 ${
          isLive ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-app-surface'
        }`}
      >
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
          )}
          <span
            className={`text-xs font-bold uppercase tracking-wide ${
              isLive ? 'text-white' : 'text-app-text-muted'
            }`}
          >
            {isLive ? 'Live' : status}
          </span>
          {matchType && (
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                isLive ? 'bg-white/20 text-white' : 'bg-app-border text-app-text-muted'
              }`}
            >
              {matchType.toUpperCase()}
            </span>
          )}
        </div>
        {isLive && <RiBroadcastLine className="w-4 h-4 text-white" />}
      </div>

      {/* Teams */}
      <div className="p-3 space-y-1">
        <TeamRow {...team1} isLive={isLive && (t1Batting || !t2Batting)} />
        <div className="flex items-center gap-2 px-3">
          <div className="flex-1 h-px bg-app-border" />
          <span className="text-[10px] font-bold text-app-text-muted">VS</span>
          <div className="flex-1 h-px bg-app-border" />
        </div>
        <TeamRow {...team2} isLive={isLive && t2Batting} />
      </div>

      {/* Footer */}
      <div className="px-3 py-2.5 bg-app-card-bg/80 border-t border-app-border">
        <p className="text-[11px] text-app-text-muted truncate font-medium" title={seriesName}>
          {seriesName}
        </p>
        <p
          className={`text-xs mt-0.5 truncate ${
            isLive ? 'text-red-600 font-semibold' : 'text-app-text-muted'
          }`}
        >
          {result}
        </p>
      </div>
    </Link>
  );
}
