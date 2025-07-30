import React from 'react';
import Link from 'next/link';
import { RiErrorWarningLine, RiArrowLeftLine } from 'react-icons/ri';

export const metadata = {
    title: '404 - Page Not Found',
};

export default function NotFound() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 sm:px-6 lg:px-8 text-center"> {/* Adjust min-h as needed based on Nav/Footer height */}
            <RiErrorWarningLine className="w-24 h-24 text-app-secondary mb-8 animate-pulse" />

            <h1 className="text-6xl md:text-8xl font-extrabold text-app-primary mb-4">
                404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-app-text-base mb-6">
                Oops! Page Not Found.
            </h2>
            <p className="text-lg text-app-text-muted max-w-md mb-10">
                It seems like the page you were looking for doesn't exist or has been moved.
                Don't worry, let's get you back on track.
            </p>
            <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-app-primary text-app-bg  hover:bg-app-primary-hover font-semibold rounded-button shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-app-primary focus:ring-offset-2 focus:ring-offset-app-bg"
            >
                <RiArrowLeftLine className="w-5 h-5 mr-2" />
                Go Back to Homepage
            </Link>
        </div>
    );
}
