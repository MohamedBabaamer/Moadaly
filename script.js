/**
 * Grade Calculator - Main Application Logic
 * 
 * This application calculates academic grades based on the Algerian LMD system.
 * 
 * Key Features:
 * - Real-time grade calculation with debounced updates
 * - LocalStorage persistence for user data
 * - Dynamic UI generation based on selected level/semester
 * - Intelligent credit validation (fondamentale units have special rules)
 * 
 * Credit Validation Rules:
 * - If semester average >= 10: All credits earned
 * - If unit is "Fondamentale" AND unit average >= 10: All unit credits earned
 * - Otherwise: Credits earned only for courses with average >= 10
 */

// ============================================================================
// Application State
// ============================================================================

let currentCycle = 'Licence';
let currentLevel = '';
let currentSemester = '';
let grades = {};

// ============================================================================
// DOM Element References
// ============================================================================

const DOM = {
  cycleSelect: document.getElementById('cycleSelect'),
  levelSelect: document.getElementById('levelSelect'),
  semesterSelect: document.getElementById('semesterSelect'),
  semesterTitle: document.getElementById('semesterTitle'),
  unitsContainer: document.getElementById('unitsContainer'),
  semesterAvgDisplay: document.getElementById('semesterAvg'),
  creditsEarnedDisplay: document.getElementById('creditsEarned'),
  totalCreditsDisplay: document.getElementById('totalCredits'),
  passStatusDisplay: document.getElementById('passStatus'),
  clearBtn: document.getElementById('clearBtn')
};

// ============================================================================
// Utilities
// ============================================================================

/**
 * Debounce function to limit execution frequency
 * Prevents excessive recalculations during rapid input changes
 */
const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ============================================================================
// LocalStorage Management
// ============================================================================

/**
 * Load saved data from localStorage
 * Restores: grades, currentCycle, currentLevel, currentSemester
 */
function loadFromStorage() {
  const stored = localStorage.getItem('gradeCalcData');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      grades = data.grades || {};
      currentCycle = data.currentCycle || 'Licence';
      currentLevel = data.currentLevel || '';
      currentSemester = data.currentSemester || '';
      DOM.cycleSelect.value = currentCycle;
    } catch (e) {
      console.error('Error loading from storage:', e);
    }
  }
}

/**
 * Save current state to localStorage with debouncing
 * Triggered after every grade input or selection change
 */
const saveToStorage = debounce(() => {
  try {
    const data = {
      grades,
      currentCycle,
      currentLevel,
      currentSemester,
      timestamp: Date.now()
    };
    localStorage.setItem('gradeCalcData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}, 500);

// ============================================================================
// Data Filtering & Caching
// ============================================================================

const levelCache = new Map();

/**
 * Filter levels by current cycle (Licence: L1-L3, Master: M1-M2)
 * Uses cache to avoid repeated filtering operations
 */
function getFilteredLevels() {
  if (levelCache.has(currentCycle)) {
    return levelCache.get(currentCycle);
  }
  
  const allLevels = Object.keys(SYSTEM);
  const filtered = currentCycle === 'Licence' 
    ? allLevels.filter(l => l.startsWith('L'))
    : allLevels.filter(l => l.startsWith('M'));
  
  levelCache.set(currentCycle, filtered);
  return filtered;
}

// ============================================================================
// Application Initialization
// ============================================================================

/**
 * Initialize application
 * Loads saved data, validates SYSTEM configuration, and sets up UI
 */
function init() {
  loadFromStorage();
  
  const levels = Object.keys(SYSTEM);
  if (levels.length === 0) {
    DOM.unitsContainer.innerHTML = '<div class="text-red-400 text-center py-20">Erreur: Données non chargées</div>';
    return;
  }

  loadLevels();
  setupEventListeners();
}

// ============================================================================
// UI Loading Functions
// ============================================================================

/**
 * Populate level dropdown based on current cycle
 * Restores previously selected level if still valid
 */
function loadLevels() {
  const levels = getFilteredLevels();
  
  if (levels.length === 0) {
    DOM.levelSelect.innerHTML = '<option>Aucun niveau disponible</option>';
    return;
  }

  const fragment = document.createDocumentFragment();
  levels.forEach(level => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    fragment.appendChild(option);
  });
  
  DOM.levelSelect.innerHTML = '';
  DOM.levelSelect.appendChild(fragment);

  if (currentLevel && levels.includes(currentLevel)) {
    DOM.levelSelect.value = currentLevel;
  } else {
    currentLevel = levels[0];
    DOM.levelSelect.value = currentLevel;
  }

  loadSemesters();
}

/**
 * Populate semester dropdown for current level
 */
function loadSemesters() {
  const semesters = Object.keys(SYSTEM[currentLevel]);
  
  const fragment = document.createDocumentFragment();
  semesters.forEach(sem => {
    const option = document.createElement('option');
    option.value = sem;
    option.textContent = sem;
    fragment.appendChild(option);
  });
  
  DOM.semesterSelect.innerHTML = '';
  DOM.semesterSelect.appendChild(fragment);

  currentSemester = semesters[0];
  DOM.semesterSelect.value = currentSemester;
  
  loadModules();
}

/**
 * Generate and render all units and courses for current semester
 * Creates input fields dynamically based on course evaluation rules (td_exam, tp_exam, etc.)
 * Restores previously saved grades from state
 */
function loadModules() {
  DOM.semesterTitle.textContent = currentSemester;
  
  const semesterData = SYSTEM[currentLevel][currentSemester];
  DOM.totalCreditsDisplay.textContent = semesterData.totalCredits;
  
  DOM.unitsContainer.innerHTML = '';

  semesterData.units.forEach((unit, unitIdx) => {
    const unitDiv = document.createElement('div');
    unitDiv.className = 'mb-8 bg-gradient-to-br from-surface-dark via-surface-card to-surface-dark border-2 border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all duration-300';
    
    const unitHeader = document.createElement('div');
    unitHeader.className = 'bg-surface-hover/30 px-6 py-4 border-b border-surface-hover';
    unitHeader.innerHTML = `
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-black text-white">${unit.name}</h3>
        <div class="flex items-center gap-6 text-sm font-bold">
          <span class="text-text-secondary">
            Moyenne: <span class="text-primary text-lg ml-2" id="unitAvg_${unitIdx}">0.00</span>
          </span>
          <span class="text-text-secondary">
            Crédits: <span class="text-primary text-lg ml-2" id="unitCred_${unitIdx}">0.0</span> / ${unit.credits}
          </span>
        </div>
      </div>
    `;
    unitDiv.appendChild(unitHeader);

    const coursesDiv = document.createElement('div');
    coursesDiv.className = 'divide-y divide-surface-hover';

    const tableHeader = document.createElement('div');
    tableHeader.className = 'hidden md:grid grid-cols-[2fr,1fr,1fr,3fr,1fr,1fr] bg-surface-hover/20 text-xs font-black uppercase tracking-widest text-text-secondary';
    tableHeader.innerHTML = `
      <div class="px-4 lg:px-6 py-3">Module</div>
      <div class="px-2 lg:px-4 py-3 text-center">Coef</div>
      <div class="px-2 lg:px-4 py-3 text-center">Créd</div>
      <div class="px-4 lg:px-6 py-3 text-center">Notes</div>
      <div class="px-2 lg:px-4 py-3 text-center">Moyenne</div>
      <div class="px-2 lg:px-4 py-3 text-center">Créd Mod</div>
    `;
    coursesDiv.appendChild(tableHeader);

    unit.courses.forEach((course, courseIdx) => {
      const key = `u${unitIdx}_c${courseIdx}`;
      const hasTd = course.rule === 'td_exam' || course.rule === 'td_tp_exam';
      const hasTp = course.rule === 'td_tp_exam' || course.rule === 'tp_exam';

      const courseRow = document.createElement('div');
      courseRow.className = 'grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,3fr,1fr,1fr] items-center hover:bg-surface-hover/10 transition-colors p-3 md:p-0 gap-3 md:gap-0 border-b md:border-b-0 border-surface-hover/30 last:border-b-0';
      
      let inputsHTML = '';
      if (hasTd) {
        inputsHTML += `<input type="number" placeholder="TD" min="0" max="20" step="0.25" id="td_${key}" data-key="${key}" data-type="td" class="grade-input flex-1 bg-background-dark/50 border-2 border-surface-hover focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 rounded-xl px-3 py-2.5 text-sm md:text-base text-center font-bold text-white placeholder-surface-hover transition-all duration-300 hover:border-blue-400/50">`;
      }
      if (hasTp) {
        inputsHTML += `<input type="number" placeholder="TP" min="0" max="20" step="0.25" id="tp_${key}" data-key="${key}" data-type="tp" class="grade-input flex-1 bg-background-dark/50 border-2 border-surface-hover focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-3 py-2.5 text-sm md:text-base text-center font-bold text-white placeholder-surface-hover transition-all duration-300 hover:border-purple-400/50">`;
      }
      inputsHTML += `<input type="number" placeholder="EXAM" min="0" max="20" step="0.25" id="exam_${key}" data-key="${key}" data-type="exam" class="grade-input flex-1 bg-background-dark/50 border-2 border-surface-hover focus:border-primary focus:ring-2 focus:ring-primary/50 rounded-xl px-3 py-2.5 text-sm md:text-base text-center font-bold text-white placeholder-surface-hover transition-all duration-300 hover:border-primary/50">`;

      courseRow.innerHTML = `
        <div class="md:px-4 lg:px-6 py-2 md:py-4">
          <div class="flex items-center justify-between md:block mb-2 md:mb-0">
            <span class="font-bold text-white text-sm md:text-base">${course.name}</span>
            <div class="flex gap-4 md:hidden text-xs">
              <span class="text-text-secondary font-semibold">Coef: <strong class="text-white">${course.coef}</strong></span>
              <span class="text-text-secondary font-semibold">Créd: <strong class="text-white">${course.cred}</strong></span>
            </div>
          </div>
        </div>
        <div class="hidden md:block px-2 lg:px-4 py-2 md:py-4 text-center">
          <span class="text-text-secondary font-bold">${course.coef}</span>
        </div>
        <div class="hidden md:block px-2 lg:px-4 py-2 md:py-4 text-center">
          <span class="text-text-secondary font-bold">${course.cred}</span>
        </div>
        <div class="md:px-4 lg:px-6 py-2 md:py-4 flex flex-col sm:flex-row gap-2">
          ${inputsHTML}
        </div>
        <div class="flex md:block justify-between md:px-2 lg:px-4 py-2 md:py-4 text-center">
          <span class="md:hidden text-xs font-bold text-text-secondary uppercase tracking-wider">Moyenne</span>
          <span class="text-primary font-black text-base md:text-lg" id="avg_${key}">0.00</span>
        </div>
        <div class="flex md:block justify-between md:px-2 lg:px-4 py-2 md:py-4 text-center">
          <span class="md:hidden text-xs font-bold text-text-secondary uppercase tracking-wider">Créd Mod</span>
          <span class="font-bold text-base md:text-base text-red-400" id="cred_${key}">0.0</span>
        </div>
      `;
      
      coursesDiv.appendChild(courseRow);
    });

    unitDiv.appendChild(coursesDiv);
    DOM.unitsContainer.appendChild(unitDiv);
  });

  document.querySelectorAll('.grade-input').forEach(input => {
    const key = input.dataset.key;
    const type = input.dataset.type;

    if (grades[key] && grades[key][type] !== undefined) {
      input.value = grades[key][type];
    }
  });

  calculate();
}

// ============================================================================
// Input Handling
// ============================================================================

/**
 * Handle grade input changes
 * Validates input range (0-20), updates state, triggers save and recalculation
 */
function handleGradeInput(e) {
  const input = e.target;
  if (!input.classList.contains('grade-input')) return;
  
  const key = input.dataset.key;
  const type = input.dataset.type;
  let value = parseFloat(input.value);
  
  if (isNaN(value)) value = 0;
  value = Math.max(0, Math.min(20, value));
  if (input.value !== '' && parseFloat(input.value) !== value) {
    input.value = value;
  }
  
  if (!grades[key]) grades[key] = { td: 0, tp: 0, exam: 0 };
  grades[key][type] = value;
  
  saveToStorage();
  debouncedCalculate();
}

const debouncedCalculate = debounce(calculate, 100);

// ============================================================================
// Grade Calculation Engine
// ============================================================================

/**
 * Main calculation function
 * 
 * Flow:
 * 1. Calculate course averages based on evaluation rules (td_exam, tp_exam, etc.)
 * 2. Calculate unit averages (weighted by coefficient)
 * 3. Calculate semester average (weighted by coefficient)
 * 4. Apply credit validation rules (depends on averages and unit types)
 * 5. Update all UI elements with calculated results
 * 
 * Credit Rules:
 * - Semester avg >= 10: All credits validated
 * - Unit is "Fondamentale" AND unit avg >= 10: All unit credits validated
 * - Otherwise: Only credits from courses with avg >= 10
 */
function calculate() {
  const semesterData = SYSTEM[currentLevel][currentSemester];
  let semesterSum = 0;
  let semesterCoefSum = 0;

  const allUnitsData = [];

  semesterData.units.forEach((unit, unitIdx) => {
    let unitSum = 0;
    let unitCoefSum = 0;
    const courseResults = [];

    unit.courses.forEach((course, courseIdx) => {
      const key = `u${unitIdx}_c${courseIdx}`;
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

  let semesterCreditsEarned = 0;

  allUnitsData.forEach(({ unitIdx, unit, unitAvg, courseResults }) => {
    let unitCreditsEarned = 0;
    const isFondamentale = unit.name.toLowerCase().includes('fondamentale');

    if (semAvg >= 10) {
      unitCreditsEarned = unit.credits;
      courseResults.forEach((result) => {
        result.credEarned = result.cred;
      });
    }
    else if (isFondamentale && unitAvg >= 10) {
      unitCreditsEarned = unit.credits;
      courseResults.forEach((result) => {
        result.credEarned = result.cred;
      });
    }
    else {
      courseResults.forEach((result) => {
        const credEarned = result.courseAvg >= 10 ? result.cred : 0;
        result.credEarned = credEarned;
        unitCreditsEarned += credEarned;
      });
    }

    unit.courses.forEach((course, courseIdx) => {
      const key = `u${unitIdx}_c${courseIdx}`;
      const result = courseResults[courseIdx];

      const avgElem = document.getElementById(`avg_${key}`);
      const credElem = document.getElementById(`cred_${key}`);
      if (avgElem) avgElem.textContent = result.courseAvg.toFixed(2);
      if (credElem) {
        credElem.textContent = result.credEarned.toFixed(1);
        credElem.className = `font-bold transition-colors duration-300 ${result.credEarned > 0 ? 'text-green-400' : 'text-red-400'}`;
      }
    });

    semesterCreditsEarned += unitCreditsEarned;

    const unitAvgElem = document.getElementById(`unitAvg_${unitIdx}`);
    const unitCredElem = document.getElementById(`unitCred_${unitIdx}`);
    if (unitAvgElem) unitAvgElem.textContent = unitAvg.toFixed(2);
    if (unitCredElem) unitCredElem.textContent = unitCreditsEarned.toFixed(1);
  });

  DOM.semesterAvgDisplay.textContent = semAvg.toFixed(2);
  DOM.creditsEarnedDisplay.textContent = semesterCreditsEarned;
  
  if (semAvg >= 10) {
    DOM.passStatusDisplay.textContent = 'ADMIS';
    DOM.passStatusDisplay.className = 'absolute right-4 top-4 px-3 py-1.5 rounded-full text-xs font-black bg-green-500/20 text-green-400';
  } else {
    DOM.passStatusDisplay.textContent = 'NON ADMIS';
    DOM.passStatusDisplay.className = 'absolute right-4 top-4 px-3 py-1.5 rounded-full text-xs font-black bg-red-500/20 text-red-400';
  }
}

// ============================================================================
// Event Listeners Setup
// ============================================================================

function setupEventListeners() {
  DOM.unitsContainer.addEventListener('input', handleGradeInput);
  
  DOM.cycleSelect.addEventListener('change', (e) => {
    currentCycle = e.target.value;
    grades = {};
    levelCache.clear();
    saveToStorage();
    loadLevels();
  });

  DOM.levelSelect.addEventListener('change', (e) => {
    currentLevel = e.target.value;
    saveToStorage();
    loadSemesters();
  });

  DOM.semesterSelect.addEventListener('change', (e) => {
    currentSemester = e.target.value;
    saveToStorage();
    loadModules();
  });

  DOM.clearBtn.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les notes ?')) {
      grades = {};
      localStorage.removeItem('gradeCalcData');
      loadModules();
    }
  });
}

// ============================================================================
// Bootstrap Application
// ============================================================================

init();

