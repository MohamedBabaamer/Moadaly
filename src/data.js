/**
 * Academic System Configuration
 * * Structure: SYSTEM[level][semester] = { units[], totalCoef, totalCredits }
 * * Levels: L1-L3 (Bachelor), M1-M2 (Master)
 * Semesters: "Semester 1", "Semester 2"
 * * Unit Types:
 * - Fundamental: Core academic units, special credit validation rules apply
 * - Methodological: Methodology and applied skills
 * - Discovery: Discovery and complementary subjects
 * - Transversal: Languages and soft skills
 */

export const SYSTEM = {
  // ============================================================================
  // Bachelor 1 - Mathematics & Informatics
  // ============================================================================
  "L1 MI": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Analysis 1", coef: 4, cred: 6, rule: "td_exam" },
            { name: "Algebra 1", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 12,
          courses: [
            { name: "Algorithms and Data Structures 1", coef: 5, cred: 7, rule: "td_tp_exam" },
            { name: "Computer Architecture 1", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 2,
          courses: [
            { name: "Open Source Software", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Transversal Unit",
          credits: 2,
          courses: [
            { name: "Foreign Language 1", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 4,
          courses: [
            { name: "General Electricity", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Analysis 2", coef: 4, cred: 6, rule: "td_exam" },
            { name: "Algebra 2", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 12,
          courses: [
            { name: "Algorithms and Data Structures 2", coef: 5, cred: 7, rule: "td_tp_exam" },
            { name: "Computer Architecture 2", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 4,
          courses: [
            { name: "Mathematical Logic", coef: 1, cred: 2, rule: "td_exam" },
            { name: "Introduction to Artificial Intelligence", coef: 1, cred: 2, rule: "tp_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 4,
          courses: [
            { name: "Fundamental Electronics", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Bachelor 2 - Computer Science (Old Curriculum)
  // ============================================================================
  "L2 Info (Old)": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 9,
          courses: [
            { name: "Information Systems", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Graph Theory", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 11,
          courses: [
            { name: "Computer Architecture", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Algorithms and Data Structures 3", coef: 3, cred: 6, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Numerical Methods", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Mathematical Logic", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Foreign Language 2", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 16,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Operating Systems 1", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Theory of Languages", coef: 2, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Databases", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Networks", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Web Application Development", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Object Oriented Programming", coef: 2, cred: 4, rule: "tp_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Foreign Language 3", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 16,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Bachelor 2 - Computer Science (New Curriculum Coming Soon for 2026-2027)
  // ============================================================================
  "L2 Info (New)": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 11,
          courses: [
            { name: "Computer Architecture", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Algorithms and Data Structures 3", coef: 4, cred: 6, rule: "td_tp_exam" },
          ],
        },
       {
          name: "Fundamental Unit 2",
          credits: 9,
          courses: [
            { name: "Information Systems", coef: 2, cred: 4, rule: "td_exam" },
            { name: "Object Oriented Programming 1", coef: 4, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Numerical Methods", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Probability and Statistics", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Transversal Unit",
          credits: 2,
          courses: [
            { name: "Project Management", coef: 1, cred: 2, rule: "tp_exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Operating Systems 1", coef: 4, cred: 5, rule: "td_tp_exam" },
            { name: "Theory of Languages", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Databases", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Object Oriented Programming 2", coef: 4, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Linear Programming", coef: 2, cred: 4, rule: "td_exam" },
            { name: "Probability and Statistics 2", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Entrepreneurship", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Bachelor 3 - Information Systems (Old Curriculum)
  // ============================================================================
  "L3 SI (Old)": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Human-Computer Interaction (HCI)", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Software Engineering", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Compilation 1", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Operating Systems 2", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Linear Programming", coef: 2, cred: 4, rule: "td_exam" },
            { name: "Probability and Statistics", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Digital Economy and Strategic Watch", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Mobile Applications", coef: 3, cred: 5, rule: "tp_exam" },
            { name: "Computer Security", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Artificial Intelligence", coef: 3, cred: 5, rule: "tp_exam" },
            { name: "Semi-structured Data", coef: 3, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Project", coef: 3, cred: 6, rule: "project" },
            { name: "Scientific Writing", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Create a Startup", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Bachelor 3 - Information Systems (New Curriculum Coming Soon)
  // ============================================================================
  "L3 SI (New)": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Networks", coef: 4, cred: 5, rule: "td_tp_exam" },
            { name: "Compilation", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Software Engineering", coef: 3, cred: 5, rule: "td_exam" },
            { name: "Web Application Development", coef: 3, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Scientific Programming Tools", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Graph Theory", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Scientific Writing", coef: 1, cred: 2, rule: "tp_exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 10,
          courses: [
            { name: "Operating Systems 2", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Computer Security", coef: 3, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 10,
          courses: [
            { name: "Information Retrieval", coef: 3, cred: 5, rule: "td_exam" },
            { name: "Fundamentals of Artificial Intelligence", coef: 3, cred: 5, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 8,
          courses: [
            { name: "Project", coef: 4, cred: 6, rule: "project" },
            { name: "Business Intelligence", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "IT Ethics", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Master 1 - Intelligent and Communicating Systems
  // ============================================================================
  "M1 SIEC": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 18,
          courses: [
            { name: "Algorithm Design and Analysis", coef: 3, cred: 6, rule: "td_tp_exam" },
            { name: "Compilation 2", coef: 3, cred: 6, rule: "td_tp_exam" },
            { name: "Information Systems Design Methods", coef: 3, cred: 6, rule: "td_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 9,
          courses: [
            { name: "Operations Research", coef: 3, cred: 5, rule: "td_exam" },
            { name: "Probability and Statistics", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Network Administration", coef: 2, cred: 2, rule: "tp_exam" },
          ],
        },
        {
          name: "Transversal Unit",
          credits: 1,
          courses: [
            { name: "Technical English", coef: 1, cred: 1, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 18,
          courses: [
            { name: "Introduction to Artificial Intelligence", coef: 3, cred: 6, rule: "td_tp_exam" },
            { name: "Machine Learning", coef: 3, cred: 6, rule: "td_tp_exam" },
            { name: "Pattern Recognition 1", coef: 3, cred: 6, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Fundamental Unit 2",
          credits: 9,
          courses: [
            { name: "Advanced Databases", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Data Analysis", coef: 1, cred: 1, rule: "td_exam" },
            { name: "Advanced Algorithms", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
         {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Compression Coding and Cryptography", coef: 2, cred: 2, rule: "td_exam" },
          ],
        },
        {
          name: "Transversal Unit",
          credits: 1,
          courses: [
            { name: "Ethics and Deontology", coef: 1, cred: 1, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Master 2 - Intelligent and Communicating Systems
  // ============================================================================
  "M2 SIEC": {
    "Semester 1": {
      units: [
        {
          name: "Fundamental Unit 1",
          credits: 18,
          courses: [
            { name: "Data Mining", coef: 3, cred: 6, rule: "exam" },
            { name: "Pattern Recognition 2", coef: 3, cred: 6, rule: "td_exam" },
            { name: "Machine Learning", coef: 3, cred: 6, rule: "exam" },
          ],
        },
        {
          name: "Discovery Unit",
          credits: 2,
          courses: [
            { name: "Information Retrieval", coef: 2, cred: 2, rule: "tp_exam" },
          ],
        },
        {
          name: "Methodological Unit",
          credits: 9,
          courses: [
            { name: "Information Extraction from Texts", coef: 3, cred: 5, rule: "tp_exam" },
            { name: "Multi-Agent Systems", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Transversal Unit",
          credits: 1,
          courses: [
            { name: "Methodology", coef: 1, cred: 1, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semester 2": {
      units: [
        {
          name: "Personal Work",
          credits: 30,
          courses: [
            { name: "Personal Work", coef: 2, cred: 5, rule: "project" },
          ],
        },{
          name: "Thesis",
          credits: 30,
          courses: [
            { name: "Thesis Defense", coef: 2, cred: 5, rule: "project" },
          ],
        },
      ],
      totalCoef: 10,
      totalCredits: 30,
    },
  },
};
