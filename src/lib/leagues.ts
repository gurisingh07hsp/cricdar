export interface LeagueConfig {
  slug: string;
  name: string;
  shortName: string;
  country: string;
  format: string;
  description: string;
  /** Known CricAPI series id when available */
  seriesId?: string;
  /** Match cricScore `series` field (partial match) */
  seriesNamePatterns: string[];
  accentClass: string;
}

export const LEAGUES: LeagueConfig[] = [
  {
    slug: 'ipl',
    name: 'Indian Premier League',
    shortName: 'IPL',
    country: 'India',
    format: 'T20',
    description:
      'The world\'s biggest T20 franchise league — ten teams, 74 matches, and the race for the Orange Cap and IPL trophy.',
    seriesId: '87c62aac-bc3c-4738-ab93-19da0690488f',
    seriesNamePatterns: ['Indian Premier League', 'IPL'],
    accentClass: 'from-blue-600 to-orange-500',
  },
  {
    slug: 'bbl',
    name: 'Big Bash League',
    shortName: 'BBL',
    country: 'Australia',
    format: 'T20',
    description:
      'Australia\'s premier domestic T20 competition featuring eight city-based franchises.',
    seriesNamePatterns: ['Big Bash League', 'BBL'],
    accentClass: 'from-emerald-600 to-yellow-500',
  },
  {
    slug: 'psl',
    name: 'Pakistan Super League',
    shortName: 'PSL',
    country: 'Pakistan',
    format: 'T20',
    description:
      'Pakistan\'s flagship franchise T20 tournament with six teams battling for the trophy.',
    seriesNamePatterns: ['Pakistan Super League', 'PSL'],
    accentClass: 'from-green-700 to-teal-500',
  },
  {
    slug: 'cpl',
    name: 'Caribbean Premier League',
    shortName: 'CPL',
    country: 'West Indies',
    format: 'T20',
    description:
      'The Caribbean\'s explosive franchise T20 league across island nations.',
    seriesNamePatterns: ['Caribbean Premier League', 'CPL'],
    accentClass: 'from-purple-600 to-pink-500',
  },
  {
    slug: 'sa20',
    name: 'SA20',
    shortName: 'SA20',
    country: 'South Africa',
    format: 'T20',
    description:
      'South Africa\'s franchise T20 league featuring six teams and international stars.',
    seriesNamePatterns: ['SA20', 'SA T20'],
    accentClass: 'from-green-600 to-amber-400',
  },
  {
    slug: 'ilt20',
    name: 'International League T20',
    shortName: 'ILT20',
    country: 'UAE',
    format: 'T20',
    description:
      'UAE-based global T20 league bringing together international franchise squads.',
    seriesNamePatterns: ['International League T20', 'ILT20'],
    accentClass: 'from-red-600 to-amber-500',
  },
  {
    slug: 'mlc',
    name: 'Major League Cricket',
    shortName: 'MLC',
    country: 'USA',
    format: 'T20',
    description:
      'USA\'s professional T20 league growing the game in North America.',
    seriesNamePatterns: ['Major League Cricket', 'MLC'],
    accentClass: 'from-blue-800 to-red-600',
  },
  {
    slug: 't20-blast',
    name: 'T20 Blast',
    shortName: 'Blast',
    country: 'England',
    format: 'T20',
    description:
      'England\'s domestic T20 competition — 18 county sides in a fast-paced summer schedule.',
    seriesId: '9eb1981f-88c4-4c53-8f7b-f71b1c760d69',
    seriesNamePatterns: ['T20 Blast'],
    accentClass: 'from-indigo-600 to-sky-400',
  },
];

export function getLeagueBySlug(slug: string): LeagueConfig | undefined {
  return LEAGUES.find((l) => l.slug === slug);
}

export function getAllLeagues(): LeagueConfig[] {
  return LEAGUES;
}
