import Link from 'next/link';
import { MatchPreviewProps } from '@/types/cricket';
import { RiBroadcastLine, RiCalendarEventLine, RiCheckDoubleLine } from 'react-icons/ri';

const TeamDisplay = ({ name, score, overs, logoUrl }: { name: string, score?: string, overs?: string, logoUrl?: string }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-app-surface flex-shrink-0">
        {logoUrl && <img src={logoUrl} alt={name} className="w-full h-full rounded-full object-cover" />}
      </div>
      <span className="font-semibold text-app-text-base">{name}</span>
    </div>
    {score && (
      <div className="text-right">
        <span className="font-bold text-lg text-app-text-base">{score}</span>
        {overs && <span className="text-xs text-app-text-muted ml-1">({overs} ov)</span>}
      </div>
    )}
  </div>
);

const StatusBadge = ({ status }: { status: 'Live' | 'Upcoming' | 'Finished' }) => {
  const statusStyles = {
    Live: {
      // FIX: Changed to a darker red and added the animate-pulse class for a glowing effect.
      classes: 'bg-red-600 text-white animate-pulse',
      icon: <RiBroadcastLine className="w-4 h-4" />,
      text: 'Live'
    },
    Upcoming: {
      classes: 'bg-blue-500/20 text-blue-400',
      icon: <RiCalendarEventLine className="w-4 h-4" />,
      text: 'Upcoming'
    },
    Finished: {
      classes: 'bg-gray-500/20 text-gray-400',
      icon: <RiCheckDoubleLine className="w-4 h-4" />,
      text: 'Finished'
    }
  };
  const currentStatus = statusStyles[status];

  return (
    <div className={`absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${currentStatus.classes}`}>
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
};

export default function MatchPreviewCard({ id, team1, team2, status, result, seriesName }: MatchPreviewProps) {
  return (
    <Link href={`/matches/${id}`} className="block bg-app-card-bg rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 relative h-full">
      <StatusBadge status={status} />
      <div className="space-y-3 pt-8">
        <TeamDisplay {...team1} />
        <TeamDisplay {...team2} />
      </div>
      <div className="mt-4 pt-4 border-t border-app-border">
        <p className="text-xs text-app-text-muted truncate" title={seriesName}>{seriesName}</p>
        <p className="text-xs text-app-text-muted font-medium mt-1">{result}</p>
      </div>
    </Link>
  );
}