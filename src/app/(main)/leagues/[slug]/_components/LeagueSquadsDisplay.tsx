import { SeriesSquadTeam } from '@/lib/league-mappers';
import { FaUsers } from 'react-icons/fa';

export default function LeagueSquadsDisplay({ squads }: { squads: SeriesSquadTeam[] }) {
  if (!squads.length) {
    return (
      <p className="text-app-text-muted text-center py-8">
        Squad lists are not available for this league season yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {squads.map((team) => (
        <div
          key={team.shortname}
          className="bg-app-surface rounded-lg shadow-lg border border-app-border overflow-hidden"
        >
          <header className="px-4 py-3 border-b border-app-border flex items-center gap-3 bg-app-surface/80">
            {team.img ? (
              <img src={team.img} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <FaUsers className="w-8 h-8 text-app-text-muted" />
            )}
            <div>
              <h3 className="font-semibold text-app-text">{team.teamName}</h3>
              <p className="text-xs text-app-text-muted">{team.players.length} players</p>
            </div>
          </header>
          <ul className="divide-y divide-app-border max-h-80 overflow-y-auto">
            {team.players.map((p) => (
              <li key={p.id} className="px-4 py-2.5 flex items-center gap-3 text-sm hover:bg-app-surface/50">
                {p.playerImg ? (
                  <img src={p.playerImg} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-app-border flex items-center justify-center text-xs text-app-text-muted">
                    {p.name.charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-app-text truncate">{p.name}</p>
                  <p className="text-xs text-app-text-muted truncate">
                    {[p.role, p.country].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
