// src/types/cricket.ts

export interface Team {
    name: string;
    shortname: string;
    img: string;
}

export interface Score {
    r: number;
    w: number;
    o: number;
    inning: string;
}

export interface ApiMatch {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    dateTimeGMT: string;
    teams: string[];
    teamInfo?: { name: string; shortname: string; img: string; }[];
    score?: Score[];
    series_id: string;
    fantasyEnabled: boolean;
    bbbEnabled?: boolean; // Added based on series response
    hasSquad?: boolean; // Added based on series response
    matchStarted: boolean;
    matchEnded: boolean;
    tossWinner?: string;
    tossChoice?: string;
    matchWinner?: string; // This might be available when match ends
}


export interface SeriesDetailData {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
    info?: any;
    matchList?: ApiMatch[];
    pointsTable?: any[];
    teams?: any[];
    status: string;
}

export interface SeriesInfo {
    id: string;
    name: string;
    // FIX: Change property names to match the API response (all lowercase)
    startdate: string;
    enddate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
}

export interface TeamInfo {
    name: string;
    shortName: string;
    logoUrl?: string;
    score?: string;
    overs?: string;
}

export interface MatchPreviewProps {
    id: string;
    team1: TeamInfo;
    team2: TeamInfo;
    status: 'Live' | 'Upcoming' | 'Finished';
    venue: string;
    startTime: string;
    result: string;
    seriesName: string;
}

export interface SeriesPreviewProps {
    id: string;
    name: string;
    year: string;
    format: string;
    country: string;
    status: string;
    matchCount: number;
    teamCount: number;
}

export interface Inning {
    id: string;
    teamName: string;
    totalRuns: number;
    totalWickets: number;
    overs: number;
    isDeclared?: boolean;
    batting: Batsman[];
    bowling: Bowler[];
    fallOfWickets: FallOfWicket[];
}

export interface Batsman {
    id: string;
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    dismissalInfo: string;
}

export interface Bowler {
    id: string;
    name: string;
    overs: number;
    maidens: number;
    runsConceded: number;
    wickets: number;
    economy: number;
}

export interface FallOfWicket {
    batsmanName: string;
    score: number;
    over: number;
}

// Define the structure for individual batting scores
export interface BattingScore {
    batsman: string;
    'dismissal-info'?: string;
    runs: string;
    balls: string;
    fours: string;
    sixes: string;
    sr: string; // strike rate
}

// Define the structure for individual bowling scores
export interface BowlingScore {
    bowler: string;
    overs: string;
    maidens: string;
    runs: string;
    wickets: string;
    economy: string;
}

// Define the structure for a single scorecard/inning entry
export interface ScorecardEntry {
    inning: string;
    battingteam: string;
    bowlingteam: string;
    scores: BattingScore[];
    bowling: BowlingScore[];
}


export interface FullMatchData {
    id: string;
    matchTitle: string;
    name: string;
    series_id?: string;
    series?: { id: string; name: string; };
    venue: string;
    startTime: string;
    date: string;
    status: string;
    toss: string;
    teamInfo: Team[];
    score?: Score[];
    umpires: string[];
    referee: string;
    matchType: 'Test' | 'ODI' | 'T20';

    // FIX: Replace 'innings' with the correct 'scorecard' property
    scorecard?: ScorecardEntry[];
}

export interface SeriesInfo {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
}

// Corrected PointsTableEntry to match component usage
export interface PointsTableEntry {
    rank: number;
    teamId: string;
    teamName: string;
    teamShortName: string;
    logoUrl?: string;
    played: number;
    won: number;
    lost: number;
    tied: number;
    noResult: number;
    points: number;
    netRunRate: string;
}


export interface SeriesDetailData {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
    // According to API docs, the full series info is nested
    info?: SeriesInfo;
    matchList?: ApiMatch[];
    pointsTable?: PointsTableEntry[];
    teams?: any[]; // Define more strictly if team structure is known
    status: string;
}

export interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    author: string;
    publishedDate: string; // ISO String
    imageUrl: string;
    category: string;
    tags: string[];
}