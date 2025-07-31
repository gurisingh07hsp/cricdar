import React from 'react';
import Link from 'next/link';
import { RiCalendarCheckLine, RiShieldFlashLine, RiGlobalLine } from 'react-icons/ri';
import { SeriesPreviewProps } from '@/types/cricket'; // Assuming types are here

// SeriesPreviewProps should be imported or defined as before

const SeriesPreviewCard: React.FC<SeriesPreviewProps> = ({
  id,
  name,
  year,
  format,
  country,
  _logoUrl,
  status,
  matchCount,
  teamCount
}) => {
  let statusColorClasses = 'bg-app-text-muted text-app-bg';
  if (status === 'Ongoing') statusColorClasses = 'bg-status-live-bg text-status-live-text animate-pulse';
  else if (status === 'Upcoming') statusColorClasses = 'bg-status-upcoming-bg text-status-upcoming-text';
  else if (status === 'Completed') statusColorClasses = 'bg-status-finished-bg text-status-finished-text';

  // MatchPreviewCard uses h-[370px] sm:h-[380px]. Series cards might be shorter.
  // Let's aim for a height that fits its content well. e.g., h-[260px]
  const fixedHeightStyle = "h-[270px] sm:h-[280px]";

  return (
    
      <Link href={`/series/${id}`} className={`bg-app-surface rounded-card shadow-lg hover:shadow-xl hover:border-app-primary border border-app-border transition-all duration-200 ease-in-out overflow-hidden group flex flex-col ${fixedHeightStyle}`}>
        <div className="p-5 flex-grow flex flex-col justify-between"> {/* flex-grow and internal flex for content distribution */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-semibold text-app-primary group-hover:text-app-primary-hover transition-colors leading-tight line-clamp-2" title={name}> {/* line-clamp for name */}
                {name}
              </h2>
              {status && (
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${statusColorClasses} flex-shrink-0`}>
                  {status}
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm mb-3"> {/* Added mb-3 */}
              <div className="flex items-center text-app-text-muted">
                <RiCalendarCheckLine className="w-4 h-4 mr-2 text-app-secondary flex-shrink-0" />
                <span>{year}</span>
              </div>
              <div className="flex items-center text-app-text-muted">
                <RiShieldFlashLine className="w-4 h-4 mr-2 text-app-secondary flex-shrink-0" />
                <span className="truncate" title={format}>{format}</span> {/* Truncate format if long */}
              </div>
              {country && (
                <div className="flex items-center text-app-text-muted">
                  <RiGlobalLine className="w-4 h-4 mr-2 text-app-secondary flex-shrink-0" />
                  <span className="truncate" title={country}>{country}</span> {/* Truncate country if long */}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 text-app-text-muted">
            {teamCount != null && <span>{teamCount} Teams</span>}
            {matchCount != null && <span>{matchCount} Matches</span>}
          </div>
        </div>

        <div className="bg-app-surface/50 px-5 py-3 border-t border-app-border flex-shrink-0">
          <p className="text-xs text-app-primary group-hover:text-app-primary-hover font-semibold transition-colors">
            View Details &rarr;
          </p>
        </div>
      </Link>
    
  );
};

export default SeriesPreviewCard;