
import React, { useState } from 'react';
import {
    Target, CheckCircle2, Clock, ChevronRight, ChevronDown,
    Layers, Star, TrendingUp, Zap, Shield, Code, Eye, Lightbulb,
    Rocket, Filter
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

type CompetencyLevel = 'understanding' | 'application' | 'optimization' | 'innovation';
type CompetencyStatus = 'validated' | 'in-progress' | 'not-started';

interface Competency {
    id: string;
    name: string;
    level: CompetencyLevel;
    status: CompetencyStatus;
    score?: number;
    lastAssessed?: string;
}

interface Skill {
    id: string;
    name: string;
    competencies: Competency[];
}

interface Domain {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    skills: Skill[];
}

const LEVEL_CONFIG: Record<CompetencyLevel, { label: string; icon: React.ElementType; color: string; bg: string; order: number }> = {
    understanding: { label: 'Compréhension', icon: Eye, color: 'text-sky-500', bg: 'bg-sky-500/10', order: 1 },
    application: { label: 'Application', icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10', order: 2 },
    optimization: { label: 'Optimisation', icon: Lightbulb, color: 'text-violet-500', bg: 'bg-violet-500/10', order: 3 },
    innovation: { label: 'Innovation', icon: Rocket, color: 'text-amber-500', bg: 'bg-amber-500/10', order: 4 },
};

const STATUS_CONFIG: Record<CompetencyStatus, { label: string; color: string; bg: string; dot: string }> = {
    validated: { label: 'Validé', color: 'text-green-500', bg: 'bg-green-500/10', dot: 'bg-green-500' },
    'in-progress': { label: 'En cours', color: 'text-blue-500', bg: 'bg-blue-500/10', dot: 'bg-blue-500' },
    'not-started': { label: 'Non commencé', color: 'text-slate-500', bg: 'bg-slate-500/10', dot: 'bg-slate-500' },
};

const MOCK_DOMAINS: Domain[] = [
    {
        id: 'd1',
        name: 'Fondamentaux Blockchain',
        icon: Layers,
        color: 'text-blue-500',
        skills: [
            {
                id: 's1', name: 'Cryptographie',
                competencies: [
                    { id: 'c1', name: 'Comprendre les fonctions de hash', level: 'understanding', status: 'validated', score: 92 },
                    { id: 'c2', name: 'Appliquer le chiffrement asymétrique', level: 'application', status: 'validated', score: 85 },
                    { id: 'c3', name: 'Optimiser les preuves cryptographiques', level: 'optimization', status: 'in-progress' },
                ],
            },
            {
                id: 's2', name: 'Consensus',
                competencies: [
                    { id: 'c4', name: 'Comprendre PoW, PoS, BFT', level: 'understanding', status: 'validated', score: 88 },
                    { id: 'c5', name: 'Analyser les trade-offs de consensus', level: 'application', status: 'validated', score: 80 },
                    { id: 'c6', name: 'Concevoir un mécanisme de consensus', level: 'innovation', status: 'not-started' },
                ],
            },
        ],
    },
    {
        id: 'd2',
        name: 'Smart Contracts',
        icon: Code,
        color: 'text-violet-500',
        skills: [
            {
                id: 's3', name: 'Solidity',
                competencies: [
                    { id: 'c7', name: 'Comprendre la syntaxe Solidity', level: 'understanding', status: 'validated', score: 90 },
                    { id: 'c8', name: 'Développer des contrats ERC-20/721', level: 'application', status: 'validated', score: 82 },
                    { id: 'c9', name: 'Optimiser la consommation de gas', level: 'optimization', status: 'in-progress' },
                    { id: 'c10', name: 'Inventer des design patterns', level: 'innovation', status: 'not-started' },
                ],
            },
            {
                id: 's4', name: 'Testing & Debugging',
                competencies: [
                    { id: 'c11', name: 'Comprendre les frameworks de test', level: 'understanding', status: 'validated', score: 87 },
                    { id: 'c12', name: 'Écrire des tests unitaires complets', level: 'application', status: 'in-progress' },
                    { id: 'c13', name: 'Mettre en place du fuzzing avancé', level: 'optimization', status: 'not-started' },
                ],
            },
        ],
    },
    {
        id: 'd3',
        name: 'Sécurité',
        icon: Shield,
        color: 'text-red-500',
        skills: [
            {
                id: 's5', name: 'Vulnérabilités',
                competencies: [
                    { id: 'c14', name: 'Identifier les attaques courantes', level: 'understanding', status: 'in-progress' },
                    { id: 'c15', name: 'Conduire un audit basique', level: 'application', status: 'not-started' },
                    { id: 'c16', name: 'Optimiser la résistance aux attaques', level: 'optimization', status: 'not-started' },
                ],
            },
            {
                id: 's6', name: 'Bonnes Pratiques',
                competencies: [
                    { id: 'c17', name: 'Appliquer les patterns de sécurité', level: 'application', status: 'not-started' },
                    { id: 'c18', name: 'Réaliser une revue de code sécurisée', level: 'optimization', status: 'not-started' },
                ],
            },
        ],
    },
    {
        id: 'd4',
        name: 'DeFi & Protocoles',
        icon: Zap,
        color: 'text-amber-500',
        skills: [
            {
                id: 's7', name: 'AMM & Liquidity',
                competencies: [
                    { id: 'c19', name: 'Comprendre les Automated Market Makers', level: 'understanding', status: 'not-started' },
                    { id: 'c20', name: 'Implémenter un pool de liquidité', level: 'application', status: 'not-started' },
                    { id: 'c21', name: 'Concevoir un protocole DeFi innovant', level: 'innovation', status: 'not-started' },
                ],
            },
            {
                id: 's8', name: 'Lending & Staking',
                competencies: [
                    { id: 'c22', name: 'Comprendre les mécanismes de lending', level: 'understanding', status: 'not-started' },
                    { id: 'c23', name: 'Développer un contrat de staking', level: 'application', status: 'not-started' },
                    { id: 'c24', name: 'Innover sur les reward mechanisms', level: 'innovation', status: 'not-started' },
                ],
            },
        ],
    },
];

// =====================================================
// COMPONENT
// =====================================================

const CompetencyFrameworkView: React.FC = () => {
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<CompetencyStatus | 'all'>('all');

    const allCompetencies = MOCK_DOMAINS.flatMap(d => d.skills.flatMap(s => s.competencies));
    const validated = allCompetencies.filter(c => c.status === 'validated').length;
    const inProgress = allCompetencies.filter(c => c.status === 'in-progress').length;
    const notStarted = allCompetencies.filter(c => c.status === 'not-started').length;

    const filteredDomains = selectedDomain ? MOCK_DOMAINS.filter(d => d.id === selectedDomain) : MOCK_DOMAINS;

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="hover:text-blue-500 cursor-pointer transition-colors">Tableau de bord</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: 'var(--text-primary)' }}>Référentiel de Compétences</span>
            </div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tighter mb-2" style={{ color: 'var(--text-primary)' }}>
                        Référentiel de Compétences
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Suivez votre progression sur les {allCompetencies.length} compétences du programme
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    {(['all', 'validated', 'in-progress', 'not-started'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-blue-600 text-white' : ''
                                }`}
                            style={statusFilter !== f ? { color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)' } : {}}
                        >
                            {f === 'all' ? 'Tout' : STATUS_CONFIG[f].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="border p-6 rounded-3xl flex items-center gap-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="p-3 bg-green-500/10 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{validated}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Validées</p>
                    </div>
                </div>
                <div className="border p-6 rounded-3xl flex items-center gap-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{inProgress}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>En Cours</p>
                    </div>
                </div>
                <div className="border p-6 rounded-3xl flex items-center gap-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="p-3 bg-slate-500/10 rounded-xl">
                        <Clock className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{notStarted}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>À Découvrir</p>
                    </div>
                </div>
            </div>

            {/* Domain Filter Chips */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setSelectedDomain(null)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${selectedDomain === null ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : ''
                        }`}
                    style={selectedDomain !== null ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
                >
                    <Layers className="w-3.5 h-3.5" />
                    Tous les domaines
                </button>
                {MOCK_DOMAINS.map(domain => {
                    const DomainIcon = domain.icon;
                    return (
                        <button
                            key={domain.id}
                            onClick={() => setSelectedDomain(domain.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${selectedDomain === domain.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : ''
                                }`}
                            style={selectedDomain !== domain.id ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : {}}
                        >
                            <DomainIcon className="w-3.5 h-3.5" />
                            {domain.name}
                        </button>
                    );
                })}
            </div>

            {/* Competency Matrix */}
            {filteredDomains.map(domain => {
                const DomainIcon = domain.icon;
                const domainCompetencies = domain.skills.flatMap(s => s.competencies);
                const domainValidated = domainCompetencies.filter(c => c.status === 'validated').length;
                const domainProgress = Math.round((domainValidated / domainCompetencies.length) * 100);

                return (
                    <section key={domain.id} className="border rounded-[32px] overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        {/* Domain Header */}
                        <div className="p-8 pb-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${domain.color === 'text-blue-500' ? 'bg-blue-500/10' : domain.color === 'text-violet-500' ? 'bg-violet-500/10' : domain.color === 'text-red-500' ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                                        <DomainIcon className={`w-5 h-5 ${domain.color}`} />
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{domain.name}</h2>
                                </div>
                                <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{domainValidated}/{domainCompetencies.length} validées</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full overflow-hidden mt-4" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${domainProgress}%` }}></div>
                            </div>
                        </div>

                        {/* Skills & Competencies */}
                        <div className="px-8 pb-8 space-y-6">
                            {domain.skills.map(skill => (
                                <div key={skill.id}>
                                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                        <Star className="w-3.5 h-3.5 text-indigo-400" />
                                        {skill.name}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {skill.competencies
                                            .filter(c => statusFilter === 'all' || c.status === statusFilter)
                                            .map(comp => {
                                                const levelCfg = LEVEL_CONFIG[comp.level];
                                                const statusCfg = STATUS_CONFIG[comp.status];
                                                const LevelIcon = levelCfg.icon;

                                                return (
                                                    <div
                                                        key={comp.id}
                                                        className="border rounded-2xl p-4 transition-all hover:border-blue-500/30 hover:translate-y-[-2px] cursor-pointer group relative overflow-hidden"
                                                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                                                    >
                                                        {/* Status dot */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg ${levelCfg.bg}`}>
                                                                <LevelIcon className={`w-3 h-3 ${levelCfg.color}`} />
                                                                <span className={`text-[9px] font-bold uppercase tracking-wider ${levelCfg.color}`}>{levelCfg.label}</span>
                                                            </div>
                                                            <div className={`w-2 h-2 rounded-full ${statusCfg.dot}`}></div>
                                                        </div>

                                                        <h5 className="font-semibold text-xs leading-snug mb-3" style={{ color: 'var(--text-primary)' }}>
                                                            {comp.name}
                                                        </h5>

                                                        <div className="flex items-center justify-between">
                                                            <span className={`text-[10px] font-bold ${statusCfg.color}`}>{statusCfg.label}</span>
                                                            {comp.score !== undefined && (
                                                                <span className="text-[10px] font-black text-green-500">{comp.score}%</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* Legend */}
            <div className="border rounded-2xl p-6 flex flex-wrap items-center gap-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Niveaux :</span>
                {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => {
                    const Icon = cfg.icon;
                    return (
                        <div key={key} className="flex items-center gap-1.5">
                            <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{cfg.label}</span>
                        </div>
                    );
                })}
                <div className="w-px h-4" style={{ backgroundColor: 'var(--border-color)' }}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Statuts :</span>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <div key={key} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${cfg.dot}`}></div>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{cfg.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetencyFrameworkView;
