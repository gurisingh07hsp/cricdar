"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiAddLine, 
  RiEditLine, 
  RiEyeLine,
  RiSearchLine,
  RiFilter3Line,
  RiUserLine
} from 'react-icons/ri';

interface Author {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  role: 'admin' | 'editor' | 'author' | 'contributor';
  status: 'active' | 'inactive';
  location: string;
  website: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  postsCount: number;
  lastActive: string;
  createdAt: string;
}

const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@cricdar.com',
    bio: 'Lead cricket analyst and content manager with over 10 years of experience in sports journalism.',
    avatar: '',
    role: 'admin',
    status: 'active',
    location: 'Mumbai, India',
    website: 'https://admin.cricdar.com',
    socialLinks: {
      twitter: 'https://twitter.com/admin',
      linkedin: 'https://linkedin.com/in/admin'
    },
    postsCount: 45,
    lastActive: '2024-01-15',
    createdAt: '2023-01-01'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@cricdar.com',
    bio: 'Former international cricketer turned analyst. Specializes in match analysis and player insights.',
    avatar: '',
    role: 'editor',
    status: 'active',
    location: 'Melbourne, Australia',
    website: 'https://sarahjohnson.com',
    socialLinks: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    },
    postsCount: 32,
    lastActive: '2024-01-14',
    createdAt: '2023-03-15'
  },
  {
    id: '3',
    name: 'Rahul Sharma',
    email: 'rahul@cricdar.com',
    bio: 'Cricket statistician and data analyst. Expert in cricket analytics and performance metrics.',
    avatar: '',
    role: 'author',
    status: 'active',
    location: 'Delhi, India',
    website: 'https://rahulsharma.com',
    socialLinks: {
      twitter: 'https://twitter.com/rahulsharma',
      github: 'https://github.com/rahulsharma'
    },
    postsCount: 28,
    lastActive: '2024-01-13',
    createdAt: '2023-06-20'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@cricdar.com',
    bio: 'Freelance cricket writer and commentator. Covers international cricket events and tournaments.',
    avatar: '',
    role: 'contributor',
    status: 'inactive',
    location: 'London, UK',
    website: 'https://emmawilson.com',
    socialLinks: {
      twitter: 'https://twitter.com/emmawilson'
    },
    postsCount: 15,
    lastActive: '2023-12-20',
    createdAt: '2023-08-10'
  }
];

// Store for managing authors across the app
let authorsStore: Author[] = [];

// Initialize store from localStorage or use mock data
const initializeAuthorsStore = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('authors');
    if (stored) {
      authorsStore = JSON.parse(stored);
    } else {
      authorsStore = [...mockAuthors];
      localStorage.setItem('authors', JSON.stringify(authorsStore));
    }
  } else {
    authorsStore = [...mockAuthors];
  }
};

// Initialize store
initializeAuthorsStore();

export const addAuthor = (author: Omit<Author, 'id' | 'postsCount' | 'lastActive' | 'createdAt'>) => {
  const newAuthor: Author = {
    ...author,
    id: Date.now().toString(),
    postsCount: 0,
    lastActive: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  };
  authorsStore.unshift(newAuthor);
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('authors', JSON.stringify(authorsStore));
  }
  
  return newAuthor;
};

export const getAuthors = () => {
  // Always get fresh data from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('authors');
    if (stored) {
      authorsStore = JSON.parse(stored);
    }
  }
  return authorsStore;
};

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

export default function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [authors, setAuthors] = useState<Author[]>(authorsStore);

  // Update the state whenever the store changes
  const updateAuthors = () => {
    const freshAuthors = getAuthors();
    setAuthors(freshAuthors);
  };

  // Force a re-render when the component mounts or when navigating back
  useEffect(() => {
    updateAuthors();
  }, []);

  // Refresh data when the page becomes visible (when navigating back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateAuthors();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const filteredAuthors = authors.filter(author => {
    const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         author.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         author.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || author.status === statusFilter;
    const matchesRole = roleFilter === 'all' || author.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const _handleSelectAll = () => {
    if (selectedAuthors.length === filteredAuthors.length) {
      setSelectedAuthors([]);
    } else {
      setSelectedAuthors(filteredAuthors.map(author => author.id));
    }
  };

  const _handleSelectAuthor = (authorId: string) => {
    setSelectedAuthors(prev => 
      prev.includes(authorId) 
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-app-text-base">Authors</h1>
          <p className="text-app-text-muted mt-1">Manage your content authors and contributors</p>
        </div>
        <Link 
          href="/admin/authors/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
        >
          <RiAddLine className="w-4 h-4" />
          <span>New Author</span>
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
              placeholder="Search authors..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <RiUserLine className="text-app-text-muted w-4 h-4" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="contributor">Contributor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAuthors.length > 0 && (
        <div className="bg-app-primary/10 border border-app-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-app-text-base">
              {selectedAuthors.length} author{selectedAuthors.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-app-primary text-white rounded hover:bg-app-primary-hover transition-colors">
                Activate
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map((author) => (
          <div key={author.id} className="bg-app-surface border border-app-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Author Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-app-primary/20 rounded-full flex items-center justify-center">
                    <RiUserLine className="w-6 h-6 text-app-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-app-text-base">{author.name}</h3>
                    <p className="text-sm text-app-text-muted">{author.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={author.status} />
                  <RoleBadge role={author.role} />
                </div>
              </div>

              {/* Author Bio */}
              <p className="text-sm text-app-text-muted mb-4 line-clamp-3">{author.bio}</p>

              {/* Author Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-app-text-muted">Posts:</span>
                  <span className="ml-2 font-semibold text-app-text-base">{author.postsCount}</span>
                </div>
                <div>
                  <span className="text-app-text-muted">Location:</span>
                  <span className="ml-2 text-app-text-base">{author.location}</span>
                </div>
              </div>

              {/* Author Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-app-border">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/authors/${author.id}/edit`}
                    className="p-1 text-app-text-muted hover:text-app-primary transition-colors"
                  >
                    <RiEditLine className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/authors/${author.id}`}
                    className="p-1 text-app-text-muted hover:text-app-primary transition-colors"
                  >
                    <RiEyeLine className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center space-x-2 text-xs text-app-text-muted">
                  <span>Last active: {author.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAuthors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-app-text-muted mb-4">
            <RiUserLine className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-app-text-base mb-2">No authors found</h3>
            <p className="text-app-text-muted">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
} 