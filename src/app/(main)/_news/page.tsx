// src/app/news/page.tsx

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

// CORRECTED IMPORTS using path alias @/ (assuming it points to src/)
import { NewsArticleProps } from '@/types/cricket';
import NewsArticlePreviewCard from '@/components/common/NewsArticlePreviewCard';

import { RiFileList2Line, RiArrowLeftLine } from 'react-icons/ri';

// --- DUMMY DATA ---
const DUMMY_NEWS_IMAGE_URL = "/images/placeholder-news.jpg";
// ... (rest of your dummyNewsArticles data remains the same)
const dummyNewsArticles: NewsArticleProps[] = [
  { id: "news1", title: "Historic Win: Green Strikers Clinch T20 Championship", snippet: "In a nail-biting final, the Green Strikers chased down an improbable target against the Blue Blasters after a stunning display of power hitting in the death overs.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 30, 2025", category: "Tournament Finals", link: "/news/news1" },
  { id: "news2", title: "Captain Sharma Hits Record-Breaking Century in Test Series", snippet: "G. Sharma's phenomenal batting display, a majestic 187*, led his team to a commanding position on day two of the ongoing Test series against a formidable opponent.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 29, 2025", category: "Player Milestones", link: "/news/news2" },
  { id: "news3", title: "Upcoming Ashes Series: Predictions and Key Players to Watch", snippet: "Cricket experts and former players weigh in on the upcoming Ashes contest, highlighting the players who could make a significant impact for both historic rivals.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 28, 2025", category: "Series Previews", link: "/news/news3" },
  { id: "news4", title: "Youth Tournament Unearths Exciting New Talents", snippet: "The recently concluded U-19 national tournament has brought several promising young cricketers into the limelight, catching the eyes of selectors.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 27, 2025", category: "Development", link: "/news/news4" },
  { id: "news5", title: "Technology in Cricket: The Future of Umpiring and Analytics", snippet: "A deep dive into how emerging technologies like AI and advanced ball tracking are revolutionizing umpiring decisions and team strategies.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 26, 2025", category: "Technology", link: "/news/news5" },
  { id: "news6", title: "Global Cricket Council Announces New Tournament Calendar", snippet: "The GCC has released the updated Future Tours Programme (FTP), including several new bilateral series and a revised World Test Championship cycle.", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 25, 2025", category: "Announcements", link: "/news/news6" },
];
// --- END OF DUMMY DATA ---

export const metadata: Metadata = {
  title: 'Cricket News & Updates | Cricdar',
  description: 'Stay updated with the latest cricket news, articles, match reports, and analysis from Cricdar.',
};

export default function AllNewsPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center justify-center mb-3">
          <RiFileList2Line className="w-10 h-10 text-app-primary mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-app-primary">
            Cricket News & Updates
          </h1>
        </div>
        <p className="text-lg text-app-text-muted max-w-2xl mx-auto">
          Your source for the latest happenings in the world of cricket, from match reports to player insights.
        </p>
      </header>

      {dummyNewsArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {dummyNewsArticles.map((article) => (
            <NewsArticlePreviewCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-app-text-muted">
            No news articles available at the moment. Please check back later.
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex items-center text-app-secondary hover:text-app-secondary-hover font-medium transition-colors">
          <RiArrowLeftLine className="w-5 h-5 mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}