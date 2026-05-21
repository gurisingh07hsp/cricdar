'use client';

import { useCallback, useEffect, useState } from 'react';
import { CommentaryItem, ScorecardEntry } from '@/types/cricket';
import FullScorecardDisplay from './FullScorecardDisplay';
import CommentaryDisplay from './CommentaryDisplay';
import { RiRefreshLine } from 'react-icons/ri';

type Tab = 'scorecard' | 'commentary';

export default function MatchDetailTabs({
  matchId,
  initialScorecard,
  initialCommentary,
  isLive,
}: {
  matchId: string;
  initialScorecard: ScorecardEntry[];
  initialCommentary: CommentaryItem[];
  isLive: boolean;
}) {
  const [tab, setTab] = useState<Tab>('scorecard');
  const [scorecard, setScorecard] = useState(initialScorecard);
  const [commentary, setCommentary] = useState(initialCommentary);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/cricket/matches/${matchId}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.scorecard) setScorecard(data.scorecard);
      if (data.commentary) setCommentary(data.commentary);
    } finally {
      setRefreshing(false);
    }
  }, [matchId]);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(refresh, 20000);
    return () => clearInterval(interval);
  }, [isLive, refresh]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex rounded-lg border border-app-border overflow-hidden">
          {(['scorecard', 'commentary'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? 'bg-app-primary text-white'
                  : 'bg-app-surface text-app-text-muted hover:text-app-text-base'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="flex items-center gap-1 text-sm text-app-primary disabled:opacity-50"
        >
          <RiRefreshLine className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {tab === 'scorecard' ? (
        <FullScorecardDisplay scorecard={scorecard} />
      ) : (
        <CommentaryDisplay commentary={commentary} />
      )}
    </div>
  );
}
