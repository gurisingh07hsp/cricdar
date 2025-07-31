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
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Match Header */}
        <div className="mb-8">
          <MatchHeader match={matchInfo} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scorecard Section */}
          <div className="lg:col-span-2">
            <ScorecardDisplay score={matchInfo.score} />
          </div>
          
          {/* Match Info Section */}
          <div className="lg:col-span-1">
            <MatchInfoTab match={matchInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}