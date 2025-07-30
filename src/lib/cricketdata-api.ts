import { ApiMatch, FullMatchData, SeriesDetailData } from '@/types/cricket';

const API_KEY = process.env.CRICKETDATA_API_KEY;
const BASE_URL = process.env.CRICKETDATA_API_BASE_URL;

async function fetchFromApi<T>(endpoint: string, params: string = ''): Promise<T | null> {
    if (!API_KEY || !BASE_URL) {
        console.error("CRITICAL: API credentials are not configured in .env.local");
        return null;
    }

    // Correctly construct the URL with the API key as the first parameter
    // and append any other params.
    const url = `${BASE_URL}/${endpoint}?apikey=${API_KEY}${params ? '&' + params : ''}`;

    try {
        const response = await fetch(url, {
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`API Error for endpoint ${endpoint}:`, errorData);
            return null;
        }

        const result = await response.json();
        return (result.data as T) || null;
    } catch (error) {
        console.error(`Failed to fetch from API endpoint: ${endpoint}`, error);
        return null;
    }
}

/**
 * Fetches all current matches.
 * The API endpoint for all matches is 'matches'.
 */
export async function getAllMatches() {
    return fetchFromApi<ApiMatch[]>('currentMatches');
}

/**
 * Fetches detailed information for a single match by its ID.
 * The API endpoint is 'match_info'.
 * @param matchId The unique ID of the match.
 */
export async function getMatchInfo(matchId: string) {
    return fetchFromApi<ApiMatch>('match_info', `id=${matchId}`);
}

/**
 * Fetches a list of all series (tournaments, tours).
 * The API endpoint is 'series'.
 */
export async function getSeriesList() {
    return fetchFromApi<SeriesDetailData[]>('series');
}

/**
 * Fetches detailed information for a single series by its ID.
 * The API endpoint is 'series_info'.
 * @param seriesId The unique ID of the series.
 */
export async function getSeriesInfo(seriesId: string) {
    return fetchFromApi<SeriesDetailData>('series_info', `id=${seriesId}`);
}