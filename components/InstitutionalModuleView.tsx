
import React, { useState } from 'react';
import {
    BookOpen, Play, FileText, Code, Target, CheckCircle2,
    ChevronRight, Clock, Download, Video, Award, ArrowRight,
    PenTool, Zap, Lock
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_MODULE = {
    id: 'm4',
    title: 'Sécurité & Audit des Smart Contracts',
    description: 'Ce module couvre les pratiques essentielles d\'audit de sécurité des smart contracts. Vous apprendrez à identifier les vulnérabilités courantes, à utiliser des outils d\'analyse statique et dynamique, et à appliquer les design patterns de sécurité reconnus dans l\'industrie.',
    duration: '6 semaines',
    totalHours: 48,
    progress: 45,
    professor: 'Prof. Sophie Moreau',
    competencies: [
        'Identifier les vulnérabilités (Reentrancy, Overflow, Front-Running)',
        'Réaliser un audit de sécurité complet',
        'Appliquer les design patterns sécurisés',
    ],
};

type TabKey = 'material' | 'exercises' | 'projects' | 'evaluation';

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'material', label: 'Matériel Pédagogique', icon: BookOpen },
    { key: 'exercises', label: 'Exercices', icon: Code },
    { key: 'projects', label: 'Projets', icon: PenTool },
    { key: 'evaluation', label: 'Évaluation', icon: Award },
];

const MOCK_MATERIAL = [
    { id: 'l1', type: 'video', title: 'Introduction à l\'Audit de Sécurité', duration: '32 min', status: 'completed', description: 'Découvrez les fondamentaux de l\'audit de sécurité des smart contracts et les méthodologies utilisées par les professionnels.' },
    { id: 'l2', type: 'reading', title: 'Les Vulnérabilités Courantes (OWASP Smart Contract Top 10)', duration: '45 min lecture', status: 'completed', description: 'Étude approfondie des 10 vulnérabilités les plus courantes dans les smart contracts, avec des exemples concrets.' },
    { id: 'l3', type: 'video', title: 'Reentrancy Attacks — Analyse du Hack DAO', duration: '28 min', status: 'in-progress', description: 'Analyse détaillée de l\'attaque DAO de 2016, compréhension du mécanisme de reentrancy et des contre-mesures.' },
    { id: 'l4', type: 'reading', title: 'Design Patterns Sécurisés (Checks-Effects-Interactions)', duration: '35 min lecture', status: 'not-started', description: 'Les design patterns éprouvés pour prévenir les attaques les plus courantes dans la programmation Solidity.' },
    { id: 'l5', type: 'video', title: 'Outils d\'Analyse Statique — Slither & Mythril', duration: '45 min', status: 'not-started', description: 'Prise en main des outils d\'analyse statique les plus utilisés dans l\'industrie pour la détection automatique de vulnérabilités.' },
    { id: 'l6', type: 'coding', title: 'Lab : Détection de Vulnérabilités', duration: '2h pratique', status: 'not-started', description: 'Exercice pratique : analysez un smart contract vulnérable et identifiez toutes les failles de sécurité.' },
];

const MOCK_EXERCISES = [
    { id: 'e1', title: 'Quiz — Types de Vulnérabilités', type: 'quiz', difficulty: 'Facile', status: 'completed', score: 90, description: 'Testez vos connaissances sur les différents types de vulnérabilités dans les smart contracts.' },
    { id: 'e2', title: 'Coding Challenge — Patch Reentrancy', type: 'code', difficulty: 'Moyen', status: 'completed', score: 85, description: 'Corrigez un smart contract vulnérable à une attaque de reentrancy en appliquant le pattern CEI.' },
    { id: 'e3', title: 'Analyse — Identifier les Failles', type: 'analysis', difficulty: 'Difficile', status: 'in-progress', description: 'Analysez un contrat DeFi complexe et listez toutes les vulnérabilités potentielles avec leur sévérité.' },
    { id: 'e4', title: 'Coding Challenge — Access Control', type: 'code', difficulty: 'Moyen', status: 'not-started', description: 'Implémentez un système de contrôle d\'accès robuste pour un smart contract multi-rôles.' },
];

const MOCK_PROJECTS = [
    { id: 'p1', title: 'Audit Complet d\'un Protocole DeFi', type: 'team', deadline: '22 Mars 2026', status: 'in-progress', progress: 35, description: 'Réalisez un audit de sécurité complet d\'un protocole DeFi fourni. Produisez un rapport d\'audit professionnel avec classification des risques.', team: ['Marie D.', 'Karim B.', 'Sarah L.'] },
    { id: 'p2', title: 'Développement d\'un Security Scanner', type: 'individual', deadline: '5 Avril 2026', status: 'not-started', progress: 0, description: 'Créez un outil d\'analyse de smart contracts capable de détecter au moins 5 types de vulnérabilités différentes.' },
];

// =====================================================
// COMPONENT
// =====================================================

interface InstitutionalModuleViewProps {
    onBack?: () => void;
    onStartEvaluation?: () => void;
}

const InstitutionalModuleView: React.FC<InstitutionalModuleViewProps> = ({ onBack, onStartEvaluation }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('material');

    const statusIcon = (s: string) => {
        if (s === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        if (s === 'in-progress') return <Play className="w-4 h-4 text-blue-500" />;
        return <Lock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />;
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={onBack}>Programme</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: 'var(--text-primary)' }}>{MOCK_MODULE.title}</span>
            </div>

            {/* Module Header */}
            <section className="border rounded-[32px] p-10 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3"></div>

                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-lg">Module 4</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{MOCK_MODULE.duration} • {MOCK_MODULE.totalHours}h</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>• {MOCK_MODULE.professor}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                        {MOCK_MODULE.title}
                    </h1>
                    <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
                        {MOCK_MODULE.description}
                    </p>

                    {/* Competencies */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {MOCK_MODULE.competencies.map((comp, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                <Target className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{comp}</span>
                            </div>
                        ))}
                    </div>

                    {/* Progress */}
                    <div className="pt-4 max-w-md">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Progression du module</span>
                            <span className="text-xs font-black text-blue-500">{MOCK_MODULE.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                            <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${MOCK_MODULE.progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <div className="border-b flex items-center gap-1" style={{ borderColor: 'var(--border-color)' }}>
                {TABS.map(tab => {
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.key ? 'border-blue-500 text-blue-500' : 'border-transparent'
                                }`}
                            style={activeTab !== tab.key ? { color: 'var(--text-muted)' } : {}}
                        >
                            <TabIcon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>
                {/* Material Tab */}
                {activeTab === 'material' && (
                    <div className="space-y-4">
                        {MOCK_MATERIAL.map((item, idx) => (
                            <div
                                key={item.id}
                                className="border rounded-2xl p-6 flex items-start gap-5 transition-all hover:border-blue-500/30 group cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'video' ? 'bg-violet-500/10' :
                                        item.type === 'reading' ? 'bg-blue-500/10' : 'bg-green-500/10'
                                    }`}>
                                    {item.type === 'video' && <Video className="w-5 h-5 text-violet-500" />}
                                    {item.type === 'reading' && <FileText className="w-5 h-5 text-blue-500" />}
                                    {item.type === 'coding' && <Code className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                                        {statusIcon(item.status)}
                                    </div>
                                    <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{item.duration}</span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                item.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            {item.status === 'completed' ? 'Terminé' : item.status === 'in-progress' ? 'En cours' : 'À faire'}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Exercises Tab */}
                {activeTab === 'exercises' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_EXERCISES.map(ex => (
                            <div
                                key={ex.id}
                                className="border rounded-2xl p-6 transition-all hover:border-blue-500/30 cursor-pointer group"
                                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg ${ex.type === 'quiz' ? 'bg-violet-500/10 text-violet-500' :
                                            ex.type === 'code' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {ex.type === 'quiz' ? 'Quiz' : ex.type === 'code' ? 'Coding' : 'Analyse'}
                                    </span>
                                    {statusIcon(ex.status)}
                                </div>
                                <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{ex.title}</h4>
                                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{ex.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${ex.difficulty === 'Facile' ? 'bg-green-500/10 text-green-500' :
                                            ex.difficulty === 'Moyen' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {ex.difficulty}
                                    </span>
                                    {ex.score !== undefined && (
                                        <span className="text-xs font-black text-green-500">{ex.score}%</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div className="space-y-4">
                        {MOCK_PROJECTS.map(project => (
                            <div
                                key={project.id}
                                className="border rounded-2xl p-8 transition-all hover:border-blue-500/30 cursor-pointer"
                                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg ${project.type === 'team' ? 'bg-violet-500/10 text-violet-500' : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {project.type === 'team' ? 'Projet d\'Équipe' : 'Projet Individuel'}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg ${project.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            {project.status === 'in-progress' ? 'En cours' : 'Pas commencé'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                        <Clock className="w-3.5 h-3.5" />
                                        {project.deadline}
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{project.title}</h4>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                                {project.team && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Équipe :</span>
                                        {project.team.map((member, i) => (
                                            <span key={i} className="text-xs font-medium px-2 py-1 rounded-lg border" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                                {member}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.progress > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>Avancement</span>
                                            <span className="text-[10px] font-black text-blue-500">{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Evaluation Tab */}
                {activeTab === 'evaluation' && (
                    <div className="border rounded-2xl p-8 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                            <Award className="w-8 h-8 text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
                            Évaluation du Module 4
                        </h3>
                        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                            L'évaluation sera disponible une fois tous les exercices et projets du module complétés. Elle couvrira l'ensemble des compétences ciblées.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Durée : 2h</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                                <Target className="w-3.5 h-3.5 text-violet-500" />
                                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>3 compétences évaluées</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                                <Zap className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Difficulté : Avancée</span>
                            </div>
                        </div>
                        <button
                            onClick={onStartEvaluation}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
                            disabled
                        >
                            Passer l'Évaluation (indisponible)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstitutionalModuleView;
