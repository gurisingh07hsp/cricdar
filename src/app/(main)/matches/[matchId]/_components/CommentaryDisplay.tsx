import { CommentaryItem } from '@/types/cricket';
import { RiChat3Line } from 'react-icons/ri';

export default function CommentaryDisplay({
  commentary,
}: {
  commentary: CommentaryItem[];
}) {
  if (!commentary.length) {
    return (
      <div className="bg-app-surface rounded-lg border border-app-border p-8 text-center">
        <RiChat3Line className="w-10 h-10 mx-auto text-app-text-muted mb-3" />
        <p className="text-app-text-muted">No match updates available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-app-surface rounded-lg border border-app-border overflow-hidden">
      <div className="bg-app-primary px-4 py-3">
        <div className="flex items-center gap-2">
          <RiChat3Line className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">Match Updates</h3>
        </div>
        <p className="text-white/70 text-xs mt-1">
          Live status and key events from the scorecard
        </p>
      </div>
      <ul className="divide-y divide-app-border max-h-[600px] overflow-y-auto">
        {commentary.map((item) => (
          <li
            key={item.id}
            className={`px-4 py-3 ${
              item.eventType === 'WICKET'
                ? 'bg-red-500/10'
                : item.eventType === 'STATUS'
                  ? 'bg-app-primary/5'
                  : 'hover:bg-app-card-bg/50'
            }`}
          >
            {item.eventType === 'WICKET' && (
              <span className="text-xs font-bold text-red-500 mb-1 block">WICKET</span>
            )}
            <p className="text-sm text-app-text-base leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
