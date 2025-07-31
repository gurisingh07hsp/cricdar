import { ApiMatch } from '@/types/cricket';
import React from 'react';
import { RiInformationLine, RiTrophyLine, RiTimeLine, RiUserLine, RiSettings3Line } from 'react-icons/ri';

const MatchInfoTab: React.FC<{ match: ApiMatch }> = ({ match }) => {
    const infoItems = [
        { 
            label: 'Match Type', 
            value: match.matchType.toUpperCase(),
            icon: RiTrophyLine,
            color: 'text-app-primary'
        },
        { 
            label: 'Match Winner', 
            value: match.matchWinner || 'TBD',
            icon: RiTrophyLine,
            color: 'text-app-primary'
        },
        { 
            label: 'Toss Winner', 
            value: match.tossWinner || 'N/A',
            icon: RiUserLine,
            color: 'text-app-primary'
        },
        { 
            label: 'Toss Choice', 
            value: match.tossChoice || 'N/A',
            icon: RiSettings3Line,
            color: 'text-app-primary'
        },
    ];

    return (
        <div className="bg-app-surface rounded-lg shadow-lg border border-app-border overflow-hidden">
            {/* Header */}
            <div className="bg-app-primary px-4 py-3">
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                        <RiInformationLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Match Information</h3>
                        <p className="text-white/80 text-xs">Key match details</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="space-y-3">
                    {infoItems.map((item, _index) => {
                        const Icon = item.icon;
                        return (
                            <div 
                                key={item.label} 
                                className="bg-app-card-bg rounded-lg p-3 border border-app-border hover:border-app-primary/50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-1.5 rounded-lg bg-app-primary">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-app-text-base text-sm">{item.label}</h4>
                                            <p className="text-xs text-app-text-muted">Match detail</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-sm font-semibold ${item.color}`}>
                                            {item.value}
                                        </div>
                                        <div className="text-xs text-app-text-muted">
                                            {item.label.toLowerCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Stats */}
                <div className="mt-4 p-3 bg-app-card-bg rounded-lg border border-app-border">
                    <div className="flex items-center space-x-2 mb-2">
                        <RiTimeLine className="w-4 h-4 text-app-primary" />
                        <h4 className="font-semibold text-app-text-base text-sm">Match Timeline</h4>
                    </div>
                    <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Start Time</span>
                            <span className="text-app-text-base font-medium">
                                {new Date(match.date).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Duration</span>
                            <span className="text-app-text-base font-medium">5 Days (Test)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Format</span>
                            <span className="text-app-text-base font-medium">{match.matchType}</span>
                        </div>
                    </div>
                </div>

                {/* Venue Information */}
                <div className="mt-3 p-3 bg-app-card-bg rounded-lg border border-app-border">
                    <div className="flex items-center space-x-2 mb-2">
                        <RiInformationLine className="w-4 h-4 text-app-primary" />
                        <h4 className="font-semibold text-app-text-base text-sm">Venue Details</h4>
                    </div>
                    <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Ground</span>
                            <span className="text-app-text-base font-medium">{match.venue}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Capacity</span>
                            <span className="text-app-text-base font-medium">25,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-app-text-muted">Pitch Type</span>
                            <span className="text-app-text-base font-medium">Batting friendly</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-app-card-bg px-4 py-3 border-t border-app-border">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                        <RiTimeLine className="w-3 h-3 text-app-text-muted" />
                        <span className="text-app-text-muted">Last Updated</span>
                    </div>
                    <span className="text-app-text-base font-semibold">
                        {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MatchInfoTab;