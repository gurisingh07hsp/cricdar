// src/app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/common/ThemeSwitcher";
import { Suspense } from "react";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: {
		default: "Cricdar - Live Cricket Scores & Updates",
		template: "%s | Cricdar",
	},
	description:
		"Your ultimate destination for live cricket scores, match updates, series information, and more.",
};

// A simple Navbar placeholder for the Suspense fallback
const NavbarFallback = () => {
	return (
		<div className="bg-app-surface shadow-md sticky top-0 z-50 border-b border-app-border">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* You can put a simplified logo or just leave it mostly blank */}
					<div className="flex items-center space-x-2 group flex-shrink-0">
						<div className="w-7 h-7 md:w-8 md:h-8 bg-app-primary/20 rounded-full"></div>{" "}
						{/* Placeholder for icon */}
						<div className="font-bold text-xl md:text-2xl text-transparent bg-app-text-muted/30 rounded w-24 h-6 animate-pulse">
							{/* Placeholder for name */}
						</div>
					</div>
					<div className="flex items-center space-x-2 md:space-x-3">
						{/* Placeholder for links or theme switcher */}
						<div className="w-20 h-6 bg-app-text-muted/20 rounded animate-pulse hidden md:block"></div>
						<div className="w-8 h-8 bg-app-text-muted/20 rounded-full animate-pulse"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} font-sans`}>
			<head>
				<link rel="icon" href="/favicon.png" />
			</head>
			<body>
				<ThemeProvider>
					<div className="flex flex-col min-h-screen bg-app-bg text-app-text-base transition-colors duration-300">
						<Suspense fallback={<NavbarFallback />}>
							{/* Wrap Navbar with Suspense */}
							<Navbar />
						</Suspense>
						<main className="flex-grow w-full">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
