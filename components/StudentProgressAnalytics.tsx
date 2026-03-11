
import React from 'react';
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, LineChart, Line
} from 'recharts';
import {
    TrendingUp, Award, Target, Zap, ChevronRight, BookOpen,
    ArrowUp, ArrowDown, Minus, Brain, Clock, Flame, CheckCircle2
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_VELOCITY_DATA = [
    { week: 'S1', hours: 8, coursesCompleted: 2 },
    { week: 'S2', hours: 12, coursesCompleted: 3 },
    { week: 'S3', hours: 10, coursesCompleted: 2 },
    { week: 'S4', hours: 15, coursesCompleted: 4 },
    { week: 'S5', hours: 11, coursesCompleted: 3 },
    { week: 'S6', hours: 14, coursesCompleted: 3 },
    { week: 'S7', hours: 9, coursesCompleted: 2 },
    { week: 'S8', hours: 16, coursesCompleted: 4 },
    { week: 'S9', hours: 13, coursesCompleted: 3 },
    { week: 'S10', hours: 18, coursesCompleted: 5 },
];

const MOCK_COMPETENCY_PROGRESSION = [
    { month: 'Sept', validated: 0, inProgress: 2, total: 24 },
    { month: 'Oct', validated: 2, inProgress: 3, total: 24 },
    { month: 'Nov', validated: 4, inProgress: 4, total: 24 },
    { month: 'Déc', validated: 5, inProgress: 5, total: 24 },
    { month: 'Jan', validated: 6, inProgress: 5, total: 24 },
    { month: 'Fév', validated: 8, inProgress: 5, total: 24 },
    { month: 'Mars', validated: 8, inProgress: 5, total: 24 },
];

const MOCK_EVALUATION_SCORES = [
    { name: 'Fondamentaux', score: 88, avg: 72 },
    { name: 'Solidity', score: 82, avg: 70 },
    { name: 'DApp', score: 79, avg: 68 },
    { name: 'Sécurité', score: 0, avg: 0 },
    { name: 'DeFi', score: 0, avg: 0 },
    { name: 'NFT', score: 0, avg: 0 },
];

const MOCK_RADAR_DATA = [
    { skill: 'Cryptographie', value: 85, fullMark: 100 },
    { skill: 'Consensus', value: 80, fullMark: 100 },
    { skill: 'Solidity', value: 82, fullMark: 100 },
    { skill: 'Testing', value: 65, fullMark: 100 },
    { skill: 'Sécurité', value: 45, fullMark: 100 },
    { skill: 'DeFi', value: 20, fullMark: 100 },
    { skill: 'NFT', value: 15, fullMark: 100 },
    { skill: 'DevOps', value: 30, fullMark: 100 },
];

const MOCK_STRENGTHS = [
    { name: 'Cryptographie', score: 92, trend: 'up' },
    { name: 'Fondamentaux Blockchain', score: 88, trend: 'up' },
    { name: 'Développement Solidity', score: 85, trend: 'stable' },
    { name: 'Tests Unitaires', score: 82, trend: 'up' },
];

const MOCK_WEAKNESSES = [
    { name: 'Gas Optimization', score: 45, trend: 'up' },
    { name: 'Sécurité Avancée', score: 38, trend: 'stable' },
    { name: 'Protocoles DeFi', score: 20, trend: 'down' },
    { name: 'Infrastructure Web3', score: 15, trend: 'stable' },
];

// =====================================================
// COMPONENT
// =====================================================

const StudentProgressAnalytics: React.FC = () => {
    const trendIcon = (trend: string) => {
        if (trend === 'up') return <ArrowUp className="w-3 h-3 text-green-500" />;
        if (trend === 'down') return <ArrowDown className="w-3 h-3 text-red-500" />;
        return <Minus className="w-3 h-3 text-slate-500" />;
    };

    return (
        <div className="space-y-10 max-w-7xl mx-auto pb-20">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                <span className="hover:text-blue-500 cursor-pointer transition-colors">Tableau de bord</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: 'var(--text-primary)' }}>Analytiques de Progression</span>
            </div>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tighter mb-2" style={{ color: 'var(--text-primary)' }}>
                    Analytiques de Progression
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Visualisez votre vélocité d'apprentissage, vos scores et l'évolution de vos compétences
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Vélocité Moyenne', value: '12.6h/sem', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', trend: '+18%' },
                    { label: 'Score Moyen', value: '83%', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10', trend: '+5%' },
                    { label: 'Compétences Validées', value: '8/24', icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+2' },
                    { label: 'Rang Cohorte', value: '4/28', icon: Award, color: 'text-violet-500', bg: 'bg-violet-500/10', trend: '↑2' },
                ].map((kpi, idx) => (
                    <div key={idx} className="border p-6 rounded-3xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-xl ${kpi.bg}`}>
                                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                            </div>
                            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-lg">{kpi.trend}</span>
                        </div>
                        <p className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{kpi.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row 1: Velocity + Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Velocity */}
                <section className="lg:col-span-2 border p-8 rounded-[32px]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Vélocité d'Apprentissage
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Heures</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500"></span> Cours</span>
                        </div>
                    </div>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_VELOCITY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderRadius: '12px', fontSize: '12px' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" name="Heures" />
                                <Line type="monotone" dataKey="coursesCompleted" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} name="Cours" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Skill Radar */}
                <section className="border p-8 rounded-[32px] relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full"></div>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-4 relative z-10" style={{ color: 'var(--text-primary)' }}>
                        <Brain className="w-5 h-5 text-violet-500" /> Cartographie
                    </h3>
                    <div className="h-[260px] -mx-4 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_RADAR_DATA}>
                                <PolarGrid stroke="var(--border-color)" />
                                <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-muted)', fontSize: 9, fontWeight: 'bold' }} />
                                <Radar name="Niveau" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            {/* Charts Row 2: Competency Progression + Evaluation Scores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Competency Progression */}
                <section className="border p-8 rounded-[32px]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                        <Target className="w-5 h-5 text-green-500" /> Progression des Compétences
                    </h3>
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_COMPETENCY_PROGRESSION} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValidated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderRadius: '12px', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="validated" stackId="1" stroke="#22c55e" fill="url(#colorValidated)" fillOpacity={1} strokeWidth={2} name="Validées" />
                                <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#3b82f6" fill="url(#colorInProgress)" fillOpacity={1} strokeWidth={2} name="En cours" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Evaluation Scores */}
                <section className="border p-8 rounded-[32px]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                        <Award className="w-5 h-5 text-amber-500" /> Scores d'Évaluation
                    </h3>
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_EVALUATION_SCORES} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', borderRadius: '12px', fontSize: '12px' }} />
                                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} name="Mon Score" />
                                <Bar dataKey="avg" fill="var(--border-color)" radius={[6, 6, 0, 0]} name="Moyenne Cohorte" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Strengths */}
                <section className="border p-8 rounded-[32px]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                        <Zap className="w-5 h-5 text-green-500" /> Points Forts
                    </h3>
                    <div className="space-y-4">
                        {MOCK_STRENGTHS.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            {trendIcon(item.trend)}
                                            <span className="text-xs font-black text-green-500">{item.score}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                        <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: `${item.score}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Weaknesses */}
                <section className="border p-8 rounded-[32px]" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h3 className="text-lg font-bold tracking-tight flex items-center gap-3 mb-6" style={{ color: 'var(--text-primary)' }}>
                        <Target className="w-5 h-5 text-orange-500" /> Axes d'Amélioration
                    </h3>
                    <div className="space-y-4">
                        {MOCK_WEAKNESSES.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            {trendIcon(item.trend)}
                                            <span className="text-xs font-black text-orange-500">{item.score}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                        <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: `${item.score}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentProgressAnalytics;
