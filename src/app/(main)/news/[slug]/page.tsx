import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine, RiCalendarLine, RiUserLine, RiEyeLine, RiBookmarkLine, RiShareLine, RiPriceTag3Line, RiTimeLine } from 'react-icons/ri';

// Mock blog data - in real app this would come from API
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Cricket Moments of 2024',
    excerpt: 'A comprehensive look at the most memorable cricket moments that defined the year 2024, from stunning catches to record-breaking performances.',
    content: `
      <p>The year 2024 has been nothing short of spectacular for cricket fans worldwide. From nail-biting finishes to record-breaking performances, the sport has continued to captivate audiences across the globe. In this comprehensive analysis, we dive deep into the top 10 moments that have defined cricket in 2024.</p>
      
      <h2>1. The Miracle at Lord's</h2>
      <p>England's dramatic victory against Australia in the final session of the fifth Test at Lord's will go down as one of the greatest comebacks in cricket history. Chasing 378, England were 9 wickets down with 70 runs still needed when the last-wicket pair of James Anderson and Stuart Broad put on a masterclass in defensive batting, eventually securing a draw that felt like a victory.</p>
      
      <h2>2. Kohli's Record-Breaking Century</h2>
      <p>Virat Kohli's 50th ODI century against New Zealand in the World Cup semi-final was not just a personal milestone but a testament to his consistency and determination. The way he paced his innings, building partnerships and accelerating at the right moments, showed why he's considered one of the greatest batsmen of all time.</p>
      
      <h2>3. Afghanistan's Historic World Cup Run</h2>
      <p>Afghanistan's journey to the World Cup semi-finals was the feel-good story of the tournament. Their victories against established teams like England and Pakistan showcased the depth of talent in associate nations and the growing competitiveness of world cricket.</p>
      
      <h2>4. The Rise of Young Talent</h2>
      <p>2024 saw the emergence of several young players who announced themselves on the world stage. From India's Yashasvi Jaiswal to Australia's Jake Fraser-McGurk, these players brought fresh energy and innovative approaches to the game.</p>
      
      <h2>5. Technology's Impact on Decision Making</h2>
      <p>The increased use of technology in cricket, from ball-tracking to AI-powered analytics, has transformed how the game is played and analyzed. Teams are now using data-driven approaches to strategy, making cricket more scientific than ever before.</p>
      
      <h2>6. The T20 Revolution Continues</h2>
      <p>The shortest format of the game continues to evolve with new shots, innovative field placements, and strategic innovations. The IPL and other T20 leagues have become breeding grounds for new techniques and strategies.</p>
      
      <h2>7. Women's Cricket Takes Center Stage</h2>
      <p>The growth of women's cricket has been phenomenal, with record-breaking attendances and viewership. The quality of play has improved dramatically, making women's cricket as entertaining as the men's game.</p>
      
      <h2>8. The Spirit of Cricket Debate</h2>
      <p>Several incidents throughout the year sparked discussions about the spirit of cricket, from Mankading to aggressive sledging. These debates highlighted the importance of maintaining the game's traditional values while embracing modern competitiveness.</p>
      
      <h2>9. The Future of Test Cricket</h2>
      <p>Despite the popularity of shorter formats, Test cricket continues to thrive, with innovations like day-night Tests and the World Test Championship adding new dimensions to the traditional format.</p>
      
      <h2>10. Global Cricket's Expansion</h2>
      <p>The ICC's efforts to expand cricket globally have borne fruit, with new nations making their mark in international cricket. This expansion is crucial for the sport's long-term growth and sustainability.</p>
      
      <p>As we look back on these moments, it's clear that cricket in 2024 has been about more than just runs and wickets. It's been about passion, innovation, and the enduring appeal of a sport that continues to evolve while staying true to its roots.</p>
    `,
    author: 'Admin',
    publishedAt: '2024-01-15',
    views: 1247,
    slug: 'top-10-cricket-moments-2024',
    featuredImage: '/api/placeholder/400/250',
    category: 'Analysis',
    tags: ['2024', 'Highlights', 'Records'],
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Analysis: India vs Australia Test Series',
    excerpt: 'Deep dive into the strategies, key players, and turning points of the recent test series between cricket powerhouses.',
    content: `
      <p>The recent test series between India and Australia has been a masterclass in tactical cricket. Both teams brought their A-game, resulting in some of the most competitive cricket we've seen in recent years.</p>
      
      <h2>Key Strategies</h2>
      <p>India's approach focused on spin-friendly conditions and aggressive batting, while Australia relied on pace and disciplined bowling. The contrasting styles created fascinating tactical battles throughout the series.</p>
      
      <h2>Standout Performances</h2>
      <p>Several players rose to the occasion, with both teams showcasing depth in batting and bowling departments. The series highlighted the importance of adaptability in modern cricket.</p>
    `,
    author: 'Admin',
    publishedAt: '2024-01-12',
    views: 892,
    slug: 'india-vs-australia-test-series-analysis',
    featuredImage: '/api/placeholder/400/250',
    category: 'Analysis',
    tags: ['India', 'Australia', 'Test Series'],
    readTime: '6 min read'
  }
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsArticlePage({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-app-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-app-text-base mb-4">Article Not Found</h1>
            <p className="text-app-text-muted mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/news" className="bg-app-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-app-primary-hover transition-colors">
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/news" className="flex items-center space-x-2 text-app-text-muted hover:text-app-text-base transition-colors mb-6">
            <RiArrowLeftSLine className="w-5 h-5" />
            <span>Back to News</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
              {/* Article Header */}
              <div className="h-64 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <RiBookmarkLine className="w-16 h-16 text-app-primary mx-auto mb-4" />
                  <div className="text-sm text-white/80">FEATURED</div>
                </div>
              </div>
              
              <div className="p-6 lg:p-8">
                {/* Article Meta */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="bg-app-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1 text-app-text-muted text-sm">
                      <RiCalendarLine className="w-4 h-4" />
                      <span>{post.publishedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-app-text-muted text-sm">
                      <RiTimeLine className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-app-text-muted hover:text-app-primary transition-colors">
                      <RiBookmarkLine className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-app-text-muted hover:text-app-primary transition-colors">
                      <RiShareLine className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-app-text-base mb-6">
                  {post.title}
                </h1>

                {/* Article Excerpt */}
                <p className="text-lg text-app-text-muted mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none text-app-text-base"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-app-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <RiPriceTag3Line className="w-5 h-5 text-app-text-muted" />
                    <span className="text-sm font-semibold text-app-text-base">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-app-primary/10 text-app-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-app-border">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-app-primary rounded-full flex items-center justify-center">
                      <RiUserLine className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-app-text-base">{post.author}</h3>
                      <p className="text-sm text-app-text-muted">Cricket Analyst & Writer</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Article Stats */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-app-text-base mb-4">Article Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-app-text-muted">Views</span>
                  <span className="font-semibold text-app-text-base">{post.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-app-text-muted">Read Time</span>
                  <span className="font-semibold text-app-text-base">{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-app-text-muted">Published</span>
                  <span className="font-semibold text-app-text-base">{post.publishedAt}</span>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-app-text-base mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/news/${relatedPost.slug}`} className="block hover:bg-app-hover rounded-lg p-3 transition-colors">
                    <h4 className="font-semibold text-app-text-base mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-app-text-muted">
                      <RiCalendarLine className="w-3 h-3" />
                      <span>{relatedPost.publishedAt}</span>
                      <RiEyeLine className="w-3 h-3" />
                      <span>{relatedPost.views}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 