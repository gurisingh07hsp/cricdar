'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { RiBroadcastLine, RiRefreshLine } from 'react-icons/ri';
import LiveMatchCard from './LiveMatchCard';
import type { MatchPreviewProps } from '@/types/cricket';

export default function LiveScoresSection({
  initialMatches,
}: {
  initialMatches: MatchPreviewProps[];
}) {
  const [matches, setMatches] = useState(initialMatches);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/cricket/matches?type=all', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      const all: MatchPreviewProps[] = data.matches ?? [];
      const live = all.filter((m) => m.status === 'Live');
      const display =
        live.length > 0
          ? live.slice(0, 8)
          : all.filter((m) => m.status === 'Finished').slice(0, 6);
      setMatches(display);
      setLastUpdated(new Date(data.updatedAt ?? Date.now()));
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const liveCount = matches.filter((m) => m.status === 'Live').length;

  return (
    <section className="rounded-xl border border-app-border bg-gradient-to-br from-app-surface to-app-card-bg/50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-app-border bg-app-surface/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-600/10">
            <RiBroadcastLine
              className={`w-5 h-5 text-red-600 ${liveCount > 0 ? 'animate-pulse' : ''}`}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-app-text-base leading-tight">Live Scores</h2>
            <p className="text-xs text-app-text-muted">Real-time cricket updates</p>
          </div>
          {liveCount > 0 && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-600 text-white animate-pulse shadow-sm">
              {liveCount} LIVE
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {lastUpdated && (
            <span className="text-xs text-app-text-muted hidden sm:inline">
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1 text-app-primary hover:text-app-primary-hover disabled:opacity-50 font-medium"
          >
            <RiRefreshLine className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/matches?status=live"
            className="font-medium text-app-primary hover:underline"
          >
            All matches →
          </Link>
        </div>
      </div>

      {/* Horizontal scroll board */}
      {matches.length > 0 ? (
        <div className="p-4">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-app-border scrollbar-track-transparent">
            {matches.map((match) => (
              <div key={match.id} className="snap-start shrink-0">
                <LiveMatchCard {...match} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-10 text-center">
          <RiBroadcastLine className="w-10 h-10 mx-auto text-app-text-muted/50 mb-3" />
          <p className="text-app-text-base font-medium">No live matches right now</p>
          <p className="text-sm text-app-text-muted mt-1">
            Check back soon — scores refresh every 30 seconds.
          </p>
          <Link
            href="/matches"
            className="inline-block mt-4 text-sm font-medium text-app-primary hover:underline"
          >
            Browse all matches
          </Link>
        </div>
      )}
    </section>
  );
}
