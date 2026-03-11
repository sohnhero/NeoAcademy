
import React from 'react';
import {
    Award, Star, CheckCircle2, ChevronRight, ExternalLink, BookOpen,
    Target, Code, Shield, MessageSquare, Calendar, TrendingUp,
    GraduationCap, Briefcase, Github, Globe
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_PROFILE = {
    name: 'Marie Dupont',
    title: 'Développeuse Blockchain Junior',
    school: 'École Supérieure du Digital',
    program: 'Développeur Web3 & Blockchain',
    cohort: 'Promotion 2026',
    avatar: 'https://picsum.photos/seed/marie-portfolio/400',
    bio: 'Passionnée par la technologie blockchain et les applications décentralisées. Spécialisée en développement Solidity et architecture DApp. En formation intensive avec un focus sur la sécurité des smart contracts et les protocoles DeFi.',
    email: 'marie.dupont@esd-paris.edu',
    github: 'github.com/mariedupont',
    website: 'mariedupont.dev',
    overallScore: 83,
    completedModules: 3,
    totalModules: 8,
};

const MOCK_PROJECTS = [
    {
        id: 'p1',
        title: 'TokenVault — Coffre-fort de Tokens Multi-Sig',
        description: 'Smart contract de coffre-fort multi-signatures permettant la gestion sécurisée de tokens ERC-20 avec gouvernance on-chain. Implémente un mécanisme de vote et de timelock.',
        score: 92,
        skills: ['Solidity', 'Multi-Sig', 'ERC-20', 'OpenZeppelin'],
        date: 'Janvier 2026',
        thumbnail: 'https://picsum.photos/seed/tokenvault/600/400',
        type: 'Projet de Module',
    },
    {
        id: 'p2',
        title: 'ChainBridge — Pont Cross-Chain Simplifié',
        description: 'Prototype de bridge cross-chain entre Ethereum testnet et Polygon testnet. Utilise un mécanisme de lock-and-mint avec oracle décentralisé.',
        score: 85,
        skills: ['Cross-Chain', 'Oracle', 'ethers.js', 'React'],
        date: 'Décembre 2025',
        thumbnail: 'https://picsum.photos/seed/chainbridge/600/400',
        type: 'Projet d\'Équipe',
    },
    {
        id: 'p3',
        title: 'NFT Marketplace — Place de Marché Décentralisée',
        description: 'DApp complète de marketplace NFT avec listing, achat, enchères et système de royalties. Interface React avec intégration IPFS pour les métadonnées.',
        score: 88,
        skills: ['ERC-721', 'IPFS', 'React', 'Hardhat'],
        date: 'Novembre 2025',
        thumbnail: 'https://picsum.photos/seed/nftmarket/600/400',
        type: 'Projet de Module',
    },
];

const MOCK_COMPETENCIES_PROVEN = [
    { domain: 'Fondamentaux Blockchain', skills: ['Hash cryptographiques', 'Consensus PoW/PoS', 'Structures Merkle'], score: 88 },
    { domain: 'Smart Contracts', skills: ['Syntaxe Solidity', 'ERC-20/721', 'Testing'], score: 85 },
    { domain: 'Architecture DApp', skills: ['Intégration Web3', 'Gestion Wallets', 'IPFS'], score: 79 },
];

const MOCK_EVALUATIONS = [
    { module: 'Fondamentaux Blockchain', score: 88, date: 'Oct 2025', grade: 'A' },
    { module: 'Solidity & Smart Contracts', score: 82, date: 'Déc 2025', grade: 'B+' },
    { module: 'Architecture DApp', score: 79, date: 'Fév 2026', grade: 'B' },
];

const MOCK_FEEDBACK = [
    {
        id: 'f1',
        author: 'Prof. Laurent Dubois',
        role: 'Professeur Blockchain',
        text: 'Marie démontre une excellente compréhension des concepts fondamentaux de la blockchain. Sa capacité à traduire les concepts théoriques en implémentation Solidity est remarquable. Elle se distingue par sa rigueur dans les tests unitaires.',
        date: 'Mars 2026',
        avatar: 'https://picsum.photos/seed/prof-laurent/100',
    },
    {
        id: 'f2',
        author: 'Prof. Sophie Moreau',
        role: 'Experte Sécurité',
        text: 'Bon potentiel en sécurité des smart contracts. Marie montre un souci du détail dans ses audits de code. Je recommande d\'approfondir les aspects de gas optimization et les patterns avancés de sécurité.',
        date: 'Février 2026',
        avatar: 'https://picsum.photos/seed/prof-sophie/100',
    },
];

// =====================================================
// COMPONENT
// =====================================================

const InstitutionalPortfolioView: React.FC = () => {
    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="hover:text-blue-500 cursor-pointer transition-colors">Tableau de bord</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: 'var(--text-primary)' }}>Portfolio</span>
            </div>

            {/* Profile Hero */}
            <section className="border rounded-[32px] overflow-hidden relative" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                {/* Banner */}
                <div className="h-40 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/2"></div>
                </div>

                <div className="px-10 pb-10 relative">
                    {/* Avatar */}
                    <div className="w-28 h-28 rounded-3xl border-4 overflow-hidden -mt-14 relative z-10 shadow-xl" style={{ borderColor: 'var(--bg-secondary)' }}>
                        <img src={MOCK_PROFILE.avatar} alt={MOCK_PROFILE.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-4 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tighter mb-1" style={{ color: 'var(--text-primary)' }}>{MOCK_PROFILE.name}</h1>
                            <p className="text-sm font-bold text-indigo-500 mb-2">{MOCK_PROFILE.title}</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                                <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> {MOCK_PROFILE.school}</span>
                                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {MOCK_PROFILE.program}</span>
                                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {MOCK_PROFILE.cohort}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:border-blue-500/30" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                <Github className="w-3.5 h-3.5" /> GitHub
                            </a>
                            <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:border-blue-500/30" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                <Globe className="w-3.5 h-3.5" /> Portfolio
                            </a>
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20">
                                <ExternalLink className="w-3.5 h-3.5" /> Partager
                            </button>
                        </div>
                    </div>

                    <p className="text-sm leading-relaxed mt-5 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
                        {MOCK_PROFILE.bio}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 max-w-lg">
                        <div className="text-center p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                            <p className="text-xl font-black text-indigo-500">{MOCK_PROFILE.overallScore}%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Score moyen</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                            <p className="text-xl font-black text-green-500">{MOCK_PROFILE.completedModules}/{MOCK_PROFILE.totalModules}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Modules</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                            <p className="text-xl font-black text-amber-500">{MOCK_PROJECTS.length}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Projets</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Validated Projects */}
            <section>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                    <Code className="w-5 h-5 text-indigo-500" /> Projets Validés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOCK_PROJECTS.map(project => (
                        <div
                            key={project.id}
                            className="border rounded-[24px] overflow-hidden transition-all hover:border-blue-500/30 hover:translate-y-[-4px] cursor-pointer group"
                            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="h-44 overflow-hidden relative">
                                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                                    {project.score}%
                                </div>
                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                    {project.type}
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-sm mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{project.title}</h4>
                                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.skills.map((skill, i) => (
                                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                    <Calendar className="w-3 h-3" /> {project.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Competencies Proven */}
            <section>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                    <Target className="w-5 h-5 text-green-500" /> Compétences Prouvées
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MOCK_COMPETENCIES_PROVEN.map((comp, idx) => (
                        <div key={idx} className="border rounded-[24px] p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{comp.domain}</h4>
                                <span className="text-xs font-black text-green-500">{comp.score}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${comp.score}%` }}></div>
                            </div>
                            <div className="space-y-2">
                                {comp.skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Evaluation Scores */}
            <section>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                    <Award className="w-5 h-5 text-amber-500" /> Scores d'Évaluation
                </h2>
                <div className="border rounded-[24px] overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="grid grid-cols-4 gap-4 p-5 border-b text-[10px] font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                        <span>Module</span>
                        <span>Score</span>
                        <span>Grade</span>
                        <span>Date</span>
                    </div>
                    {MOCK_EVALUATIONS.map((ev, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 p-5 border-b last:border-b-0 items-center" style={{ borderColor: 'var(--border-color)' }}>
                            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{ev.module}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${ev.score}%` }}></div>
                                </div>
                                <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{ev.score}%</span>
                            </div>
                            <span className="text-sm font-black text-indigo-500">{ev.grade}</span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{ev.date}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Professor Feedback */}
            <section>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                    <MessageSquare className="w-5 h-5 text-violet-500" /> Recommandations
                </h2>
                <div className="space-y-4">
                    {MOCK_FEEDBACK.map(fb => (
                        <div key={fb.id} className="border rounded-[24px] p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                            <div className="flex items-start gap-4">
                                <img src={fb.avatar} alt={fb.author} className="w-12 h-12 rounded-2xl object-cover shrink-0 border-2" style={{ borderColor: 'var(--border-color)' }} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{fb.author}</h4>
                                            <p className="text-[10px] font-medium text-indigo-500">{fb.role}</p>
                                        </div>
                                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{fb.date}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                                        "{fb.text}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default InstitutionalPortfolioView;
