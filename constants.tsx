
import { LearningPath, PathModule, Course, Badge, LearnerProgress, InsightLLM, ExitProfile, Coach, LegacyCourse, Module } from './types';

// =====================================================
// EXIT PROFILES
// =====================================================

export const EXIT_PROFILES: { id: ExitProfile; label: string; description: string; icon: string }[] = [
  {
    id: 'web3_developer',
    label: 'Développeur Web3',
    description: 'Maîtrisez Solidity, les smart contracts, et l\'écosystème Ethereum.',
    icon: 'Code'
  },
  {
    id: 'smart_contract_auditor',
    label: 'Auditeur Smart Contracts',
    description: 'Spécialisez-vous dans la sécurité et l\'audit de protocoles.',
    icon: 'Shield'
  },
  {
    id: 'defi_specialist',
    label: 'Spécialiste DeFi',
    description: 'Devenez expert en protocoles de finance décentralisée.',
    icon: 'TrendingUp'
  },
  {
    id: 'blockchain_architect',
    label: 'Architecte Blockchain',
    description: 'Concevez des architectures blockchain scalables.',
    icon: 'Layers'
  },
  {
    id: 'nft_developer',
    label: 'Développeur NFT',
    description: 'Créez des marketplaces et des collections NFT.',
    icon: 'Hexagon'
  }
];

// =====================================================
// MOCK LEARNING PATHS (V2 Structure)
// =====================================================

export const MOCK_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp1',
    title: 'Maîtrise Ethereum & Smart Contracts',
    description: 'Parcours complet pour devenir développeur Web3 professionnel.',
    exitProfile: 'web3_developer',
    exitProfileLabel: 'Développeur Web3',
    image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072&auto=format&fit=crop',
    type: 'predefined',
    status: 'in-progress',
    progress: 35,
    estimatedDuration: '12 semaines',
    skills: ['Solidity', 'EVM', 'Web3.js', 'Hardhat', 'Sécurité'],
    createdAt: '2024-01-15',
    startedAt: '2024-02-01',
    modules: [
      {
        id: 'mod1',
        title: 'Fondamentaux de la Blockchain',
        description: 'Comprendre les bases cryptographiques et l\'architecture des réseaux décentralisés.',
        duration: '2 semaines',
        status: 'completed',
        isLocked: false,
        progress: 100,
        badge: {
          id: 'badge-mod1',
          name: 'Fondations Maîtrisées',
          description: 'Module Fondamentaux complété.',
          type: 'module',
          dateEarned: '2024-02-15',
          icon: 'Award',
          color: 'text-green-500'
        },
        courses: [
          {
            id: 'c1-1',
            title: 'Introduction aux Registres Distribués',
            description: 'Comprendre le concept de décentralisation et consensus.',
            duration: '45 mins',
            status: 'completed',
            isLocked: false,
            score: 92,
            objectives: ['Comprendre la décentralisation', 'Mécanismes de consensus', 'Histoire de Bitcoin'],
            content: [
              {
                id: 'content-1-1',
                type: 'text',
                title: 'Qu\'est-ce qu\'un registre distribué?',
                content: 'Un registre distribué (DLT) est une base de données partagée, répliquée et synchronisée entre plusieurs participants d\'un réseau décentralisé...'
              },
              {
                id: 'content-1-2',
                type: 'video',
                title: 'Le consensus expliqué',
                content: 'Vidéo explicative sur les mécanismes de consensus.',
                mediaUrl: 'https://example.com/video1.mp4',
                duration: '15 mins'
              }
            ],
            exercise: {
              id: 'ex-1-1',
              title: 'Quiz - Fondamentaux DLT',
              description: 'Validez votre compréhension des registres distribués.',
              type: 'quiz',
              prompt: 'Expliquez en quoi le consensus Proof-of-Work diffère du Proof-of-Stake.',
              passingScore: 70
            },
            badge: {
              id: 'badge-c1-1',
              name: 'Premier Pas Blockchain',
              description: 'Premier cours complété.',
              type: 'course',
              dateEarned: '2024-02-05',
              icon: 'Star',
              color: 'text-yellow-500'
            }
          },
          {
            id: 'c1-2',
            title: 'Cryptographie Fondamentale',
            description: 'Hachage, signatures numériques et arbres de Merkle.',
            duration: '1 heure',
            status: 'completed',
            isLocked: false,
            score: 88,
            objectives: ['Comprendre Keccak-256', 'Signatures ECDSA', 'Merkle Trees'],
            content: [
              {
                id: 'content-2-1',
                type: 'text',
                title: 'Le hachage cryptographique',
                content: 'Les fonctions de hachage transforment des données de taille arbitraire en une empreinte fixe de 256 bits...'
              }
            ],
            exercise: {
              id: 'ex-1-2',
              title: 'Implémentation Merkle Tree',
              description: 'Construisez un arbre de Merkle en pseudo-code.',
              type: 'code',
              prompt: 'Implémentez une fonction qui construit un arbre de Merkle à partir d\'une liste de transactions.',
              passingScore: 75,
              tools: ['code-editor']
            }
          },
          {
            id: 'c1-3',
            title: 'Architecture Ethereum',
            description: 'Comptes, transactions et structure de blocs.',
            duration: '1.5 heures',
            status: 'completed',
            isLocked: false,
            score: 95,
            objectives: ['EOA vs Contract Accounts', 'Structure des transactions', 'Gas'],
            content: [
              {
                id: 'content-3-1',
                type: 'text',
                title: 'Les comptes Ethereum',
                content: 'Ethereum distingue deux types de comptes : les EOA (Externally Owned Accounts) contrôlés par des clés privées, et les comptes de contrats...'
              }
            ],
            exercise: {
              id: 'ex-1-3',
              title: 'Analyse de Transaction',
              description: 'Analysez une transaction Ethereum réelle.',
              type: 'practical',
              prompt: 'Décrivez chaque champ d\'une transaction Ethereum et son rôle.',
              passingScore: 70
            }
          }
        ],
        exam: {
          id: 'exam-mod1',
          title: 'Examen Module 1',
          description: 'Évaluation des fondamentaux blockchain.',
          duration: '1 heure',
          passingScore: 75,
          status: 'completed',
          score: 88,
          attempts: 1,
          questions: [
            { id: 'q1', type: 'text', question: 'Expliquez le problème du double spending.', points: 25 },
            { id: 'q2', type: 'multiple-choice', question: 'Quel algorithme de hachage utilise Ethereum?', points: 15 },
            { id: 'q3', type: 'code', question: 'Écrivez une fonction de hachage simple.', points: 30 },
            { id: 'q4', type: 'text', question: 'Décrivez le rôle des mineurs dans PoW.', points: 30 }
          ]
        }
      },
      {
        id: 'mod2',
        title: 'Développement Smart Contracts',
        description: 'Maîtriser Solidity et le développement de contrats intelligents.',
        duration: '4 semaines',
        status: 'in-progress',
        isLocked: false,
        progress: 33,
        courses: [
          {
            id: 'c2-1',
            title: 'Solidity : Syntaxe et Types',
            description: 'Les bases du langage Solidity.',
            duration: '2 heures',
            status: 'completed',
            isLocked: false,
            score: 90,
            objectives: ['Variables d\'état', 'Types de données', 'Modificateurs'],
            content: [
              {
                id: 'content-4-1',
                type: 'text',
                title: 'Introduction à Solidity',
                content: 'Solidity est un langage orienté contrat, typé statiquement, conçu pour la machine virtuelle Ethereum (EVM)...'
              }
            ],
            exercise: {
              id: 'ex-2-1',
              title: 'Votre Premier Contrat',
              description: 'Écrivez un contrat de stockage simple.',
              type: 'code',
              prompt: 'Créez un contrat "SimpleStorage" avec une variable uint256 et des fonctions get/set.',
              passingScore: 80,
              tools: ['solidity-editor', 'remix']
            }
          },
          {
            id: 'c2-2',
            title: 'Architecture de l\'EVM',
            description: 'Comprendre la machine virtuelle Ethereum en profondeur.',
            duration: '3 heures',
            status: 'in-progress',
            isLocked: false,
            objectives: ['Stack-based execution', 'Opcodes', 'Memory vs Storage'],
            content: [
              {
                id: 'content-5-1',
                type: 'text',
                title: 'L\'EVM en détail',
                content: 'L\'EVM est une machine à états quasi-Turing complète. Elle utilise une pile de 256 bits et distingue trois zones de données : storage, memory et stack...'
              }
            ],
            exercise: {
              id: 'ex-2-2',
              title: 'Analyse des Opcodes',
              description: 'Analysez le bytecode d\'un contrat simple.',
              type: 'practical',
              prompt: 'Décompilez et expliquez les opcodes d\'un contrat de stockage.',
              passingScore: 75,
              tools: ['evm-debugger']
            }
          },
          {
            id: 'c2-3',
            title: 'Patterns de Sécurité',
            description: 'Éviter les vulnérabilités courantes.',
            duration: '3 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Reentrancy', 'Overflow', 'Access Control'],
            content: [
              {
                id: 'content-6-1',
                type: 'text',
                title: 'Sécurité des Smart Contracts',
                content: 'La sécurité est primordiale dans le développement blockchain car les erreurs sont immuables et peuvent coûter des millions...'
              }
            ],
            exercise: {
              id: 'ex-2-3',
              title: 'Audit de Vulnérabilité',
              description: 'Trouvez et corrigez les failles d\'un contrat.',
              type: 'code',
              prompt: 'Identifiez la vulnérabilité de réentrance dans ce contrat et proposez un correctif.',
              passingScore: 80,
              tools: ['solidity-editor', 'slither']
            }
          }
        ]
      },
      {
        id: 'mod3',
        title: 'Audit & Sécurité Avancée',
        description: 'Techniques d\'audit professionnel et outils de sécurité.',
        duration: '3 semaines',
        status: 'locked',
        isLocked: true,
        progress: 0,
        courses: [
          {
            id: 'c3-1',
            title: 'Methodologie d\'Audit',
            description: 'Processus complet d\'un audit de sécurité.',
            duration: '2 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Review process', 'Documentation', 'Reporting'],
            content: [],
            exercise: {
              id: 'ex-3-1',
              title: 'Audit Complet',
              description: 'Réalisez un audit d\'un protocole simple.',
              type: 'practical',
              prompt: 'Auditez ce contrat DeFi et produisez un rapport.',
              passingScore: 85
            }
          }
        ]
      }
    ],
    finalProject: {
      id: 'fp1',
      title: 'Projet Final : DApp Complète',
      description: 'Développez une application décentralisée fonctionnelle de A à Z.',
      requirements: [
        'Smart contracts sécurisés',
        'Interface utilisateur Web3',
        'Tests unitaires complets',
        'Documentation technique'
      ],
      deliverables: [
        {
          id: 'del1',
          title: 'Smart Contracts',
          description: 'Contrats déployés sur testnet avec tests.',
          deadline: '2024-04-15',
          status: 'pending'
        },
        {
          id: 'del2',
          title: 'Frontend DApp',
          description: 'Interface React intégrée avec Web3.',
          deadline: '2024-04-22',
          status: 'pending'
        },
        {
          id: 'del3',
          title: 'Documentation & Présentation',
          description: 'Documentation technique et présentation.',
          deadline: '2024-04-30',
          status: 'pending'
        }
      ],
      globalDeadline: '2024-04-30',
      status: 'locked'
    }
  }
];

// =====================================================
// PREDEFINED PATHS CATALOG
// =====================================================

export const PREDEFINED_PATHS_CATALOG: Partial<LearningPath>[] = [
  {
    id: 'catalog-1',
    title: 'Maîtrise Ethereum & Smart Contracts',
    description: 'Parcours complet pour devenir développeur Web3.',
    exitProfile: 'web3_developer',
    exitProfileLabel: 'Développeur Web3',
    image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072',
    estimatedDuration: '12 semaines',
    skills: ['Solidity', 'EVM', 'Web3.js', 'Hardhat'],
    type: 'predefined'
  },
  {
    id: 'catalog-2',
    title: 'Auditeur de Sécurité Blockchain',
    description: 'Devenez expert en audit de smart contracts.',
    exitProfile: 'smart_contract_auditor',
    exitProfileLabel: 'Auditeur Smart Contracts',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000',
    estimatedDuration: '16 semaines',
    skills: ['Analyse statique', 'Fuzzing', 'Formal Verification'],
    type: 'predefined'
  },
  {
    id: 'catalog-3',
    title: 'Architecte DeFi',
    description: 'Concevez des protocoles de finance décentralisée.',
    exitProfile: 'defi_specialist',
    exitProfileLabel: 'Spécialiste DeFi',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=2000',
    estimatedDuration: '14 semaines',
    skills: ['AMM', 'Lending', 'Yield Farming', 'Tokenomics'],
    type: 'predefined'
  }
];

// =====================================================
// MOCK BADGES
// =====================================================

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Architecte Logique', description: 'Maîtrise Solidity.', dateEarned: '15/11/2023', icon: 'Terminal', color: 'text-blue-400', type: 'course' },
  { id: 'b2', name: 'Auditeur EVM', description: 'Expertise bytecode.', dateEarned: '20/01/2024', icon: 'Cpu', color: 'text-purple-400', type: 'module' },
  { id: 'b3', name: 'Développeur Web3', description: 'Parcours complet validé.', dateEarned: '—', icon: 'Award', color: 'text-yellow-400', type: 'certification' }
];

// =====================================================
// MOCK STATS & PROGRESS
// =====================================================

export const MOCK_STATS: LearnerProgress = {
  totalPaths: 1,
  completedPaths: 0,
  totalModules: 3,
  completedModules: 1,
  totalCourses: 7,
  completedCourses: 4,
  avgScore: 91,
  skillMatrix: [
    { skill: 'Solidity', value: 85 },
    { skill: 'EVM', value: 90 },
    { skill: 'Sécurité', value: 75 },
    { skill: 'DeFi', value: 60 },
    { skill: 'ZK Proofs', value: 40 }
  ],
  currentPath: MOCK_LEARNING_PATHS[0]
};

// =====================================================
// DAILY GOALS & ACTIVITY
// =====================================================

export const MOCK_DAILY_GOALS = [
  { id: 'g1', title: 'Valider 1 Cours', progress: 1, total: 1, completed: true, xp: 50 },
  { id: 'g2', title: 'Session Tuteur IA', progress: 5, total: 15, completed: false, xp: 30, unit: 'mins' },
  { id: 'g3', title: 'Quiz de Révision', progress: 0, total: 1, completed: false, xp: 20 }
];

export const MOCK_RECENT_ACTIVITY = [
  { id: 'ra1', type: 'course', title: 'Cours validé : Solidity Syntaxe', time: 'Il y a 2h', xp: '+120 XP' },
  { id: 'ra2', type: 'badge', title: 'Badge débloqué : Fondations', time: 'Il y a 4h', xp: 'Rare' },
  { id: 'ra3', type: 'tutor', title: 'Session IA : Sécurité EVM', time: 'Hier', xp: '+15 XP' }
];

// =====================================================
// ALERTS & DEADLINES
// =====================================================

export const MOCK_ALERTS = [
  { id: 'alert1', type: 'warning', message: 'Deadline projet dans 5 jours', time: 'Maintenant', priority: 'high' },
  { id: 'alert2', type: 'info', message: 'Nouveau module disponible', time: 'Il y a 1h', priority: 'medium' }
];

// =====================================================
// COACH DATA
// =====================================================

export const MOCK_COACHES: Coach[] = [
  {
    id: 'coach1',
    name: 'Marie Laurent',
    email: 'marie.l@chainacademy.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    specialties: ['Solidity', 'Sécurité', 'DeFi'],
    availablePaths: ['lp1']
  }
];

// =====================================================
// LEGACY DATA (for backward compatibility)
// =====================================================

export const MOCK_COURSES: LegacyCourse[] = [
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
    submission: "J'ai implémenté le circuit circom...",
    aiFeedback: "L'IA a validé la logique mathématique...",
    aiInitialScore: 72
  }
];

export const MOCK_STUDENTS = [
  { id: 's1', name: 'Alice Smith', progress: 85, score: 92, lastActive: '2h ago', status: 'active' },
  { id: 's2', name: 'Bob Johnson', progress: 42, score: 78, lastActive: '5m ago', status: 'at-risk' }
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
      aiSynthesis: "L'apprenant confond Memory vs Storage."
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
  { name: 'EVM Deep Dive', successRate: 72, avgTime: 120 }
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
    { skill: 'Security', value: 45 }
  ],
  activityLog: [
    { id: 'a1', type: 'course_completion', date: 'Aujourd\'hui, 10:30', description: 'Cours validé: Solidity Basics', score: 85 }
  ]
};

export const MOCK_ADMIN_DASHBOARD_DATA = {
  kpis: [
    { label: 'Apprenants Actifs', value: '1,284', change: '+12%', trend: 'up' },
    { label: 'Taux de Complétion', value: '68%', change: '+5%', trend: 'up' }
  ],
  alerts: [
    { id: 'al1', type: 'critical', message: 'Taux d\'échec anormal sur Sécurité', time: 'Il y a 2h' }
  ],
  executiveSummary: `**Synthèse Hebdomadaire IA :** Progression solide sur fondamentaux EVM.`
};
