
import React, { useState } from 'react';
import {
    GraduationCap, Clock, CheckCircle2, Lock, ChevronRight,
    BookOpen, Target, Award, ArrowRight, Layers, FileText,
    Play, Users, Calendar
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_PROGRAM = {
    title: 'Développeur Web3 & Blockchain',
    description: 'Ce programme de certification forme les apprenants aux technologies blockchain de nouvelle génération. Vous maîtriserez le développement de smart contracts, la conception d\'applications décentralisées (DApps), les protocoles DeFi, et les pratiques d\'audit de sécurité avancées.',
    duration: '12 mois',
    totalHours: 480,
    school: 'École Supérieure du Digital',
    cohort: 'Promotion 2026 — Cohorte Alpha',
    competenciesCount: 24,
    startDate: '1 Sept. 2025',
    endDate: '31 Août 2026',
    professors: ['Prof. Laurent Dubois', 'Prof. Sophie Moreau', 'Prof. Thomas Leroy'],
};

const MOCK_MODULES = [
    {
        id: 'm1',
        title: 'Fondamentaux Blockchain',
        description: 'Comprendre les principes fondamentaux de la technologie blockchain, les mécanismes de consensus et les structures de données distribuées.',
        competencies: ['Comprendre les hash cryptographiques', 'Maîtriser les mécanismes de consensus', 'Analyser les structures Merkle'],
        duration: '6 semaines',
        status: 'completed' as const,
        progress: 100,
        score: 88,
    },
    {
        id: 'm2',
        title: 'Solidity & Smart Contracts',
        description: 'Apprendre le langage Solidity, créer et déployer des smart contracts sur Ethereum et les chaînes EVM-compatibles.',
        competencies: ['Développer en Solidity', 'Gérer le cycle de vie des contrats', 'Optimiser la consommation de gas'],
        duration: '8 semaines',
        status: 'completed' as const,
        progress: 100,
        score: 82,
    },
    {
        id: 'm3',
        title: 'Architecture DApp',
        description: 'Concevoir et développer des applications décentralisées full-stack avec React, ethers.js et IPFS.',
        competencies: ['Intégrer Web3 au frontend', 'Gérer les wallets utilisateurs', 'Utiliser IPFS pour le stockage'],
        duration: '8 semaines',
        status: 'completed' as const,
        progress: 100,
        score: 79,
    },
    {
        id: 'm4',
        title: 'Sécurité & Audit',
        description: 'Maîtriser les pratiques d\'audit de sécurité, identifier les vulnérabilités courantes et appliquer les bonnes pratiques de développement sécurisé.',
        competencies: ['Identifier les vulnérabilités', 'Réaliser un audit de sécurité', 'Appliquer les design patterns sécurisés'],
        duration: '6 semaines',
        status: 'in-progress' as const,
        progress: 45,
        score: undefined,
    },
    {
        id: 'm5',
        title: 'Protocoles DeFi',
        description: 'Explorer les protocoles de finance décentralisée : AMM, lending, staking, et yield farming.',
        competencies: ['Comprendre les AMM', 'Développer des protocoles de lending', 'Implémenter des mécanismes de staking'],
        duration: '8 semaines',
        status: 'locked' as const,
        progress: 0,
        score: undefined,
    },
    {
        id: 'm6',
        title: 'NFTs & Tokenisation',
        description: 'Créer des standards de tokens (ERC-721, ERC-1155), développer des marketplaces NFT et explorer les cas d\'usage de tokenisation.',
        competencies: ['Implémenter ERC-721/1155', 'Gérer les métadonnées on-chain', 'Construire un marketplace'],
        duration: '6 semaines',
        status: 'locked' as const,
        progress: 0,
        score: undefined,
    },
    {
        id: 'm7',
        title: 'Infrastructure & DevOps Web3',
        description: 'Déployer et gérer des nœuds, utiliser les services d\'infrastructure et mettre en place des pipelines CI/CD pour les projets blockchain.',
        competencies: ['Configurer des nœuds RPC', 'Utiliser Hardhat/Foundry', 'Automatiser les déploiements'],
        duration: '6 semaines',
        status: 'locked' as const,
        progress: 0,
        score: undefined,
    },
    {
        id: 'm8',
        title: 'Projet Final & Certification',
        description: 'Projet capstone intégrant toutes les compétences acquises. Développement complet d\'un protocole DeFi original.',
        competencies: ['Synthétiser les compétences blockchain', 'Gérer un projet de bout en bout', 'Présenter devant un jury'],
        duration: '8 semaines',
        status: 'locked' as const,
        progress: 0,
        score: undefined,
    },
];

// =====================================================
// COMPONENT
// =====================================================

interface CertificationProgramViewProps {
    onNavigateToModule?: (moduleId: string) => void;
    onNavigateToCompetencies?: () => void;
}

const CertificationProgramView: React.FC<CertificationProgramViewProps> = ({ onNavigateToModule, onNavigateToCompetencies }) => {
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const overallProgress = Math.round(MOCK_MODULES.reduce((acc, m) => acc + m.progress, 0) / MOCK_MODULES.length);

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="hover:text-blue-500 cursor-pointer transition-colors">Tableau de bord</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: 'var(--text-primary)' }}>Programme de Certification</span>
            </div>

            {/* Program Header */}
            <section className="border rounded-[32px] p-10 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/10 rounded-xl">
                                <GraduationCap className="w-5 h-5 text-indigo-500" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{MOCK_PROGRAM.school}</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                            {MOCK_PROGRAM.title}
                        </h1>
                        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                            {MOCK_PROGRAM.description}
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{MOCK_PROGRAM.duration} • {MOCK_PROGRAM.totalHours}h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{MOCK_PROGRAM.competenciesCount} compétences</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-violet-500" />
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{MOCK_PROGRAM.startDate} → {MOCK_PROGRAM.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{MOCK_PROGRAM.professors.length} professeurs</span>
                            </div>
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" fill="none" stroke="var(--border-color)" strokeWidth="10" />
                                <circle
                                    cx="80" cy="80" r="70" fill="none" stroke="#6366f1" strokeWidth="10"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 * (1 - overallProgress / 100)}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{overallProgress}%</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Progression</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Competency Framework Quick Link */}
            <button
                onClick={onNavigateToCompetencies}
                className="w-full border rounded-2xl p-6 flex items-center justify-between group hover:border-indigo-500/30 transition-all"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <Layers className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Référentiel de Compétences</h4>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>8 validées • 5 en cours • 11 à découvrir</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Module Timeline */}
            <section>
                <h2 className="text-xl font-bold tracking-tight mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <BookOpen className="w-5 h-5 text-blue-500" /> Modules du Programme
                </h2>

                <div className="space-y-4">
                    {MOCK_MODULES.map((mod, idx) => {
                        const isExpanded = expandedModule === mod.id;
                        const statusConfig = {
                            completed: { label: 'Terminé', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle2 },
                            'in-progress': { label: 'En cours', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Play },
                            locked: { label: 'Verrouillé', color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: Lock },
                            'not-started': { label: 'Pas commencé', color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: BookOpen },
                            failed: { label: 'Échoué', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: BookOpen },
                        };
                        const config = statusConfig[mod.status];
                        const StatusIcon = config.icon;

                        return (
                            <div
                                key={mod.id}
                                className={`border rounded-[24px] overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-blue-500/20' : ''}`}
                                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                            >
                                <button
                                    onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                                    className="w-full text-left p-6 flex items-center gap-6 group"
                                >
                                    {/* Timeline indicator */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                                            <StatusIcon className={`w-5 h-5 ${config.color}`} />
                                        </div>
                                        {idx < MOCK_MODULES.length - 1 && (
                                            <div className="w-0.5 h-6 mt-2" style={{ backgroundColor: 'var(--border-color)' }}></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Module {idx + 1}</span>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${config.bg} ${config.color}`}>{config.label}</span>
                                            {mod.score !== undefined && (
                                                <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-lg">{mod.score}%</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-base tracking-tight truncate" style={{ color: mod.status === 'locked' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                                            {mod.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{mod.duration}</span>
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>• {mod.competencies.length} compétences</span>
                                        </div>

                                        {/* Progress Bar */}
                                        {mod.status !== 'locked' && (
                                            <div className="mt-3 w-full max-w-md">
                                                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${mod.progress}%`, backgroundColor: mod.status === 'completed' ? '#22c55e' : '#3b82f6' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <ChevronRight className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{mod.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {mod.competencies.map((comp, cIdx) => (
                                                <div key={cIdx} className="flex items-center gap-2 p-3 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                                    <Target className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                                    <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{comp}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {mod.status !== 'locked' && (
                                            <button
                                                onClick={() => onNavigateToModule?.(mod.id)}
                                                className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors"
                                            >
                                                {mod.status === 'completed' ? 'Revoir le Module' : 'Continuer'} <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default CertificationProgramView;
