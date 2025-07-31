"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  RiSaveLine, 
  RiSettings3Line,
  RiUserLine,
  RiMailLine,
  RiMapPinLine,
  RiGlobeLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiArrowLeftLine
} from 'react-icons/ri';
import { addAuthor } from '../page';

interface AuthorFormData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  role: 'admin' | 'editor' | 'author' | 'contributor';
  status: 'active' | 'inactive';
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

export default function NewAuthorPage() {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    role: 'author',
    status: 'active',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: ''
    }
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'settings'>('basic');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please enter name and email for the author');
      return;
    }

    // Add the author to the store
    const _newAuthor = addAuthor({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      avatar: formData.avatar,
      role: formData.role,
      status: formData.status,
      location: formData.location,
      website: formData.website,
      socialLinks: formData.socialLinks
    });

    // Show success message
    alert(`Author "${formData.name}" created successfully!`);

    // Redirect to authors list after a short delay
    setTimeout(() => {
      window.location.href = '/admin/authors';
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
            href="/admin/authors"
            className="p-2 text-app-text-muted hover:text-app-text-base hover:bg-app-surface rounded-lg transition-colors"
          >
            <RiArrowLeftLine className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-app-text-base">New Author</h1>
            <p className="text-app-text-muted mt-1">Create a new author profile</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Save Author</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-app-border">
        <TabButton id="basic" label="Basic Info" icon={RiUserLine} />
        <TabButton id="social" label="Social Links" icon={RiGlobeLine} />
        <TabButton id="settings" label="Settings" icon={RiSettings3Line} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'basic' && (
            <>
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter author's full name"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="author@example.com"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about this author..."
                  rows={4}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange('avatar', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://author-website.com"
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                />
              </div>
            </>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Twitter Profile</label>
                <div className="flex items-center space-x-2">
                  <RiTwitterLine className="w-5 h-5 text-blue-400" />
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">LinkedIn Profile</label>
                <div className="flex items-center space-x-2">
                  <RiLinkedinBoxLine className="w-5 h-5 text-blue-600" />
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">GitHub Profile</label>
                <div className="flex items-center space-x-2">
                  <RiGithubLine className="w-5 h-5 text-gray-800" />
                  <input
                    type="url"
                    value={formData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                    className="flex-1 px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="contributor">Contributor</option>
                </select>
                <p className="text-xs text-app-text-muted mt-2">
                  {formData.role === 'admin' && 'Full access to all features and content management'}
                  {formData.role === 'editor' && 'Can edit and publish content, manage other authors'}
                  {formData.role === 'author' && 'Can create and publish their own content'}
                  {formData.role === 'contributor' && 'Can create content but requires approval to publish'}
                </p>
              </div>

              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <label className="block text-sm font-medium text-app-text-base mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <p className="text-xs text-app-text-muted mt-2">
                  {formData.status === 'active' && 'Author can log in and create content'}
                  {formData.status === 'inactive' && 'Author account is disabled'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-app-surface border border-app-border rounded-lg p-4">
            <h3 className="font-semibold text-app-text-base mb-4">Author Preview</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-app-primary/20 rounded-full flex items-center justify-center">
                  <RiUserLine className="w-6 h-6 text-app-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-app-text-base">{formData.name || 'Author Name'}</h4>
                  <p className="text-sm text-app-text-muted">{formData.email || 'email@example.com'}</p>
                </div>
              </div>
              {formData.bio && (
                <p className="text-sm text-app-text-muted line-clamp-3">{formData.bio}</p>
              )}
              {formData.location && (
                <div className="flex items-center space-x-1 text-sm text-app-text-muted">
                  <RiMapPinLine className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-app-surface border border-app-border rounded-lg p-4">
            <h3 className="font-semibold text-app-text-base mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                <RiMailLine className="w-4 h-4 inline mr-2" />
                Send Welcome Email
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                <RiUserLine className="w-4 h-4 inline mr-2" />
                Set Permissions
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-app-text-muted hover:text-app-text-base hover:bg-app-bg rounded transition-colors">
                <RiSettings3Line className="w-4 h-4 inline mr-2" />
                Advanced Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 