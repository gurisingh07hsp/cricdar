"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiArrowLeftLine, 
  RiEditLine, 
  RiUserLine, 
  RiMailLine, 
  RiMapPinLine, 
  RiGlobeLine, 
  RiTwitterLine, 
  RiLinkedinBoxLine, 
  RiGithubLine, 
  RiEyeLine, 
  RiArticleLine,
  RiSettings3Line
} from 'react-icons/ri';
import { getAuthors } from '../page';

interface PageProps {
  params: { id: string };
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Active' },
    inactive: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', label: 'Inactive' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = {
    admin: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Admin' },
    editor: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Editor' },
    author: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Author' },
    contributor: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Contributor' }
  };

  const config = roleConfig[role as keyof typeof roleConfig];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default function AuthorProfilePage({ params }: PageProps) {
  const [author, setAuthor] = useState<any>(null);
  const [authorPosts, setAuthorPosts] = useState<any[]>([]);

  useEffect(() => {
    const authors = getAuthors();
    const foundAuthor = authors.find(a => a.id === params.id);
    setAuthor(foundAuthor);

    // Get author's posts from blog posts
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('blogPosts');
      if (stored) {
        const posts = JSON.parse(stored);
        const authorPosts = posts.filter((post: any) => post.author === foundAuthor?.name);
        setAuthorPosts(authorPosts);
      }
    }
  }, [params.id]);

  if (!author) {
    return (
      <div className="min-h-screen bg-app-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-app-surface border border-app-border rounded-lg p-8">
              <h1 className="text-2xl font-bold text-app-text-base mb-4">Author Not Found</h1>
              <p className="text-app-text-muted mb-6">The author you're looking for doesn't exist.</p>
              <Link href="/admin/authors" className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                <RiArrowLeftLine className="w-4 h-4" />
                <span>Back to Authors</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/authors" 
            className="inline-flex items-center space-x-2 text-app-primary hover:text-app-primary-hover transition-colors mb-4"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            <span>Back to Authors</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Author Header */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-app-primary/20 rounded-full flex items-center justify-center">
                    <RiUserLine className="w-10 h-10 text-app-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-app-text-base mb-2">{author.name}</h1>
                    <p className="text-app-text-muted mb-3">{author.email}</p>
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={author.status} />
                      <RoleBadge role={author.role} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/authors/${author.id}/edit`}
                    className="flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
                  >
                    <RiEditLine className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Link>
                </div>
              </div>

              {/* Author Bio */}
              {author.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-app-text-base mb-3">About</h3>
                  <p className="text-app-text-muted leading-relaxed">{author.bio}</p>
                </div>
              )}

              {/* Author Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-app-bg rounded-lg">
                  <div className="text-2xl font-bold text-app-text-base">{author.postsCount}</div>
                  <div className="text-sm text-app-text-muted">Posts</div>
                </div>
                <div className="text-center p-4 bg-app-bg rounded-lg">
                  <div className="text-2xl font-bold text-app-text-base">{author.views || 0}</div>
                  <div className="text-sm text-app-text-muted">Total Views</div>
                </div>
                <div className="text-center p-4 bg-app-bg rounded-lg">
                  <div className="text-2xl font-bold text-app-text-base">{author.status === 'active' ? 'Active' : 'Inactive'}</div>
                  <div className="text-sm text-app-text-muted">Status</div>
                </div>
                <div className="text-center p-4 bg-app-bg rounded-lg">
                  <div className="text-2xl font-bold text-app-text-base capitalize">{author.role}</div>
                  <div className="text-sm text-app-text-muted">Role</div>
                </div>
              </div>
            </div>

            {/* Author's Posts */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-app-text-base">Recent Posts</h2>
                <Link 
                  href="/admin/blogs" 
                  className="text-sm text-app-primary hover:text-app-primary-hover"
                >
                  View All Posts
                </Link>
              </div>

              {authorPosts.length > 0 ? (
                <div className="space-y-4">
                  {authorPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-app-bg rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-app-text-base mb-1">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-app-text-muted">
                          <span>{post.publishedAt}</span>
                          <span>{post.views} views</span>
                          <StatusBadge status={post.status} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-app-text-muted hover:text-app-primary transition-colors"
                        >
                          <RiEyeLine className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blogs/${post.id}/edit`}
                          className="p-2 text-app-text-muted hover:text-app-primary transition-colors"
                        >
                          <RiEditLine className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <RiArticleLine className="w-12 h-12 text-app-text-muted mx-auto mb-4" />
                  <p className="text-app-text-muted">No posts found for this author</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <h3 className="font-semibold text-app-text-base mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RiMailLine className="w-4 h-4 text-app-text-muted" />
                  <span className="text-sm text-app-text-base">{author.email}</span>
                </div>
                {author.location && (
                  <div className="flex items-center space-x-3">
                    <RiMapPinLine className="w-4 h-4 text-app-text-muted" />
                    <span className="text-sm text-app-text-base">{author.location}</span>
                  </div>
                )}
                {author.website && (
                  <div className="flex items-center space-x-3">
                    <RiGlobeLine className="w-4 h-4 text-app-text-muted" />
                    <a 
                      href={author.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-app-primary hover:underline"
                    >
                      {author.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {(author.socialLinks?.twitter || author.socialLinks?.linkedin || author.socialLinks?.github) && (
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="font-semibold text-app-text-base mb-4">Social Links</h3>
                <div className="space-y-3">
                  {author.socialLinks?.twitter && (
                    <a 
                      href={author.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-sm text-app-text-base hover:text-app-primary transition-colors"
                    >
                      <RiTwitterLine className="w-4 h-4 text-blue-400" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {author.socialLinks?.linkedin && (
                    <a 
                      href={author.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-sm text-app-text-base hover:text-app-primary transition-colors"
                    >
                      <RiLinkedinBoxLine className="w-4 h-4 text-blue-600" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {author.socialLinks?.github && (
                    <a 
                      href={author.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-sm text-app-text-base hover:text-app-primary transition-colors"
                    >
                      <RiGithubLine className="w-4 h-4 text-gray-800" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <h3 className="font-semibold text-app-text-base mb-4">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-app-text-muted">Member since:</span>
                  <span className="text-app-text-base">{author.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-muted">Last active:</span>
                  <span className="text-app-text-base">{author.lastActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-muted">Role:</span>
                  <RoleBadge role={author.role} />
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-muted">Status:</span>
                  <StatusBadge status={author.status} />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-app-surface border border-app-border rounded-lg p-6">
              <h3 className="font-semibold text-app-text-base mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                  <RiMailLine className="w-4 h-4 inline mr-2" />
                  Send Message
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                  <RiSettings3Line className="w-4 h-4 inline mr-2" />
                  Change Role
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                  <RiUserLine className="w-4 h-4 inline mr-2" />
                  View Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 