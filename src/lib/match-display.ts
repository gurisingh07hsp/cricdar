import { ApiMatch, Score, ScorecardEntry } from '@/types/cricket';
import { CricScoreMatch, parseTeamLabel, parseScoreLine } from './cricscore-mappers';

export interface TeamDisplay {
  name: string;
  shortName: string;
  logo?: string;
  scoreLabel: string;
  runs?: number;
  wickets?: number;
  overs?: number;
  isBatting: boolean;
}

function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function teamsMatch(a: string, b: string): boolean {
  const na = normalizeTeamName(a);
  const nb = normalizeTeamName(b);
  if (na === nb || na.includes(nb) || nb.includes(na)) return true;
  const wa = na.split(' ').filter((w) => w.length > 2);
  const wb = nb.split(' ').filter((w) => w.length > 2);
  return wa.length > 0 && wa.every((w) => nb.includes(w));
}

function scoreForTeam(scores: Score[] | undefined, teamName: string): Score | undefined {
  if (!scores?.length) return undefined;
  return scores.find((s) => teamsMatch(s.inning, teamName));
}

function oversToDecimal(o: number | string): number {
  const s = String(o);
  const dot = s.indexOf('.');
  if (dot >= 0) {
    const whole = parseInt(s.slice(0, dot), 10) || 0;
    const balls = parseInt(s.slice(dot + 1), 10) || 0;
    return whole + balls / 6;
  }
  return parseFloat(s) || 0;
}

function formatScoreLabel(r?: number, w?: number, o?: number | string): string {
  if (r === undefined || w === undefined) return '';
  const overs = o !== undefined && o !== '' ? ` (${o})` : '';
  return `${r}/${w}${overs}`;
}

export function buildTeamDisplays(
  match: ApiMatch,
  scorecard: ScorecardEntry[] = [],
  cricScore?: CricScoreMatch | null
): TeamDisplay[] {
  const teams = match.teams ?? [];
  const displays: TeamDisplay[] = [];

  const cricByTeam = new Map<string, { score: string; overs: string }>();
  if (cricScore) {
    const t1 = parseTeamLabel(cricScore.t1);
    const t2 = parseTeamLabel(cricScore.t2);
    if (cricScore.t1s) {
      cricByTeam.set(t1.name, parseScoreLine(cricScore.t1s));
      cricByTeam.set(cricScore.t1, parseScoreLine(cricScore.t1s));
    }
    if (cricScore.t2s) {
      cricByTeam.set(t2.name, parseScoreLine(cricScore.t2s));
      cricByTeam.set(cricScore.t2, parseScoreLine(cricScore.t2s));
    }
  }

  let battingTeamName = '';
  const currentInn = getCurrentInnings(scorecard);
  if (currentInn) battingTeamName = currentInn.battingteam;
  if (!battingTeamName && match.tossChoice?.toLowerCase().includes('bat')) {
    battingTeamName = match.tossWinner ?? '';
  }

  for (const teamName of teams) {
    const info = match.teamInfo?.find((t) => teamsMatch(t.name, teamName));
    const fromScore = scoreForTeam(match.score, teamName);
    const fromCric = [...cricByTeam.entries()].find(([k]) => teamsMatch(k, teamName))?.[1];

    let scoreLabel = 'Yet to bat';
    let runs: number | undefined;
    let wickets: number | undefined;
    let overs: number | string | undefined;

    if (fromCric?.score) {
      scoreLabel = fromCric.score + (fromCric.overs ? ` (${fromCric.overs})` : '');
      const [r, w] = fromCric.score.split('/').map(Number);
      runs = r;
      wickets = w;
      overs = fromCric.overs;
    } else if (fromScore) {
      runs = fromScore.r;
      wickets = fromScore.w;
      overs = fromScore.o;
      scoreLabel = formatScoreLabel(runs, wickets, overs);
    }

    const inn = scorecard.find((i) => teamsMatch(i.battingteam, teamName));
    if (!fromCric?.score && !fromScore && inn?.inningsSummary) {
      runs = inn.inningsSummary.runs;
      wickets = inn.inningsSummary.wickets;
      overs = inn.inningsSummary.overs;
      scoreLabel = formatScoreLabel(runs, wickets, overs);
    }

    displays.push({
      name: teamName,
      shortName: info?.shortname || teamName.split(' ').pop()?.slice(0, 4).toUpperCase() || teamName.slice(0, 4).toUpperCase(),
      logo: info?.img,
      scoreLabel,
      runs,
      wickets,
      overs,
      isBatting: teamsMatch(teamName, battingTeamName) || (!!fromScore && !match.matchEnded),
    });
  }

  return displays;
}

export function getCurrentInnings(
  scorecard: ScorecardEntry[]
): ScorecardEntry | null {
  if (!scorecard.length) return null;
  for (let i = scorecard.length - 1; i >= 0; i--) {
    const inn = scorecard[i];
    if (inn.scores.some((b) => b['dismissal-info']?.toLowerCase() === 'batting')) {
      return inn;
    }
  }
  return scorecard[scorecard.length - 1];
}

export function computeRunRate(runs: number, overs: number | string): string {
  const o = oversToDecimal(overs);
  if (o <= 0) return '0.00';
  return (runs / o).toFixed(2);
}

export function getLiveSummary(
  match: ApiMatch,
  scorecard: ScorecardEntry[],
  teams: TeamDisplay[]
) {
  const batting = teams.find((t) => t.isBatting) ?? teams.find((t) => t.runs !== undefined);
  const currentInn = getCurrentInnings(scorecard);
  const runs = batting?.runs ?? 0;
  const wickets = batting?.wickets ?? 0;
  const overs = batting?.overs ?? 0;
  const crr = runs > 0 && overs ? computeRunRate(runs, overs) : null;

  const batters = (currentInn?.scores ?? [])
    .filter((b) => b['dismissal-info']?.toLowerCase() === 'batting')
    .slice(0, 2);

  const bowlers = (currentInn?.bowling ?? []).slice(-2);

  return {
    battingShort: batting?.shortName ?? '',
    scoreLine: batting?.scoreLabel && batting.scoreLabel !== 'Yet to bat'
      ? `${batting.shortName} ${batting.scoreLabel.replace('(', '- ').replace(')', '')}`
      : null,
    runs,
    wickets,
    overs,
    crr,
    status: match.status,
    batters,
    bowlers,
    hasData: !!batting?.runs || !!currentInn,
  };
}
