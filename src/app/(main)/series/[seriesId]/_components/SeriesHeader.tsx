import React from 'react';
import { SeriesInfo } from '@/types/cricket';
import { RiCalendar2Line, RiShieldFlashLine } from 'react-icons/ri';

const SeriesHeader: React.FC<{ seriesInfo: SeriesInfo }> = ({ seriesInfo }) => {
    // Determine format based on match counts
    const format = [];
    if (seriesInfo.test > 0) format.push("Test");
    if (seriesInfo.odi > 0) format.push("ODI");
    if (seriesInfo.t20 > 0) format.push("T20");

    // The endDate from the API ("Jul 24") needs the year to be a valid date.
    // We get the year from the startdate.
    const year = new Date(seriesInfo.startdate).getFullYear();
    const formattedEndDate = new Date(`${seriesInfo.enddate}, ${year}`);

    return (
        <div className="bg-app-surface rounded-card shadow-xl p-5 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-app-primary leading-tight mb-2 md:mb-0">
                    {seriesInfo.name}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-app-text-muted mb-4">
                <div className="flex items-center">
                    <RiCalendar2Line className="w-5 h-5 mr-2.5 text-app-secondary flex-shrink-0" />
                    {/* FIX: Use the correct lowercase property names */}
                    <span>{new Date(seriesInfo.startdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} to {formattedEndDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                    <RiShieldFlashLine className="w-5 h-5 mr-2.5 text-app-secondary flex-shrink-0" />
                    <span>{format.join(', ')} ({seriesInfo.matches} Matches)</span>
                </div>
            </div>
        </div>
    );
};

export default SeriesHeader;