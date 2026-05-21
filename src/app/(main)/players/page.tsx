"use client";

import { Player } from '@/types/cricket';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  RiSearchLine,
  RiFilter3Line,
  RiUserLine,
  RiArrowRightSLine,
  RiGlobeLine,
  RiStarLine,
} from 'react-icons/ri';

const PAGE_SIZE = 25;

const FEATURED_SEARCHES = [
  'Virat Kohli',
  'Rohit Sharma',
  'Jasprit Bumrah',
  'MS Dhoni',
  'Babar Azam',
  'Kane Williamson',
  'Joe Root',
  'Ben Stokes',
];

async function fetchPlayersFromApi(offset: number, search: string) {
  const params = new URLSearchParams({ offset: String(offset) });
  if (search.trim()) params.set('search', search.trim());
  const res = await fetch(`/api/cricket/players?${params}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json() as Promise<{
    players: Player[];
    totalRows: number;
    hasMore: boolean;
  }>;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [featuredPlayers, setFeaturedPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [offset, setOffset] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const featuredLoaded = useRef(false);

  const countries = Array.from(new Set(players.map((p) => p.country).filter(Boolean))).sort();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const loadFeatured = useCallback(async () => {
    if (featuredLoaded.current) return;
    featuredLoaded.current = true;
    try {
      const results = await Promise.all(
        FEATURED_SEARCHES.map((name) =>
          fetchPlayersFromApi(0, name).then((r) => r.players[0]).catch(() => null)
        )
      );
      setFeaturedPlayers(
        results.filter((p): p is Player => p != null && Boolean(p.id))
      );
    } catch {
      featuredLoaded.current = false;
    }
  }, []);

  const fetchPlayers = useCallback(
    async (reset: boolean, pageOffset?: number) => {
      try {
        if (reset) setLoading(true);
        else setLoadingMore(true);

        const nextOffset = reset ? 0 : (pageOffset ?? 0);
        const { players: batch, totalRows, hasMore: more } = await fetchPlayersFromApi(
          nextOffset,
          debouncedSearch
        );

        setTotalPlayers(totalRows);
        setHasMore(more);
        setPlayers((prev) => (reset ? batch : [...prev, ...batch]));
        setOffset(nextOffset + batch.length);
      } catch (error) {
        console.error('Error fetching players:', error);
        if (reset) setPlayers([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch]
  );

  useEffect(() => {
    setOffset(0);
    fetchPlayers(true, 0);
    if (!debouncedSearch) loadFeatured();
  }, [debouncedSearch, fetchPlayers, loadFeatured]);

  const filteredPlayers = players.filter((player) => {
    const matchesCountry = !selectedCountry || player.country === selectedCountry;
    return matchesCountry;
  });

  const loadMorePlayers = () => {
    if (!loadingMore && hasMore) fetchPlayers(false, offset);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-app-surface border border-app-border rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-app-text-base mb-2">All Players</h1>
          <p className="text-app-text-muted">
            Search {totalPlayers > 0 ? `${totalPlayers.toLocaleString()}+` : '18,000+'} cricket
            players worldwide. Use search to find stars like Kohli, Rohit, or Bumrah.
          </p>
        </div>

        <div className="bg-app-surface border border-app-border rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search e.g. Kohli, Rohit Sharma, Bumrah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary"
              />
            </div>
            <div className="relative">
              <RiFilter3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted w-4 h-4" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="pl-10 pr-8 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary appearance-none min-w-[160px]"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {(searchTerm || selectedCountry) && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {!debouncedSearch && featuredPlayers.length > 0 && (
          <div className="bg-app-surface border border-app-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-app-text-base mb-3 flex items-center gap-2">
              <RiStarLine className="text-app-primary w-5 h-5" />
              Popular players
            </h2>
            <div className="flex flex-wrap gap-2">
              {featuredPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="px-3 py-1.5 text-sm rounded-full border border-app-border bg-app-bg hover:border-app-primary hover:text-app-primary transition-colors"
                >
                  {player.name}
                </Link>
              ))}
            </div>
            <p className="text-xs text-app-text-muted mt-3">
              Or type a name above — the API indexes 18,000+ players including all internationals.
            </p>
          </div>
        )}

        <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-app-text-muted">Loading players...</div>
          ) : filteredPlayers.length === 0 ? (
            <div className="p-8 text-center text-app-text-muted">
              {debouncedSearch || selectedCountry
                ? 'No players found. Try a different spelling (e.g. "Virat Kohli").'
                : 'No players available. Check CRICAPI_KEY in .env.local.'}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-app-bg border-b border-app-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase">
                        Player
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase">
                        Country
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-app-text-muted uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-app-border">
                    {filteredPlayers.map((player) => (
                      <tr key={player.id} className="hover:bg-app-bg/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-app-primary/10 rounded-full flex items-center justify-center mr-3">
                              <RiUserLine className="w-5 h-5 text-app-primary" />
                            </div>
                            <span className="text-sm font-medium text-app-text-base">
                              {player.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-app-text-base">
                            <RiGlobeLine className="w-4 h-4 text-app-text-muted mr-2" />
                            {player.country || '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/players/${player.id}`}
                            className="inline-flex items-center px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover"
                          >
                            View Stats
                            <RiArrowRightSLine className="w-4 h-4 ml-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hasMore && (
                <div className="p-4 border-t border-app-border">
                  <button
                    type="button"
                    onClick={loadMorePlayers}
                    disabled={loadingMore}
                    className="w-full py-2 px-4 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover disabled:opacity-50"
                  >
                    {loadingMore ? 'Loading...' : 'Load more'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-6 bg-app-surface border border-app-border rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-app-primary">
                {totalPlayers.toLocaleString()}
              </div>
              <div className="text-sm text-app-text-muted">
                {debouncedSearch ? 'Matches' : 'Total in database'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-app-primary">{filteredPlayers.length}</div>
              <div className="text-sm text-app-text-muted">Showing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-app-primary">{countries.length}</div>
              <div className="text-sm text-app-text-muted">Countries (this page)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
