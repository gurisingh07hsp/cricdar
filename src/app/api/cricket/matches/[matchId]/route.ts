import { NextResponse } from 'next/server';
import { getFullMatchDetail } from '@/lib/cricketdata-api';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;
  const detail = await getFullMatchDetail(matchId);

  if (!detail) {
    return NextResponse.json({ error: 'Match not found' }, { status: 404 });
  }

  return NextResponse.json({
    match: detail.match,
    scorecard: detail.scorecard,
    commentary: detail.commentary,
    cricScoreSnap: detail.cricScoreSnap ?? null,
    updatedAt: new Date().toISOString(),
  });
}
