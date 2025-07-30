import { Score } from '@/types/cricket';
import React from 'react';
import { RiFileList3Line } from 'react-icons/ri';

// The component now accepts the 'score' summary array
const ScorecardDisplay: React.FC<{ score?: Score[] }> = ({ score }) => {
    // Show a fallback message if no score summary is available
    if (!score || score.length === 0) {
        return (
            <div className="bg-app-surface rounded-lg shadow-lg p-5 text-center">
                <p className="text-app-text-muted">Score details will be available once the match begins.</p>
            </div>
        );
    }

    return (
        <div className="bg-app-surface rounded-lg shadow-lg overflow-hidden">
            <header className="px-5 py-4 border-b border-app-border bg-app-surface/80 flex items-center">
                <RiFileList3Line className="w-6 h-6 mr-3 text-app-primary" />
                <h3 className="text-xl font-bold text-app-text-base">Innings Summary</h3>
            </header>
            <div className="p-4 space-y-4">
                {/* Map over the score array to display each inning's summary */}
                {score.map((inning, index) => (
                    <div key={index} className="flex justify-between items-center bg-app-card-bg p-4 rounded-md">
                        <p className="font-semibold text-app-text-base">{inning.inning}</p>
                        <p className="text-xl font-bold text-app-primary">
                            {inning.r} / {inning.w} <span className="text-sm font-normal text-app-text-muted">({inning.o} overs)</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScorecardDisplay;