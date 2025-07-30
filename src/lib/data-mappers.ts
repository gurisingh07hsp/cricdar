import { SeriesPreviewProps, MatchPreviewProps, TeamInfo, ApiMatch, SeriesDetailData } from '@/types/cricket';

/**
 * Maps the raw series data from the 'series_list' API endpoint 
 * to the props required by the SeriesPreviewCard component.
 */
export function mapApiSeriesToSeriesPreview(series: SeriesDetailData): SeriesPreviewProps {
    const format = [];
    if (series.test > 0) format.push("Test");
    if (series.odi > 0) format.push("ODI");
    if (series.t20 > 0) format.push("T20");

    const yearMatch = series.name.match(/\b(\d{4})\b/);
    const year = yearMatch ? yearMatch[1] : new Date(series.startDate).getFullYear().toString();

    // FIX: Implement robust logic to determine the series status dynamically.
    let status: 'Upcoming' | 'Ongoing' | 'Finished' = 'Upcoming';
    const now = new Date();
    const startDate = new Date(series.startDate);
    
    // The endDate from the API is tricky (e.g., "Jul 11"). We need to combine it with the correct year.
    // We assume the endDate is in the same year as the startDate.
    const endDate = new Date(`${series.endDate}, ${startDate.getFullYear()}`);

    if (now > endDate) {
        status = 'Finished';
    } else if (now >= startDate && now <= endDate) {
        status = 'Ongoing';
    } else {
        status = 'Upcoming';
    }

    return {
        id: series.id,
        name: series.name,
        year: year,
        format: format.join(', '),
        country: 'International', // This is a placeholder
        status: status, // The status is now correctly calculated.
        matchCount: series.matches,
        teamCount: series.squads
    };
}


/**
 * Maps the raw match data from the 'currentMatches' API endpoint
 * to the props required by the MatchPreviewCard component.
 * This function is now more robust against missing 'score' or 'teamInfo' data.
 */
export function mapApiMatchToMatchPreview(match: ApiMatch): MatchPreviewProps {
    // Safely access nested data using optional chaining (?.)
    const team1Info = match.teamInfo?.[0];
    const team2Info = match.teamInfo?.[1];
    const team1Score = match.score?.[0];
    const team2Score = match.score?.[1];

    const team1: TeamInfo = {
        name: team1Info?.name || match.teams[0],
        shortName: team1Info?.shortname || '',
        logoUrl: team1Info?.img,
        score: team1Score ? `${team1Score.r}/${team1Score.w}` : '',
        overs: team1Score ? `${team1Score.o}` : ''
    };

    const team2: TeamInfo = {
        name: team2Info?.name || match.teams[1],
        shortName: team2Info?.shortname || '',
        logoUrl: team2Info?.img,
        score: team2Score ? `${team2Score.r}/${team2Score.w}` : '',
        overs: team2Score ? `${team2Score.o}` : ''
    };

    // console.log("Before Mapped Match", match)

    // console.log("Mapped Match:", {
    //     id: match.id,
    //     team1,
    //     team2,
    //     status: match.status,
    //     venue: match.venue,
    //     startTime: match.dateTimeGMT,
    //     result: match.result,
    //     seriesName: match.name,
    // });

    let status: 'Live' | 'Upcoming' | 'Finished' = 'Upcoming';
    if (match.matchStarted && !match.matchEnded) {
        status = 'Live';
    } else if (match.matchEnded) {
        status = 'Finished';
    }

    return {
        id: match.id,
        team1,
        team2,
        status,
        venue: match.venue,
        startTime: match.dateTimeGMT,
        result: match.status,
        seriesName: match.name,
    };
}