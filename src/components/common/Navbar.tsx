"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {ThemeSwitcherButton} from './ThemeSwitcher';
import Image from 'next/image';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
        <Link href={href} className={`block md:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-app-primary' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
            {children}
        </Link>
    );
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { href: "/matches", label: "Matches" },
        { href: "/matches?status=live", label: "Live" },
        { href: "/matches?status=upcoming", label: "Upcoming" },
        { href: "/series", label: "Series" }
    ];

    return (
        // FIX: Replaced theme-aware classes with static dark theme classes
        <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                       <Link href="/" className="flex-shrink-0">
                           <Image 
                             src="/logo.png" 
                             alt="Cricdar Logo" 
                             width={120} 
                             height={40}
                             priority // Helps load the logo faster
                           />
                        </Link>
                        <div className="hidden md:block md:ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map(item => (
                                    <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <ThemeSwitcherButton />
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <RiCloseLine className="block h-6 w-6" /> : <RiMenu3Line className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="flex items-center px-5">
                           <ThemeSwitcherButton />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}