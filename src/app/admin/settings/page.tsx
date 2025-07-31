"use client";
import { useState } from 'react';
import { 
  RiSaveLine, 
  RiGlobeLine,
  RiShieldLine,
  RiPaletteLine,
  RiDatabaseLine,
  RiNotificationLine,
  RiSearchLine
} from 'react-icons/ri';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  contactEmail: string;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;
  postsPerPage: number;
  enableComments: boolean;
  enableRegistration: boolean;
  maintenanceMode: boolean;
  googleAnalytics: string;
  facebookPixel: string;
  twitterCard: string;
  defaultMetaImage: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'advanced'>('general');
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Cricdar',
    siteDescription: 'Your ultimate destination for live cricket scores, match updates, series information, and more.',
    siteUrl: 'https://cricdar.com',
    adminEmail: 'admin@cricdar.com',
    contactEmail: 'contact@cricdar.com',
    defaultLanguage: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    postsPerPage: 10,
    enableComments: true,
    enableRegistration: false,
    maintenanceMode: false,
    googleAnalytics: '',
    facebookPixel: '',
    twitterCard: '',
    defaultMetaImage: '',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapEnabled: true
  });

  const handleInputChange = (field: keyof SiteSettings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
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

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    type = 'text', 
    placeholder = '', 
    required = false 
  }: {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-app-text-base mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
      />
    </div>
  );

  const TextareaField = ({ 
    label, 
    value, 
    onChange, 
    rows = 3, 
    placeholder = '', 
    required = false 
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-app-text-base mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base placeholder-app-text-muted focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent resize-none"
      />
    </div>
  );

  const CheckboxField = ({ 
    label, 
    checked, 
    onChange, 
    description = '' 
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
  }) => (
    <div className="flex items-start space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 rounded border-app-border text-app-primary focus:ring-app-primary"
      />
      <div>
        <label className="text-sm font-medium text-app-text-base">{label}</label>
        {description && (
          <p className="text-xs text-app-text-muted mt-1">{description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-app-text-base">Settings</h1>
          <p className="text-app-text-muted mt-1">Manage your website configuration</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
          <RiSaveLine className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-app-border">
        <TabButton id="general" label="General" icon={RiGlobeLine} />
        <TabButton id="seo" label="SEO" icon={RiSearchLine} />
        <TabButton id="social" label="Social" icon={RiNotificationLine} />
        <TabButton id="advanced" label="Advanced" icon={RiShieldLine} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Site Information */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Site Information</h3>
                <div className="space-y-4">
                  <InputField
                    label="Site Name"
                    value={settings.siteName}
                    onChange={(value) => handleInputChange('siteName', value)}
                    placeholder="Your website name"
                    required
                  />
                  <TextareaField
                    label="Site Description"
                    value={settings.siteDescription}
                    onChange={(value) => handleInputChange('siteDescription', value)}
                    placeholder="Brief description of your website"
                    rows={3}
                  />
                  <InputField
                    label="Site URL"
                    value={settings.siteUrl}
                    onChange={(value) => handleInputChange('siteUrl', value)}
                    placeholder="https://yourdomain.com"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <InputField
                    label="Admin Email"
                    value={settings.adminEmail}
                    onChange={(value) => handleInputChange('adminEmail', value)}
                    type="email"
                    placeholder="admin@yourdomain.com"
                    required
                  />
                  <InputField
                    label="Contact Email"
                    value={settings.contactEmail}
                    onChange={(value) => handleInputChange('contactEmail', value)}
                    type="email"
                    placeholder="contact@yourdomain.com"
                  />
                </div>
              </div>

              {/* Regional Settings */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-app-text-base mb-2">
                      Default Language
                    </label>
                    <select
                      value={settings.defaultLanguage}
                      onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                      className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-app-text-base mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Asia/Kolkata">India Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Settings */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Content Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-app-text-base mb-2">
                      Posts Per Page
                    </label>
                    <input
                      type="number"
                      value={settings.postsPerPage}
                      onChange={(e) => handleInputChange('postsPerPage', parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="w-full px-4 py-3 border border-app-border rounded-lg bg-app-bg text-app-text-base focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                    />
                  </div>
                  <CheckboxField
                    label="Enable Comments"
                    checked={settings.enableComments}
                    onChange={(checked) => handleInputChange('enableComments', checked)}
                    description="Allow visitors to comment on blog posts"
                  />
                  <CheckboxField
                    label="Enable User Registration"
                    checked={settings.enableRegistration}
                    onChange={(checked) => handleInputChange('enableRegistration', checked)}
                    description="Allow new users to register on your site"
                  />
                  <CheckboxField
                    label="Maintenance Mode"
                    checked={settings.maintenanceMode}
                    onChange={(checked) => handleInputChange('maintenanceMode', checked)}
                    description="Temporarily disable the site for maintenance"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* Analytics */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Analytics</h3>
                <div className="space-y-4">
                  <TextareaField
                    label="Google Analytics Code"
                    value={settings.googleAnalytics}
                    onChange={(value) => handleInputChange('googleAnalytics', value)}
                    placeholder="Paste your Google Analytics tracking code here"
                    rows={4}
                  />
                </div>
              </div>

              {/* Meta Settings */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Meta Settings</h3>
                <div className="space-y-4">
                  <InputField
                    label="Default Meta Image"
                    value={settings.defaultMetaImage}
                    onChange={(value) => handleInputChange('defaultMetaImage', value)}
                    placeholder="https://yourdomain.com/default-image.jpg"
                  />
                  <CheckboxField
                    label="Enable Sitemap"
                    checked={settings.sitemapEnabled}
                    onChange={(checked) => handleInputChange('sitemapEnabled', checked)}
                    description="Automatically generate XML sitemap"
                  />
                </div>
              </div>

              {/* Robots.txt */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Robots.txt</h3>
                <TextareaField
                  label="Robots.txt Content"
                  value={settings.robotsTxt}
                  onChange={(value) => handleInputChange('robotsTxt', value)}
                  placeholder="User-agent: *\nAllow: /"
                  rows={6}
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              {/* Social Media */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Social Media</h3>
                <div className="space-y-4">
                  <InputField
                    label="Facebook Pixel ID"
                    value={settings.facebookPixel}
                    onChange={(value) => handleInputChange('facebookPixel', value)}
                    placeholder="123456789012345"
                  />
                  <InputField
                    label="Twitter Card Type"
                    value={settings.twitterCard}
                    onChange={(value) => handleInputChange('twitterCard', value)}
                    placeholder="summary_large_image"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              {/* Database */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Database</h3>
                <div className="space-y-4">
                  <button className="px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                    Backup Database
                  </button>
                  <button className="px-4 py-2 border border-app-border text-app-text-base rounded-lg hover:bg-app-surface transition-colors">
                    Optimize Database
                  </button>
                </div>
              </div>

              {/* Cache */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Cache</h3>
                <div className="space-y-4">
                  <button className="px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                    Clear Cache
                  </button>
                  <button className="px-4 py-2 border border-app-border text-app-text-base rounded-lg hover:bg-app-surface transition-colors">
                    Regenerate Cache
                  </button>
                </div>
              </div>

              {/* Security */}
              <div className="bg-app-surface border border-app-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-app-text-base mb-4">Security</h3>
                <div className="space-y-4">
                  <CheckboxField
                    label="Enable Two-Factor Authentication"
                    checked={false}
                    onChange={() => {}}
                    description="Require 2FA for admin access"
                  />
                  <CheckboxField
                    label="Force HTTPS"
                    checked={true}
                    onChange={() => {}}
                    description="Redirect all traffic to HTTPS"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>Export Settings</span>
                <RiDatabaseLine className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>Import Settings</span>
                <RiDatabaseLine className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-app-text-base hover:bg-app-bg rounded-lg transition-colors">
                <span>Reset to Defaults</span>
                <RiPaletteLine className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-app-surface border border-app-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-app-text-base mb-4">System Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-app-text-muted">PHP Version:</span>
                <span className="text-app-text-base">8.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-muted">Node.js Version:</span>
                <span className="text-app-text-base">18.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-muted">Database:</span>
                <span className="text-app-text-base">MySQL 8.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-muted">Storage Used:</span>
                <span className="text-app-text-base">2.4 GB / 10 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 