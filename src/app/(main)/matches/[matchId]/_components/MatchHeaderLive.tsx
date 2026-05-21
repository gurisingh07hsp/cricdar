'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiMatch, ScorecardEntry } from '@/types/cricket';
import { CricScoreMatch } from '@/lib/cricscore-mappers';
import MatchHeader from './MatchHeader';

export default function MatchHeaderLive({
  match: initialMatch,
  scorecard: initialScorecard,
  cricScore: initialCricScore,
  matchId,
  isLive,
}: {
  match: ApiMatch;
  scorecard: ScorecardEntry[];
  cricScore?: CricScoreMatch | null;
  matchId: string;
  isLive: boolean;
}) {
  const [match, setMatch] = useState(initialMatch);
  const [scorecard, setScorecard] = useState(initialScorecard);
  const [cricScore, setCricScore] = useState(initialCricScore);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/cricket/matches/${matchId}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.match) setMatch(data.match);
      if (data.scorecard) setScorecard(data.scorecard);
      if (data.cricScoreSnap !== undefined) setCricScore(data.cricScoreSnap);
    } catch {
      // keep last data
    }
  }, [matchId]);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [isLive, refresh]);

  return (
    <MatchHeader match={match} scorecard={scorecard} cricScore={cricScore} />
  );
}
