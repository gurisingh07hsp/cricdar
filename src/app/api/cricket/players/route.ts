import { NextRequest, NextResponse } from 'next/server';
import { fetchPlayersList } from '@/lib/cricketdata-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const offset = Math.max(0, parseInt(searchParams.get('offset') ?? '0', 10) || 0);
  const search = searchParams.get('search') ?? undefined;

  const result = await fetchPlayersList(offset, search);

  if (!result) {
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    players: result.data,
    totalRows: result.info?.totalRows ?? result.data.length,
    offsetRows: result.info?.offsetRows ?? offset,
    hasMore: result.data.length >= 25,
  });
}
