import { SeriesPreviewProps, MatchPreviewProps, TeamInfo, ApiMatch, SeriesDetailData, PlayerStats, BowlingStats, PlayerStat } from '@/types/cricket';

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

/**
 * Process player stats from API response
 */
export function processPlayerStats(stats: PlayerStat[], format: string, type: 'batting' | 'bowling'): PlayerStats | BowlingStats {
  // Filter stats for the specific format and type
  const formatStats = stats.filter(stat => 
    stat.fn === type && 
    stat.matchtype.toLowerCase() === format.toLowerCase()
  );

  // Create a map of stat names to values
  const statsMap = new Map<string, string>();
  formatStats.forEach(stat => {
    // Clean up the stat name by removing extra spaces and normalizing
    const cleanStat = stat.stat.trim().replace(/\s+/g, '');
    statsMap.set(cleanStat, stat.value.trim());
  });

  if (type === 'batting') {
    return {
      matches: statsMap.get('m') || '0',
      innings: statsMap.get('inn') || '0',
      runs: statsMap.get('runs') || '0',
      highestScore: statsMap.get('hs') || '0',
      notOut: statsMap.get('no') || '0',
      strikeRate: statsMap.get('sr') || '0',
      fifties: statsMap.get('50s') || statsMap.get('50') || '0',
      hundreds: statsMap.get('100s') || statsMap.get('100') || '0',
      twoHundreds: statsMap.get('200s') || statsMap.get('200') || '0',
      average: statsMap.get('avg') || '0',
      balls: statsMap.get('bf') || '0',
      threeHundreds: statsMap.get('300s') || statsMap.get('300') || '0',
      fours: statsMap.get('4s') || '0',
      sixes: statsMap.get('6s') || '0',
      ducks: statsMap.get('ducks') || '0'
    } as PlayerStats;
  } else {
    return {
      matches: statsMap.get('m') || '0',
      innings: statsMap.get('inn') || '0',
      wickets: statsMap.get('wkts') || '0',
      balls: statsMap.get('b') || '0',
      runs: statsMap.get('runs') || '0',
      overs: statsMap.get('overs') || '0',
      economy: statsMap.get('econ') || '0',
      maidens: statsMap.get('maidens') || '0',
      bbi: statsMap.get('bbi') || '0/0',
      fourWickets: statsMap.get('4w') || '0',
      fiveWickets: statsMap.get('5w') || '0',
      tenWickets: statsMap.get('10w') || '0',
      hattricks: statsMap.get('hattricks') || '0',
      average: statsMap.get('avg') || '0',
      strikeRate: statsMap.get('sr') || '0'
    } as BowlingStats;
  }
}