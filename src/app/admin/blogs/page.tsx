"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiAddLine, 
  RiEditLine, 
  RiDeleteBinLine, 
  RiEyeLine,
  RiSearchLine,
  RiFilter3Line,
  RiArticleLine
} from 'react-icons/ri';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  status: 'published' | 'draft' | 'scheduled';
  author: string;
  publishedAt: string;
  views: number;
  slug: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Cricket Moments of 2024',
    excerpt: 'A comprehensive look at the most memorable cricket moments that defined the year 2024...',
    status: 'published',
    author: 'Admin',
    publishedAt: '2024-01-15',
    views: 1247,
    slug: 'top-10-cricket-moments-2024'
  },
  {
    id: '2',
    title: 'Analysis: India vs Australia Test Series',
    excerpt: 'Deep dive into the strategies, key players, and turning points of the recent test series...',
    status: 'published',
    author: 'Admin',
    publishedAt: '2024-01-12',
    views: 892,
    slug: 'india-vs-australia-test-series-analysis'
  },
  {
    id: '3',
    title: 'The Future of Cricket Technology',
    excerpt: 'Exploring how AI, analytics, and new technologies are reshaping the game of cricket...',
    status: 'draft',
    author: 'Admin',
    publishedAt: '2024-01-10',
    views: 0,
    slug: 'future-of-cricket-technology'
  },
  {
    id: '4',
    title: 'Player Spotlight: Virat Kohli',
    excerpt: 'An in-depth analysis of Virat Kohli\'s career, achievements, and impact on modern cricket...',
    status: 'scheduled',
    author: 'Admin',
    publishedAt: '2024-01-20',
    views: 0,
    slug: 'player-spotlight-virat-kohli'
  }
];

// Store for managing blog posts across the app
let blogPostsStore: BlogPost[] = [];

// Initialize store from localStorage or use mock data
const initializeBlogPostsStore = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
      blogPostsStore = JSON.parse(stored);
    } else {
      blogPostsStore = [...mockBlogPosts];
      localStorage.setItem('blogPosts', JSON.stringify(blogPostsStore));
    }
  } else {
    blogPostsStore = [...mockBlogPosts];
  }
};

// Initialize store
initializeBlogPostsStore();

export const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishedAt' | 'views'>) => {
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString().split('T')[0],
    views: 0
  };
  blogPostsStore.unshift(newPost); // Add to beginning of array
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('blogPosts', JSON.stringify(blogPostsStore));
  }
  
  return newPost;
};

export const getBlogPosts = () => {
  // Always get fresh data from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
      blogPostsStore = JSON.parse(stored);
    }
  }
  return blogPostsStore;
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    published: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Published' },
    draft: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Draft' },
    scheduled: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Scheduled' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update the state whenever the store changes
  const updateBlogPosts = () => {
    const freshPosts = getBlogPosts();
    setBlogPosts(freshPosts);
    setIsLoading(false);
  };

  // Force a re-render when the component mounts or when navigating back
  useEffect(() => {
    updateBlogPosts();
  }, []);

  // Refresh data when the page becomes visible (when navigating back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateBlogPosts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mt-2"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
        <div className="bg-app-surface border border-app-border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
        </div>
        <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-app-text-base">News</h1>
          <p className="text-app-text-muted mt-1">Manage your news articles and posts</p>
        </div>
                  <Link 
            href="/admin/blogs/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
          >
            <RiAddLine className="w-4 h-4" />
            <span>New Article</span>
          </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-app-surface border border-app-border rounded-lg p-4">
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
            <RiFilter3Line className="text-app-text-muted w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="bg-app-primary/10 border border-app-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-app-text-base">
              {selectedPosts.length} article{selectedPosts.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover transition-colors">
                Publish
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-app-bg border-b border-app-border">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-app-border text-app-primary focus:ring-app-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-app-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="rounded border-app-border text-app-primary focus:ring-app-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-app-text-base">{post.title}</div>
                      <div className="text-sm text-app-text-muted mt-1 line-clamp-2">{post.excerpt}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-app-text-base">{post.author}</td>
                  <td className="px-6 py-4 text-sm text-app-text-muted">{post.publishedAt}</td>
                  <td className="px-6 py-4 text-sm text-app-text-base">{post.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="p-1 text-app-text-muted hover:text-app-primary transition-colors"
                      >
                        <RiEditLine className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1 text-app-text-muted hover:text-app-primary transition-colors"
                      >
                        <RiEyeLine className="w-4 h-4" />
                      </Link>
                      <button className="p-1 text-app-text-muted hover:text-red-500 transition-colors">
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-app-text-muted mb-4">
            <RiArticleLine className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-app-text-base mb-2">No articles found</h3>
            <p className="text-app-text-muted">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
} 