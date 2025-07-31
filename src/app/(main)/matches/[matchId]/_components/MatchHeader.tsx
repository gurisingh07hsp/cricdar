import { ApiMatch } from '@/types/cricket';
import { FaRegCalendarAlt, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';

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

    // Determine match status styling
    const getStatusStyle = (status: string) => {
        if (status.toLowerCase().includes('live')) {
            return 'bg-red-600 text-white animate-pulse';
        } else if (status.toLowerCase().includes('won')) {
            return 'bg-green-600 text-white';
        } else if (status.toLowerCase().includes('drawn')) {
            return 'bg-yellow-600 text-white';
        } else {
            return 'bg-blue-600 text-white';
        }
    };

    return (
        <div className="bg-app-surface rounded-lg shadow-lg border border-app-border">
            <div className="p-4">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="p-1.5 bg-app-primary rounded-lg">
                                <FaTrophy className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-semibold text-app-text-base">
                                {match.name}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-app-text-muted">
                            <div className="flex items-center space-x-1">
                                <FaMapMarkerAlt className="w-3 h-3" />
                                <span>{match.venue}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaRegCalendarAlt className="w-3 h-3" />
                                <span>{new Date(match.date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`mt-3 lg:mt-0 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${getStatusStyle(match.status)}`}>
                        <div className="flex items-center space-x-1">
                            {match.status.toLowerCase().includes('live') && (
                                <RiLiveLine className="w-3 h-3 animate-pulse" />
                            )}
                            <span>{match.status}</span>
                        </div>
                    </div>
                </div>

                {/* Teams Section */}
                <div className="space-y-3">
                    {/* Team 1 */}
                    {team1Name && (
                        <div className="bg-app-card-bg rounded-lg p-3 border border-app-border hover:border-app-primary/50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img 
                                            src={team1Info?.img || '/default-logo.png'} 
                                            alt={team1Name} 
                                            className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full border-2 border-white shadow-md" 
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-app-primary rounded-full flex items-center justify-center">
                                            <FaTrophy className="w-2 h-2 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold text-app-text-base">{team1Name}</h3>
                                        <p className="text-xs text-app-text-muted">First Innings</p>
                                    </div>
                                </div>
                                {team1Score && (
                                    <div className="text-right">
                                        <div className="text-xl md:text-2xl font-bold text-app-primary">
                                            {team1Score.r}/{team1Score.w}
                                        </div>
                                        <div className="text-xs text-app-text-muted">
                                            {team1Score.o} overs
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* VS Separator */}
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 bg-app-primary rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-md">
                            VS
                        </div>
                    </div>

                    {/* Team 2 */}
                    {team2Name && (
                        <div className="bg-app-card-bg rounded-lg p-3 border border-app-border hover:border-app-primary/50 transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img 
                                            src={team2Info?.img || '/default-logo.png'} 
                                            alt={team2Name} 
                                            className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full border-2 border-white shadow-md" 
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-app-secondary rounded-full flex items-center justify-center">
                                            <FaTrophy className="w-2 h-2 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold text-app-text-base">{team2Name}</h3>
                                        <p className="text-xs text-app-text-muted">Second Innings</p>
                                    </div>
                                </div>
                                {team2Score && (
                                    <div className="text-right">
                                        <div className="text-xl md:text-2xl font-bold text-app-secondary">
                                            {team2Score.r}/{team2Score.w}
                                        </div>
                                        <div className="text-xs text-app-text-muted">
                                            {team2Score.o} overs
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Match Progress Bar */}
                <div className="mt-4 p-3 bg-app-card-bg rounded-lg border border-app-border">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-app-text-base">Match Progress</span>
                        <span className="text-xs text-app-text-muted">Live Updates</span>
                    </div>
                    <div className="w-full bg-app-border rounded-full h-1.5">
                        <div className="bg-app-primary h-1.5 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchHeader;