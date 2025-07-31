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
  RiFileTextLine
} from 'react-icons/ri';

interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft';
  lastModified: string;
  views: number;
  template: string;
}

const mockPages: Page[] = [
  {
    id: '1',
    title: 'About Us',
    content: '<h1>About Us</h1><p>Welcome to Cricdar, your ultimate destination for cricket news, live scores, and comprehensive coverage of the sport we all love.</p><h2>Our Mission</h2><p>We strive to provide cricket enthusiasts with the most accurate and up-to-date information about matches, players, and tournaments worldwide.</p>',
    slug: 'about',
    status: 'published',
    lastModified: '2024-01-15',
    views: 2341,
    template: 'default'
  },
  {
    id: '2',
    title: 'Contact',
    content: '<h1>Contact Us</h1><p>Get in touch with our team for any inquiries, suggestions, or support.</p><h2>Email</h2><p>info@cricdar.com</p><h2>Phone</h2><p>+1 (555) 123-4567</p>',
    slug: 'contact',
    status: 'published',
    lastModified: '2024-01-10',
    views: 1892,
    template: 'contact'
  },
  {
    id: '3',
    title: 'Privacy Policy',
    content: '<h1>Privacy Policy</h1><p>This privacy policy describes how we collect, use, and protect your personal information.</p><h2>Information We Collect</h2><p>We collect information you provide directly to us when you use our services.</p>',
    slug: 'privacy',
    status: 'published',
    lastModified: '2024-01-05',
    views: 567,
    template: 'default'
  },
  {
    id: '4',
    title: 'Terms of Service',
    content: '<h1>Terms of Service</h1><p>By using our website, you agree to these terms and conditions.</p><h2>Acceptance of Terms</h2><p>Your use of this website constitutes acceptance of these terms.</p>',
    slug: 'terms',
    status: 'draft',
    lastModified: '2024-01-12',
    views: 0,
    template: 'default'
  },
  {
    id: '5',
    title: 'Cricket Rules',
    content: '<h1>Cricket Rules</h1><p>Learn about the fundamental rules and regulations of cricket.</p><h2>Basic Rules</h2><p>Cricket is played between two teams of eleven players each.</p>',
    slug: 'cricket-rules',
    status: 'published',
    lastModified: '2024-01-08',
    views: 3421,
    template: 'rules'
  }
];

// Store for managing pages across the app
let pagesStore: Page[] = [];

// Initialize store from localStorage or use mock data
const initializePagesStore = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('pages');
    if (stored) {
      pagesStore = JSON.parse(stored);
      
      // Update existing pages that might not have content field
      let needsUpdate = false;
      pagesStore = pagesStore.map(page => {
        if (!page.content) {
          needsUpdate = true;
          // Add content based on the page title/slug
          let content = '';
          if (page.slug === 'about') {
            content = `<h1>About Us</h1>
<p>Welcome to Cricdar, your ultimate destination for cricket news, live scores, and comprehensive coverage of the sport we all love.</p>

<h2>Our Mission</h2>
<p>We strive to provide cricket enthusiasts with the most accurate and up-to-date information about matches, players, and tournaments worldwide.</p>

<h2>What We Do</h2>
<p>At Cricdar, we believe that following cricket should be seamless, engaging, and enriching. Our platform offers:</p>
<ul>
<li>Live scores and real-time updates</li>
<li>Comprehensive match schedules</li>
<li>Player statistics and rankings</li>
<li>News and analysis from cricket experts</li>
<li>User-friendly interface across all devices</li>
</ul>

<h2>Our Commitment</h2>
<p>We are committed to providing you with the most reliable and up-to-date cricket information, ensuring you never miss a moment of the action.</p>`;
          } else if (page.slug === 'contact') {
            content = `<h1>Contact Us</h1>
<p>Get in touch with our team for any inquiries, suggestions, or support.</p>

<h2>Email</h2>
<p>info@cricdar.com</p>

<h2>Phone</h2>
<p>+1 (555) 123-4567</p>

<h2>Address</h2>
<p>Cricdar Headquarters<br>
123 Cricket Street<br>
Sports City, SC 12345</p>

<h2>Business Hours</h2>
<p>Monday - Friday: 9:00 AM - 6:00 PM<br>
Saturday: 10:00 AM - 4:00 PM<br>
Sunday: Closed</p>`;
          } else if (page.slug === 'privacy') {
            content = `<h1>Privacy Policy</h1>
<p>This privacy policy describes how we collect, use, and protect your personal information.</p>

<h2>Information We Collect</h2>
<p>We collect information you provide directly to us when you use our services, including:</p>
<ul>
<li>Account information (name, email, preferences)</li>
<li>Usage data and analytics</li>
<li>Device information and cookies</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use the collected information to:</p>
<ul>
<li>Provide and improve our services</li>
<li>Personalize your experience</li>
<li>Send you updates and notifications</li>
<li>Analyze usage patterns</li>
</ul>

<h2>Data Protection</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>`;
          } else if (page.slug === 'terms') {
            content = `<h1>Terms of Service</h1>
<p>By using our website, you agree to these terms and conditions.</p>

<h2>Acceptance of Terms</h2>
<p>Your use of this website constitutes acceptance of these terms. If you do not agree to these terms, please do not use our services.</p>

<h2>Use of Service</h2>
<p>You may use our services for personal, non-commercial purposes only. You agree not to:</p>
<ul>
<li>Use the service for any illegal purpose</li>
<li>Attempt to gain unauthorized access to our systems</li>
<li>Interfere with the proper functioning of the service</li>
<li>Share your account credentials with others</li>
</ul>

<h2>Intellectual Property</h2>
<p>All content on this website, including text, graphics, logos, and software, is the property of Cricdar and is protected by copyright laws.</p>

<h2>Limitation of Liability</h2>
<p>Cricdar shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>`;
          } else if (page.slug === 'cricket-rules') {
            content = `<h1>Cricket Rules</h1>
<p>Learn about the fundamental rules and regulations of cricket.</p>

<h2>Basic Rules</h2>
<p>Cricket is played between two teams of eleven players each. The game consists of innings where each team bats and bowls.</p>

<h2>Scoring</h2>
<p>Runs are scored by:</p>
<ul>
<li>Running between the wickets</li>
<li>Hitting boundaries (4 runs for hitting the ball to the boundary)</li>
<li>Hitting sixes (6 runs for clearing the boundary)</li>
<li>Extras (wides, no-balls, byes, leg-byes)</li>
</ul>

<h2>Ways of Getting Out</h2>
<p>A batsman can be dismissed in several ways:</p>
<ul>
<li>Bowled - when the ball hits the stumps</li>
<li>Caught - when a fielder catches the ball</li>
<li>LBW - when the ball would have hit the stumps but hits the batsman's leg</li>
<li>Run out - when the stumps are broken while the batsman is out of their crease</li>
<li>Stumped - when the wicket-keeper removes the bails while the batsman is out of their crease</li>
</ul>

<h2>Fielding Positions</h2>
<p>Cricket has many fielding positions including slips, gully, point, cover, mid-off, mid-on, square leg, and fine leg.</p>`;
          } else {
            content = `<h1>${page.title}</h1>
<p>This is the content for ${page.title}. You can edit this page to add your own content.</p>

<h2>About This Page</h2>
<p>This page was created using the Cricdar admin panel. You can edit it anytime to update the content.</p>`;
          }
          
          return {
            ...page,
            content: content
          };
        }
        return page;
      });
      
      if (needsUpdate) {
        localStorage.setItem('pages', JSON.stringify(pagesStore));
      }
    } else {
      pagesStore = [...mockPages];
      localStorage.setItem('pages', JSON.stringify(pagesStore));
    }
  } else {
    pagesStore = [...mockPages];
  }
};

// Initialize store
initializePagesStore();

export const addPage = (page: Omit<Page, 'id' | 'lastModified' | 'views'>) => {
  const newPage: Page = {
    ...page,
    id: Date.now().toString(),
    lastModified: new Date().toISOString().split('T')[0],
    views: 0
  };
  pagesStore.unshift(newPage); // Add to beginning of array
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('pages', JSON.stringify(pagesStore));
  }
  
  return newPage;
};

export const getPages = () => {
  // Always get fresh data from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('pages');
    if (stored) {
      pagesStore = JSON.parse(stored);
    }
  }
  return pagesStore;
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    published: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Published' },
    draft: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Draft' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default function PagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update the state whenever the store changes
  const updatePages = () => {
    const freshPages = getPages();
    setPages(freshPages);
    setIsLoading(false);
  };

  // Force a re-render when the component mounts or when navigating back
  useEffect(() => {
    updatePages();
  }, []);

  // Refresh data when the page becomes visible (when navigating back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updatePages();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map(page => page.id));
    }
  };

  const handleSelectPage = (pageId: string) => {
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleToggleStatus = (pageId: string, currentStatus: string) => {
    const pages = getPages();
    const updatedPages = pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          status: currentStatus === 'published' ? 'draft' : 'published',
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return page;
    });
    
    localStorage.setItem('pages', JSON.stringify(updatedPages));
    updatePages();
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
          <h1 className="text-2xl font-bold text-app-text-base">Pages</h1>
          <p className="text-app-text-muted mt-1">Manage your website pages</p>
        </div>
        <Link 
          href="/admin/pages/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
        >
          <RiAddLine className="w-4 h-4" />
          <span>New Page</span>
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
              placeholder="Search pages..."
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
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-app-surface border border-app-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-app-text-base mb-2">Quick Actions</h3>
            <p className="text-xs text-app-text-muted">Manage your pages efficiently</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link 
              href="/admin/pages/new"
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover transition-colors"
            >
              <RiAddLine className="w-4 h-4" />
              <span>New Page</span>
            </Link>
            <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-app-border text-app-text-base rounded hover:bg-app-bg transition-colors">
              <RiFileTextLine className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPages.length > 0 && (
        <div className="bg-app-primary/10 border border-app-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-app-text-base">
              {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
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

      {/* Pages Table */}
      <div className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-app-bg border-b border-app-border">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPages.length === filteredPages.length && filteredPages.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-app-border text-app-primary focus:ring-app-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-app-text-muted uppercase tracking-wider">
                  Last Modified
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
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-app-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.id)}
                      onChange={() => handleSelectPage(page.id)}
                      className="rounded border-app-border text-app-primary focus:ring-app-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-app-text-base">{page.title}</div>
                      <div className="text-sm text-app-text-muted mt-1">/{page.slug}</div>
                      <div className="text-xs text-app-text-muted mt-1">
                        {page.content ? 
                          `${page.content.replace(/<[^>]*>/g, '').substring(0, 60)}...` : 
                          'No content yet'
                        }
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={page.status} />
                      <button
                        onClick={() => handleToggleStatus(page.id, page.status)}
                        className="text-xs text-app-text-muted hover:text-app-primary transition-colors"
                        title={`Toggle to ${page.status === 'published' ? 'draft' : 'published'}`}
                      >
                        {page.status === 'published' ? '→ Draft' : '→ Publish'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-app-text-base capitalize">{page.template}</td>
                  <td className="px-6 py-4 text-sm text-app-text-muted">{page.lastModified}</td>
                  <td className="px-6 py-4 text-sm text-app-text-base">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/pages/${page.id}/edit`}
                        className="flex items-center space-x-1 px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover transition-colors"
                        title="Edit Page"
                      >
                        <RiEditLine className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-1 text-app-text-muted hover:text-app-primary transition-colors"
                        title="View Page"
                      >
                        <RiEyeLine className="w-4 h-4" />
                      </Link>
                      <button 
                        className="p-1 text-app-text-muted hover:text-red-500 transition-colors"
                        title="Delete Page"
                      >
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
      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-app-text-muted mb-4">
            <RiFileTextLine className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-app-text-base mb-2">No pages found</h3>
            <p className="text-app-text-muted">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
} 