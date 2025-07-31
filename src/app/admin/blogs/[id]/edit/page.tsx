"use client";
import { useState, useRef, useEffect } from 'react';
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
  RiArrowLeftLine,
  RiBold,
  RiItalic,
  RiHeading,
  RiDoubleQuotesL,
  RiListUnordered,
  RiListOrdered,
  RiLink,
  RiImageAddLine,
  RiVideoAddLine,
  RiFileAddLine
} from 'react-icons/ri';
import { getBlogPosts } from '../../page';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

// Rich Text Editor Component (same as in new page)
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showMediaMenu, setShowMediaMenu] = useState(false);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHTML = (html: string) => {
    document.execCommand('insertHTML', false, html);
    editorRef.current?.focus();
  };

  const formatHeading = (level: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const _container = range.commonAncestorContainer;
      
      // If text is selected, format it as heading
      if (!range.collapsed) {
        const heading = document.createElement(`h${level}`);
        heading.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(heading);
      } else {
        // If no text selected, insert a new heading
        const heading = document.createElement(`h${level}`);
        heading.textContent = `Heading ${level}`;
        range.insertNode(heading);
        // Move cursor to end of heading
        const newRange = document.createRange();
        newRange.setStartAfter(heading);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
    editorRef.current?.focus();
  };

  const insertList = (ordered: boolean) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (!range.collapsed) {
        // If text is selected, wrap it in list items
        const list = document.createElement(ordered ? 'ol' : 'ul');
        const listItem = document.createElement('li');
        listItem.innerHTML = range.toString();
        list.appendChild(listItem);
        range.deleteContents();
        range.insertNode(list);
      } else {
        // If no text selected, insert a new list
        const list = document.createElement(ordered ? 'ol' : 'ul');
        const listItem = document.createElement('li');
        listItem.textContent = 'List item';
        list.appendChild(listItem);
        range.insertNode(list);
        // Move cursor inside the list item
        const newRange = document.createRange();
        newRange.setStart(listItem.firstChild || listItem, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
    editorRef.current?.focus();
  };

  const handleMediaUpload = (type: 'image' | 'video' | 'file') => {
    const input = document.createElement('input');
    input.type = 'file';
    
    if (type === 'image') {
      input.accept = 'image/*';
    } else if (type === 'video') {
      input.accept = 'video/*';
    } else {
      input.accept = '*/*';
    }

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (type === 'image') {
            insertHTML(`<img src="${result}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`);
          } else if (type === 'video') {
            insertHTML(`<video controls style="max-width: 100%; height: auto;"><source src="${result}" type="${file.type}"></video>`);
          } else {
            insertHTML(`<a href="${result}" target="_blank" rel="noopener noreferrer">${file.name}</a>`);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="border border-app-border rounded-lg bg-app-bg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-app-border bg-app-surface">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => formatHeading(1)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Heading 1"
          >
            <RiHeading className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatHeading(2)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Heading 2"
          >
            <RiHeading className="w-4 h-4" />
            <span className="text-xs">2</span>
          </button>
          <button
            onClick={() => formatHeading(3)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Heading 3"
          >
            <RiHeading className="w-4 h-4" />
            <span className="text-xs">3</span>
          </button>
        </div>

        <div className="w-px h-6 bg-app-border mx-2"></div>

        {/* Text Styling */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => execCommand('bold')}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Bold"
          >
            <RiBold className="w-4 h-4" />
          </button>
          <button
            onClick={() => execCommand('italic')}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Italic"
          >
            <RiItalic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertHTML('<blockquote style="border-left: 4px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;">Quote text here</blockquote>')}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Quote"
          >
            <RiDoubleQuotesL className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-app-border mx-2"></div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertList(false)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Bullet List"
          >
            <RiListUnordered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertList(true)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Numbered List"
          >
            <RiListOrdered className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-app-border mx-2"></div>

        {/* Links */}
        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) {
              execCommand('createLink', url);
            }
          }}
          className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
          title="Insert Link"
        >
          <RiLink className="w-4 h-4" />
        </button>

        {/* Media Upload */}
        <div className="relative">
          <button
            onClick={() => setShowMediaMenu(!showMediaMenu)}
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors"
            title="Insert Media"
          >
            <RiImageAddLine className="w-4 h-4" />
          </button>
          
          {showMediaMenu && (
            <div className="absolute top-full left-0 mt-1 bg-app-surface border border-app-border rounded-lg shadow-lg z-10 min-w-[200px]">
              <button
                onClick={() => {
                  handleMediaUpload('image');
                  setShowMediaMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-app-text-base hover:bg-app-bg transition-colors"
              >
                <RiImageAddLine className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
              <button
                onClick={() => {
                  handleMediaUpload('video');
                  setShowMediaMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-app-text-base hover:bg-app-bg transition-colors"
              >
                <RiVideoAddLine className="w-4 h-4" />
                <span>Upload Video</span>
              </button>
              <button
                onClick={() => {
                  handleMediaUpload('file');
                  setShowMediaMenu(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-app-text-base hover:bg-app-bg transition-colors"
              >
                <RiFileAddLine className="w-4 h-4" />
                <span>Upload File</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[400px] p-4 text-app-text-base focus:outline-none prose prose-lg max-w-none"
        style={{
          fontFamily: 'inherit',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
};

interface BlogEditProps {
  params: { id: string };
}

export default function BlogEditPage({ params }: BlogEditProps) {
  const [blogPost, setBlogPost] = useState<any>(null);
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

  const [seoData, setSeoData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: ''
  });

  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [isLoading, setIsLoading] = useState(true);

  // Load blog post data
  useEffect(() => {
    const posts = getBlogPosts();
    const post = posts.find(p => p.id === params.id);
    if (post) {
      setBlogPost(post);
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        slug: post.slug || '',
        url: post.url || '',
        status: post.status || 'draft',
        author: post.author || '',
        publishDate: post.publishedAt || '',
        featuredImage: post.featuredImage || '',
        tags: post.tags || ''
      });
      setSeoData({
        title: post.seoTitle || post.title || '',
        description: post.seoDescription || post.excerpt || '',
        keywords: post.seoKeywords || '',
        ogImage: post.seoOgImage || '',
        canonicalUrl: post.seoCanonicalUrl || ''
      });
    }
    setIsLoading(false);
  }, [params.id]);

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
    handleInputChange('url', `/${newSlug}`);
  };

  const handleUpdate = () => {
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
    
    // Update the blog post
    const updatedPost = {
      ...blogPost,
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      status: formData.status,
      author: formData.author,
      slug: formData.slug,
      url: formData.url,
      featuredImage: formData.featuredImage,
      tags: formData.tags,
      seoTitle: seoData.title,
      seoDescription: seoData.description,
      seoKeywords: seoData.keywords,
      seoOgImage: seoData.ogImage,
      seoCanonicalUrl: seoData.canonicalUrl,
      lastModified: new Date().toISOString().split('T')[0]
    };

    // Update in localStorage
    const posts = getBlogPosts();
    const updatedPosts = posts.map(p => p.id === params.id ? updatedPost : p);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    // Show success message
    alert(`Blog post "${formData.title}" updated successfully!`);
    
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-primary mx-auto"></div>
          <p className="mt-4 text-app-text-muted">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-app-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-app-surface border border-app-border rounded-lg p-8">
              <h1 className="text-2xl font-bold text-app-text-base mb-4">Blog Post Not Found</h1>
              <p className="text-app-text-muted mb-6">The blog post you're looking for doesn't exist.</p>
              <Link href="/admin/blogs" className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                <RiArrowLeftLine className="w-4 h-4" />
                <span>Back to Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-app-text-base">Edit Blog Post</h1>
            <p className="text-app-text-muted mt-1">Update your blog post content and settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-app-border text-app-text-base hover:bg-app-surface transition-colors">
            <RiEyeLine className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button 
            onClick={() => handleUpdate()}
            className="flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Update</span>
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
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Blog Post Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent text-xl font-medium"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Content
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                />
                <p className="text-xs text-app-text-muted mt-2">
                  Use the toolbar above to format your content. You can add headings, bold text, italic text, quotes, lists, links, and upload media.
                </p>
              </div>

              {/* Excerpt */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief summary of your blog post..."
                  rows={3}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent resize-none"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  This will be displayed in blog post previews and search results
                </p>
              </div>
            </>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* SEO Title */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
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
                  placeholder="cricket, rules, sports..."
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
                  placeholder="https://example.com/blog-post-url"
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
                    handleInputChange('url', `/${e.target.value}`);
                  }}
                  placeholder="blog-post-url-slug"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  This will be used in the URL: cricdar.com/{formData.slug || 'your-slug'}
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
                  placeholder="https://cricdar.com/your-blog-post"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  The complete URL for your blog post
                </p>
              </div>

              {/* Author */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Author
                </label>
                <div className="flex items-center space-x-2">
                  <RiUserLine className="text-app-text-muted w-4 h-4" />
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Author name"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Publish Date */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Publish Date
                </label>
                <div className="flex items-center space-x-2">
                  <RiCalendarLine className="text-app-text-muted w-4 h-4" />
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>
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

              {/* Tags */}
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="cricket, sports, news"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
                <p className="text-xs text-app-text-muted mt-2">
                  Separate tags with commas
                </p>
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
          </div>

          {/* SEO Preview */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">SEO Preview</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-app-text-muted mb-1">Title</p>
                <p className="text-sm text-app-text-base font-medium line-clamp-2">
                  {seoData.title || formData.title || 'Your blog post title will appear here'}
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
                  {formData.url || `cricdar.com/${formData.slug || 'your-blog-post-slug'}`}
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