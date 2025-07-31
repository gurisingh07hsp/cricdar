"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  RiSaveLine, 
  RiEyeLine, 
  RiSettings3Line,
  RiImageLine,
  RiCalendarLine,
  RiUserLine,
  RiFileTextLine,
  RiSearchLine,
  RiArrowLeftLine
} from 'react-icons/ri';
import { addBlogPost } from '../page';
import { getAuthors } from '../../authors/page';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export default function NewBlogPost() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    url: '',
    status: 'draft',
    author: '',
    publishDate: '',
    featuredImage: '',
    tags: ''
  });

  // Load authors on component mount
  React.useEffect(() => {
    const allAuthors = getAuthors();
    setAuthors(allAuthors);
    // Set default author to first active author
    const activeAuthor = allAuthors.find(author => author.status === 'active');
    if (activeAuthor && !formData.author) {
      setFormData(prev => ({ ...prev, author: activeAuthor.name }));
    }
  }, []);

  const [seoData, setSeoData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: ''
  });

  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate SEO title and description if empty
    if (field === 'title' && !seoData.title) {
      setSeoData(prev => ({ ...prev, title: value }));
    }
    if (field === 'excerpt' && !seoData.description) {
      setSeoData(prev => ({ ...prev, description: value }));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    handleInputChange('title', value);
    const newSlug = generateSlug(value);
    handleInputChange('slug', newSlug);
    handleInputChange('url', `/blog/${newSlug}`);
  };

  const handlePublish = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }
    if (!formData.content.trim()) {
      alert('Please enter content for your blog post');
      return;
    }
    if (!formData.slug.trim()) {
      alert('Please enter a URL slug for your blog post');
      return;
    }
    
    // Set status to published
    handleInputChange('status', 'published');
    
    // Add the blog post to the store
    const _newPost = addBlogPost({
      title: formData.title,
      excerpt: formData.excerpt,
      status: 'published',
      author: formData.author,
      slug: formData.slug
    });
    
    // Show success message
    alert(`Blog post "${formData.title}" published successfully!`);
    
    // Redirect to blogs list after a short delay
    setTimeout(() => {
      window.location.href = '/admin/blogs';
    }, 1000);
  };

  const handleSaveDraft = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }
    
    // Set status to draft
    handleInputChange('status', 'draft');
    
    // Add the blog post to the store as draft
    const _newPost = addBlogPost({
      title: formData.title,
      excerpt: formData.excerpt,
      status: 'draft',
      author: formData.author,
      slug: formData.slug
    });
    
    // Show success message
    alert(`Blog post "${formData.title}" saved as draft!`);
    
    // Redirect to blogs list after a short delay
    setTimeout(() => {
      window.location.href = '/admin/blogs';
    }, 1000);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeTab === id
          ? 'bg-app-primary text-white'
          : 'text-app-text-muted hover:text-app-text-base hover:bg-app-surface'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/blogs"
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-surface rounded-lg transition-colors"
          >
            <RiArrowLeftLine className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-app-text-base">New Article</h1>
            <p className="text-app-text-muted mt-1">Create a new news article with SEO optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleSaveDraft()}
            className="flex items-center space-x-2 px-4 py-2 border border-app-border text-app-text-base rounded-lg hover:bg-app-surface transition-colors"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-app-border text-app-text-base rounded-lg hover:bg-app-surface transition-colors">
            <RiEyeLine className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button 
            onClick={() => handlePublish()}
            className="flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-app-border">
        <TabButton id="content" label="Content" icon={RiFileTextLine} />
        <TabButton id="seo" label="SEO" icon={RiSearchLine} />
        <TabButton id="settings" label="Settings" icon={RiSettings3Line} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'content' && (
            <>
              {/* Title */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Article Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your article title..."
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent text-xl font-medium"
                />
              </div>

              {/* Content Editor */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your article content here..."
                  rows={20}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent resize-none"
                />
              </div>

              {/* Excerpt */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of your article..."
                  rows={3}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent resize-none"
                />
              </div>
            </>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              {/* SEO Title */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoData.title}
                  onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="SEO optimized title..."
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  Recommended length: 50-60 characters
                </p>
              </div>

              {/* SEO Description */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Meta Description
                </label>
                <textarea
                  value={seoData.description}
                  onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description for search engines..."
                  rows={3}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent resize-none"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  Recommended length: 150-160 characters
                </p>
              </div>

              {/* Keywords */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="cricket, analysis, sports..."
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  Separate keywords with commas
                </p>
              </div>

              {/* OG Image */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Open Graph Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={seoData.ogImage}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                  <button className="px-4 py-3 border border-app-border rounded-lg text-app-text-muted hover:text-app-text-base hover:bg-app-surface transition-colors">
                    <RiImageLine className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Canonical URL */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  placeholder="https://example.com/post-url"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Slug */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    handleInputChange('slug', e.target.value);
                    handleInputChange('url', `/blog/${e.target.value}`);
                  }}
                  placeholder="post-url-slug"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  This will be used in the URL: cricdar.com/blog/{formData.slug || 'your-slug'}
                </p>
              </div>

              {/* Full URL */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Full URL
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://cricdar.com/blog/your-post"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  The complete URL for your blog post
                </p>
              </div>

              {/* Tags */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="cricket, analysis, sports"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              {/* Featured Image */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Featured Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                  <button className="px-4 py-3 border border-app-border rounded-lg text-app-text-muted hover:text-app-text-base hover:bg-app-surface transition-colors">
                    <RiImageLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish Settings */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">Publish Settings</h3>
            
            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-app-text-base mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <p className="text-xs text-app-text-muted mt-1">
                Current: {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
              </p>
            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-app-text-base mb-2">
                Author
              </label>
              <div className="flex items-center space-x-2">
                <RiUserLine className="text-app-text-muted w-4 h-4" />
                <select
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                >
                  <option value="">Select an author</option>
                  {authors.filter(author => author.status === 'active').map((author) => (
                    <option key={author.id} value={author.name}>
                      {author.name} ({author.role})
                    </option>
                  ))}
                </select>
              </div>
              {authors.length === 0 && (
                <p className="text-xs text-app-text-muted mt-1">
                  No active authors found. <Link href="/admin/authors/new" className="text-app-primary hover:underline">Create an author</Link>
                </p>
              )}
            </div>

            {/* Publish Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-app-text-base mb-2">
                Publish Date
              </label>
              <div className="flex items-center space-x-2">
                <RiCalendarLine className="text-app-text-muted w-4 h-4" />
                <input
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* SEO Preview */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">SEO Preview</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-app-text-muted mb-1">Title</p>
                <p className="text-sm text-app-text-base font-medium line-clamp-2">
                  {seoData.title || formData.title || 'Your post title will appear here'}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-app-text-muted mb-1">Description</p>
                <p className="text-sm text-app-text-base line-clamp-3">
                  {seoData.description || formData.excerpt || 'Your meta description will appear here'}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-app-text-muted mb-1">URL</p>
                <p className="text-sm text-app-primary">
                  {formData.url || `cricdar.com/blog/${formData.slug || 'your-post-slug'}`}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>Save as Draft</span>
                <RiSaveLine className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>Preview Post</span>
                <RiEyeLine className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>SEO Analysis</span>
                <RiSearchLine className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 