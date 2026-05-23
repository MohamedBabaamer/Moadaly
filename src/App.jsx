import { useGradeCalculator } from './hooks/useGradeCalculator';
import ParticleCanvas from './components/ParticleCanvas';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UnitCard from './components/UnitCard';
import StatsBar from './components/StatsBar';

export default function App() {
  const {
    currentCycle,
    currentLevel,
    currentSemester,
    grades,
    isLoaded,
    filteredLevels,
    semesters,
    results,
    changeCycle,
    changeLevel,
    changeSemester,
    updateGrade,
    clearGrades
  } = useGradeCalculator();

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <ParticleCanvas />

      <div className="app-shell">
        <Header
          currentCycle={currentCycle}
          currentLevel={currentLevel}
          currentSemester={currentSemester}
          filteredLevels={filteredLevels}
          semesters={semesters}
          onCycleChange={changeCycle}
          onLevelChange={changeLevel}
          onSemesterChange={changeSemester}
          onClear={clearGrades}
        />

        <main className="app-main">
          <div className="main-container">
            <HeroSection semesterTitle={currentSemester} />

            <div className="section-intro">
              <p className="section-intro__label">Unit Entry</p>
              <p className="section-intro__text">
                Each block can be filled independently, and the general average is automatically recalculated.
              </p>
            </div>

            <div className="units-grid">
              {results.unitResults.map((unitResult) => (
                <UnitCard
                  key={`${currentLevel}-${currentSemester}-${unitResult.unitIdx}`}
                  unitResult={unitResult}
                  grades={grades}
                  onGradeChange={updateGrade}
                />
              ))}
            </div>
          </div>
        </main>

        <StatsBar
          semesterAvg={results.semesterAvg}
          creditsEarned={results.creditsEarned}
          totalCredits={results.totalCredits}
          passed={results.passed}
        />
      </div>
    </>
  );
}
