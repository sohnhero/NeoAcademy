
import { Course, Badge, LearnerProgress, InsightLLM, PendingReview } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Fondamentaux d\'Ethereum',
    category: 'blockchain',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072&auto=format&fit=crop',
    modules: [
      {
        id: 'm1',
        title: 'Contrats Intelligents : Logique Déterministe',
        description: 'Maîtriser la machine à états de Solidity et les principes d\'immuabilité.',
        duration: '45 mins',
        isLocked: false,
        status: 'completed',
        content: `Les contrats intelligents sont des protocoles autonomes résidant sur un registre distribué. Ils sont immuables et déterministes.`,
        objectives: ['Storage vs Memory', 'Gas Mechanics', 'Oracles Basics'],
        score: 92
      },
      {
        id: 'm2',
        title: 'Exploration Profonde de l\'EVM',
        description: 'Analyse de l\'architecture stack-based et de l\'exécution des Opcodes.',
        duration: '1.5 heures',
        isLocked: false,
        status: 'in-progress',
        content: `L'EVM est une machine virtuelle quasi-Turing complète. Elle utilise une pile de 256 bits.`,
        objectives: ['Opcode Execution', 'Stack management', 'Memory Expansion']
      },
      {
        id: 'm3',
        title: 'Audit & Sécurité Avancée',
        description: 'Techniques d\'analyse statique et dynamique pour la sécurité.',
        duration: '2 heures',
        isLocked: true,
        status: 'not-started',
        content: `L'audit de sécurité est crucial pour éviter les exploits.`,
        objectives: ['Reentrancy', 'Front-running', 'Integer Overflow']
      }
    ]
  },
  {
    id: 'c2',
    title: 'Sécurité des Protocoles DeFi',
    category: 'security',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
    modules: [
      {
        id: 'm21',
        title: 'Vecteurs d\'attaque Flash Loan',
        description: 'Comprendre et prévenir la manipulation d\'oracles de prix.',
        duration: '3 heures',
        isLocked: false,
        status: 'not-started',
        content: `Les Flash Loans permettent d'emprunter des millions sans collatéral...`,
        objectives: ['Price Oracle Manipulation', 'Arbitrage Exploits']
      }
    ]
  }
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Architecte Logique', description: 'Maîtrise Solidity.', dateEarned: '15/11/2023', icon: 'Terminal', color: 'text-blue-400' },
  { id: 'b2', name: 'Auditeur EVM', description: 'Expertise bytecode.', dateEarned: '20/01/2024', icon: 'Cpu', color: 'text-purple-400' }
];

export const MOCK_STATS: LearnerProgress = {
  totalCourses: 12,
  completedModules: 48,
  avgScore: 92,
  skillMatrix: [
    { skill: 'Solidity', value: 85 },
    { skill: 'EVM', value: 90 },
    { skill: 'Sécurité', value: 75 },
    { skill: 'DeFi', value: 60 },
    { skill: 'ZK Proofs', value: 40 }
  ]
};

export const MOCK_INSIGHTS_LLM: InsightLLM[] = [
  { id: 'i1', topic: 'DelegateCall Exploits', studentCount: 24, severity: 'high', recommendation: 'Lancer un webinaire sur les Proxy Patterns.' },
  { id: 'i2', topic: 'Gas Optimization', studentCount: 45, severity: 'medium', recommendation: 'Mettre à jour le module 4 avec des exercices Yul.' }
];

export const MOCK_PENDING_REVIEWS = [
  {
    id: 'r1',
    studentId: 's1',
    studentName: 'Alice Vance',
    moduleTitle: 'Audit ZK-Rollups',
    submittedAt: 'Il y a 3h',
    status: 'pending',
    submission: "J'ai implémenté le circuit circom, mais j'ai un doute sur la gestion du signal d'entrée public pour éviter les attaques de double dépense.",
    aiFeedback: "L'IA a validé la logique mathématique, mais recommande une vérification humaine sur la contrainte de nullifier.",
    aiInitialScore: 72
  },
  {
    id: 'r2',
    studentId: 's4',
    studentName: 'David Miller',
    moduleTitle: 'DeFi Architecture',
    submittedAt: 'Hier, 18:00',
    status: 'pending',
    submission: "Analyse de la courbe de AMM Uniswap v3 vis-à-vis de la concentration de liquidité. J'ai utilisé l'analogie du levier virtuel.",
    aiFeedback: "Approche créative. Nécessite une validation conceptuelle par un instructeur.",
    aiInitialScore: 88
  }
];


export const MOCK_STUDENTS = [
  { id: 's1', name: 'Alice Smith', progress: 85, score: 92, lastActive: '2h ago', status: 'active' },
  { id: 's2', name: 'Bob Johnson', progress: 42, score: 78, lastActive: '5m ago', status: 'at-risk' },
  { id: 's3', name: 'Charlie Brown', progress: 15, score: 65, lastActive: '1d ago', status: 'struggling' },
  { id: 's4', name: 'Diana Ross', progress: 95, score: 98, lastActive: 'Just now', status: 'active' }
];

export const MOCK_BLOCKED_STUDENTS = [
  {
    id: 's2',
    name: 'Bob Johnson',
    blockInfo: {
      isBlocked: true,
      type: 'conceptual_misunderstanding',
      moduleId: 'm2',
      moduleTitle: 'Exploration Profonde de l\'EVM',
      failCount: 3,
      urgency: 'high',
      lastAttemptDate: 'Il y a 2h',
      aiSynthesis: "L'apprenant semble confondre le fonctionnement de la mémoire éphémère (Memory) vs le stockage persistant (Storage) lors de l'exécution des Opcodes d'écriture. Il a tenté trois audits avec la même erreur de logique."
    }
  },
  {
    id: 's3',
    name: 'Charlie Brown',
    blockInfo: {
      isBlocked: true,
      type: 'logic_error',
      moduleId: 'm1',
      moduleTitle: 'Contrats Intelligents : Logique Déterministe',
      failCount: 5,
      urgency: 'critical',
      lastAttemptDate: 'Hier',
      aiSynthesis: "Blocage critique sur le déterminisme. Charlie tente d'utiliser des variables aléatoires non-déterministes dans ses exemples de contrats, malgré les corrections du tuteur IA. Une intervention humaine est nécessaire pour expliquer les limites du registre distribué."
    }
  }
];


export const MOCK_COACH_KPI = {
  activeStudents: 1284,
  avgSuccessRate: 84.2,
  avgValidationTime: '1.5 jours',
  blockedStudents: 12
};

export const MOCK_MODULE_PERFORMANCE = [
  { name: 'Solidity Basics', successRate: 95, avgTime: 45 },
  { name: 'EVM Deep Dive', successRate: 72, avgTime: 120 },
  { name: 'Security Audit', successRate: 64, avgTime: 180 },
  { name: 'DeFi Protocols', successRate: 88, avgTime: 90 },
];

export const MOCK_STUDENT_PROFILE = {
  id: 's2',
  name: 'Bob Johnson',
  email: 'bob.j@example.com',
  joinedDate: '12 Jan 2024',
  overallProgress: 42,
  avgScore: 78,
  strengths: ['Architecture EVM', 'Gas Optimization'],
  weaknesses: ['Security Audits', 'Reentrancy Attacks'],
  skills: [
    { skill: 'Solidity', value: 80 },
    { skill: 'Security', value: 45 },
    { skill: 'DeFi', value: 60 },
    { skill: 'Testing', value: 70 }
  ],
  activityLog: [
    { id: 'a1', type: 'audit_submission', date: 'Aujourd\'hui, 10:30', description: 'Échec de l\'audit: Smart Contract Security', score: 45 },
    { id: 'a2', type: 'module_completion', date: 'Hier, 14:00', description: 'Module validé: EVM Deep Dive', score: 82 },
    { id: 'a3', type: 'tutor_interaction', date: '15 Jan, 09:15', description: 'Session longue sur les OpCodes' }
  ]
};

export const MOCK_DAILY_GOALS = [
  { id: 'g1', title: 'Valider 1 Module', progress: 1, total: 1, completed: true, xp: 50 },
  { id: 'g2', title: 'Session Tuteur IA', progress: 5, total: 15, completed: false, xp: 30, unit: 'mins' },
  { id: 'g3', title: 'Quiz de Révision', progress: 0, total: 1, completed: false, xp: 20 }
];

export const MOCK_RECENT_ACTIVITY = [
  { id: 'ra1', type: 'module', title: 'Validation : Hachage Keccak', time: 'Il y a 2h', xp: '+120 XP' },
  { id: 'ra2', type: 'social', title: 'Badge débloqué : Architecte', time: 'Il y a 4h', xp: 'Rare' },
  { id: 'ra3', type: 'tutor', title: 'Session : Sécurité Reentrancy', time: 'Hier', xp: '+15 XP' }
];

export const MOCK_ADMIN_DASHBOARD_DATA = {
  kpis: [
    { label: 'Apprenants Actifs', value: '1,284', change: '+12%', trend: 'up' },
    { label: 'Taux de Complétion', value: '68%', change: '+5%', trend: 'up' },
    { label: 'Modules "Friction"', value: '3', change: '-1', trend: 'down', alert: true }
  ],
  alerts: [
    { id: 'al1', type: 'critical', message: 'Taux d\'échec anormal (>40%) sur "Sécurité Reentrancy"', time: 'Il y a 2h' },
    { id: 'al2', type: 'warning', message: 'Contenu "Solidity 0.8" marqué comme obsolète par l\'IA', time: 'Hier' },
    { id: 'al3', type: 'info', message: 'Augmentation des hallucinations LLM sur "ZK-Rollups"', time: 'Il y a 4h' }
  ],
  executiveSummary: `
    **Synthèse Hebdomadaire IA :**
    La cohorte montre une progression solide sur les fondamentaux EVM (+15% vs semaine dernière).
    Cependant, une friction importante est détectée sur le module de sécurité avancé. 
    Action recommandée : Simplifier les exemples de "Reentrancy" et activer le mode "Tuteur Socratique" pour ce module.
    `
};


