"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiDashboardLine, 
  RiArticleLine, 
  RiFileTextLine, 
  RiSettings3Line, 
  RiMenu3Line, 
  RiCloseLine,
  RiLogoutBoxLine,
  RiUserLine
} from 'react-icons/ri';
import { ThemeSwitcherButton } from '@/components/common/ThemeSwitcher';
import Image from 'next/image';

const AdminNavLink = ({ href, icon: Icon, children }: { 
  href: string; 
  icon: any; 
  children: React.ReactNode 
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-app-primary text-white shadow-lg' 
          : 'text-app-text-muted hover:text-app-text-base hover:bg-app-surface'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: RiDashboardLine },
    { href: "/admin/blogs", label: "News", icon: RiArticleLine },
    { href: "/admin/pages", label: "Pages", icon: RiFileTextLine },
    { href: "/admin/authors", label: "Authors", icon: RiUserLine },
    { href: "/admin/settings", label: "Settings", icon: RiSettings3Line },
  ];

  return (
    <div className="min-h-screen bg-app-bg flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-app-surface border-r border-app-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-app-border">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="Cricdar Admin" 
                width={100} 
                height={32}
                priority
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-app-text-muted hover:text-app-text-base hover:bg-app-bg"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <AdminNavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </AdminNavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-app-border space-y-2">
            <div className="flex items-center justify-between">
              <ThemeSwitcherButton />
            </div>
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-sm text-app-text-muted hover:text-app-text-base transition-colors"
            >
              <RiLogoutBoxLine className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full">
        {/* Top bar */}
        <div className="bg-app-surface border-b border-app-border px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-app-text-muted hover:text-app-text-base hover:bg-app-bg"
            >
              <RiMenu3Line className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-app-text-base">Admin Panel</h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-3 lg:p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 