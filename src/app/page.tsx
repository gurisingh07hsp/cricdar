// src/app/page.tsx
import React from "react";
import Link from "next/link";
import { 
  RiBroadcastLine, 
  RiTrophyLine, 
  RiTeamLine, 
  RiSignalWifiErrorLine,
  RiMedalLine,
  RiGlobeLine,
  RiArticleLine
} from "react-icons/ri";

// API and Mapper Imports
import { getAllMatches, getSeriesList } from "@/lib/cricketdata-api";
import { mapApiMatchToMatchPreview, mapApiSeriesToSeriesPreview } from "@/lib/data-mappers";

// Component Imports
import MatchPreviewCard from "@/components/common/MatchPreviewCard";
import SeriesPreviewCard from "@/components/common/SeriesPreviewCard";

// Mock news data for latest news section
const mockNewsPosts = [
  {
    id: '1',
    title: 'Top 10 Cricket Moments of 2024',
    excerpt: 'A comprehensive look at the most memorable cricket moments that defined the year 2024...',
    author: 'Admin',
    publishedAt: '2024-01-15',
    views: 1247,
    slug: 'top-10-cricket-moments-2024',
    featuredImage: '/api/placeholder/400/250'
  },
  {
    id: '2',
    title: 'Analysis: India vs Australia Test Series',
    excerpt: 'Deep dive into the strategies, key players, and turning points of the recent test series...',
    author: 'Admin',
    publishedAt: '2024-01-12',
    views: 892,
    slug: 'india-vs-australia-test-series-analysis',
    featuredImage: '/api/placeholder/400/250'
  },
  {
    id: '3',
    title: 'The Future of Cricket Technology',
    excerpt: 'Exploring how AI, analytics, and new technologies are reshaping the game of cricket...',
    author: 'Admin',
    publishedAt: '2024-01-10',
    views: 567,
    slug: 'future-of-cricket-technology',
    featuredImage: '/api/placeholder/400/250'
  }
];

// Mock ranking data
const mockRankings = {
  test: [
    { rank: 1, team: 'Australia', rating: 124 },
    { rank: 2, team: 'South Africa', rating: 115 },
    { rank: 3, team: 'England', rating: 113 },
    { rank: 4, team: 'India', rating: 105 },
    { rank: 5, team: 'New Zealand', rating: 95 }
  ],
  odi: [
    { rank: 1, team: 'India', rating: 121 },
    { rank: 2, team: 'Australia', rating: 118 },
    { rank: 3, team: 'England', rating: 113 },
    { rank: 4, team: 'South Africa', rating: 110 },
    { rank: 5, team: 'Pakistan', rating: 106 }
  ],
  t20: [
    { rank: 1, team: 'India', rating: 264 },
    { rank: 2, team: 'England', rating: 259 },
    { rank: 3, team: 'Australia', rating: 258 },
    { rank: 4, team: 'South Africa', rating: 256 },
    { rank: 5, team: 'Pakistan', rating: 254 }
  ]
};

// Mock current series data
const mockCurrentSeries = [
  { id: '1', name: 'India tour of England', status: 'ongoing' },
  { id: '2', name: 'World Championship of Legends', status: 'ongoing' },
  { id: '3', name: 'Australia tour of West Indies', status: 'ongoing' },
  { id: '4', name: 'New Zealand tour of Zimbabwe', status: 'ongoing' },
  { id: '5', name: 'Pakistan tour of West Indies', status: 'ongoing' }
];

// Mock top teams data
const mockTopTeams = [
  { id: '1', name: 'India', flag: '🇮🇳', rating: 121 },
  { id: '2', name: 'Australia', flag: '🇦🇺', rating: 118 },
  { id: '3', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 113 },
  { id: '4', name: 'South Africa', flag: '🇿🇦', rating: 110 }
];

// Force dynamic rendering for this page since it fetches live data
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let apiMatches = null;
  let apiSeries = null;

  try {
    [apiMatches, apiSeries] = await Promise.all([
      getAllMatches(),
      getSeriesList()
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Continue with empty data - the page will show mock data or empty states
  }

  const allMatches = (apiMatches || []).map(mapApiMatchToMatchPreview);
  const liveMatches = allMatches.filter(m => m.status === 'Live').slice(0, 6);
  const _upcomingMatches = allMatches.filter(m => m.status === 'Upcoming').slice(0, 4);

  const allSeries = (apiSeries || []).map(mapApiSeriesToSeriesPreview);
  const _featuredSeries = allSeries.slice(0, 3);
  const moreSeriesToExplore = allSeries.slice(0, 4);

  const _scrollContainerClasses = "flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-app-border scrollbar-track-transparent";
  const _cardWrapperClasses = "flex-shrink-0 w-72 xs:w-80 sm:w-[330px]";

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Current Series */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RiTrophyLine className="w-5 h-5 text-app-primary" />
                  <h3 className="text-lg font-semibold text-app-text-base">Current Series</h3>
                </div>
              </div>
              <div className="space-y-3">
                {mockCurrentSeries.map((series) => (
                  <div key={series.id} className="p-3 bg-app-bg rounded-lg border border-app-border hover:border-app-primary/50 transition-colors">
                    <h4 className="text-sm font-medium text-app-text-base">{series.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-app-text-muted">{series.status}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rankings */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RiMedalLine className="w-5 h-5 text-app-primary" />
                  <h3 className="text-lg font-semibold text-app-text-base">Ranking</h3>
                </div>
                <Link href="/rankings" className="text-xs text-app-primary hover:text-app-primary-hover">
                  View All
                </Link>
              </div>
              
              {/* Ranking Tabs */}
              <div className="flex space-x-1 mb-4">
                {['TEST', 'ODI', 'T20I'].map((format) => (
                  <button
                    key={format}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      format === 'TEST' 
                        ? 'bg-app-primary text-white' 
                        : 'text-app-text-muted hover:text-app-text-base'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>

              {/* Ranking Table */}
              <div className="space-y-2">
                {mockRankings.test.map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-app-bg rounded">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-app-text-muted w-6">{team.rank}</span>
                      <span className="text-sm font-medium text-app-text-base">{team.team}</span>
                    </div>
                    <span className="text-xs font-medium text-app-primary">{team.rating}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-app-text-muted mt-3 text-center">
                Last Updated On 30 Jul 2025, 13:30 IST
              </p>
            </div>

            {/* Top Teams */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <RiGlobeLine className="w-5 h-5 text-app-primary" />
                <h3 className="text-lg font-semibold text-app-text-base">Top Teams</h3>
              </div>
              <div className="space-y-3">
                {mockTopTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-3 bg-app-bg rounded-lg border border-app-border hover:border-app-primary/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{team.flag}</span>
                      <span className="text-sm font-medium text-app-text-base">{team.name}</span>
                    </div>
                    <span className="text-xs font-medium text-app-primary">{team.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Matches Section */}
            {liveMatches.length > 0 ? (
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <RiBroadcastLine className="w-6 h-6 text-app-primary" />
                    <h2 className="text-xl font-bold text-app-text-base">Live Matches</h2>
                  </div>
                  <Link href="/matches?status=live" className="text-sm text-app-primary hover:text-app-primary-hover">
                    View All
                  </Link>
                </div>
                <div className={`${_scrollContainerClasses}`}>
                  {liveMatches.map(match => (
                    <div key={match.id} className={_cardWrapperClasses}>
                      <MatchPreviewCard {...match} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-app-surface border border-app-border rounded-lg p-8 text-center">
                <RiSignalWifiErrorLine className="w-12 h-12 mx-auto text-app-text-muted mb-4" />
                <h2 className="text-xl font-bold text-app-text-base mb-2">No Live Matches Currently</h2>
                <p className="text-app-text-muted mb-4">Check back soon or browse upcoming matches.</p>
                <Link href="/matches?status=upcoming" className="inline-block bg-app-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-app-primary-hover transition-colors">
                  View Upcoming Matches
                </Link>
              </div>
            )}

            {/* Latest News */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <RiArticleLine className="w-6 h-6 text-app-primary" />
                  <h2 className="text-xl font-bold text-app-text-base">Latest News</h2>
                </div>
                <Link href="/news" className="text-sm text-app-primary hover:text-app-primary-hover">
                  View All
                </Link>
              </div>
              
              {/* Featured News Article */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured Article */}
                <div className="lg:col-span-2">
                  <div className="bg-app-bg border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-64 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                      <RiArticleLine className="w-16 h-16 text-app-primary" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="text-xs text-white/80 mb-1">NEWS | {mockNewsPosts[0].publishedAt}</div>
                        <Link href={`/news/${mockNewsPosts[0].slug}`} className="block">
                          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 hover:text-app-primary/90 transition-colors">
                            {mockNewsPosts[0].title}
                          </h3>
                        </Link>
                        <div className="text-xs text-white/80">1 Hour ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar News Articles */}
                <div className="lg:col-span-1 space-y-4">
                  {mockNewsPosts.slice(1).map((post: any, index: number) => (
                    <div key={post.id} className="bg-app-bg border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex space-x-3 p-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 rounded flex items-center justify-center flex-shrink-0">
                          <RiArticleLine className="w-6 h-6 text-app-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/news/${post.slug}`} className="block">
                            <h4 className="text-sm font-semibold text-app-text-base mb-1 line-clamp-2 hover:text-app-primary transition-colors">
                              {post.title}
                            </h4>
                          </Link>
                          <div className="text-xs text-app-text-muted mb-1">NEWS | {post.publishedAt}</div>
                          <div className="text-xs text-app-text-muted">{index + 2} hours ago</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* More Series to Explore */}
            {moreSeriesToExplore.length > 0 && (
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <RiTrophyLine className="w-6 h-6 text-app-primary" />
                    <h2 className="text-xl font-bold text-app-text-base">More Series to Explore</h2>
                  </div>
                  <Link href="/series" className="text-sm text-app-primary hover:text-app-primary-hover">
                    View All
                  </Link>
                </div>
                <div className={`${_scrollContainerClasses}`}>
                  {moreSeriesToExplore.map(series => (
                    <div key={series.id} className={_cardWrapperClasses}>
                      <SeriesPreviewCard {...series} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Trending News */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RiArticleLine className="w-5 h-5 text-app-primary" />
                  <h3 className="text-lg font-semibold text-app-text-base">Trending News</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-app-text-base text-sm">India vs Australia Test Series Analysis</h4>
                      <p className="text-xs text-app-text-muted">2 hours ago</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-app-text-base text-sm">Cricket Technology Revolution</h4>
                      <p className="text-xs text-app-text-muted">4 hours ago</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-app-text-base text-sm">World Cup 2024 Predictions</h4>
                      <p className="text-xs text-app-text-muted">6 hours ago</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-app-text-base text-sm">Player of the Year Awards</h4>
                      <p className="text-xs text-app-text-muted">8 hours ago</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-app-text-base text-sm">Cricket Rules Update 2024</h4>
                      <p className="text-xs text-app-text-muted">12 hours ago</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cricket Equipment Advertisement */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RiTrophyLine className="w-5 h-5 text-app-primary" />
                  <h3 className="text-lg font-semibold text-app-text-base">Premium Cricket Gear</h3>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Professional Cricket Equipment</h4>
                  <p className="text-sm mb-3">Get the best bats, balls, and protective gear from top brands</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Premium Bats</span>
                      <span className="bg-white/20 px-2 py-1 rounded">-30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Protective Gear</span>
                      <span className="bg-white/20 px-2 py-1 rounded">-25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cricket Balls</span>
                      <span className="bg-white/20 px-2 py-1 rounded">-20%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-app-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-app-primary-hover transition-colors">
                Shop Now
              </button>
            </div>

            {/* Fantasy Cricket Advertisement */}
            <div className="bg-app-surface border border-app-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RiTeamLine className="w-5 h-5 text-app-primary" />
                  <h3 className="text-lg font-semibold text-app-text-base">Fantasy Cricket</h3>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-lg p-4 text-white mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Win Big with Fantasy Cricket</h4>
                  <p className="text-sm mb-3">Create your dream team and compete for prizes</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Daily Contests</span>
                      <span className="bg-white/20 px-2 py-1 rounded">₹10K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Weekly Leagues</span>
                      <span className="bg-white/20 px-2 py-1 rounded">₹50K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Grand Finale</span>
                      <span className="bg-white/20 px-2 py-1 rounded">₹1L</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-app-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-app-primary-hover transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
