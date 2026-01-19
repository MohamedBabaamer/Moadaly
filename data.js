/**
 * Academic System Configuration
 * 
 * Structure: SYSTEM[level][semester] = { units[], totalCoef, totalCredits }
 * 
 * Levels: L1-L3 (Licence), M1-M2 (Master)
 * Semesters: "Semestre 1", "Semestre 2"
 * 
 * Unit Types:
 * - Fondamentale: Core academic units, special credit validation rules apply
 * - Méthodologique: Methodology and applied skills
 * - Découverte: Discovery and complementary subjects
 * - Transversal: Languages and soft skills
 * 
 * Course Evaluation Rules:
 * - td_exam: 40% TD + 60% Exam
 * - tp_exam: 40% TP + 60% Exam
 * - td_tp_exam: 20% TD + 20% TP + 60% Exam
 * - exam: 100% Exam
 * - project: 100% Project evaluation
 */

const SYSTEM = {
  // ============================================================================
  // Licence 1 - Mathématiques et Informatique
  // ============================================================================
  "L1 MI": {
    "Semestre 1": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 10,
          courses: [
            { name: "Analyse1", coef: 4, cred: 6, rule: "td_exam" },
            { name: "Algèbre1", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 12,
          courses: [
            {
              name: "Algorithmique et structure de données 1",
              coef: 5,
              cred: 7,
              rule: "td_tp_exam",
            },
            { name: "Structure machine 1", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 2,
          courses: [
            {
              name: "Logiciels libres (open source)",
              coef: 1,
              cred: 2,
              rule: "exam",
            },
          ],
        },
        {
          name: "Unité Transversal",
          credits: 2,
          courses: [
            { name: "Langue Étrangère 1", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 4,
          courses: [
            { name: "Électricité générale", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
    "Semestre 2": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 10,
          courses: [
            { name: "Analyse 2", coef: 4, cred: 6, rule: "td_exam" },
            { name: "Algèbre 2", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 12,
          courses: [
            {
              name: "Algorithmique et structure de données 2",
              coef: 5,
              cred: 7,
              rule: "td_tp_exam",
            },
            { name: "Structure machine 2", coef: 3, cred: 5, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 4,
          courses: [
            { name: "Logique Mathématique", coef: 1, cred: 2, rule: "td_exam" },
            {
              name: "Introduction à l'intelligence artificielle",
              coef: 1,
              cred: 2,
              rule: "exam",
            },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 4,
          courses: [
            {
              name: "Électronique fondamentale",
              coef: 2,
              cred: 4,
              rule: "td_exam",
            },
          ],
        },
      ],
      totalCoef: 18,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Licence 2 - Informatique
  // ============================================================================
  "L2 Info": {
    "Semestre 1": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 9,
          courses: [
            {
              name: "Systèmes d'information",
              coef: 3,
              cred: 5,
              rule: "td_tp_exam",
            },
            { name: "Théorie des graphes", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 11,
          courses: [
            {
              name: "Architecture des ordinateurs",
              coef: 3,
              cred: 5,
              rule: "td_tp_exam",
            },
            {
              name: "Algorithmique et structure de données 3",
              coef: 3,
              cred: 6,
              rule: "td_tp_exam",
            },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 8,
          courses: [
            { name: "Méthodes numériques", coef: 2, cred: 4, rule: "tp_exam" },
            { name: "Logique mathématique", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            { name: "Langue Étrangère 2", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 16,
      totalCredits: 30,
    },
    "Semestre 2": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 10,
          courses: [
            {
              name: "Système d'exploitation 1",
              coef: 3,
              cred: 5,
              rule: "td_tp_exam",
            },
            {
              name: "Théorie des langages",
              coef: 2,
              cred: 5,
              rule: "td_tp_exam",
            },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 10,
          courses: [
            { name: "Bases de données", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Réseaux", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 8,
          courses: [
            {
              name: "Développement d'applications Web",
              coef: 2,
              cred: 4,
              rule: "tp_exam",
            },
            {
              name: "Programmation orienté objet",
              coef: 2,
              cred: 4,
              rule: "tp_exam",
            },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            { name: "Langue Étrangère 3", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 16,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Licence 3 - Systèmes d'Information
  // ============================================================================
  "L3 SI": {
    "Semestre 1": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 10,
          courses: [
            { name: "IHM", coef: 3, cred: 5, rule: "td_tp_exam" },
            { name: "Génie Logiciel", coef: 3, cred: 5, rule: "td_tp_exam" },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 10,
          courses: [
            { name: "Compilation 1", coef: 3, cred: 5, rule: "td_tp_exam" },

            {
              name: "Systèmes d'exploitation 2",
              coef: 3,
              cred: 5,
              rule: "td_tp_exam",
            },
          ],
        },

        {
          name: "Unité Méthodologique",
          credits: 8,
          courses: [
            {
              name: "Programmation linéaire",
              coef: 2,
              cred: 4,
              rule: "td_exam",
            },
            { name: "Probabilités et statistiques", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            {
              name: "Économie numérique et veille stratégique",
              coef: 1,
              cred: 2,
              rule: "exam",
            },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semestre 2": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 10,
          courses: [
            { name: "Applications Mobile", coef: 3, cred: 5, rule: "tp_exam" },
            {
              name: "Sécurité Informatique",
              coef: 3,
              cred: 5,
              rule: "td_exam",
            },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 10,
          courses: [
            {
              name: "Intelligence Artificielle",
              coef: 3,
              cred: 5,
              rule: "tp_exam",
            },
            {
              name: "Données semi structurées",
              coef: 3,
              cred: 5,
              rule: "tp_exam",
            },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 8,
          courses: [
            { name: "Projet", coef: 3, cred: 6, rule: "project" },
            { name: "Rédaction Scientifique", coef: 1, cred: 2, rule: "exam" },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            { name: "Créer une startup", coef: 1, cred: 2, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Master 1 - Systèmes Intelligents et Communicants
  // ============================================================================
  "M1 SIEC": {
    "Semestre 1": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 18,
          courses: [
            {
              name: "Conception et Analyse des Algorithmes",
              coef: 3,
              cred: 6,
              rule: "td_tp_exam",
            },           {
              name: "Compilation 2",
              coef: 3,
              cred: 6,
              rule: "td_tp_exam",
            },
            {
              name: "Methodes de conception des Systèmes d'Information",
              coef: 3,
              cred: 6,
              rule: "td_exam",
            },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 9,
          courses: [
            {
              name: "Recherche Opérationnelle",
              coef: 3,
              cred: 5,
              rule: "td_exam",
            },
            {
              name: "Probabilités et Statistiques",
              coef: 2,
              cred: 4,
              rule: "td_exam",
            },
          ],
        },
        {
          name: "Unité Decouverte",
          credits: 2,
          courses: [
            { name: "Administration des réseaux", coef: 2, cred: 2, rule: "tp_exam" ,},
          ],
        },
        {
          name: "Unité Transversal",
          credits: 1,
          courses: [
            { name: "Anglais Technique", coef: 1, cred: 1, rule: "exam" },
      
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semestre 2": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 18,
          courses: [
            { name: "Introduction a l'intelligence artificielle", coef: 3, cred: 6, rule: "exam" },
            {
              name: "Apprentissage automatique",
              coef: 3,
              cred: 6,
              rule: "td_tp_exam",
            },
            {
              name: "Reconnaissance de motifs 1",
              coef: 3,
              cred: 6,
              rule: "td_tp_exam",
            },
          ],
        },
        {
          name: "Unité Fondamentale 2",
          credits: 9,
          courses: [
            {
              name: "Base de données avancées",
              coef: 2,
              cred: 4,
              rule: "tp_exam",
            },
            { name: "Analyse de données", coef: 1, cred: 1, rule: "td_exam" },
            { name: "Algorithme avancée", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
         {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            { name: "Compression codage et cryptographie", coef: 2, cred: 2, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Transversal",
          credits: 1,
          courses: [
           
            { name: "Éthique et respect de la déontologie", coef: 1, cred: 1, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
  },

  // ============================================================================
  // Master 2 - Systèmes Intelligents et Communicants
  // ============================================================================
  "M2 SIEC": {
    "Semestre 1": {
      units: [
        {
          name: "Unité Fondamentale 1",
          credits: 18,
          courses: [
            { name: "Data Mining", coef: 3, cred: 6, rule: "exam" },
    
            { name: "Reconnaissance de motifs 2", coef: 3, cred: 6, rule: "td_exam" },
        
            { name: "Apprentissage automatique", coef: 3, cred: 6, rule: "exam" },
          ],
        },
        {
          name: "Unité Découverte",
          credits: 2,
          courses: [
            { name: "Recherche d'information", coef: 2, cred: 2, rule: "tp_exam" },
          ],
        },
        {
          name: "Unité Méthodologique",
          credits: 9,
          courses: [
            { name: "Extraction d'information dans les textes", coef: 3, cred: 5, rule: "tp_exam" },
            { name: "Systèmes multi-agents", coef: 2, cred: 4, rule: "td_exam" },
          ],
        },
        {
          name: "Unité Transversal",
          credits: 1,
          courses: [
            { name: "Méthodologie", coef: 1, cred: 1, rule: "exam" },
          ],
        },
      ],
      totalCoef: 17,
      totalCredits: 30,
    },
    "Semestre 2": {
      units: [
        {
          name: "Travail Personnel",
          credits: 30,
          courses: [
            { name: "Travail Personnel", coef: 2, cred: 5, rule: "project" },
          ],
        },{
          name: "Memoire",
          credits: 30,
          courses: [
            { name: "Mémoire", coef: 2, cred: 5, rule: "project" },
          ],
        },
      ],
      totalCoef: 10,
      totalCredits: 30,
    },
  },
};

// Make SYSTEM available globally for the browser
if (typeof window !== "undefined") {
  window.SYSTEM = SYSTEM;
}

// Also support module exports for Node.js if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = SYSTEM;
}
