import CourseRow from './CourseRow';

/**
 * UnitCard — Glassmorphic card for one academic unit, containing its course rows.
 */
export default function UnitCard({ unitResult, grades, onGradeChange }) {
  const avgClass = unitResult.unitAvg >= 10 ? 'unit-avg--pass' : 'unit-avg--fail';
  const credClass = unitResult.unitCreditsEarned >= unitResult.unitCredits ? 'unit-cred--full' : '';

  return (
    <div className="unit-card">
      {/* Unit header */}
      <div className="unit-header">
        <h3 className="unit-name">{unitResult.unitName}</h3>
        <div className="unit-stats">
          <span className="unit-stat">
            Avg: <span className={`unit-avg ${avgClass}`}>{unitResult.unitAvg.toFixed(2)}</span>
          </span>
          <span className="unit-stat">
            Credits: <span className={`unit-cred ${credClass}`}>{unitResult.unitCreditsEarned.toFixed(1)}</span>
            <span className="unit-cred-total"> / {unitResult.unitCredits}</span>
          </span>
        </div>
      </div>

      {/* Table header (desktop) */}
      <div className="course-table-header">
        <div className="cth-module">Module</div>
        <div className="cth-coef">Coef</div>
        <div className="cth-cred">Cred</div>
        <div className="cth-grades">Grades</div>
        <div className="cth-avg">Avg</div>
        <div className="cth-modcred">Earned</div>
      </div>

      {/* Course rows */}
      <div className="unit-courses">
        {unitResult.courses.map((course) => (
          <CourseRow
            key={course.key}
            course={course}
            gradeData={grades[course.key] || { td: 0, tp: 0, exam: 0 }}
            onGradeChange={onGradeChange}
          />
        ))}
      </div>
    </div>
  );
}
