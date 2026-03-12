
import React, { useState } from 'react';
import {
    GraduationCap, ChevronRight, ChevronLeft, Users, BookOpen,
    Target, Calendar, Shield, CheckCircle2, ArrowRight, Sparkles,
    Clock, Award, Star, Building2, MessageSquare
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_ONBOARDING = {
    school: {
        name: 'École Supérieure du Digital',
        logo: 'https://picsum.photos/seed/esd/200',
        city: 'Paris',
    },
    program: {
        name: 'Développeur Web3 & Blockchain',
        description: 'Ce programme de certification forme les apprenants aux technologies blockchain de nouvelle génération. Vous maîtriserez le développement de smart contracts, la conception d\'applications décentralisées, les protocoles DeFi et les pratiques d\'audit.',
        duration: '12 mois',
        totalHours: 480,
        modules: 8,
        competencies: 24,
        outcomes: [
            'Développer des smart contracts en Solidity',
            'Concevoir et déployer des DApps full-stack',
            'Auditer la sécurité des smart contracts',
            'Implémenter des protocoles DeFi',
            'Créer et gérer des tokens (ERC-20, ERC-721, ERC-1155)',
        ],
    },
    cohort: {
        name: 'Promotion 2026 — Cohorte Alpha',
        startDate: '1 Septembre 2025',
        endDate: '31 Août 2026',
        studentsCount: 28,
        professors: [
            { name: 'Prof. Laurent Dubois', specialty: 'Blockchain & Solidity', avatar: 'https://picsum.photos/seed/prof1/100' },
            { name: 'Prof. Sophie Moreau', specialty: 'Sécurité & Audit', avatar: 'https://picsum.photos/seed/prof2/100' },
            { name: 'Prof. Thomas Leroy', specialty: 'DeFi & Protocoles', avatar: 'https://picsum.photos/seed/prof3/100' },
        ],
        classmates: ['Karim B.', 'Sarah L.', 'Hugo M.', 'Léa P.', 'Nathan D.', 'Amira R.'],
    },
    rules: [
        { icon: Target, title: 'Progression Séquentielle', desc: 'Chaque module doit être validé avant de passer au suivant. Pas de sauts possibles.' },
        { icon: Award, title: 'Évaluations Obligatoires', desc: 'Chaque module se conclut par une évaluation notée. Score minimum : 70% pour valider.' },
        { icon: Calendar, title: 'Respect des Délais', desc: 'Les projets et évaluations ont des dates limites. Le respect du calendrier est obligatoire.' },
        { icon: Users, title: 'Travail Collaboratif', desc: 'Certains projets sont en équipe. La participation active est évaluée par les professeurs.' },
        { icon: Shield, title: 'Intégrité Académique', desc: 'Le plagiat et la triche sont strictement interdits. Tout manquement entraîne des sanctions.' },
        { icon: MessageSquare, title: 'Suivi Professeur', desc: 'Vos professeurs suivent votre progression et fournissent des feedbacks réguliers.' },
    ],
};

// =====================================================
// COMPONENT
// =====================================================

interface InstitutionalOnboardingProps {
    onComplete: () => void;
}

const InstitutionalOnboarding: React.FC<InstitutionalOnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const totalSteps = 5;

    const next = () => {
        if (step < totalSteps - 1) setStep(s => s + 1);
        else onComplete();
    };
    const prev = () => setStep(s => Math.max(0, s - 1));

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="w-full max-w-3xl">

                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                            <div
                                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                style={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="border rounded-[32px] p-10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>

                    <div className="relative z-10">

                        {/* STEP 0: Welcome */}
                        {step === 0 && (
                            <div className="text-center py-8">
                                <img src={MOCK_ONBOARDING.school.logo} alt={MOCK_ONBOARDING.school.name} className="w-20 h-20 rounded-3xl object-cover mx-auto mb-6 border-2 shadow-xl" style={{ borderColor: 'var(--border-color)' }} />
                                <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-1.5 rounded-full text-indigo-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                                    <Sparkles className="w-3.5 h-3.5" /> Parcours Institutionnel
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                                    Bienvenue dans votre Programme de Certification
                                </h1>
                                <p className="text-sm max-w-lg mx-auto mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    {MOCK_ONBOARDING.school.name} vous a inscrit(e) au programme
                                </p>
                                <p className="text-lg font-bold text-indigo-500 mb-8">
                                    {MOCK_ONBOARDING.program.name}
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <Building2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{MOCK_ONBOARDING.school.name} • {MOCK_ONBOARDING.school.city}</span>
                                </div>
                            </div>
                        )}

                        {/* STEP 1: Program Overview */}
                        {step === 1 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-500/10 rounded-xl"><GraduationCap className="w-5 h-5 text-indigo-500" /></div>
                                    <h2 className="text-2xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>Votre Programme</h2>
                                </div>
                                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                    {MOCK_ONBOARDING.program.description}
                                </p>
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    {[
                                        { label: 'Durée', value: MOCK_ONBOARDING.program.duration, icon: Clock },
                                        { label: 'Heures', value: `${MOCK_ONBOARDING.program.totalHours}h`, icon: BookOpen },
                                        { label: 'Modules', value: MOCK_ONBOARDING.program.modules, icon: Target },
                                        { label: 'Compétences', value: MOCK_ONBOARDING.program.competencies, icon: Award },
                                    ].map((stat, i) => (
                                        <div key={i} className="p-4 rounded-2xl border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                            <stat.icon className="w-4 h-4 text-indigo-500 mx-auto mb-2" />
                                            <p className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>À la fin de ce programme, vous saurez :</h4>
                                    <div className="space-y-2">
                                        {MOCK_ONBOARDING.program.outcomes.map((outcome, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Cohort */}
                        {step === 2 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-violet-500/10 rounded-xl"><Users className="w-5 h-5 text-violet-500" /></div>
                                    <h2 className="text-2xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>Votre Promotion</h2>
                                </div>

                                <div className="border rounded-2xl p-5 mb-6 flex items-center justify-between" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                    <div>
                                        <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{MOCK_ONBOARDING.cohort.name}</h3>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{MOCK_ONBOARDING.cohort.startDate} → {MOCK_ONBOARDING.cohort.endDate}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10">
                                        <Users className="w-3.5 h-3.5 text-violet-500" />
                                        <span className="text-xs font-bold text-violet-500">{MOCK_ONBOARDING.cohort.studentsCount} étudiants</span>
                                    </div>
                                </div>

                                <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Vos Professeurs</h4>
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {MOCK_ONBOARDING.cohort.professors.map((prof, i) => (
                                        <div key={i} className="border rounded-2xl p-4 text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                            <img src={prof.avatar} alt={prof.name} className="w-14 h-14 rounded-2xl object-cover mx-auto mb-3 border-2" style={{ borderColor: 'var(--border-color)' }} />
                                            <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{prof.name}</p>
                                            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{prof.specialty}</p>
                                        </div>
                                    ))}
                                </div>

                                <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Quelques camarades de promotion</h4>
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_ONBOARDING.cohort.classmates.map((name, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-xl border text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)' }}>
                                            {name}
                                        </span>
                                    ))}
                                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-500 bg-indigo-500/10">
                                        +{MOCK_ONBOARDING.cohort.studentsCount - MOCK_ONBOARDING.cohort.classmates.length} autres
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Rules */}
                        {step === 3 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-500/10 rounded-xl"><Shield className="w-5 h-5 text-amber-500" /></div>
                                    <h2 className="text-2xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>Règles & Attentes</h2>
                                </div>
                                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                                    Ce programme est structuré et encadré. Voici les règles essentielles à connaître.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {MOCK_ONBOARDING.rules.map((rule, i) => {
                                        const RuleIcon = rule.icon;
                                        return (
                                            <div key={i} className="border rounded-2xl p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                                <RuleIcon className="w-5 h-5 text-amber-500 mb-3" />
                                                <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{rule.title}</h4>
                                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{rule.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Get Started */}
                        {step === 4 && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tighter mb-3" style={{ color: 'var(--text-primary)' }}>
                                    Vous êtes prêt(e) !
                                </h2>
                                <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
                                    Votre espace d'apprentissage est configuré. Commencez par explorer votre tableau de bord et découvrez votre premier module.
                                </p>
                                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                                    {[
                                        { icon: BookOpen, label: 'Modules', value: MOCK_ONBOARDING.program.modules },
                                        { icon: Target, label: 'Compétences', value: MOCK_ONBOARDING.program.competencies },
                                        { icon: Clock, label: 'Heures', value: `${MOCK_ONBOARDING.program.totalHours}h` },
                                    ].map((s, i) => (
                                        <div key={i} className="p-4 rounded-2xl border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                            <s.icon className="w-4 h-4 text-green-500 mx-auto mb-2" />
                                            <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={prev}
                        disabled={step === 0}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <ChevronLeft className="w-4 h-4" /> Précédent
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                        Étape {step + 1} / {totalSteps}
                    </span>
                    <button
                        onClick={next}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        {step === totalSteps - 1 ? (
                            <>Accéder au Tableau de Bord <ArrowRight className="w-4 h-4" /></>
                        ) : (
                            <>Suivant <ChevronRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstitutionalOnboarding;
