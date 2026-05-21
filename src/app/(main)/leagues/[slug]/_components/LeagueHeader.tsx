import { LeagueConfig } from '@/lib/leagues';
import { SeriesInfo } from '@/types/cricket';
import { RiCalendar2Line, RiGlobalLine, RiShieldFlashLine } from 'react-icons/ri';

export default function LeagueHeader({
  league,
  seriesInfo,
}: {
  league: LeagueConfig;
  seriesInfo?: SeriesInfo | null;
}) {
  const title = seriesInfo?.name ?? league.name;
  const format = seriesInfo
    ? [
        seriesInfo.test > 0 && 'Test',
        seriesInfo.odi > 0 && 'ODI',
        seriesInfo.t20 > 0 && 'T20',
      ]
        .filter(Boolean)
        .join(', ')
    : league.format;

  let dateRange: string | null = null;
  if (seriesInfo?.startdate) {
    const year = new Date(seriesInfo.startdate).getFullYear();
    const end = seriesInfo.enddate
      ? new Date(`${seriesInfo.enddate}, ${year}`).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'TBD';
    const start = new Date(seriesInfo.startdate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    dateRange = `${start} – ${end}`;
  }

  return (
    <div className="rounded-card shadow-xl overflow-hidden mb-8">
      <div className={`h-3 bg-gradient-to-r ${league.accentClass}`} aria-hidden />
      <div className="bg-app-surface p-5 md:p-8">
        <p className="text-sm font-bold uppercase tracking-wider text-app-secondary mb-1">
          {league.shortName}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-app-primary leading-tight">{title}</h1>
        <p className="text-app-text-muted mt-3 max-w-3xl">{league.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-sm text-app-text-muted">
          <div className="flex items-center">
            <RiGlobalLine className="w-5 h-5 mr-2 text-app-secondary flex-shrink-0" />
            <span>{league.country}</span>
          </div>
          <div className="flex items-center">
            <RiShieldFlashLine className="w-5 h-5 mr-2 text-app-secondary flex-shrink-0" />
            <span>
              {format}
              {seriesInfo?.matches ? ` · ${seriesInfo.matches} matches` : ''}
              {seriesInfo?.squads ? ` · ${seriesInfo.squads} teams` : ''}
            </span>
          </div>
          {dateRange && (
            <div className="flex items-center">
              <RiCalendar2Line className="w-5 h-5 mr-2 text-app-secondary flex-shrink-0" />
              <span>{dateRange}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
