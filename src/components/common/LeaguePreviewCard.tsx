import Link from 'next/link';
import { RiGlobalLine, RiShieldFlashLine } from 'react-icons/ri';
import { LeagueConfig } from '@/lib/leagues';

export default function LeaguePreviewCard({ league }: { league: LeagueConfig }) {
  return (
    <Link
      href={`/leagues/${league.slug}`}
      className="bg-app-surface rounded-card shadow-lg hover:shadow-xl hover:border-app-primary border border-app-border transition-all duration-200 overflow-hidden group flex flex-col h-[280px]"
    >
      <div
        className={`h-2 bg-gradient-to-r ${league.accentClass}`}
        aria-hidden
      />
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-app-secondary">
              {league.shortName}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-app-primary/20 text-app-primary">
              {league.format}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-app-primary group-hover:text-app-primary-hover leading-tight line-clamp-2">
            {league.name}
          </h2>
          <p className="text-sm text-app-text-muted mt-2 line-clamp-2">{league.description}</p>
        </div>
        <div className="space-y-1.5 text-sm text-app-text-muted mt-3">
          <div className="flex items-center">
            <RiGlobalLine className="w-4 h-4 mr-2 text-app-secondary flex-shrink-0" />
            <span>{league.country}</span>
          </div>
          <div className="flex items-center">
            <RiShieldFlashLine className="w-4 h-4 mr-2 text-app-secondary flex-shrink-0" />
            <span>Franchise T20</span>
          </div>
        </div>
      </div>
      <div className="bg-app-surface/50 px-5 py-3 border-t border-app-border">
        <p className="text-xs text-app-primary group-hover:text-app-primary-hover font-semibold">
          View league hub &rarr;
        </p>
      </div>
    </Link>
  );
}
