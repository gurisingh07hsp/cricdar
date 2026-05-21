import { ScorecardEntry } from '@/types/cricket';
import { RiFileList3Line } from 'react-icons/ri';

export default function FullScorecardDisplay({
  scorecard,
}: {
  scorecard: ScorecardEntry[];
}) {
  if (!scorecard.length) {
    return (
      <div className="bg-app-surface rounded-lg border border-app-border p-8 text-center">
        <p className="text-app-text-muted">Scorecard will appear once the match starts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {scorecard.map((inn, idx) => (
        <div
          key={idx}
          className="bg-app-surface rounded-lg border border-app-border overflow-hidden"
        >
          <div className="bg-app-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <RiFileList3Line className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">{inn.inning}</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-app-card-bg text-left text-xs text-app-text-muted uppercase">
                  <th className="px-4 py-2">Batsman</th>
                  <th className="px-2 py-2 text-right">R</th>
                  <th className="px-2 py-2 text-right">B</th>
                  <th className="px-2 py-2 text-right">4s</th>
                  <th className="px-2 py-2 text-right">6s</th>
                  <th className="px-2 py-2 text-right">SR</th>
                </tr>
              </thead>
              <tbody>
                {inn.scores.map((b, i) => (
                  <tr key={i} className="border-t border-app-border">
                    <td className="px-4 py-2">
                      <span className="font-medium text-app-text-base">{b.batsman}</span>
                      {b['dismissal-info'] && (
                        <p className="text-xs text-app-text-muted">{b['dismissal-info']}</p>
                      )}
                    </td>
                    <td className="px-2 py-2 text-right font-semibold">{b.runs}</td>
                    <td className="px-2 py-2 text-right">{b.balls}</td>
                    <td className="px-2 py-2 text-right">{b.fours}</td>
                    <td className="px-2 py-2 text-right">{b.sixes}</td>
                    <td className="px-2 py-2 text-right">{b.sr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {inn.bowling.length > 0 && (
            <div className="border-t border-app-border overflow-x-auto">
              <p className="px-4 py-2 text-xs font-semibold text-app-text-muted uppercase bg-app-card-bg">
                Bowling
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-app-card-bg text-left text-xs text-app-text-muted uppercase">
                    <th className="px-4 py-2">Bowler</th>
                    <th className="px-2 py-2 text-right">O</th>
                    <th className="px-2 py-2 text-right">M</th>
                    <th className="px-2 py-2 text-right">R</th>
                    <th className="px-2 py-2 text-right">W</th>
                    <th className="px-2 py-2 text-right">Econ</th>
                  </tr>
                </thead>
                <tbody>
                  {inn.bowling.map((b, i) => (
                    <tr key={i} className="border-t border-app-border">
                      <td className="px-4 py-2 font-medium">{b.bowler}</td>
                      <td className="px-2 py-2 text-right">{b.overs}</td>
                      <td className="px-2 py-2 text-right">{b.maidens}</td>
                      <td className="px-2 py-2 text-right">{b.runs}</td>
                      <td className="px-2 py-2 text-right font-semibold">{b.wickets}</td>
                      <td className="px-2 py-2 text-right">{b.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
