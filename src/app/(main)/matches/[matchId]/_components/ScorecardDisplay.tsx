import { Score } from '@/types/cricket';
import React from 'react';
import { RiFileList3Line, RiBarChartLine, RiTimeLine, RiTrophyLine } from 'react-icons/ri';

// The component now accepts the 'score' summary array
const ScorecardDisplay: React.FC<{ score?: Score[] }> = ({ score }) => {
    // Show a fallback message if no score summary is available
    if (!score || score.length === 0) {
        return (
            <div className="bg-app-surface rounded-lg shadow-lg border border-app-border p-6 text-center">
                <div className="w-12 h-12 bg-app-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <RiBarChartLine className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-app-text-base mb-2">Score Details</h3>
                <p className="text-app-text-muted text-sm">Score details will be available once the match begins.</p>
            </div>
        );
    }

    return (
        <div className="bg-app-surface rounded-lg shadow-lg border border-app-border overflow-hidden">
            {/* Header */}
            <div className="bg-app-primary px-4 py-3">
                <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                        <RiFileList3Line className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Innings Summary</h3>
                        <p className="text-white/80 text-xs">Live score updates</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {score.map((inning, index) => {
                    const isFirstInnings = index === 0;
                    const _isSecondInnings = index === 1;
                    
                    return (
                        <div 
                            key={index} 
                            className="bg-app-card-bg rounded-lg border border-app-border hover:border-app-primary/50 transition-colors"
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-1.5 rounded-lg bg-app-primary text-white">
                                            <RiTrophyLine className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-app-text-base">
                                                {inning.inning}
                                            </h4>
                                            <p className="text-xs text-app-text-muted">
                                                {isFirstInnings ? 'First Innings' : 'Second Innings'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className="px-2 py-1 rounded-full text-xs font-semibold bg-app-primary/10 text-app-primary">
                                        {isFirstInnings ? 'Completed' : 'In Progress'}
                                    </div>
                                </div>

                                {/* Score Display */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-app-primary">
                                            {inning.r}
                                        </div>
                                        <p className="text-xs text-app-text-muted">Runs</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-app-primary">
                                            {inning.w}
                                        </div>
                                        <p className="text-xs text-app-text-muted">Wickets</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-app-primary">
                                            {inning.o}
                                        </div>
                                        <p className="text-xs text-app-text-muted">Overs</p>
                                    </div>
                                </div>

                                {/* Run Rate */}
                                <div className="mt-3 p-2 bg-app-surface rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-app-text-base">Run Rate</span>
                                        <span className="text-sm font-bold text-app-primary">
                                            {(inning.r / parseFloat(String(inning.o) || '1')).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-xs text-app-text-muted mb-1">
                                        <span>Overs Progress</span>
                                        <span>{inning.o} / 50</span>
                                    </div>
                                    <div className="w-full bg-app-border rounded-full h-1.5">
                                        <div 
                                            className="bg-app-primary h-1.5 rounded-full transition-all duration-500" 
                                            style={{ width: `${(parseFloat(String(inning.o)) / 50) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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

export default ScorecardDisplay;