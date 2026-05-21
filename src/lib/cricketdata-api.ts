import { ApiMatch, SeriesDetailData, PlayerInfo, ScorecardEntry, CommentaryItem } from '@/types/cricket';
import {
  CricScoreMatch,
  mapCricScoreToApiMatch,
  mapCricApiScorecardEntries,
  buildMatchUpdatesFromScorecard,
} from './cricscore-mappers';

const API_KEY =
  process.env.CRICAPI_KEY ??
  process.env.NEXT_PUBLIC_CRICKETDATA_API_KEY;
const BASE_URL =
  process.env.CRICAPI_BASE_URL ??
  process.env.NEXT_PUBLIC_CRICKETDATA_API_BASE_URL ??
  'https://api.cricapi.com/v1';

interface CricApiResponse<T> {
  status: string;
  data: T;
  reason?: string;
}

async function fetchCricApi<T>(
  endpoint: string,
  params: string = '',
  cacheStrategy: RequestCache = 'no-store'
): Promise<T | null> {
  if (!API_KEY) {
    console.error('CRICAPI_KEY is not configured in .env.local');
    return null;
  }

  const query = params ? `&${params}` : '';
  const url = `${BASE_URL}/${endpoint}?apikey=${API_KEY}${query}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      cache: cacheStrategy,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const result = (await response.json()) as CricApiResponse<T>;

    if (result.status !== 'success' || !result.data) {
      console.error(`CricAPI error (${endpoint}):`, result.reason ?? result.status);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`Failed to fetch CricAPI endpoint: ${endpoint}`, error);
    return null;
  }
}

/** Live scores + fixtures + results from cricScore endpoint. */
export async function getCricScoreMatches(): Promise<CricScoreMatch[]> {
  const data = await fetchCricApi<CricScoreMatch[]>('cricScore');
  return data ?? [];
}

/** All matches mapped for list views. */
export async function getAllMatches(): Promise<ApiMatch[] | null> {
  const items = await getCricScoreMatches();
  if (!items.length) return null;
  return items.map(mapCricScoreToApiMatch);
}

export async function getMatchInfo(matchId: string): Promise<ApiMatch | null> {
  return fetchCricApi<ApiMatch>('match_info', `id=${matchId}`);
}

export async function getMatchScorecard(matchId: string): Promise<ApiMatch | null> {
  return fetchCricApi<ApiMatch>('match_scorecard', `id=${matchId}`);
}

export interface FullMatchDetail {
  match: ApiMatch;
  scorecard: ScorecardEntry[];
  commentary: CommentaryItem[];
  cricScoreSnap?: import('./cricscore-mappers').CricScoreMatch | null;
}

export async function getFullMatchDetail(
  matchId: string
): Promise<FullMatchDetail | null> {
  const [info, scorecardData, cricScoreList] = await Promise.all([
    getMatchInfo(matchId),
    getMatchScorecard(matchId),
    getCricScoreMatches(),
  ]);
  const cricScoreSnap = cricScoreList.find((m) => m.id === matchId) ?? null;

  const match = scorecardData ?? info;
  if (!match) return null;

  if (scorecardData?.score?.length && !info?.score?.length) {
    match.score = scorecardData.score;
  } else if (info) {
    match.tossWinner = info.tossWinner ?? match.tossWinner;
    match.tossChoice = info.tossChoice ?? match.tossChoice;
    match.matchWinner = info.matchWinner ?? match.matchWinner;
    if (info.score?.length) match.score = info.score;
  }

  const scorecard = mapCricApiScorecardEntries(scorecardData?.scorecard);

  const commentary = buildMatchUpdatesFromScorecard(
    match.status,
    scorecard
  );

  return { match, scorecard, commentary, cricScoreSnap };
}

export async function getSeriesList() {
  return fetchCricApi<SeriesDetailData[]>('series', '', 'no-store');
}

export async function getSeriesInfo(seriesId: string) {
  return fetchCricApi<SeriesDetailData>('series_info', `id=${seriesId}`);
}

export async function getPlayerInfo(playerId: string): Promise<PlayerInfo | null> {
  const data = await fetchCricApi<PlayerInfo>('players_info', `offset=0&id=${playerId}`);
  return data;
}

export async function getAllPlayers(offset: number = 0): Promise<{
  status: string;
  data: unknown[];
} | null> {
  if (!API_KEY) return null;

  try {
    const response = await fetch(
      `${BASE_URL}/players?apikey=${API_KEY}&offset=${offset}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    if (data.status === 'success' && data.data) return data;
    return null;
  } catch (error) {
    console.error('Error fetching players:', error);
    return null;
  }
}
