// src/app/series/[seriesId]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RiFileList3Line } from 'react-icons/ri';
import MatchPreviewCard from '@/components/common/MatchPreviewCard';
import SeriesHeader from './_components/SeriesHeader';
import PointsTableDisplay from './_components/PointsTableDisplay';
import { mapApiMatchToMatchPreview } from '@/lib/data-mappers';
import { getSeriesInfo } from '@/lib/cricketdata-api';

export default async function SeriesDetailPage({ params }: { params: { seriesId: string } }) {
  const paramObj = await params;
  const seriesData = await getSeriesInfo(paramObj.seriesId);

 

  // If the series data or its nested info object doesn't exist, show a 404 page.
  if (!seriesData || !seriesData.info) {
    notFound();
  }

  //  console.log(seriesData)

  const { info, matchList, pointsTable } = seriesData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Pass the nested 'info' object to the SeriesHeader */}
      <SeriesHeader seriesInfo={info} />

      {matchList && matchList.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-app-text-base mb-6 flex items-center">
            <RiFileList3Line className="w-8 h-8 mr-3 text-app-secondary" />
            Matches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matchList.map(match => (
              <MatchPreviewCard key={match.id} {...mapApiMatchToMatchPreview(match)} />
            ))}
          </div>
        </section>
      )}

      {pointsTable && pointsTable.length > 0 && (
        <section className="mt-12">
          {/* The PointsTableDisplay component was already corrected to accept 'points' */}
          <PointsTableDisplay points={pointsTable} />
        </section>
      )}

      <div className="mt-12 text-center">
        <Link href="/series" className="text-app-secondary hover:text-app-secondary-hover font-medium">
          &larr; Back to All Series
        </Link>
      </div>
    </div>
  );
}