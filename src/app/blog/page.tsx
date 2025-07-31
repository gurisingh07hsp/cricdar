"use client";
import React from 'react';
import Link from 'next/link';
import { RiSearchLine, RiFilterLine, RiCalendarLine, RiUserLine, RiEyeLine, RiArrowLeftSLine } from 'react-icons/ri';

// Get blog posts from localStorage
const getBlogPosts = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
};

export default function BlogPage() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('published');

  React.useEffect(() => {
    const allPosts = getBlogPosts();
    setPosts(allPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const featuredPost = filteredPosts.find(post => post.status === 'published');
  const otherPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-app-primary hover:text-app-primary-hover transition-colors mb-4"
          >
            <RiArrowLeftSLine className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-app-text-base mb-2">Blog</h1>
          <p className="text-app-text-muted">Latest cricket news, analysis, and insights</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-app-text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <RiFilterLine className="text-app-text-muted w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-app-surface border border-app-border rounded-lg p-8">
              <h2 className="text-xl font-semibold text-app-text-base mb-2">No posts found</h2>
              <p className="text-app-text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredPost && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-app-text-base mb-6">Featured Article</h2>
                <article className="bg-app-surface border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-64 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-sm text-white/80 mb-2">FEATURED</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-app-text-muted mb-4">
                      <div className="flex items-center space-x-1">
                        <RiUserLine className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RiCalendarLine className="w-4 h-4" />
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RiEyeLine className="w-4 h-4" />
                        <span>{featuredPost.views} views</span>
                      </div>
                    </div>
                    <p className="text-app-text-muted mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center space-x-2 text-app-primary hover:text-app-primary-hover font-semibold"
                    >
                      <span>Read More</span>
                      <RiArrowLeftSLine className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </article>
              </div>
            )}

            {/* Articles Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-6">
                {featuredPost ? 'Latest Articles' : 'All Articles'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((post) => (
                  <article key={post.id} className="bg-app-surface border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-xs text-white/80 mb-2">BLOG</div>
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-app-text-muted mb-3">
                        <div className="flex items-center space-x-1">
                          <RiUserLine className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RiCalendarLine className="w-3 h-3" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RiEyeLine className="w-3 h-3" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <p className="text-sm text-app-text-muted mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-1 text-app-primary hover:text-app-primary-hover text-sm font-semibold"
                      >
                        <span>Read More</span>
                        <RiArrowLeftSLine className="w-3 h-3 rotate-180" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 