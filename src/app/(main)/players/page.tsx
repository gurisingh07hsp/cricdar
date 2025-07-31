"use client";

import { getAllPlayers } from '@/lib/cricketdata-api';
import { Player } from '@/types/cricket';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiSearchLine, 
  RiFilter3Line, 
  RiUserLine,
  RiArrowRightSLine,
  RiGlobeLine,
  RiLiveLine
} from 'react-icons/ri';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Get unique countries for filter
  const countries = Array.from(new Set(players.map(player => player.country))).sort();

  // Filter players based on search and country
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || player.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  useEffect(() => {
    fetchPlayers();
  }, [currentPage, fetchPlayers]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await getAllPlayers(currentPage * 25); // 25 players per page
      if (response && response.data) {
        setPlayers(response.data);
        setTotalPlayers(response.info?.totalRows || 0);
        setHasMore(response.data.length === 25); // If we got 25 players, there might be more
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePlayers = () => {
    setCurrentPage(prev => prev + 1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Download App Section */}
            <div className="bg-app-primary text-white p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Download our app on</h3>
              <div className="space-y-2">
                <button className="w-full bg-black text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
                  <span>GET IT ON</span>
                  <span className="font-bold">Google Play</span>
                </button>
                <button className="w-full bg-black text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
                  <span>Download on the</span>
                  <span className="font-bold">App Store</span>
                </button>
              </div>
            </div>

            {/* Popular Series */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <h3 className="font-semibold text-app-text-base mb-3">Popular Series</h3>
              <div className="space-y-2">
                {[
                  'The Hundred Mens Competition 2025',
                  'KCC T20 Summer League, 2025',
                  'Shpageeza Cricket League, 2025',
                  'Ireland Inter-Provincial Limited Over Cup, 2025',
                  'Vitality T20 Blast, 2025'
                ].map((series, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-app-text-muted hover:text-app-primary cursor-pointer">
                    <span>{series}</span>
                    <RiArrowRightSLine className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Other Teams */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <h3 className="font-semibold text-app-text-base mb-3">Explore Other Teams</h3>
              <div className="space-y-2">
                {[
                  'India', 'Australia', 'Bangladesh', 'England', 
                  'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka'
                ].map((team, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-app-text-muted hover:text-app-primary cursor-pointer">
                    <span>{team}</span>
                    <RiArrowRightSLine className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-app-text-base mb-2">All Players</h1>
              <p className="text-app-text-muted">Browse through our comprehensive list of cricket players from around the world</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-muted w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>

                {/* Country Filter */}
                <div className="relative">
                  <RiFilter3Line className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-muted w-4 h-4" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent appearance-none"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters */}
                {(searchTerm || selectedCountry) && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Players List */}
            <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="text-app-text-muted">Loading players...</div>
                </div>
              ) : filteredPlayers.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-app-text-muted">
                    {searchTerm || selectedCountry ? 'No players found matching your criteria' : 'No players available'}
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-app-bg border-b border-app-border">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                            Player
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                            Country
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-app-text-muted uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-app-border">
                        {filteredPlayers.map((player) => (
                          <tr key={player.id} className="hover:bg-app-bg/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-app-primary/10 rounded-full flex items-center justify-center mr-3">
                                  <RiUserLine className="w-5 h-5 text-app-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-app-text-base">{player.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <RiGlobeLine className="w-4 h-4 text-app-text-muted mr-2" />
                                <span className="text-sm text-app-text-base">{player.country}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link
                                href={`/players/${player.id}`}
                                className="inline-flex items-center px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover transition-colors"
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

                  {/* Load More */}
                  {hasMore && (
                    <div className="p-4 border-t border-app-border">
                      <button
                        onClick={loadMorePlayers}
                        className="w-full py-2 px-4 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
                      >
                        Load More Players
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 bg-app-surface border border-app-border rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-app-primary">{totalPlayers.toLocaleString()}</div>
                  <div className="text-sm text-app-text-muted">Total Players</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-app-primary">{countries.length}</div>
                  <div className="text-sm text-app-text-muted">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-app-primary">{filteredPlayers.length}</div>
                  <div className="text-sm text-app-text-muted">Showing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-app-primary">{currentPage + 1}</div>
                  <div className="text-sm text-app-text-muted">Page</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Live Match Score */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RiLiveLine className="w-4 h-4 text-red-500" />
                <span className="text-red-500 font-semibold">LIVE | T20</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-app-text-base">Mis-e-Ainak Knights</span>
                  <span className="font-bold text-app-text-base">96-7</span>
                </div>
                <div className="text-app-text-muted text-xs">Over 11.0</div>
                <div className="flex justify-between">
                  <span className="font-medium text-app-text-base">Amo Sharks</span>
                  <span className="font-bold text-app-text-base">0-0</span>
                </div>
                <div className="text-app-text-muted text-xs">Over 0.0</div>
                <div className="border-t border-app-border pt-2 mt-2">
                  <div className="text-xs text-app-text-muted">
                    <div>Mohammad Nabi 1 (3)</div>
                    <div>Farmanullah Safi 5 (7)</div>
                    <div>Abdullah Ahmadzai 3.0 (17)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="text-center text-app-text-muted">Advertisement</div>
              <div className="h-32 bg-app-bg rounded mt-2"></div>
            </div>

            {/* Download Mobile App */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <h3 className="font-semibold text-app-text-base mb-3">DOWNLOAD OUR MOBILE APP</h3>
              <div className="bg-app-bg rounded-lg p-4 mb-3">
                <div className="w-16 h-24 bg-app-border rounded mx-auto"></div>
              </div>
              <div className="text-sm text-app-text-muted">
                <div className="font-medium text-app-text-base">Latest Cricket News</div>
                <div className="text-xs mt-1">Stay updated with live scores and news</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 