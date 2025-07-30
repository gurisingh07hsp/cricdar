import { ApiMatch } from '@/types/cricket';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const MatchHeader = ({ match }: { match: ApiMatch }) => {
    // FIX: Instead of relying on array order, we will create a robust mapping.

    // Get the name of the first team from the 'teams' array.
    const team1Name = match.teams?.[0];
    // Find the corresponding logo object from the 'teamInfo' array.
    const team1Info = match.teamInfo?.find(t => t.name === team1Name);
    // Find the corresponding score object from the 'score' array.
    const team1Score = match.score?.find(s => s.inning.includes(team1Name));

    // Do the same for the second team.
    const team2Name = match.teams?.[1];
    const team2Info = match.teamInfo?.find(t => t.name === team2Name);
    const team2Score = match.score?.find(s => s.inning.includes(team2Name));

    return (
        <div className="bg-app-surface rounded-lg shadow-lg p-5 md:p-6 text-app-text-base">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-app-primary">{match.name}</h1>
                <div className="mt-2 md:mt-0 px-3 py-1 text-sm font-bold rounded-full bg-red-600 text-white">
                    {match.status}
                </div>
            </div>

            <div className="space-y-4">
                {/* Team 1 Display */}
                {team1Name && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src={team1Info?.img || '/default-logo.png'} alt={team1Name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full bg-app-surface-darker" />
                            <span className="text-xl font-semibold">{team1Name}</span>
                        </div>
                        {team1Score && (
                            <span className="text-xl font-bold">{team1Score.r}-{team1Score.w} ({team1Score.o} ov)</span>
                        )}
                    </div>
                )}

                {/* Team 2 Display */}
                {team2Name && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src={team2Info?.img || '/default-logo.png'} alt={team2Name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full bg-app-surface-darker" />
                            <span className="text-xl font-semibold">{team2Name}</span>
                        </div>
                        {team2Score && (
                            <span className="text-xl font-bold">{team2Score.r}-{team2Score.w} ({team2Score.o} ov)</span>
                        )}
                    </div>
                )}
            </div>

            <div className="border-t border-app-border mt-5 pt-3 flex flex-col sm:flex-row sm:justify-between text-app-text-muted text-sm">
                <div className="flex items-center mb-2 sm:mb-0"><FaMapMarkerAlt className="mr-2" /><span>{match.venue}</span></div>
                <div className="flex items-center"><FaRegCalendarAlt className="mr-2" /><span>{new Date(match.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</span></div>
            </div>
        </div>
    );
};

export default MatchHeader;