import { NextResponse } from 'next/server';
import { getCricScoreMatches } from '@/lib/cricketdata-api';
import { mapCricScoreToMatchPreview } from '@/lib/cricscore-mappers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'all';

  const items = await getCricScoreMatches();
  let previews = items.map(mapCricScoreToMatchPreview);

  if (type === 'live') {
    previews = previews.filter((m) => m.status === 'Live');
  } else if (type === 'upcoming') {
    previews = previews.filter((m) => m.status === 'Upcoming');
  } else if (type === 'finished' || type === 'recent') {
    previews = previews.filter((m) => m.status === 'Finished');
  }

  const liveCount = previews.filter((m) => m.status === 'Live').length;

  return NextResponse.json({
    matches: previews,
    liveCount,
    updatedAt: new Date().toISOString(),
  });
}
