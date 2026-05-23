import { useCallback } from 'react';

/**
 * CourseRow — A single course with dynamic grade inputs based on the rule type.
 */
export default function CourseRow({ course, gradeData, onGradeChange }) {
  const hasTd = course.rule === 'td_exam' || course.rule === 'td_tp_exam';
  const hasTp = course.rule === 'td_tp_exam' || course.rule === 'tp_exam';
  const isProject = course.rule === 'project';

  const handleInput = useCallback((type, rawValue) => {
    let value = parseFloat(rawValue);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(20, value));
    onGradeChange(course.key, type, value);
  }, [course.key, onGradeChange]);

  const credClass = course.credEarned > 0 ? 'cred-earned' : 'cred-not-earned';

  return (
    <div className="course-row">
      {/* Module name + mobile meta */}
      <div className="course-name-cell">
        <span className="course-name">{course.name}</span>
        <div className="course-meta-mobile">
          <span>Coef: <strong>{course.coef}</strong></span>
          <span>Cred: <strong>{course.cred}</strong></span>
        </div>
      </div>

      {/* Desktop coef/cred */}
      <div className="course-coef-cell">{course.coef}</div>
      <div className="course-cred-cell">{course.cred}</div>

      {/* Grade inputs */}
      <div className="course-inputs-cell">
        {hasTd && (
          <input
            type="number"
            placeholder="TD"
            min="0"
            max="20"
            step="0.25"
            className="grade-input grade-input--td"
            value={gradeData.td || ''}
            onChange={(e) => handleInput('td', e.target.value)}
          />
        )}
        {hasTp && (
          <input
            type="number"
            placeholder="TP"
            min="0"
            max="20"
            step="0.25"
            className="grade-input grade-input--tp"
            value={gradeData.tp || ''}
            onChange={(e) => handleInput('tp', e.target.value)}
          />
        )}
        <input
          type="number"
          placeholder={isProject ? 'GRADE' : 'EXAM'}
          min="0"
          max="20"
          step="0.25"
          className="grade-input grade-input--exam"
          value={gradeData.exam || ''}
          onChange={(e) => handleInput('exam', e.target.value)}
        />
      </div>

      {/* Computed average */}
      <div className="course-avg-cell">
        <span className="course-avg-label">Avg</span>
        <span className="course-avg-value">{course.avg.toFixed(2)}</span>
      </div>

      {/* Earned credits */}
      <div className="course-modcred-cell">
        <span className="course-modcred-label">Cred</span>
        <span className={`course-modcred-value ${credClass}`}>{course.credEarned.toFixed(1)}</span>
      </div>
    </div>
  );
}
