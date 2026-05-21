'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { RiBroadcastLine, RiRefreshLine } from 'react-icons/ri';
import MatchPreviewCard from './MatchPreviewCard';
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
        live.length > 0 ? live.slice(0, 6) : all.filter((m) => m.status === 'Finished').slice(0, 6);
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
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <RiBroadcastLine
            className={`w-6 h-6 text-red-500 ${liveCount > 0 ? 'animate-pulse' : ''}`}
          />
          <h2 className="text-xl font-bold text-app-text-base">Live Scores</h2>
          {liveCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-600 text-white animate-pulse">
              {liveCount} LIVE
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-app-text-muted">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1 text-sm text-app-primary disabled:opacity-50"
          >
            <RiRefreshLine className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/matches?status=live" className="text-sm text-app-primary hover:underline">
            View all →
          </Link>
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <MatchPreviewCard key={match.id} {...match} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-app-border bg-app-card-bg p-8 text-center">
          <p className="text-app-text-muted">No matches to display.</p>
        </div>
      )}
    </section>
  );
}
