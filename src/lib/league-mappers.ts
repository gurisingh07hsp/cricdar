import { PointsTableEntry } from '@/types/cricket';

export interface SeriesPointsRow {
  teamname: string;
  shortname: string;
  img?: string;
  matches: number;
  wins: number;
  loss: number;
  ties: number;
  nr: number;
}

export interface SeriesSquadPlayer {
  id: string;
  name: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  playerImg?: string;
}

export interface SeriesSquadTeam {
  teamName: string;
  shortname: string;
  img?: string;
  players: SeriesSquadPlayer[];
}

/** T20 league points: 2 per win, 1 per tie/NR (split). NRR not provided by API. */
export function mapSeriesPointsToTable(rows: SeriesPointsRow[]): PointsTableEntry[] {
  const withPts = rows.map((row) => {
    const points = row.wins * 2 + row.ties;
    return {
      rank: 0,
      teamId: row.shortname || row.teamname,
      teamName: row.teamname,
      teamShortName: row.shortname,
      logoUrl: row.img,
      played: row.matches,
      won: row.wins,
      lost: row.loss,
      tied: row.ties,
      noResult: row.nr,
      points,
      netRunRate: '—',
      _sortPts: points,
      _sortWins: row.wins,
    };
  });

  withPts.sort((a, b) => {
    if (b._sortPts !== a._sortPts) return b._sortPts - a._sortPts;
    return b._sortWins - a._sortWins;
  });

  return withPts.map((row, i) => {
    const { _sortPts: _p, _sortWins: _w, ...entry } = row;
    return { ...entry, rank: i + 1 };
  });
}
