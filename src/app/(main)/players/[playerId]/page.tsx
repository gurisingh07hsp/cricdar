"use client";

import { getPlayerInfo } from '@/lib/cricketdata-api';
import { processPlayerStats } from '@/lib/data-mappers';
import { notFound } from 'next/navigation';
import { PlayerStats, BowlingStats } from '@/types/cricket';
import { useState, useEffect } from 'react';
import { 
  RiArrowRightSLine, 
  RiTrophyLine, 
  RiUserLine,
  RiCalendarLine,
  RiMapPinLine,
  RiLiveLine
} from 'react-icons/ri';

interface PlayerStatsPageProps {
  params: Promise<{ playerId: string }>;
}

export default function PlayerStatsPage({ params }: PlayerStatsPageProps) {
  const [playerInfo, setPlayerInfo] = useState<any>(null);
  const [selectedBattingFormat, setSelectedBattingFormat] = useState<'t20' | 'odi' | 'test'>('odi');
  const [selectedBowlingFormat, setSelectedBowlingFormat] = useState<'t20' | 'odi' | 'test'>('odi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const paramsObj = await params;
        const data = await getPlayerInfo(paramsObj.playerId);
        if (data) {
          setPlayerInfo(data);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="text-app-text-base">Loading player data...</div>
      </div>
    );
  }

  if (!playerInfo) {
    notFound();
  }

  // Process batting stats for different formats
  const t20BattingStats = processPlayerStats(playerInfo.stats, 't20', 'batting') as PlayerStats;
  const odiBattingStats = processPlayerStats(playerInfo.stats, 'odi', 'batting') as PlayerStats;
  const testBattingStats = processPlayerStats(playerInfo.stats, 'test', 'batting') as PlayerStats;

  // Process bowling stats for different formats
  const t20BowlingStats = processPlayerStats(playerInfo.stats, 't20', 'bowling') as BowlingStats;
  const odiBowlingStats = processPlayerStats(playerInfo.stats, 'odi', 'bowling') as BowlingStats;
  const testBowlingStats = processPlayerStats(playerInfo.stats, 'test', 'bowling') as BowlingStats;

  // Get current batting and bowling stats based on selected format
  const getCurrentBattingStats = () => {
    switch (selectedBattingFormat) {
      case 't20': return t20BattingStats;
      case 'odi': return odiBattingStats;
      case 'test': return testBattingStats;
      default: return odiBattingStats;
    }
  };

  const getCurrentBowlingStats = () => {
    switch (selectedBowlingFormat) {
      case 't20': return t20BowlingStats;
      case 'odi': return odiBowlingStats;
      case 'test': return testBowlingStats;
      default: return odiBowlingStats;
    }
  };

  const currentBattingStats = getCurrentBattingStats();
  const currentBowlingStats = getCurrentBowlingStats();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(playerInfo.dateOfBirth);

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
          <div className="lg:col-span-2 space-y-6">
            {/* Player Profile Card */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <div className="flex items-start space-x-6">
                {/* Player Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-app-bg rounded-lg flex items-center justify-center">
                    {playerInfo.playerImg && playerInfo.playerImg !== 'https://h.cricapi.com/img/icon512.png' ? (
                      <img 
                        src={playerInfo.playerImg} 
                        alt={playerInfo.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <RiUserLine className="w-16 h-16 text-app-primary" />
                    )}
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-app-text-base mb-4">{playerInfo.name.toUpperCase()}</h1>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RiCalendarLine className="w-4 h-4 text-app-text-muted" />
                        <span className="text-app-text-muted">Born: {formatDate(playerInfo.dateOfBirth)} ({age} years)</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RiMapPinLine className="w-4 h-4 text-app-text-muted" />
                        <span className="text-app-text-muted">Birth Place: {playerInfo.placeOfBirth || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RiUserLine className="w-4 h-4 text-app-text-muted" />
                        <span className="text-app-text-muted">Role: {playerInfo.role}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RiTrophyLine className="w-4 h-4 text-app-text-muted" />
                        <span className="text-app-text-muted">Batting Style: {playerInfo.battingStyle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RiTrophyLine className="w-4 h-4 text-app-text-muted" />
                        <span className="text-app-text-muted">Bowling Style: {playerInfo.bowlingStyle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-app-text-base">{playerInfo.name} Statistics</h2>

              {/* Batting Stats */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-app-text-base mb-4">Batting Stats</h3>
                <div className="flex space-x-2 mb-4">
                  {[
                    { key: 't20', label: 'T20' },
                    { key: 'odi', label: 'ODI' },
                    { key: 'test', label: 'TEST' }
                  ].map((format) => (
                    <button
                      key={format.key}
                      onClick={() => setSelectedBattingFormat(format.key as 't20' | 'odi' | 'test')}
                      className={`px-4 py-2 rounded text-sm font-medium ${
                        selectedBattingFormat === format.key
                          ? 'bg-app-primary text-white' 
                          : 'bg-app-bg text-app-text-muted hover:text-app-text-base'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
                {currentBattingStats.matches === '0' && currentBattingStats.runs === '0' ? (
                  <div className="text-center py-8 text-app-text-muted">
                    <p>No batting statistics available for {selectedBattingFormat.toUpperCase()} format</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.matches}</div>
                      <div className="text-app-text-muted">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.innings}</div>
                      <div className="text-app-text-muted">Innings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.runs}</div>
                      <div className="text-app-text-muted">Runs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.highestScore}</div>
                      <div className="text-app-text-muted">Highest Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.notOut}</div>
                      <div className="text-app-text-muted">Not Out</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.strikeRate}</div>
                      <div className="text-app-text-muted">Strike Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.fifties}</div>
                      <div className="text-app-text-muted">50's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.hundreds}</div>
                      <div className="text-app-text-muted">100's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.twoHundreds}</div>
                      <div className="text-app-text-muted">200's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.average}</div>
                      <div className="text-app-text-muted">Average</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.balls}</div>
                      <div className="text-app-text-muted">Balls</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.threeHundreds}</div>
                      <div className="text-app-text-muted">300's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.fours}</div>
                      <div className="text-app-text-muted">4's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.sixes}</div>
                      <div className="text-app-text-muted">6's</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBattingStats.ducks}</div>
                      <div className="text-app-text-muted">Ducks</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bowling Stats */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-app-text-base mb-4">Bowling Stats</h3>
                <div className="flex space-x-2 mb-4">
                  {[
                    { key: 't20', label: 'T20' },
                    { key: 'odi', label: 'ODI' },
                    { key: 'test', label: 'TEST' }
                  ].map((format) => (
                    <button
                      key={format.key}
                      onClick={() => setSelectedBowlingFormat(format.key as 't20' | 'odi' | 'test')}
                      className={`px-4 py-2 rounded text-sm font-medium ${
                        selectedBowlingFormat === format.key
                          ? 'bg-app-primary text-white' 
                          : 'bg-app-bg text-app-text-muted hover:text-app-text-base'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
                {currentBowlingStats.matches === '0' && currentBowlingStats.wickets === '0' ? (
                  <div className="text-center py-8 text-app-text-muted">
                    <p>No bowling statistics available for {selectedBowlingFormat.toUpperCase()} format</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.matches}</div>
                      <div className="text-app-text-muted">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.innings}</div>
                      <div className="text-app-text-muted">Innings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.wickets}</div>
                      <div className="text-app-text-muted">Wickets</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.balls}</div>
                      <div className="text-app-text-muted">Balls</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.runs}</div>
                      <div className="text-app-text-muted">Runs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.overs}</div>
                      <div className="text-app-text-muted">Overs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.economy}</div>
                      <div className="text-app-text-muted">Economy</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.maidens}</div>
                      <div className="text-app-text-muted">Maidens</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.bbi}</div>
                      <div className="text-app-text-muted">BBI</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.fourWickets}</div>
                      <div className="text-app-text-muted">4W</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.fiveWickets}</div>
                      <div className="text-app-text-muted">5W</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.tenWickets}</div>
                      <div className="text-app-text-muted">10W</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.hattricks}</div>
                      <div className="text-app-text-muted">Hattricks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.average}</div>
                      <div className="text-app-text-muted">Average</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-app-text-base">{currentBowlingStats.strikeRate}</div>
                      <div className="text-app-text-muted">Strike Rate</div>
                    </div>
                  </div>
                )}
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