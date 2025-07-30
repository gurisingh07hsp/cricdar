import { getMatchInfo } from '@/lib/cricketdata-api';
import { notFound } from 'next/navigation';
import MatchHeader from './_components/MatchHeader';
import MatchInfoTab from './_components/MatchInfoTab';
import ScorecardDisplay from './_components/ScorecardDisplay';

export default async function MatchDetailPage({ params }: { params: { matchId: string } }) {
  const paramsObj = await params;
  const matchInfo = await getMatchInfo(paramsObj.matchId);

  if (!matchInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      {/* MatchHeader is already correct from our last fix */}
      <MatchHeader match={matchInfo} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* FIX: Pass the 'score' array to the ScorecardDisplay component */}
          <ScorecardDisplay score={matchInfo.score} />
        </div>
        <div className="lg:col-span-1">
          {/* MatchInfoTab is also correct */}
          <MatchInfoTab match={matchInfo} />
        </div>
      </div>
    </div>
  );
}