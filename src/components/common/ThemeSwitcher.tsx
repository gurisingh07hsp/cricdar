"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light'); // Default to light

    useEffect(() => {
        // Check localStorage for saved theme, then system preference
        const savedTheme = localStorage.getItem('cricdar-theme') as Theme | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
        // No else needed, default is 'light'
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('cricdar-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeSwitcherButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Avoid hydration mismatch by only rendering icon after mount
    }, []);

    if (!mounted) {
        // Render a placeholder or nothing until mounted to avoid hydration issues
        return <div className="w-8 h-8 sm:w-9 sm:h-9" aria-hidden="true"></div>;
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="p-2 rounded-full text-app-text-muted hover:text-app-primary hover:bg-app-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2 focus-visible:ring-offset-app-surface transition-colors"
        >
            {theme === 'light' ? (
                <RiMoonFill className="w-5 h-5 sm:w-5 sm:h-5" />
            ) : (
                <RiSunFill className="w-5 h-5 sm:w-5 sm:h-5" />
            )}
        </button>
    );
};
