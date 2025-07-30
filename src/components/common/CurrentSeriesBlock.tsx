// src/components/common/CurrentSeriesBlock.tsx
import React from 'react';
import Link from 'next/link';
import { RiTrophyLine, RiArrowRightCircleLine } from 'react-icons/ri';

interface SimpleSeriesInfo {
  id: string;
  name: string;
  year?: string;
}

interface CurrentSeriesBlockProps {
  seriesList: SimpleSeriesInfo[];
  title?: string;
}

const CurrentSeriesBlock: React.FC<CurrentSeriesBlockProps> = ({
  seriesList,
  title = "Current & Upcoming Series"
}) => {
  if (!seriesList || seriesList.length === 0) {
    return null;
  }

  return (
    <div className="bg-app-surface rounded-card shadow-md p-5">
      <h3 className="text-md font-semibold text-app-text-base mb-3 flex items-center">
        <RiTrophyLine className="w-5 h-5 mr-2 text-app-secondary" />
        {title}
      </h3>
      <ul className="space-y-2">
        {seriesList.map(series => (
          <li key={series.id}>

            <Link href={`/series/${series.id}`} className="flex items-center justify-between text-sm text-app-text-muted hover:text-app-primary hover:bg-app-primary/5 p-2 rounded-md transition-all group">
              <span>
                {series.name} {series.year && `(${series.year})`}
              </span>
              <RiArrowRightCircleLine className="w-5 h-5 text-app-border group-hover:text-app-primary transition-colors opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1" />
            </Link>

          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">

        <Link href="/series" className="text-xs text-app-secondary hover:text-app-secondary-hover font-medium">
          View All Series &rarr;
        </Link>

      </div>
    </div>
  );
};

export default CurrentSeriesBlock;