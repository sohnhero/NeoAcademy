
import React from 'react';
import {
    GraduationCap, Calendar, CheckCircle2, Clock, AlertCircle,
    TrendingUp, Award, BookOpen, ChevronRight, Users, Star,
    Target, Play, MessageSquare, Zap, ArrowRight, FileText
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_STUDENT = {
    name: 'Marie Dupont',
    school: 'École Supérieure du Digital',
    program: 'Développeur Web3 & Blockchain',
    cohort: 'Promotion 2026 — Cohorte Alpha',
    avatar: 'https://picsum.photos/seed/marie/200',
    enrolledAt: '2025-09-01',
};

const MOCK_PROGRESS = {
    programCompletion: 42,
    competenciesValidated: 8,
    competenciesInProgress: 5,
    competenciesTotal: 24,
    upcomingEvaluations: 3,
    modulesCompleted: 3,
    modulesTotal: 8,
    averageScore: 78,
};

const MOCK_ACTIVITY = [
    { id: '1', type: 'evaluation', title: 'Évaluation "Smart Contracts Fondamentaux" — 82%', time: 'Il y a 2 heures', icon: 'check' },
    { id: '2', type: 'feedback', title: 'Prof. Laurent : "Excellente progression sur Solidity"', time: 'Il y a 5 heures', icon: 'message' },
    { id: '3', type: 'module', title: 'Module "Architecture DApp" débloqué', time: 'Hier', icon: 'unlock' },
    { id: '4', type: 'evaluation', title: 'Évaluation "Cryptographie" — 91%', time: 'Il y a 2 jours', icon: 'check' },
    { id: '5', type: 'feedback', title: 'Prof. Moreau : "Revoir les gas optimizations"', time: 'Il y a 3 jours', icon: 'message' },
    { id: '6', type: 'module', title: 'Module "Tests & Audit Sécurité" débloqué', time: 'Il y a 4 jours', icon: 'unlock' },
];

const MOCK_UPCOMING = [
    { id: '1', type: 'live', title: 'Session Live — Architecture DeFi', date: '12 Mars 2026 • 14:00', professor: 'Prof. Laurent', color: 'blue' },
    { id: '2', type: 'deadline', title: 'Projet "DEX Protocol"', date: '18 Mars 2026', professor: 'Équipe Projet', color: 'orange' },
    { id: '3', type: 'evaluation', title: 'Évaluation Module 4 — Sécurité', date: '22 Mars 2026', professor: 'Prof. Moreau', color: 'purple' },
];

// =====================================================
// COMPONENT
// =====================================================

interface InstitutionalDashboardProps {
    onNavigate?: (tab: string) => void;
}

const InstitutionalDashboard: React.FC<InstitutionalDashboardProps> = ({ onNavigate }) => {
    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">

            {/* Welcome Hero */}
            <section className="relative overflow-hidden rounded-[40px] p-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 group shadow-2xl shadow-indigo-500/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/20 blur-[80px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Parcours Institutionnel</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter leading-tight text-white">
                            Bonjour, {MOCK_STUDENT.name} 👋
                        </h1>
                        <p className="text-white/70 text-sm font-medium max-w-lg">
                            {MOCK_STUDENT.program} — {MOCK_STUDENT.cohort}
                        </p>
                        <p className="text-white/50 text-xs font-medium">
                            {MOCK_STUDENT.school}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => onNavigate?.('inst-program')}
                                className="bg-white text-indigo-600 hover:bg-slate-100 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center shadow-xl active:scale-95"
                            >
                                <span>Mon Programme</span>
                                <ChevronRight className="ml-2 w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onNavigate?.('inst-competencies')}
                                className="bg-white/15 text-white hover:bg-white/25 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
                            >
                                Compétences
                            </button>
                        </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-52 h-52">
                            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                <circle cx="104" cy="104" r="92" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
                                <circle
                                    cx="104" cy="104" r="92" fill="none" stroke="white" strokeWidth="12"
                                    strokeDasharray={578}
                                    strokeDashoffset={578 * (1 - MOCK_PROGRESS.programCompletion / 100)}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-white">{MOCK_PROGRESS.programCompletion}%</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Programme</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Widgets */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Modules Complétés', value: `${MOCK_PROGRESS.modulesCompleted}/${MOCK_PROGRESS.modulesTotal}`, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Compétences Validées', value: `${MOCK_PROGRESS.competenciesValidated}/${MOCK_PROGRESS.competenciesTotal}`, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'En Progression', value: MOCK_PROGRESS.competenciesInProgress, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'Évaluations à Venir', value: MOCK_PROGRESS.upcomingEvaluations, icon: AlertCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                ].map((widget, idx) => (
                    <div key={idx} className="border p-6 rounded-3xl transition-all hover:border-blue-500/30 group cursor-pointer" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-xl ${widget.bg}`}>
                                <widget.icon className={`w-4 h-4 ${widget.color}`} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{widget.label}</span>
                        </div>
                        <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{widget.value}</p>
                    </div>
                ))}
            </div>

            {/* Activity + Upcoming Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Activity Feed */}
                <section className="lg:col-span-3 border p-8 rounded-[32px] transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <Zap className="w-5 h-5 text-blue-500" /> Activité Récente
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 cursor-pointer hover:text-blue-400">Tout voir</span>
                    </div>
                    <div className="space-y-3">
                        {MOCK_ACTIVITY.map(activity => (
                            <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-500/5 transition-all group cursor-pointer">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activity.type === 'evaluation' ? 'bg-green-500/10' :
                                        activity.type === 'feedback' ? 'bg-violet-500/10' : 'bg-blue-500/10'
                                    }`}>
                                    {activity.type === 'evaluation' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                    {activity.type === 'feedback' && <MessageSquare className="w-4 h-4 text-violet-500" />}
                                    {activity.type === 'module' && <BookOpen className="w-4 h-4 text-blue-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold leading-tight truncate" style={{ color: 'var(--text-primary)' }}>{activity.title}</p>
                                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{activity.time}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Upcoming */}
                <section className="lg:col-span-2 border p-8 rounded-[32px] transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                        <Calendar className="w-5 h-5 text-violet-500" /> À Venir
                    </h3>
                    <div className="space-y-4">
                        {MOCK_UPCOMING.map(event => (
                            <div key={event.id} className="relative p-5 rounded-2xl border transition-all hover:border-blue-500/30 group cursor-pointer" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${event.color === 'blue' ? 'bg-blue-500' :
                                        event.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'
                                    }`}></div>
                                <div className="pl-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        {event.type === 'live' && <Play className="w-3.5 h-3.5 text-blue-500" />}
                                        {event.type === 'deadline' && <FileText className="w-3.5 h-3.5 text-orange-500" />}
                                        {event.type === 'evaluation' && <Target className="w-3.5 h-3.5 text-purple-500" />}
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${event.color === 'blue' ? 'text-blue-500' :
                                                event.color === 'orange' ? 'text-orange-500' : 'text-purple-500'
                                            }`}>
                                            {event.type === 'live' ? 'Session Live' : event.type === 'deadline' ? 'Date Limite' : 'Évaluation'}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{event.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{event.date}</p>
                                        <p className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>{event.professor}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Référentiel de Compétences', desc: 'Suivez votre progression sur chaque compétence du programme', icon: Target, color: 'from-violet-600 to-purple-600', tab: 'inst-competencies' },
                    { title: 'Mes Analytiques', desc: 'Visualisez votre vélocité d\'apprentissage et vos scores', icon: TrendingUp, color: 'from-blue-600 to-cyan-600', tab: 'inst-analytics' },
                    { title: 'Mon Portfolio', desc: 'Votre profil professionnel avec projets validés', icon: Award, color: 'from-amber-600 to-orange-600', tab: 'inst-portfolio' },
                ].map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => onNavigate?.(card.tab)}
                        className="text-left border p-8 rounded-[32px] transition-all hover:border-blue-500/30 hover:translate-y-[-4px] group relative overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 shadow-lg`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{card.title}</h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
                            <div className="flex items-center gap-1 mt-4 text-blue-500 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Explorer <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InstitutionalDashboard;
