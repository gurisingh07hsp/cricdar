// src/components/common/NewsArticlePreviewCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For optimized images
import { RiTimeLine, RiArrowRightSLine } from 'react-icons/ri';

export interface NewsArticleProps {
  id: string;
  title: string;
  snippet: string;
  imageUrl?: string; // Optional image
  date: string; // e.g., "May 30, 2025"
  category?: string;
  link: string; // Link to the full article
}

const NewsArticlePreviewCard: React.FC<NewsArticleProps> = ({
  id,
  title,
  snippet,
  imageUrl,
  date,
  category,
  link
}) => {
  return (
    <article className="bg-app-surface rounded-card shadow-lg overflow-hidden flex flex-col sm:flex-row group transition-all duration-200 hover:shadow-app-primary/20">
      {imageUrl && (
        <div className="sm:w-1/3 flex-shrink-0 h-48 sm:h-auto relative">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          {category && <p className="text-xs font-semibold text-app-primary uppercase tracking-wider mb-1">{category}</p>}

          <Link href={link} className="block mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-app-text-base group-hover:text-app-primary transition-colors leading-tight line-clamp-2" title={title}>
              {title}
            </h3>
          </Link>

          <p className="text-sm text-app-text-muted line-clamp-3 mb-3">
            {snippet}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-app-text-muted mt-auto">
          <div className="flex items-center mb-2 sm:mb-0">
            <RiTimeLine className="w-3.5 h-3.5 mr-1.5" />
            <span>{date}</span>
          </div>

          <Link href={link} className="flex items-center text-app-secondary hover:text-app-secondary-hover font-medium group-hover:underline">
            Read More <RiArrowRightSLine className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </article>
  );
};

export default NewsArticlePreviewCard;