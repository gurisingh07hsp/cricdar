// src/app/news/[articleId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

// Assuming types and dummy data are structured as defined above
// You might import dummyArticleData and dummyNewsArticlePreviews from a local file
// For this example, I'll assume allFullNewsArticles and dummyNewsArticlePreviews are accessible.
// Let's define them here for self-containment of this page file.

const DUMMY_NEWS_IMAGE_URL = "/images/placeholder-news.jpg";

interface ArticleContentBlock { type: 'paragraph' | 'heading' | 'image' | 'quote'; text?: string; level?: 2 | 3 | 4; imageUrl?: string; alt?: string; caption?: string; }
interface NewsArticleProps { id: string; title: string; snippet: string; imageUrl?: string; date: string; category?: string; link: string; }
interface FullNewsArticleData extends NewsArticleProps { author?: { name: string; bio?: string; avatarUrl?: string }; contentBlocks: ArticleContentBlock[]; relatedArticleIds?: string[]; tags?: string[]; }

const allFullNewsArticles: Record<string, FullNewsArticleData> = { /* ... Paste full dummy data from Phase 1 here ... */
  "news1": { id: "news1", title: "Historic Win: Green Strikers Clinch T20 Championship", snippet: "In a nail-biting final...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 30, 2025", category: "Tournament Finals", link: "/news/news1", author: { name: "Jane Doe" }, contentBlocks: [{ type: 'paragraph', text: "The atmosphere was electric..." }, { type: 'heading', text: "The Final Over Thriller", level: 2 }, { type: 'paragraph', text: "With veteran pacer Mark Wood..." }], tags: ["T20", "Finals"], relatedArticleIds: ["news2", "news3"] },
  "news2": { id: "news2", title: "Captain Sharma Hits Record-Breaking Century", snippet: "G. Sharma's phenomenal batting display...", imageUrl: DUMMY_NEWS_IMAGE_URL, date: "May 29, 2025", category: "Player Milestones", link: "/news/news2", author: { name: "John Smith" }, contentBlocks: [{ type: 'paragraph', text: "Captain G. Sharma once again proved why..." }, { type: 'heading', text: "A Captain's Knock", level: 2 }, { type: 'paragraph', text: "Walking in when his team..." }], tags: ["TestCricket", "Records"], relatedArticleIds: ["news1", "news4"] },
  // Add more full articles for related content if needed
};

const dummyNewsArticlePreviews: NewsArticleProps[] = [ // For "Related Articles" sidebar
  { id: "news1", title: "Historic Win: Strikers Clinch T20", snippet: "In a nail-biting final...", date: "May 30, 2025", link: "/news/news1", category: "Finals" },
  { id: "news2", title: "Sharma Hits Record Century", snippet: "G. Sharma's phenomenal display...", date: "May 29, 2025", link: "/news/news2", category: "Milestones" },
  { id: "news3", title: "Upcoming Ashes: Predictions", snippet: "Experts weigh in...", date: "May 28, 2025", link: "/news/news3", category: "Previews" },
  { id: "news4", title: "Youth Tournament Talents", snippet: "U-19 tournament brought promising...", date: "May 27, 2025", link: "/news/news4", category: "Development" },
];


// Import AdvertisementBlock (assuming it's in common components)
import AdvertisementBlock from '@/components/common/AdvertisementBlock'; // Adjust path

import { RiTimeLine, RiUserLine, RiPriceTag3Line, RiFileList3Line, RiArrowLeftLine } from 'react-icons/ri';


export async function generateMetadata({ params }: { params: { articleId: string } }): Promise<Metadata> {
  const article = allFullNewsArticles[params.articleId];
  if (!article) {
    return {
      title: 'Article Not Found | Cricdar',
    };
  }
  return {
    title: `${article.title} | Cricdar News`,
    description: article.snippet,
    // openGraph: { title: article.title, description: article.snippet, images: article.imageUrl ? [article.imageUrl] : [] },
  };
}

// Helper to render content blocks
const ArticleContentRenderer: React.FC<{ blocks: ArticleContentBlock[] }> = ({ blocks }) => {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none 
                    prose-headings:text-app-primary prose-p:text-app-text-base prose-strong:text-app-text-base 
                    prose-a:text-app-secondary hover:prose-a:text-app-secondary-hover 
                    prose-blockquote:border-app-primary prose-blockquote:text-app-text-muted
                    prose-img:rounded-md prose-img:shadow-md">
      {/* Tailwind Typography plugin classes used above for styling:
        prose-invert makes it suitable for dark backgrounds.
        You'd need to install `@tailwindcss/typography` and add it to your tailwind.config.js
        `plugins: [require('@tailwindcss/typography')]`
        If not using the plugin, style h2, p, blockquote, etc., manually.
      */}
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 2) return <h2 key={index} className="font-bold text-2xl sm:text-3xl mt-6 mb-3 text-app-primary">{block.text}</h2>;
            if (block.level === 3) return <h3 key={index} className="font-bold text-xl sm:text-2xl mt-5 mb-2 text-app-primary/90">{block.text}</h3>;
            return <h4 key={index} className="font-bold text-lg sm:text-xl mt-4 mb-2 text-app-primary/80">{block.text}</h4>;
          case 'paragraph':
            return <p key={index} className="text-app-text-base leading-relaxed my-4">{block.text}</p>;
          case 'image':
            return (
              <figure key={index} className="my-6">
                {block.imageUrl && <Image src={block.imageUrl} alt={block.alt || 'Article image'} width={800} height={450} className="rounded-md shadow-md mx-auto" />}
                {block.caption && <figcaption className="text-center text-xs text-app-text-muted mt-2">{block.caption}</figcaption>}
              </figure>
            );
          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-app-primary pl-4 italic text-app-text-muted my-6">
                <p className="text-app-text-base">{block.text}</p>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

// Related Articles Widget for Sidebar
const RelatedArticlesWidget: React.FC<{ currentArticleId: string; allPreviews: NewsArticleProps[] }> = ({ currentArticleId, allPreviews }) => {
  const related = allFullNewsArticles[currentArticleId]?.relatedArticleIds;
  const articlesToShow = related
    ? allPreviews.filter(p => related.includes(p.id) && p.id !== currentArticleId).slice(0, 3)
    : allPreviews.filter(p => p.id !== currentArticleId).slice(0, 3); // Fallback if no related IDs defined

  if (articlesToShow.length === 0) return null;

  return (
    <div className="bg-app-surface rounded-card shadow-lg p-4">
      <h3 className="text-md font-semibold text-app-text-base mb-3 flex items-center">
        <RiFileList3Line className="w-5 h-5 mr-2 text-app-primary" />
        Related Articles
      </h3>
      <ul className="space-y-3">
        {articlesToShow.map(article => (
          <li key={article.id}>
            <Link href={article.link} className="group block">
              {article.imageUrl && (
                <div className="aspect-video bg-app-border rounded-md overflow-hidden mb-2 shadow-sm">
                  <Image src={article.imageUrl} alt={article.title} width={300} height={169} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
              )}
              <h4 className="text-sm font-medium text-app-text-muted group-hover:text-app-primary transition-colors leading-tight line-clamp-2" title={article.title}>
                {article.title}
              </h4>
              <p className="text-xs text-app-text-muted opacity-80 mt-1">{article.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default function SingleNewsArticlePage({ params }: { params: { articleId: string } }) {
  const article = allFullNewsArticles[params.articleId];

  if (!article) {
    notFound(); // This will render your app/not-found.tsx
  }

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Main Article Content Column */}
        <article className="lg:col-span-8 xl:col-span-9">
          {/* Article Header */}
          <header className="mb-6 md:mb-8">
            {article.category && (
              <Link href={`/news/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-semibold text-app-primary hover:text-app-primary-hover uppercase tracking-wider">
                {article.category}
              </Link>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-app-text-base leading-tight my-3">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-app-text-muted space-x-4">
              {article.author && (
                <div className="flex items-center">
                  <RiUserLine className="w-4 h-4 mr-1.5" />
                  <span>By {article.author.name}</span>
                </div>
              )}
              <div className="flex items-center">
                <RiTimeLine className="w-4 h-4 mr-1.5" />
                <span>{article.date}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src={article.imageUrl} alt={article.title} width={1200} height={675} priority className="w-full h-auto" />
            </div>
          )}

          {/* Article Body */}
          <ArticleContentRenderer blocks={article.contentBlocks} />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-app-border">
              <h3 className="text-sm font-semibold text-app-text-muted mb-2 flex items-center">
                <RiPriceTag3Line className="w-4 h-4 mr-1.5" /> Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Link key={tag} href={`/tags/${tag.toLowerCase()}`} className="text-xs bg-app-border hover:bg-app-primary/20 text-app-text-muted hover:text-app-primary px-2.5 py-1 rounded-full transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Right Sidebar Column */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-6 mt-8 lg:mt-0 lg:sticky lg:top-24 self-start h-auto lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-app-border scrollbar-track-transparent pr-0 lg:pr-2">
          <RelatedArticlesWidget currentArticleId={article.id} allPreviews={dummyNewsArticlePreviews} />
          <AdvertisementBlock />
          <AdvertisementBlock minHeightClass="min-h-[100px]" />
        </aside>
      </div>

      <div className="mt-12 pt-8 border-t border-app-border text-center">
        <Link href="/news" className="inline-flex items-center text-app-secondary hover:text-app-secondary-hover font-medium transition-colors">
          <RiArrowLeftLine className="w-5 h-5 mr-2" />
          Back to All News
        </Link>
      </div>
    </div>
  );
}