// src/app/page.tsx
import React from "react";
import Link from "next/link";
import { RiBroadcastLine, RiCalendarTodoLine, RiArrowRightSLine, RiTrophyLine, RiFileList2Line, RiTeamLine, RiSignalWifiErrorLine } from "react-icons/ri";

// API and Mapper Imports
import { getAllMatches, getSeriesList } from "@/lib/cricketdata-api";
import { mapApiMatchToMatchPreview, mapApiSeriesToSeriesPreview } from "@/lib/data-mappers";

// Component Imports
import MatchPreviewCard from "@/components/common/MatchPreviewCard";
import SeriesPreviewCard from "@/components/common/SeriesPreviewCard";
import AdvertisementBlock from "@/components/common/AdvertisementBlock";
import SidebarListWidget from "@/components/common/SidebarListWidget";

// Reusable Section Component
const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactElement; viewAllLink?: string; noContainerOnChildren?: boolean; }> = ({ title, children, icon, viewAllLink, noContainerOnChildren = false }) => (
  <section className="py-8 md:py-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center">
          {icon && React.cloneElement(icon, { className: `w-7 h-7 md:w-8 md:h-8 mr-3 text-app-primary` })}
          <h2 className="text-2xl md:text-3xl font-bold text-app-text-base">{title}</h2>
        </div>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm font-medium text-app-secondary hover:text-app-secondary-hover flex items-center group">
            View All <RiArrowRightSLine className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
    {noContainerOnChildren ? (children) : (<div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>)}
  </section>
);


export default async function HomePage() {
  const [apiMatches, apiSeries] = await Promise.all([
    getAllMatches(),
    getSeriesList()
  ]);

  const allMatches = (apiMatches || []).map(mapApiMatchToMatchPreview);
  const liveMatches = allMatches.filter(m => m.status === 'Live').slice(0, 6);
  const upcomingMatches = allMatches.filter(m => m.status === 'Upcoming').slice(0, 4);

  const allSeries = (apiSeries || []).map(mapApiSeriesToSeriesPreview);
  const featuredSeries = allSeries.slice(0, 3);
  const moreSeriesToExplore = allSeries.slice(0, 4);

  console.log("All Matches ", allMatches);
  console.log("All Series", allSeries)

  const upcomingMatchesForSidebar = upcomingMatches.map(match => ({
    id: match.id,
    primaryText: `${match.team1.name} vs ${match.team2.name}`,
    secondaryText: match.seriesName,
    link: `/matches/${match.id}`
  }));

  const featuredSeriesForSidebar = featuredSeries.map(series => ({
    id: series.id,
    primaryText: series.name,
    secondaryText: `${series.format} - ${series.year}`,
    link: `/series/${series.id}`
  }));

  const scrollContainerClasses = "flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-app-border scrollbar-track-transparent";
  const cardWrapperClasses = "flex-shrink-0 w-72 xs:w-80 sm:w-[330px]";

  return (
    <>
      {/* FIX: Conditionally render the Live Matches section or a fallback message. */}
      {liveMatches.length > 0 ? (
        <Section title="Live Matches" icon={<RiBroadcastLine />} viewAllLink="/matches?status=live" noContainerOnChildren>
          <div className={`${scrollContainerClasses} pl-4 sm:pl-6 lg:pl-8`}>
            {liveMatches.map(match => (
              <div key={match.id} className={cardWrapperClasses}>
                <MatchPreviewCard {...match} />
              </div>
            ))}
          </div>
        </Section>
      ) : (
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center bg-app-surface p-8 rounded-lg shadow-md">
              <RiSignalWifiErrorLine className="w-12 h-12 mx-auto text-app-text-muted mb-4" />
              <h2 className="text-2xl font-bold text-app-text-base mb-2">No Live Matches Currently</h2>
              <p className="text-app-text-muted">Check back soon or browse upcoming matches.</p>
              <Link href="/matches?status=upcoming" className="mt-4 inline-block bg-app-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-app-primary-hover transition-colors">
                View Upcoming Matches
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      {/* <Section title="Updates" icon={<RiFileList2Line />} viewAllLink="/news">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <AdvertisementBlock />
            <SidebarListWidget title="Upcoming Matches" items={upcomingMatchesForSidebar} headerIcon={RiCalendarTodoLine} listIcon={RiBroadcastLine} viewAllLink="/matches?status=upcoming" maxItems={4} />
          </aside>
          <div className="lg:col-span-6">
            <p className="text-center text-app-text-muted p-8 bg-app-surface rounded-lg">News Section (Dummy Content)</p>
          </div>
          <aside className="lg:col-span-3 space-y-6">
            <AdvertisementBlock />
            <SidebarListWidget title="Featured Series" items={featuredSeriesForSidebar} headerIcon={RiTrophyLine} listIcon={RiTeamLine} viewAllLink="/series" maxItems={3} />
          </aside>
        </div>
      </Section> */}

      {/* More Series to Explore Section */}
      {moreSeriesToExplore.length > 0 && (
        <Section title="More Series to Explore" icon={<RiTrophyLine />} viewAllLink="/series" noContainerOnChildren>
          <div className={`${scrollContainerClasses} pl-4 sm:pl-6 lg:pl-8`}>
            {moreSeriesToExplore.map(series => (
              <div key={series.id} className={cardWrapperClasses}>
                <SeriesPreviewCard {...series} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}