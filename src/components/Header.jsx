/**
 * Header — App bar with logo, cycle/level/semester selects, and clear button.
 */
export default function Header({
  currentCycle,
  currentLevel,
  currentSemester,
  filteredLevels,
  semesters,
  onCycleChange,
  onLevelChange,
  onSemesterChange,
  onClear
}) {
  return (
    <header className="app-header">
      {/* glow overlay */}
      <div className="header-glow" aria-hidden="true" />

      {/* Logo */}
      <div className="header-brand">
        <div className="header-logo">
          <img src="./favicon.png" alt="" width={28} height={28} />
        </div>
        <div>
          <h2 className="header-title">Mo3adaly</h2>
          <p className="header-subtitle">Grade Calculator</p>
        </div>
      </div>

      {/* Controls */}
      <div className="header-controls">
        <select
          id="cycleSelect"
          aria-label="Study Cycle"
          className="header-select"
          value={currentCycle}
          onChange={(e) => onCycleChange(e.target.value)}
        >
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
        </select>

        <select
          id="levelSelect"
          aria-label="Level"
          className="header-select"
          value={currentLevel}
          onChange={(e) => onLevelChange(e.target.value)}
        >
          {filteredLevels.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          id="semesterSelect"
          aria-label="Semester"
          className="header-select header-select--wide"
          value={currentSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
        >
          {semesters.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="header-divider" />

        <button
          id="clearBtn"
          className="header-clear-btn"
          aria-label="Clear all grades"
          onClick={() => {
            if (window.confirm('Clear all grades? This cannot be undone.')) {
              onClear();
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </header>
  );
}
