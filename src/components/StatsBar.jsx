/**
 * StatsBar — Fixed bottom panel displaying semester average, credits, and pass/fail.
 */
export default function StatsBar({ semesterAvg, creditsEarned, totalCredits, passed }) {
  return (
    <div className="stats-bar-wrapper">
      <div className="stats-bar">
        {/* Top accent line */}
        <div className="stats-bar__accent" aria-hidden="true" />

        {/* Left: label + credits */}
        <div className="stats-bar__info">
          <p className="stats-bar__label">Semester Average</p>
          <div className="stats-bar__credits">
            <span className="stats-dot" />
            <span className="stats-credits-text">
              Credits: <strong>{creditsEarned}</strong> / {totalCredits}
            </span>
          </div>
        </div>

        {/* Center: big number */}
        <div className="stats-bar__avg-group">
          <span className="stats-avg-number" id="semesterAvg">{semesterAvg.toFixed(2)}</span>
          <span className="stats-avg-denom">/20</span>
        </div>

        {/* Pass/Fail badge */}
        <div
          className={`stats-badge ${passed ? 'stats-badge--pass' : 'stats-badge--fail'}`}
          id="passStatus"
        >
          {passed ? 'PASSED' : 'FAILED'}
        </div>
      </div>
    </div>
  );
}
