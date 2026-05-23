/**
 * HeroSection — Animated dashboard banner with semester title and feature chips.
 */
export default function HeroSection({ semesterTitle }) {
  return (
    <section className="hero-panel animate-fade-in">
      <div className="hero-panel__copy">
        <p className="hero-kicker">Academic Dashboard</p>
        <h1 className="hero-title" id="semesterTitle">{semesterTitle}</h1>
        <p className="hero-description">
          Enter your grades to calculate your average instantly.
          Credits update in real-time, with local storage enabled.
        </p>
      </div>
      <div className="hero-panel__chips" aria-label="Key Features">
        <span className="hero-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Real-time
        </span>
        <span className="hero-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Auto-Save
        </span>
        <span className="hero-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
          LMD System
        </span>
      </div>
    </section>
  );
}
