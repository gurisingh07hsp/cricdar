import React from 'react';
import { PointsTableEntry } from '@/types/cricket';
import { FaUsers } from 'react-icons/fa';
import { RiMedalLine } from 'react-icons/ri';

// Props interface updated to accept 'points'
interface PointsTableDisplayProps {
    points: PointsTableEntry[];
}

// Component signature updated to destructure 'points'
const PointsTableDisplay: React.FC<PointsTableDisplayProps> = ({ points }) => {
    // Logic updated to check 'points' prop
    if (!points || points.length === 0) {
        return <p className="text-app-text-muted text-center py-4">Points table not available for this series.</p>;
    }

    const headers = ['Rank', 'Team', 'P', 'W', 'L', 'T', 'NR', 'Pts', 'NRR'];

    return (
        <div className="bg-app-surface rounded-lg shadow-xl overflow-hidden">
            <header className="px-4 py-3 border-b border-app-border bg-app-surface/70">
                <h2 className="text-xl font-semibold text-app-text flex items-center">
                    <RiMedalLine className="w-6 h-6 mr-2 text-app-primary" />
                    Points Table
                </h2>
            </header>
            <div className="overflow-x-auto p-1 sm:p-2 md:p-4">
                <table className="min-w-full divide-y divide-app-border text-sm">
                    <thead className="bg-app-surface sticky top-0">
                        <tr>
                            {headers.map(header => (
                                <th key={header} scope="col" className="px-2 py-3 text-left text-xs font-semibold text-app-text-muted uppercase tracking-wider whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-app-border bg-app-surface">
                        {/* Data mapping updated to use 'points' prop */}
                        {points.sort((a, b) => a.rank - b.rank).map(entry => (
                            <tr key={entry.teamId} className="hover:bg-app-surface/50">
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.rank}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text font-medium flex items-center space-x-2">
                                    {entry.logoUrl ? <img src={entry.logoUrl} alt={entry.teamShortName} className="w-5 h-5 rounded-full" /> : <FaUsers className="w-5 h-5 text-app-text-muted opacity-75" />}
                                    <span>{entry.teamName} <span className="text-xs text-app-text-muted">({entry.teamShortName})</span></span>
                                </td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.played}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.won}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.lost}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.tied}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.noResult}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text font-bold text-center">{entry.points}</td>
                                <td className="px-2 py-3 whitespace-nowrap text-app-text text-center">{entry.netRunRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PointsTableDisplay;