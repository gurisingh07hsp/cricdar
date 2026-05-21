import {
  ApiMatch,
  BattingScore,
  BowlingScore,
  CommentaryItem,
  MatchPreviewProps,
  Score,
  ScorecardEntry,
  TeamInfo,
} from '@/types/cricket';

export interface CricScoreMatch {
  id: string;
  dateTimeGMT: string;
  matchType: string;
  status: string;
  ms: 'fixture' | 'live' | 'result' | string;
  t1: string;
  t2: string;
  t1s?: string;
  t2s?: string;
  t1img?: string;
  t2img?: string;
  series: string;
}

export function parseTeamLabel(raw: string): { name: string; shortName: string } {
  const match = raw.match(/^(.+?)\s*\[([^\]]+)\]\s*$/);
  if (match) return { name: match[1].trim(), shortName: match[2].trim() };
  return { name: raw.trim(), shortName: '' };
}

export function parseScoreLine(scoreStr?: string): { score: string; overs: string } {
  if (!scoreStr) return { score: '', overs: '' };
  const m = scoreStr.match(/^(\d+\/\d+)\s*\(([^)]+)\)/);
  if (m) return { score: m[1], overs: m[2] };
  return { score: scoreStr, overs: '' };
}

function msToMatchFlags(
  ms: string,
  status: string
): {
  matchStarted: boolean;
  matchEnded: boolean;
  previewStatus: 'Live' | 'Upcoming' | 'Finished';
} {
  const statusLower = status.toLowerCase();

  if (ms === 'result' || statusLower.includes('won') || statusLower.includes('drawn')) {
    return { matchStarted: true, matchEnded: true, previewStatus: 'Finished' };
  }

  if (ms === 'live') {
    const notStarted =
      statusLower.includes('match starts') ||
      (!statusLower.includes('opt to') &&
        !statusLower.includes('innings') &&
        !statusLower.includes('won'));
    if (notStarted && !statusLower.includes('/')) {
      return { matchStarted: false, matchEnded: false, previewStatus: 'Upcoming' };
    }
    return { matchStarted: true, matchEnded: false, previewStatus: 'Live' };
  }

  return { matchStarted: false, matchEnded: false, previewStatus: 'Upcoming' };
}

function scoreLinesToApiScores(
  t1: ReturnType<typeof parseTeamLabel>,
  t2: ReturnType<typeof parseTeamLabel>,
  t1s?: string,
  t2s?: string
): Score[] | undefined {
  const scores: Score[] = [];
  const s1 = parseScoreLine(t1s);
  const s2 = parseScoreLine(t2s);

  if (s1.score) {
    const [r, w] = s1.score.split('/').map(Number);
    scores.push({
      r: r || 0,
      w: w || 0,
      o: parseFloat(s1.overs) || 0,
      inning: t1.name,
    });
  }
  if (s2.score) {
    const [r, w] = s2.score.split('/').map(Number);
    scores.push({
      r: r || 0,
      w: w || 0,
      o: parseFloat(s2.overs) || 0,
      inning: t2.name,
    });
  }
  return scores.length > 0 ? scores : undefined;
}

export function mapCricScoreToApiMatch(item: CricScoreMatch): ApiMatch {
  const t1 = parseTeamLabel(item.t1);
  const t2 = parseTeamLabel(item.t2);
  const flags = msToMatchFlags(item.ms, item.status);
  const date = item.dateTimeGMT?.split('T')[0] ?? '';

  return {
    id: item.id,
    name: item.series,
    matchType: item.matchType || 'cricket',
    status: item.status,
    venue: '',
    date,
    dateTimeGMT: item.dateTimeGMT,
    teams: [t1.name, t2.name],
    teamInfo: [
      { name: t1.name, shortname: t1.shortName, img: item.t1img ?? '' },
      { name: t2.name, shortname: t2.shortName, img: item.t2img ?? '' },
    ],
    score: scoreLinesToApiScores(t1, t2, item.t1s, item.t2s),
    series_id: '',
    fantasyEnabled: false,
    matchStarted: flags.matchStarted,
    matchEnded: flags.matchEnded,
  };
}

function scoreDisplay(
  parsed: { score: string; overs: string },
  flags: ReturnType<typeof msToMatchFlags>,
  showPlaceholder: boolean
): { score: string; overs: string } {
  if (parsed.score) return parsed;
  if (flags.previewStatus === 'Live' && showPlaceholder) {
    return { score: '—', overs: '' };
  }
  if (flags.previewStatus === 'Live') {
    return { score: 'Yet to bat', overs: '' };
  }
  return { score: '', overs: '' };
}

export function mapCricScoreToMatchPreview(item: CricScoreMatch): MatchPreviewProps {
  const api = mapCricScoreToApiMatch(item);
  const t1 = parseTeamLabel(item.t1);
  const t2 = parseTeamLabel(item.t2);
  const s1 = parseScoreLine(item.t1s);
  const s2 = parseScoreLine(item.t2s);
  const flags = msToMatchFlags(item.ms, item.status);
  const t1HasScore = !!s1.score;
  const t2HasScore = !!s2.score;

  const team1: TeamInfo = {
    name: t1.name,
    shortName: t1.shortName,
    logoUrl: item.t1img,
    ...scoreDisplay(s1, flags, t1HasScore || !t2HasScore),
  };
  const team2: TeamInfo = {
    name: t2.name,
    shortName: t2.shortName,
    logoUrl: item.t2img,
    ...scoreDisplay(s2, flags, t2HasScore || !t1HasScore),
  };

  return {
    id: api.id,
    team1,
    team2,
    status: flags.previewStatus,
    venue: api.venue || 'TBA',
    startTime: api.dateTimeGMT,
    result: item.status,
    seriesName: item.series,
    matchType: item.matchType,
  };
}

interface CricApiBattingRow {
  batsman: { name: string };
  'dismissal-text'?: string;
  r: number;
  b: number;
  '4s': number;
  '6s': number;
  sr: number;
}

interface CricApiBowlingRow {
  bowler: { name: string };
  o: number;
  m: number;
  r: number;
  w: number;
  eco: number;
}

interface CricApiScorecardInning {
  inning: string;
  batting: CricApiBattingRow[];
  bowling: CricApiBowlingRow[];
  extras?: Record<string, number>;
  totals?: Record<string, number>;
}

export function mapCricApiScorecardEntries(
  scorecard: CricApiScorecardInning[] | undefined
): ScorecardEntry[] {
  if (!scorecard?.length) return [];

  return scorecard.map((inn) => {
    const batting: BattingScore[] = (inn.batting ?? []).map((b) => ({
      batsman: b.batsman?.name ?? 'Unknown',
      'dismissal-info': b['dismissal-text'] ?? 'batting',
      runs: String(b.r ?? 0),
      balls: String(b.b ?? 0),
      fours: String(b['4s'] ?? 0),
      sixes: String(b['6s'] ?? 0),
      sr: String(b.sr ?? 0),
    }));

    const bowling: BowlingScore[] = (inn.bowling ?? []).map((b) => ({
      bowler: b.bowler?.name ?? 'Unknown',
      overs: String(b.o ?? 0),
      maidens: String(b.m ?? 0),
      runs: String(b.r ?? 0),
      wickets: String(b.w ?? 0),
      economy: String(b.eco ?? 0),
    }));

    const teamName = inn.inning?.replace(/\s+Inning\s+\d+$/i, '').trim() ?? inn.inning;

    return {
      inning: inn.inning ?? teamName,
      battingteam: teamName,
      bowlingteam: '',
      scores: batting,
      bowling,
    };
  });
}

/** Build commentary-style updates from scorecard + status (CricAPI has no free commentary endpoint). */
export function buildMatchUpdatesFromScorecard(
  status: string,
  scorecard: ScorecardEntry[]
): CommentaryItem[] {
  const items: CommentaryItem[] = [
    {
      id: 'status-0',
      text: status,
      over: 0,
      ballNumber: 0,
      timestamp: Date.now(),
      eventType: 'STATUS',
      inningsId: 0,
    },
  ];

  let idx = 1;
  for (const inn of scorecard) {
    for (const b of inn.scores) {
      if (b['dismissal-info'] && b['dismissal-info'] !== 'batting') {
        items.push({
          id: `wicket-${idx++}`,
          text: `${b.batsman} ${b['dismissal-info']} — ${b.runs} (${b.balls})`,
          over: 0,
          ballNumber: 0,
          timestamp: Date.now() - idx,
          eventType: 'WICKET',
          inningsId: 0,
        });
      }
    }
  }

  return items;
}
