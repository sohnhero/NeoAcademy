
import { LearningPath, PathModule, Course, Badge, LearnerProgress, InsightLLM, ExitProfile, Coach, LegacyCourse, Module, SubscriptionPlan, CoachRate, PaymentRecord } from './types';

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
  },
  {
    id: 'security_expert',
    label: 'Expert Sécurité & Audit',
    description: 'Devenez le dernier rempart contre les hacks DeFi.',
    icon: 'Shield'
  },
  {
    id: 'infra_engineer',
    label: 'Ingénieur Infrastructure',
    description: 'Maîtrisez les Layers 2 et les protocoles ZK.',
    icon: 'Layers'
  },
  {
    id: 'fullstack_dapp',
    label: 'Développeur dApp Full-Stack',
    description: 'Concevez des expériences Web3 fluides de bout en bout.',
    icon: 'Code'
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
                content: '### Scénario : La Chaîne Logistique de "Global Logistics"\n\nImaginez que vous gérez les flux de milliers de conteneurs pour une entreprise mondiale. Traditionnellement, chaque acteur (usine, transporteur, douane, entrepôt) possède sa propre base de données. En cas de litige, réconcilier ces données prend des semaines.\n\n**Le Registre Distribué (DLT)** résout ce problème en créant une "Source de Vérité" unique et partagée. Contrairement à une base de données classique où un administrateur peut modifier les entrées, un DLT est **immuable** : une fois qu\'une étape est validée par le réseau, elle ne peut plus être effacée. \n\nDans ce cours, nous allons voir comment Ethereum agit comme ce registre mondial, mais pour la valeur et le code logique.'
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
            remediation: {
              id: 'rem-c1-1',
              courseId: 'c1-1',
              title: 'Remédiation : Fondamentaux Blockchain',
              description: 'Une révision rapide des concepts de base pour vous remettre sur les rails.',
              targetedGaps: ['Consensus', 'Décentralisation'],
              status: 'not-started' as any,
              assignedAt: '2024-02-10',
              content: [
                {
                  id: 'rem-cont-0',
                  type: 'text',
                  title: 'Le Consensus en Bref',
                  content: 'Le consensus est la méthode par laquelle les nœuds d\'un réseau s\'accordent sur l\'état de la blockchain sans autorité centrale.'
                }
              ],
              exercise: {
                id: 'rem-ex-0',
                title: 'Validation Flash',
                description: 'Questions rapides sur le consensus.',
                type: 'quiz',
                prompt: 'Quel est le but principal d\'un mécanisme de consensus ?',
                passingScore: 70
              }
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
                content: '### Cas d\'usage : Le Passeport Numérique\n\nComment prouver qu\'un document est authentique sans montrer l\'original ? La cryptographie blockchain utilise deux piliers :\n\n1. **Le Hachage (Keccak-256)** : C\'est l\'empreinte digitale de la donnée. Changez une seule virgule dans un contrat de 100 pages, et le "hash" sera totalement différent.\n2. **Les Signatures ECDSA** : Elles permettent de prouver qu\'un message a été envoyé par vous, sans jamais révéler votre clé privée.\n\nImaginez un système de diplômes numériques : l\'université signe le hash du diplôme. L\'étudiant peut alors prouver à n\'importe quel employeur l\'authenticité de sa réussite instantanément.'
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
                content: '### Simulation : "Flash Transfer" - Votre Premier Envoi\n\nDans le monde Web2, un virement bancaire peut prendre 48h. Dans le Web3, c\'est une question de secondes, mais l\'erreur est irréversible.\n\n**La Transaction** est l\'unité atomique de changement d\'état sur Ethereum. Elle contient :\n- Le `Nonce` (nombre de transactions envoyées par le compte).\n- Le `Gas Price` (ce que vous êtes prêt à payer pour la priorité).\n- Le `Data` (les instructions pour le smart contract).\n\nDans ce cours, vous allez utiliser un "Faucet" pour obtenir de faux jetons sur le réseau de test Sepolia et envoyer votre première transaction signée cryptographiquement.'
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
          globalDeadline: '2026-03-01T23:59:59Z',
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
                content: '### Défi Réel : Gestionnaire de Patrimoine Immobilier\n\nPour ce premier module de code, nous allons concevoir le moteur d\'un "Registry" immobilier. \n\n**Solidity** est un langage orienté contrat. Contrairement à Python ou JavaScript, chaque ligne de code exécutée coûte du "Gas" (de l\'argent réel). \n\nDans ce cours, vous apprendrez à :\n- Déclarer des structures de données pour des "Propriétés".\n- Gérer des listes de "Propriétaires" via des `mapping`.\n- Utiliser les types statiques pour garantir que le prix d\'une transaction ne puisse jamais être négatif.'
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
            },
            remediation: {
              id: 'rem-c2-1',
              courseId: 'c2-1',
              title: 'Remédiation : Syntaxe Solidity',
              description: 'Retour sur les bases de la syntaxe et des types de données pour solidifier vos acquis.',
              targetedGaps: ['Types de variables', 'Structure de contrat'],
              status: 'not-started' as any,
              assignedAt: '2024-02-10',
              content: [
                {
                  id: 'rem-cont-1',
                  type: 'text',
                  title: 'Révision des Types',
                  content: 'Les types de données en Solidity sont essentiels. N\'oubliez pas que uint256 est le type par défaut pour les entiers positifs...'
                }
              ],
              exercise: {
                id: 'rem-ex-1',
                title: 'Exercice de Validation',
                description: 'Démontrez votre compréhension des types de base.',
                type: 'code',
                prompt: 'Déclarez une variable de chaque type de base (uint, bool, address) dans un contrat simple.',
                passingScore: 70
              }
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
                content: '### L\'E-Machine : Déconstruction du Cœur d\'Ethereum\n\nL\'EVM (Ethereum Virtual Machine) n\'est pas un ordinateur classique. C\'est une machine à états quasi-Turing complète qui exécute du bytecode sur des milliers de nœuds synchronisés. Chaque opération a un coût en **Gas**, une unité de mesure de l\'effort computationnel.\n\n#### 1. La Stack : L\'Architecture "Last-In-First-Out"\nL\'EVM utilise une pile (stack) de 1024 slots, chaque slot faisant exactement 256 bits. C\'est ici que se font les calculs arithmétiques. La plupart des opcodes (instructions) opèrent directement sur les éléments au sommet de la pile.\n\n#### 2. Memory vs Storage : Le Dilemme du Coût\n- **Storage** : C\'est la mémoire persistante du contrat. Elle survit entre les transactions. Écrire dans le storage est l\'opération la plus coûteuse de l\'EVM (SSTORE coûte au minimum 5000 Gas).\n- **Memory** : C\'est un tableau d\'octets volatil, réinitialisé à chaque appel. Elle est linéaire et son coût augmente de manière quadratique avec sa taille. Elle est idéale pour les calculs intermédiaires.\n\n#### 3. Le Bytecode et les Opcodes\nLorsque vous compilez du Solidity, il devient une suite d\'hexadécimaux. Par exemple, `0x60` correspond à `PUSH1`. Comprendre comment ces opcodes manipulent les pointeurs de mémoire est crucial pour éviter les bugs de type "Stack too deep" ou pour optimiser les contrats haute performance.'
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
            },
            remediation: {
              id: 'rem-c2-2',
              courseId: 'c2-2',
              title: 'Remédiation : Architecture EVM',
              description: 'Clarification des concepts de Stack et Memory pour maîtriser l\'exécution de l\'EVM.',
              targetedGaps: ['Manipulation de la Stack', 'Gestion de la Memory'],
              status: 'not-started' as any,
              assignedAt: '2024-02-12',
              content: [
                {
                  id: 'rem-cont-2',
                  type: 'text',
                  title: 'EVM Stack vs Memory',
                  content: 'La stack est limitée à 1024 éléments et chaque slot fait 256 bits. La memory est un tableau d\'octets linéaire et extensible...'
                }
              ],
              exercise: {
                id: 'rem-ex-2',
                title: 'Défi EVM',
                description: 'Identifiez l\'erreur de gestion de stack.',
                type: 'practical',
                prompt: 'Expliquez pourquoi un stack overflow peut se produire avec une récursion profonde.',
                passingScore: 75
              }
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
                content: '### Analyse de Vecteur d\'Attaque : La Réentrance (Reentrancy)\n\nLa réentrance est responsable de pertes de centaines de millions de dollars (dont le fameux hack de The DAO). Elle se produit lorsqu\'un contrat externe appelle une fonction de votre contrat avant que l\'état local ne soit mis à jour.\n\n#### Le Scénario de l\'Exploit\n1. Le contrat Victime a une fonction `withdraw()`. \n2. Il vérifie le solde de l\'Attaquant.\n3. Il envoie les fonds via `call()`.\n4. **CRUCIAL** : L\'exécution passe au contrat de l\'Attaquant (via la fonction `fallback`).\n5. L\'Attaquant appelle à nouveau `withdraw()` AVANT que le solde ne soit déduit dans le contrat Victime.\n6. Le solde est toujours positif, le transfert est validé à nouveau. Boucle infinie.\n\n#### La Défense : Checks-Effects-Interactions (CEI)\nPour contrer ce risque, respectez toujours cet ordre :\n- **Checks** : Validation des entrées et conditions (ex: `require(balance >= amount)`).\n- **Effects** : Mise à jour de l\'état interne (ex: `balance -= amount`).\n- **Interactions** : Appels externes (ex: `target.call{value: amount}(\"\")`).\n\nEn mettant à jour le solde *avant* l\'envoi, la deuxième tentative de l\'attaquant échouera car le solde sera déjà à zéro.'
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
        ],
        exam: {
          id: 'exam-mod2',
          title: 'Projet Module 2 : Sécurité Solidity',
          description: 'Implémentez un contrat sécurisé utilisant les patterns appris.',
          duration: '1.5 heures',
          passingScore: 75,
          status: 'not-started',
          attempts: 0,
          globalDeadline: '2026-02-20T23:59:59Z',
          questions: [
            { id: 'mq1', type: 'code', question: 'Créez un contrat protégé contre la réentrance.', points: 100 }
          ]
        }
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
            title: 'Méthodologie d\'Audit',
            description: 'Processus complet d\'un audit de sécurité.',
            duration: '2 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Review process', 'Documentation', 'Reporting'],
            content: [
              {
                id: 'c3-1-1',
                type: 'text',
                title: 'Introduction à l\'audit',
                content: '### Le Mindset de l\'Auditeur : "Trust but Verify"\n\nAuditer un smart contract n\'est pas simplement tester si le code "marche". C\'est prouver qu\'il ne peut PAS échouer dans des conditions adverses. Vous devez penser comme un attaquant tout en possédant la rigueur d\'un ingénieur système.\n\n#### La Checklist de l\'Audit Professionnel\n1. **Architecture & Scope** : Identifiez les points d\'entrée, les privilèges d\'administration (Ownable, AccessControl) et les flows de tokens.\n2. **Analyse de la Logique Métier** : Le contrat fait-il ce qu\'il est censé faire ? Les calculs mathématiques sont-ils protégés contre les overflows (utilisez Solidity ^0.8.0 ou SafeMath) ?\n3. **Sécurité Technique** : Vérifiez les failles connues (Reentrancy, Front-running, Timestamp dependence, Integer Overflow).\n4. **Optimisation de Gas** : Identifiez les boucles potentiellement infinies ou les écritures en Storage inutiles qui pourraient bloquer le contrat ou ruiner les utilisateurs.\n\n#### Les Livrables\nUn bon rapport d\'audit doit classer les vulnérabilités par sévérité (Critical, High, Medium, Low, Informational) et proposer des solutions concrètes pour chaque "finding".'
              }
            ],
            exercise: { id: 'ex-3-1', title: 'Audit Complet', description: 'Réalisez un audit d\'un protocole simple.', type: 'practical', prompt: 'Auditez ce contrat DeFi.', passingScore: 85 }
          },
          {
            id: 'c3-2',
            title: 'Outils d\'Analyse Statique',
            description: 'Slither, Mythril, et autres outils d\'audit.',
            duration: '2.5 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Slither basics', 'Mythril analysis', 'Custom detectors'],
            content: [
              { id: 'c3-2-1', type: 'text', title: 'Analyseurs statiques', content: '### Vos Nouveaux Alliés : Slither & Mythril\n\nAuditer à la main est indispensable, mais l\'humain fait des erreurs. Les outils d\'analyse statique scannent votre code en quelques secondes pour trouver des failles connues.\n\n**Slither** est le standard de l\'industrie. Il génère un graphe de dépendance de votre contrat et détecte :\n- La réentrance.\n- Les variables non initialisées.\n- Les optimisations de gas manquées.\n\nVous apprendrez à intégrer ces outils dans votre workflow de développeur professionnel.' }
            ],
            exercise: { id: 'ex-3-2', title: 'Lab Slither', description: 'Utilisez Slither pour auditer un contrat.', type: 'code', prompt: 'Analysez ce contrat avec Slither et documentez les findings.', passingScore: 80, tools: ['slither'] }
          },
          {
            id: 'c3-3',
            title: 'Rédaction de Rapports',
            description: 'Comment rédiger un rapport d\'audit professionnel.',
            duration: '1.5 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Structure rapport', 'Severity levels', 'Recommendations'],
            content: [],
            exercise: { id: 'ex-3-3', title: 'Rapport d\'Audit', description: 'Rédigez un rapport complet.', type: 'practical', prompt: 'Produisez un rapport d\'audit formaté.', passingScore: 75 }
          }
        ]
      },
      {
        id: 'mod4',
        title: 'DeFi & Protocoles Avancés',
        description: 'Architecture des protocoles DeFi majeurs.',
        duration: '4 semaines',
        status: 'locked',
        isLocked: true,
        progress: 0,
        courses: [
          {
            id: 'c4-1',
            title: 'AMM & Liquidity Pools',
            description: 'Comprendre Uniswap, Curve et les mécanismes de market making.',
            duration: '3 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Constant product formula', 'Impermanent loss', 'LP tokens'],
            content: [
              { id: 'c4-1-1', type: 'text', title: 'Les AMM expliqués', content: 'Les Automated Market Makers révolutionnent le trading décentralisé...' },
              { id: 'c4-1-2', type: 'video', title: 'Uniswap Deep Dive', content: 'Analyse complète de Uniswap V2 et V3.', mediaUrl: 'https://example.com/uniswap.mp4', duration: '25 mins' }
            ],
            exercise: { id: 'ex-4-1', title: 'Analyse LP', description: 'Calculez l\'impermanent loss.', type: 'practical', prompt: 'Analysez une position de liquidité.', passingScore: 75 }
          },
          {
            id: 'c4-2',
            title: 'Lending & Borrowing',
            description: 'Aave, Compound et les protocoles de prêt.',
            duration: '3 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Collateralization', 'Interest rates', 'Liquidations'],
            content: [
              { id: 'c4-2-1', type: 'text', title: 'Protocoles de lending', content: 'Les protocoles de lending permettent d\'emprunter des actifs...' }
            ],
            exercise: { id: 'ex-4-2', title: 'Simulation Lending', description: 'Simulez un scénario de liquidation.', type: 'code', prompt: 'Implémentez une logique de health factor.', passingScore: 80, tools: ['solidity-editor'] }
          },
          {
            id: 'c4-3',
            title: 'Flash Loans',
            description: 'Exploiter les flash loans de manière sécurisée.',
            duration: '2.5 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Atomic transactions', 'Arbitrage', 'Attack vectors'],
            content: [],
            exercise: { id: 'ex-4-3', title: 'Flash Loan Arbitrage', description: 'Créez un contrat de flash loan.', type: 'code', prompt: 'Implémentez un flash loan arbitrage.', passingScore: 85, tools: ['solidity-editor', 'hardhat'] }
          },
          {
            id: 'c4-4',
            title: 'Oracles & Données Externes',
            description: 'Chainlink, Band Protocol et la gestion des données on-chain.',
            duration: '2 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Price feeds', 'VRF', 'Data manipulation risks'],
            content: [],
            exercise: { id: 'ex-4-4', title: 'Intégration Chainlink', description: 'Intégrez un price feed Chainlink.', type: 'code', prompt: 'Utilisez Chainlink pour obtenir le prix ETH/USD.', passingScore: 75, tools: ['solidity-editor'] }
          }
        ],
        exam: {
          id: 'exam-mod4',
          title: 'Examen DeFi',
          description: 'Évaluation des connaissances DeFi.',
          duration: '1.5 heures',
          passingScore: 80,
          status: 'locked',
          attempts: 0,
          questions: [
            { id: 'q1', type: 'text', question: 'Expliquez le concept d\'Automated Market Maker.', points: 25 },
            { id: 'q2', type: 'multiple-choice', question: 'Quel est l\'impact de l\'impermanent loss?', points: 25 }
          ]
        }
      },
      {
        id: 'mod5',
        title: 'Layer 2 & Scalabilité',
        description: 'Solutions de scalabilité et développement multi-chain.',
        duration: '3 semaines',
        status: 'locked',
        isLocked: true,
        progress: 0,
        courses: [
          {
            id: 'c5-1',
            title: 'Rollups : Optimistic vs ZK',
            description: 'Comprendre les différentes approches de scalabilité.',
            duration: '2.5 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Fraud proofs', 'Validity proofs', 'Data availability'],
            content: [
              { id: 'c5-1-1', type: 'text', title: 'Introduction aux Rollups', content: 'Les rollups sont la solution privilégiée pour scaler Ethereum...' }
            ],
            exercise: { id: 'ex-5-1', title: 'Analyse Rollup', description: 'Comparez Optimism et zkSync.', type: 'quiz', prompt: 'Questions sur les rollups.', passingScore: 70 }
          },
          {
            id: 'c5-2',
            title: 'Développement sur Arbitrum',
            description: 'Déployer et optimiser sur Arbitrum.',
            duration: '3 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Arbitrum SDK', 'Cross-chain messaging', 'Gas optimization'],
            content: [],
            exercise: { id: 'ex-5-2', title: 'Deploy sur Arbitrum', description: 'Déployez un contrat sur Arbitrum.', type: 'code', prompt: 'Déployez et vérifiez un contrat.', passingScore: 80, tools: ['hardhat', 'arbitrum-sdk'] }
          },
          {
            id: 'c5-3',
            title: 'Zero-Knowledge Basics',
            description: 'Introduction aux preuves à connaissance nulle.',
            duration: '3 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['zk-SNARKs', 'zk-STARKs', 'Circom basics'],
            content: [],
            exercise: { id: 'ex-5-3', title: 'Premier Circuit ZK', description: 'Créez un circuit simple.', type: 'code', prompt: 'Implémentez un circuit de vérification.', passingScore: 75, tools: ['circom', 'snarkjs'] }
          },
          {
            id: 'c5-4',
            title: 'Bridges & Interopérabilité',
            description: 'Communication cross-chain et ponts de tokens.',
            duration: '2 heures',
            status: 'locked',
            isLocked: true,
            objectives: ['Lock & mint', 'Message passing', 'Bridge security'],
            content: [],
            exercise: { id: 'ex-5-4', title: 'Analyse Bridge', description: 'Auditez un bridge.', type: 'practical', prompt: 'Identifiez les risques d\'un bridge.', passingScore: 85 }
          }
        ],
        exam: {
          id: 'exam-mod5',
          title: 'Examen Layer 2',
          description: 'Évaluation des solutions de scalabilité.',
          duration: '1 heure',
          passingScore: 75,
          status: 'locked',
          attempts: 0,
          questions: [
            { id: 'q1', type: 'text', question: 'Différence entre Optimistic et ZK Rollups.', points: 50 },
            { id: 'q2', type: 'multiple-choice', question: 'Qu\'est-ce que la Data Availability?', points: 50 }
          ]
        }
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
      globalDeadline: '2026-12-30T23:59:59Z',
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
    description: 'Devenez un expert Solidity. Apprenez à concevoir des protocoles décentralisés pour la finance, l\'identité et la logistique.',
    exitProfile: 'web3_developer',
    exitProfileLabel: 'Développeur Web3',
    image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072',
    estimatedDuration: '12 semaines',
    skills: ['Solidity', 'EVM', 'Web3.js', 'Hardhat', 'Truffle'],
    type: 'predefined'
  },
  {
    id: 'catalog-2',
    title: 'Auditeur de Sécurité Blockchain',
    description: 'Le dernier rempart. Apprenez les techniques d\'audit professionnel, du fuzzing à la vérification formelle.',
    exitProfile: 'smart_contract_auditor',
    exitProfileLabel: 'Auditeur Smart Contracts',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000',
    estimatedDuration: '16 semaines',
    skills: ['Analyse statique', 'Fuzzing', 'Formal Verification', 'Audit Report'],
    type: 'predefined'
  },
  {
    id: 'catalog-3',
    title: 'Architecte DeFi',
    description: 'Concevez des protocoles de finance décentralisée complexes.',
    exitProfile: 'defi_specialist',
    exitProfileLabel: 'Spécialiste DeFi',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=2000',
    estimatedDuration: '14 semaines',
    skills: ['AMM', 'Lending', 'Yield Farming', 'Tokenomics'],
    type: 'predefined'
  },
  {
    id: 'catalog-4',
    title: 'Expert en Sécurité & Audit DeFi',
    description: 'Apprenez à identifier les vulnérabilités critiques et à sécuriser des milliards d\'actifs.',
    exitProfile: 'security_expert',
    exitProfileLabel: 'Expert Sécurité',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
    estimatedDuration: '10 semaines',
    skills: ['Audit', 'Fuzzing', 'Formal Verification', 'Security Patterns'],
    type: 'predefined'
  },
  {
    id: 'catalog-5',
    title: 'Ingénieur Infra & ZK-Rollups',
    description: 'Plongez dans le futur de la scalabilité avec les Zero-Knowledge Proofs et les L2.',
    exitProfile: 'infra_engineer',
    exitProfileLabel: 'Ingénieur Infra',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
    estimatedDuration: '16 semaines',
    skills: ['Circom', 'ZK-Proofs', 'Layer 2', 'Arbitrum', 'Optimism'],
    type: 'predefined'
  },
  {
    id: 'catalog-6',
    title: 'Développeur dApps Full-Stack',
    description: 'Le pont entre le Web2 et le Web3. Intégrez React, Ethers.js et Solidity de façon professionnelle.',
    exitProfile: 'fullstack_dapp',
    exitProfileLabel: 'Full-Stack Web3',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072',
    estimatedDuration: '12 semaines',
    skills: ['React', 'Ethers.js', 'Solidity', 'Tailwind', 'Next.js'],
    type: 'predefined'
  }
];

// =====================================================
// MOCK BADGES
// =====================================================

export const MOCK_BADGES: Badge[] = [
  // Certifications
  {
    id: 'cert-1',
    name: 'Architecte Ethereum Certifié',
    description: 'Validation complète du parcours Maîtrise Ethereum. Capacité démontrée à concevoir des architectures décentralisées sécurisées.',
    dateEarned: '15/05/2024',
    icon: 'Trophy',
    color: 'text-yellow-400',
    type: 'certification'
  },

  // Module Badges
  {
    id: 'b-mod-1',
    name: 'Fondations Solides',
    description: 'Expertise confirmée dans les fondations de la blockchain et l\'architecture Ethereum.',
    dateEarned: '15/02/2024',
    icon: 'Award',
    color: 'text-emerald-400',
    type: 'module'
  },
  {
    id: 'b-mod-2',
    name: 'Maître du Solidity',
    description: 'Maîtrise avancée du langage Solidity et des patterns de développement intelligents.',
    dateEarned: '20/03/2024',
    icon: 'Terminal',
    color: 'text-blue-400',
    type: 'module'
  },
  {
    id: 'b-mod-3',
    name: 'Gardien de la Sécurité',
    description: 'Capacité à identifier et corriger les vulnérabilités critiques dans les smart contracts.',
    dateEarned: '10/04/2024',
    icon: 'Shield',
    color: 'text-purple-400',
    type: 'module'
  },

  // Course Badges
  {
    id: 'b-c-1',
    name: 'Explorateur de Registre',
    description: 'Compréhension parfaite des registres distribués et du consensus.',
    dateEarned: '05/02/2024',
    icon: 'Zap',
    color: 'text-yellow-500',
    type: 'course'
  },
  {
    id: 'b-c-2',
    name: 'Cryptographe Initié',
    description: 'Maîtrise des concepts de hachage et signatures numériques.',
    dateEarned: '08/02/2024',
    icon: 'Unlock',
    color: 'text-slate-400',
    type: 'course'
  },
  {
    id: 'b-c-3',
    name: 'Architecte de Données',
    description: 'Utilisation experte des types complexes en Solidity.',
    dateEarned: '01/03/2024',
    icon: 'Database',
    color: 'text-cyan-400',
    type: 'course'
  },
  {
    id: 'b-c-4',
    name: 'Optimiseur de Gas',
    description: 'Écriture de code efficient pour minimiser les coûts de transaction.',
    dateEarned: '15/03/2024',
    icon: 'Fuel',
    color: 'text-orange-400',
    type: 'course'
  }
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

// =====================================================
// PAYMENT & SUBSCRIPTION SYSTEM
// =====================================================


export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    tier: 'starter',
    name: 'Starter',
    price: 9900,
    yearlyPrice: 99000,
    freeModulesCount: 4,
    coachSessionsIncluded: 0,
    features: [
      'Accès aux 4 premiers modules',
      'Tuteur IA illimité',
      'Portfolio numérique',
      'Badges de compétences',
      'Support communautaire'
    ]
  },
  {
    id: 'plan-pro',
    tier: 'pro',
    name: 'Pro',
    price: 19900,
    yearlyPrice: 199000,
    freeModulesCount: 99,
    coachSessionsIncluded: 2,
    isPopular: true,
    features: [
      'Accès à tous les modules',
      'Tuteur IA illimité',
      'Portfolio numérique avancé',
      '2 sessions coach/mois incluses',
      'Projets finaux & certifications',
      'Accès prioritaire aux nouveautés',
      'IDE collaboratif'
    ]
  },
  {
    id: 'plan-elite',
    tier: 'elite',
    name: 'Elite',
    price: 39900,
    yearlyPrice: 399000,
    freeModulesCount: 99,
    coachSessionsIncluded: 8,
    features: [
      'Tout le plan Pro',
      '8 sessions coach/mois incluses',
      'Mentorat personnalisé',
      'Revue de code prioritaire',
      'Accès anticipé aux parcours',
      'Certificat vérifié on-chain',
      'Réseau alumni exclusif',
      'Support prioritaire 24/7'
    ]
  }
];

export const COACH_RATES: CoachRate[] = [
  {
    id: 'rate-30',
    durationMinutes: 30,
    label: '30 minutes',
    price: 7500,
    description: 'Session flash — idéale pour débloquer un point technique précis'
  },
  {
    id: 'rate-60',
    durationMinutes: 60,
    label: '1 heure',
    price: 12500,
    description: 'Session standard — revue de code, audit, ou architecture ensemble'
  },
  {
    id: 'rate-90',
    durationMinutes: 90,
    label: '1h30',
    price: 17500,
    description: 'Session approfondie — pair programming ou préparation projet final'
  }
];

export const MOCK_PAYMENT_HISTORY: PaymentRecord[] = [
  { id: 'pay-1', date: '2026-02-15', description: 'Abonnement Pro — Mensuel', amount: 19900, type: 'subscription', status: 'completed' },
  { id: 'pay-2', date: '2026-02-10', description: 'Session Coach — 1h avec Amadou D.', amount: 12500, type: 'coach_session', status: 'completed' },
  { id: 'pay-3', date: '2026-01-15', description: 'Abonnement Pro — Mensuel', amount: 19900, type: 'subscription', status: 'completed' },
  { id: 'pay-4', date: '2026-01-08', description: 'Session Coach — 30min avec Fatou S.', amount: 7500, type: 'coach_session', status: 'completed' },
  { id: 'pay-5', date: '2025-12-15', description: 'Abonnement Starter — Mensuel', amount: 9900, type: 'subscription', status: 'completed' }
];
