import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { SYSTEM } from '../data';

/**
 * Custom hook encapsulating all grade calculator logic:
 * - Cycle/Level/Semester navigation
 * - Grade input management
 * - Real-time calculation engine
 * - localStorage persistence with debounce
 */
export function useGradeCalculator() {
  const [currentCycle, setCurrentCycle] = useState('Bachelor');
  const [currentLevel, setCurrentLevel] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [grades, setGrades] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimerRef = useRef(null);

  // ── Filtered levels based on cycle ──────────────────────────────────
  const filteredLevels = useMemo(() => {
    const allLevels = Object.keys(SYSTEM);
    return currentCycle === 'Bachelor'
      ? allLevels.filter(l => l.startsWith('L'))
      : allLevels.filter(l => l.startsWith('M'));
  }, [currentCycle]);

  // ── Semesters for the current level ─────────────────────────────────
  const semesters = useMemo(() => {
    if (!currentLevel || !SYSTEM[currentLevel]) return [];
    return Object.keys(SYSTEM[currentLevel]);
  }, [currentLevel]);

  // ── Current semester data ───────────────────────────────────────────
  const semesterData = useMemo(() => {
    if (!currentLevel || !currentSemester) return null;
    return SYSTEM[currentLevel]?.[currentSemester] || null;
  }, [currentLevel, currentSemester]);

  // ── Load from localStorage on mount ─────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('gradeCalcData');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.grades) setGrades(data.grades);
        if (data.currentCycle) setCurrentCycle(data.currentCycle);
        if (data.currentLevel) setCurrentLevel(data.currentLevel);
        if (data.currentSemester) setCurrentSemester(data.currentSemester);
      } catch (e) {
        console.error('Error loading from storage:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // ── Initialize level/semester when cycle or load changes ────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (filteredLevels.length > 0) {
      if (!currentLevel || !filteredLevels.includes(currentLevel)) {
        setCurrentLevel(filteredLevels[0]);
      }
    }
  }, [filteredLevels, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLoaded) return;
    if (semesters.length > 0) {
      if (!currentSemester || !semesters.includes(currentSemester)) {
        setCurrentSemester(semesters[0]);
      }
    }
  }, [semesters, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Debounced save to localStorage ──────────────────────────────────
  const saveToStorage = useCallback((data) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem('gradeCalcData', JSON.stringify({
          ...data,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 500);
  }, []);

  // ── Persist state changes ───────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    saveToStorage({ grades, currentCycle, currentLevel, currentSemester });
  }, [grades, currentCycle, currentLevel, currentSemester, isLoaded, saveToStorage]);

  // ── Grade key generator (matches original logic) ────────────────────
  const getKey = useCallback((unitIdx, courseIdx) => {
    return `${currentLevel}_${currentSemester}_u${unitIdx}_c${courseIdx}`.replace(/\s+/g, '_');
  }, [currentLevel, currentSemester]);

  // ── Update a single grade value ─────────────────────────────────────
  const updateGrade = useCallback((key, type, value) => {
    setGrades(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || { td: 0, tp: 0, exam: 0 }),
        [type]: value
      }
    }));
  }, []);

  // ── Cycle change handler ────────────────────────────────────────────
  const changeCycle = useCallback((cycle) => {
    setCurrentCycle(cycle);
    setGrades({});
  }, []);

  // ── Level change handler ────────────────────────────────────────────
  const changeLevel = useCallback((level) => {
    setCurrentLevel(level);
  }, []);

  // ── Semester change handler ─────────────────────────────────────────
  const changeSemester = useCallback((semester) => {
    setCurrentSemester(semester);
  }, []);

  // ── Clear all grades ────────────────────────────────────────────────
  const clearGrades = useCallback(() => {
    setGrades({});
    localStorage.removeItem('gradeCalcData');
  }, []);

  // ── CALCULATION ENGINE ──────────────────────────────────────────────
  const results = useMemo(() => {
    if (!semesterData) {
      return {
        unitResults: [],
        semesterAvg: 0,
        creditsEarned: 0,
        totalCredits: 0,
        passed: false
      };
    }

    let semesterSum = 0;
    let semesterCoefSum = 0;
    const allUnitsData = [];

    semesterData.units.forEach((unit, unitIdx) => {
      let unitSum = 0;
      let unitCoefSum = 0;
      const courseResults = [];

      unit.courses.forEach((course, courseIdx) => {
        const key = `${currentLevel}_${currentSemester}_u${unitIdx}_c${courseIdx}`.replace(/\s+/g, '_');
        const gradeData = grades[key] || { td: 0, tp: 0, exam: 0 };

        let courseAvg = 0;
        if (course.rule === 'td_exam') {
          courseAvg = gradeData.td * 0.4 + gradeData.exam * 0.6;
        } else if (course.rule === 'td_tp_exam') {
          courseAvg = gradeData.td * 0.2 + gradeData.tp * 0.2 + gradeData.exam * 0.6;
        } else if (course.rule === 'tp_exam') {
          courseAvg = gradeData.tp * 0.4 + gradeData.exam * 0.6;
        } else if (course.rule === 'exam') {
          courseAvg = gradeData.exam;
        } else if (course.rule === 'project') {
          courseAvg = gradeData.exam;
        }

        courseResults.push({ courseAvg, cred: course.cred });

        unitSum += courseAvg * course.coef;
        unitCoefSum += course.coef;

        semesterSum += courseAvg * course.coef;
        semesterCoefSum += course.coef;
      });

      const unitAvg = unitCoefSum > 0 ? unitSum / unitCoefSum : 0;

      allUnitsData.push({
        unitIdx,
        unit,
        unitAvg,
        courseResults
      });
    });

    const semAvg = semesterCoefSum > 0 ? semesterSum / semesterCoefSum : 0;

    // Credit validation logic
    let semesterCreditsEarned = 0;

    const unitResults = allUnitsData.map(({ unitIdx, unit, unitAvg, courseResults }) => {
      let unitCreditsEarned = 0;
      const isFundamental = unit.name.toLowerCase().includes('fundamental');

      const courseFinal = courseResults.map((result) => {
        let credEarned = 0;
        if (semAvg >= 10) {
          credEarned = result.cred;
        } else if (isFundamental && unitAvg >= 10) {
          credEarned = result.cred;
        } else {
          credEarned = result.courseAvg >= 10 ? result.cred : 0;
        }
        return { ...result, credEarned };
      });

      if (semAvg >= 10 || (isFundamental && unitAvg >= 10)) {
        unitCreditsEarned = unit.credits;
      } else {
        unitCreditsEarned = courseFinal.reduce((sum, c) => sum + c.credEarned, 0);
      }

      semesterCreditsEarned += unitCreditsEarned;

      return {
        unitIdx,
        unitName: unit.name,
        unitCredits: unit.credits,
        unitAvg,
        unitCreditsEarned,
        courses: unit.courses.map((course, courseIdx) => ({
          ...course,
          key: `${currentLevel}_${currentSemester}_u${unitIdx}_c${courseIdx}`.replace(/\s+/g, '_'),
          avg: courseFinal[courseIdx].courseAvg,
          credEarned: courseFinal[courseIdx].credEarned
        }))
      };
    });

    return {
      unitResults,
      semesterAvg: semAvg,
      creditsEarned: semesterCreditsEarned,
      totalCredits: semesterData.totalCredits,
      passed: semAvg >= 10
    };
  }, [semesterData, grades, currentLevel, currentSemester]);

  return {
    // State
    currentCycle,
    currentLevel,
    currentSemester,
    grades,
    isLoaded,

    // Derived data
    filteredLevels,
    semesters,
    semesterData,
    results,

    // Actions
    changeCycle,
    changeLevel,
    changeSemester,
    updateGrade,
    clearGrades,
    getKey
  };
}
