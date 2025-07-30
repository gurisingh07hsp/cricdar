import { ApiMatch } from '@/types/cricket';
import React from 'react';

const MatchInfoTab: React.FC<{ match: ApiMatch }> = ({ match }) => {
    const infoItems = [
        { label: 'Match Type', value: match.matchType.toUpperCase() },
        { label: 'Match Winner', value: match.matchWinner || 'N/A' },
        { label: 'Toss Winner', value: match.tossWinner || 'N/A' },
        { label: 'Toss Choice', value: match.tossChoice || 'N/A' },
    ];

    return (
        <div className="bg-app-surface rounded-lg shadow-lg p-5">
            <h3 className="text-xl font-bold text-app-text-base border-b border-app-border pb-3 mb-4">
                Match Information
            </h3>
            <ul className="space-y-3 text-sm">
                {infoItems.map(item => (
                    <li key={item.label} className="flex justify-between">
                        <span className="font-semibold text-app-text-muted">{item.label}</span>
                        <span className="text-right text-app-text-base">{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchInfoTab;