import { getFullMatchDetail } from '@/lib/cricketdata-api';
import { notFound } from 'next/navigation';
import MatchHeaderLive from './_components/MatchHeaderLive';
import MatchInfoTab from './_components/MatchInfoTab';
import MatchDetailTabs from './_components/MatchDetailTabs';

export const dynamic = 'force-dynamic';

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const detail = await getFullMatchDetail(matchId);

  if (!detail) {
    notFound();
  }

  const { match, scorecard, commentary, cricScoreSnap } = detail;
  const isLive = match.matchStarted && !match.matchEnded;

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <MatchHeaderLive
            matchId={matchId}
            match={match}
            scorecard={scorecard}
            cricScore={cricScoreSnap}
            isLive={isLive}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MatchDetailTabs
              matchId={matchId}
              initialScorecard={scorecard}
              initialCommentary={commentary}
              isLive={isLive}
            />
          </div>
          <div className="lg:col-span-1">
            <MatchInfoTab match={match} />
          </div>
        </div>
      </div>
    </div>
  );
}
