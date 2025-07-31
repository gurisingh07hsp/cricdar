import React from 'react';
import Link from 'next/link';
import { RiSearchLine, RiFilterLine, RiCalendarLine, RiUserLine, RiEyeLine, RiBookmarkLine, RiArrowLeftSLine } from 'react-icons/ri';

// Mock blog data - in real app this would come from API
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Cricket Moments of 2024',
    excerpt: 'A comprehensive look at the most memorable cricket moments that defined the year 2024, from stunning catches to record-breaking performances.',
    content: 'The year 2024 has been nothing short of spectacular for cricket fans worldwide. From nail-biting finishes to record-breaking performances, the sport has continued to captivate audiences across the globe. In this comprehensive analysis, we dive deep into the top 10 moments that have defined cricket in 2024...',
    author: 'Admin',
    publishedAt: '2024-01-15',
    views: 1247,
    slug: 'top-10-cricket-moments-2024',
    featuredImage: '/api/placeholder/400/250',
    category: 'Analysis',
    tags: ['2024', 'Highlights', 'Records']
  },
  {
    id: '2',
    title: 'Analysis: India vs Australia Test Series',
    excerpt: 'Deep dive into the strategies, key players, and turning points of the recent test series between cricket powerhouses.',
    content: 'The recent test series between India and Australia has been a masterclass in tactical cricket. Both teams brought their A-game, resulting in some of the most competitive cricket we\'ve seen in recent years. Let\'s analyze the key strategies, standout performances, and crucial turning points...',
    author: 'Admin',
    publishedAt: '2024-01-12',
    views: 892,
    slug: 'india-vs-australia-test-series-analysis',
    featuredImage: '/api/placeholder/400/250',
    category: 'Analysis',
    tags: ['India', 'Australia', 'Test Series']
  },
  {
    id: '3',
    title: 'The Future of Cricket Technology',
    excerpt: 'Exploring how AI, analytics, and new technologies are reshaping the game of cricket and improving player performance.',
    content: 'Technology is revolutionizing every aspect of cricket, from player analytics to fan engagement. Artificial intelligence is helping teams analyze player performance, predict match outcomes, and develop winning strategies. Let\'s explore how these innovations are shaping the future of the sport...',
    author: 'Admin',
    publishedAt: '2024-01-10',
    views: 567,
    slug: 'future-of-cricket-technology',
    featuredImage: '/api/placeholder/400/250',
    category: 'Technology',
    tags: ['AI', 'Analytics', 'Innovation']
  },
  {
    id: '4',
    title: 'Rising Stars: Young Players to Watch in 2024',
    excerpt: 'Meet the emerging talents who are set to dominate cricket in the coming years with their exceptional skills and determination.',
    content: 'Every year brings new talent to the forefront of cricket. These young players are not just promising; they\'re already making waves in international cricket. From explosive batsmen to crafty bowlers, these rising stars are the future of the game...',
    author: 'Admin',
    publishedAt: '2024-01-08',
    views: 445,
    slug: 'rising-stars-2024',
    featuredImage: '/api/placeholder/400/250',
    category: 'Players',
    tags: ['Young Players', 'Talent', 'Future']
  },
  {
    id: '5',
    title: 'Cricket World Cup 2024: What to Expect',
    excerpt: 'Preview of the upcoming Cricket World Cup with team analysis, venue insights, and predictions for the tournament.',
    content: 'The Cricket World Cup 2024 is shaping up to be one of the most competitive tournaments in recent history. With multiple teams in peak form and new venues being introduced, this World Cup promises to deliver unforgettable moments...',
    author: 'Admin',
    publishedAt: '2024-01-05',
    views: 1234,
    slug: 'cricket-world-cup-2024-preview',
    featuredImage: '/api/placeholder/400/250',
    category: 'Tournaments',
    tags: ['World Cup', '2024', 'Tournament']
  },
  {
    id: '6',
    title: 'The Evolution of T20 Cricket',
    excerpt: 'How T20 cricket has evolved over the years and its impact on the traditional formats of the game.',
    content: 'T20 cricket has transformed the landscape of the sport since its introduction. From innovative batting techniques to strategic bowling variations, this format has influenced how cricket is played across all formats...',
    author: 'Admin',
    publishedAt: '2024-01-03',
    views: 678,
    slug: 'evolution-of-t20-cricket',
    featuredImage: '/api/placeholder/400/250',
    category: 'Analysis',
    tags: ['T20', 'Evolution', 'Cricket']
  }
];

const categories = ['All', 'Analysis', 'Players', 'Technology', 'Tournaments', 'News'];
const featuredPost = blogPosts[0];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/" className="flex items-center space-x-2 text-app-text-muted hover:text-app-text-base transition-colors">
              <RiArrowLeftSLine className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-app-text-base mb-4">Cricket News & Analysis</h1>
          <p className="text-lg text-app-text-muted">Stay updated with the latest cricket news, analysis, and insights from around the world.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-app-bg border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent text-app-text-base"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <RiFilterLine className="w-5 h-5 text-app-text-muted" />
              <select className="bg-app-bg border border-app-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent text-app-text-base">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-app-text-base mb-6">Featured Article</h2>
          <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-full bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <RiBookmarkLine className="w-16 h-16 text-app-primary mx-auto mb-4" />
                  <div className="text-sm text-white/80 mb-2">FEATURED</div>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-app-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center space-x-1 text-app-text-muted text-sm">
                    <RiCalendarLine className="w-4 h-4" />
                    <span>{featuredPost.publishedAt}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-app-text-base mb-4 line-clamp-2">
                  {featuredPost.title}
                </h3>
                <p className="text-app-text-muted mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-app-text-muted">
                    <div className="flex items-center space-x-1">
                      <RiUserLine className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RiEyeLine className="w-4 h-4" />
                      <span>{featuredPost.views} views</span>
                    </div>
                  </div>
                  <Link 
                    href={`/news/${featuredPost.slug}`}
                    className="bg-app-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-app-primary-hover transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-app-text-base mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-app-surface border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <RiBookmarkLine className="w-12 h-12 text-app-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-app-primary/10 text-app-primary text-xs font-semibold px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1 text-app-text-muted text-xs">
                      <RiCalendarLine className="w-3 h-3" />
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-app-text-base mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-app-text-muted text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-app-text-muted">
                      <div className="flex items-center space-x-1">
                        <RiUserLine className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RiEyeLine className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/news/${post.slug}`}
                      className="text-app-primary hover:text-app-primary-hover text-sm font-semibold"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-app-border rounded-lg text-app-text-base hover:bg-app-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 bg-app-primary text-white rounded-lg font-semibold">1</button>
              <button className="w-10 h-10 border border-app-border rounded-lg text-app-text-base hover:bg-app-hover transition-colors">2</button>
              <button className="w-10 h-10 border border-app-border rounded-lg text-app-text-base hover:bg-app-hover transition-colors">3</button>
            </div>
            <button className="px-4 py-2 border border-app-border rounded-lg text-app-text-base hover:bg-app-hover transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 