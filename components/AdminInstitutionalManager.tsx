
import React, { useState } from 'react';
import {
    Building2, Users, Layers, GraduationCap, Plus, Edit3, Trash2,
    ChevronRight, Search, CheckCircle2, Clock, MapPin, Mail,
    Phone, Calendar, Target, Eye, Save, X, Upload, UserPlus,
    BookOpen, Award, Code, Shield, Zap, ArrowRight, Copy,
    AlertCircle
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

interface School {
    id: string;
    name: string;
    city: string;
    contact: string;
    email: string;
    learnersCount: number;
    cohortsCount: number;
    status: 'active' | 'pending';
    logo: string;
}

interface Cohort {
    id: string;
    name: string;
    school: string;
    program: string;
    startDate: string;
    endDate: string;
    students: number;
    status: 'active' | 'upcoming' | 'completed';
}

interface CompetencyItem {
    id: string;
    name: string;
    level: 'understanding' | 'application' | 'optimization' | 'innovation';
}

interface SkillItem {
    id: string;
    name: string;
    competencies: CompetencyItem[];
}

interface DomainItem {
    id: string;
    name: string;
    icon: string;
    skills: SkillItem[];
}

interface Program {
    id: string;
    name: string;
    description: string;
    duration: string;
    modulesCount: number;
    competenciesCount: number;
    assignedCohorts: number;
    status: 'active' | 'draft';
}

const MOCK_SCHOOLS: School[] = [
    { id: 's1', name: 'École Supérieure du Digital', city: 'Paris', contact: 'Marie Laurent', email: 'contact@esd-paris.edu', learnersCount: 156, cohortsCount: 4, status: 'active', logo: 'https://picsum.photos/seed/esd/100' },
    { id: 's2', name: 'Institut Blockchain Européen', city: 'Lyon', contact: 'Thomas Petit', email: 'admin@ibe-lyon.edu', learnersCount: 89, cohortsCount: 2, status: 'active', logo: 'https://picsum.photos/seed/ibe/100' },
    { id: 's3', name: 'Digital Academy Bordeaux', city: 'Bordeaux', contact: 'Sophie Martin', email: 'info@dab.edu', learnersCount: 0, cohortsCount: 0, status: 'pending', logo: 'https://picsum.photos/seed/dab/100' },
];

const MOCK_COHORTS: Cohort[] = [
    { id: 'c1', name: 'Promotion 2026 — Cohorte Alpha', school: 'École Supérieure du Digital', program: 'Développeur Web3 & Blockchain', startDate: '1 Sept 2025', endDate: '31 Août 2026', students: 28, status: 'active' },
    { id: 'c2', name: 'Promotion 2026 — Cohorte Beta', school: 'École Supérieure du Digital', program: 'Développeur Web3 & Blockchain', startDate: '1 Nov 2025', endDate: '31 Oct 2026', students: 24, status: 'active' },
    { id: 'c3', name: 'Promotion 2026 — Lyon', school: 'Institut Blockchain Européen', program: 'Architecte DeFi', startDate: '1 Jan 2026', endDate: '31 Déc 2026', students: 32, status: 'active' },
    { id: 'c4', name: 'Promotion 2027 — Paris', school: 'École Supérieure du Digital', program: 'Développeur Web3 & Blockchain', startDate: '1 Sept 2026', endDate: '31 Août 2027', students: 0, status: 'upcoming' },
    { id: 'c5', name: 'Promotion 2025 — Pilote', school: 'Institut Blockchain Européen', program: 'Fondamentaux Blockchain', startDate: '1 Mars 2025', endDate: '30 Août 2025', students: 18, status: 'completed' },
];

const MOCK_REFERENTIEL: DomainItem[] = [
    {
        id: 'd1', name: 'Fondamentaux Blockchain', icon: 'layers',
        skills: [
            {
                id: 'sk1', name: 'Cryptographie', competencies: [
                    { id: 'cp1', name: 'Comprendre les fonctions de hash', level: 'understanding' },
                    { id: 'cp2', name: 'Appliquer le chiffrement asymétrique', level: 'application' },
                    { id: 'cp3', name: 'Optimiser les preuves cryptographiques', level: 'optimization' },
                ]
            },
            {
                id: 'sk2', name: 'Consensus', competencies: [
                    { id: 'cp4', name: 'Comprendre PoW, PoS, BFT', level: 'understanding' },
                    { id: 'cp5', name: 'Analyser les trade-offs', level: 'application' },
                    { id: 'cp6', name: 'Concevoir un mécanisme de consensus', level: 'innovation' },
                ]
            },
        ],
    },
    {
        id: 'd2', name: 'Smart Contracts', icon: 'code',
        skills: [
            {
                id: 'sk3', name: 'Solidity', competencies: [
                    { id: 'cp7', name: 'Comprendre la syntaxe Solidity', level: 'understanding' },
                    { id: 'cp8', name: 'Développer des contrats ERC-20/721', level: 'application' },
                    { id: 'cp9', name: 'Optimiser la consommation de gas', level: 'optimization' },
                    { id: 'cp10', name: 'Inventer des design patterns', level: 'innovation' },
                ]
            },
            {
                id: 'sk4', name: 'Testing & Debugging', competencies: [
                    { id: 'cp11', name: 'Comprendre les frameworks de test', level: 'understanding' },
                    { id: 'cp12', name: 'Écrire des tests unitaires complets', level: 'application' },
                ]
            },
        ],
    },
    {
        id: 'd3', name: 'Sécurité', icon: 'shield',
        skills: [
            {
                id: 'sk5', name: 'Vulnérabilités', competencies: [
                    { id: 'cp13', name: 'Identifier les attaques courantes', level: 'understanding' },
                    { id: 'cp14', name: 'Conduire un audit basique', level: 'application' },
                    { id: 'cp15', name: 'Optimiser la résistance aux attaques', level: 'optimization' },
                ]
            },
        ],
    },
];

const MOCK_PROGRAMS: Program[] = [
    { id: 'p1', name: 'Développeur Web3 & Blockchain', description: 'Programme complet de formation au développement blockchain, smart contracts et DApps', duration: '12 mois', modulesCount: 8, competenciesCount: 24, assignedCohorts: 3, status: 'active' },
    { id: 'p2', name: 'Architecte DeFi', description: 'Formation avancée aux protocoles DeFi, AMM, lending et yield strategies', duration: '9 mois', modulesCount: 6, competenciesCount: 18, assignedCohorts: 1, status: 'active' },
    { id: 'p3', name: 'Auditeur Sécurité Smart Contracts', description: 'Spécialisation en audit de sécurité et détection de vulnérabilités', duration: '6 mois', modulesCount: 5, competenciesCount: 15, assignedCohorts: 0, status: 'draft' },
];

type TabKey = 'schools' | 'cohorts' | 'referentiel' | 'programs';

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'schools', label: 'Écoles', icon: Building2 },
    { key: 'cohorts', label: 'Promotions', icon: Users },
    { key: 'referentiel', label: 'Référentiels', icon: Layers },
    { key: 'programs', label: 'Programmes', icon: GraduationCap },
];

const LEVEL_LABELS: Record<string, { label: string; color: string; bg: string }> = {
    understanding: { label: 'Compréhension', color: 'text-sky-500', bg: 'bg-sky-500/10' },
    application: { label: 'Application', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    optimization: { label: 'Optimisation', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    innovation: { label: 'Innovation', color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

// =====================================================
// MODAL — CREATE SCHOOL
// =====================================================

const CreateSchoolModal: React.FC<{ onClose: () => void; onSave: () => void }> = ({ onClose, onSave }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg border rounded-[32px] p-8 shadow-2xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Ajouter une École</h3>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-500/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    {[
                        { label: 'Nom de l\'école', placeholder: 'École Supérieure du Digital', icon: Building2 },
                        { label: 'Ville', placeholder: 'Paris', icon: MapPin },
                        { label: 'Contact Principal', placeholder: 'Jean Dupont', icon: Users },
                        { label: 'Email', placeholder: 'contact@ecole.edu', icon: Mail },
                    ].map((field, i) => (
                        <div key={i}>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{field.label}</label>
                            <div className="relative">
                                <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        </div>
                    ))}
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Logo</label>
                        <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500/30 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                            <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Cliquez pour uploader ou glissez-déposez</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border text-xs font-bold transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        Annuler
                    </button>
                    <button onClick={() => { onSave(); onClose(); }} className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20">
                        <Save className="w-3.5 h-3.5 inline mr-2" /> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

// =====================================================
// MODAL — CREATE COHORT
// =====================================================

const CreateCohortModal: React.FC<{ onClose: () => void; onSave: () => void }> = ({ onClose, onSave }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl border rounded-[32px] p-8 shadow-2xl max-h-[85vh] overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Créer une Promotion</h3>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-500/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Nom de la Promotion</label>
                        <input className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Promotion 2027 — Cohorte Alpha" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>École</label>
                            <select className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <option>École Supérieure du Digital</option>
                                <option>Institut Blockchain Européen</option>
                                <option>Digital Academy Bordeaux</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Programme</label>
                            <select className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <option>Développeur Web3 & Blockchain</option>
                                <option>Architecte DeFi</option>
                                <option>Auditeur Sécurité Smart Contracts</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Date de début</label>
                            <input type="date" className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Date de fin</label>
                            <input type="date" className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Inviter des Étudiants</label>
                        <textarea
                            className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 h-24 resize-none"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            placeholder="Entrez les emails séparés par des virgules ou collez une liste..."
                        />
                        <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Les étudiants recevront un email d'invitation avec un lien de connexion</p>
                    </div>
                    <div className="border rounded-xl p-4 flex items-center gap-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                        <Upload className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Ou importer un fichier CSV d'étudiants</span>
                        <button className="ml-auto text-[10px] font-bold text-blue-500 uppercase tracking-widest">Parcourir</button>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border text-xs font-bold transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        Annuler
                    </button>
                    <button onClick={() => { onSave(); onClose(); }} className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20">
                        <UserPlus className="w-3.5 h-3.5 inline mr-2" /> Créer & Inviter
                    </button>
                </div>
            </div>
        </div>
    );
};

// =====================================================
// MODAL — CREATE PROGRAM
// =====================================================

const CreateProgramModal: React.FC<{ onClose: () => void; onSave: () => void }> = ({ onClose, onSave }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl border rounded-[32px] p-8 shadow-2xl max-h-[85vh] overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Créer un Programme</h3>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-red-500/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Nom du Programme</label>
                        <input className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Développeur Web3 & Blockchain" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Description</label>
                        <textarea className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500 h-20 resize-none" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} placeholder="Description du programme de certification..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Durée</label>
                            <select className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <option>3 mois</option>
                                <option>6 mois</option>
                                <option selected>9 mois</option>
                                <option>12 mois</option>
                                <option>18 mois</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Référentiel</label>
                            <select className="w-full border rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <option>Web3 & Blockchain (24 compétences)</option>
                                <option>DeFi Avancé (18 compétences)</option>
                                <option>Sécurité SC (15 compétences)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Modules du Programme</label>
                        <div className="space-y-2">
                            {['Fondamentaux Blockchain', 'Solidity & Smart Contracts', 'Architecture DApp', 'Sécurité & Audit'].map((mod, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded-xl" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                                    <span className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>{mod}</span>
                                    <Trash2 className="w-3.5 h-3.5 text-red-500/50 hover:text-red-500 cursor-pointer transition-colors" />
                                </div>
                            ))}
                            <button className="w-full p-3 border border-dashed rounded-xl text-xs font-bold text-blue-500 hover:border-blue-500/30 transition-colors flex items-center justify-center gap-2" style={{ borderColor: 'var(--border-color)' }}>
                                <Plus className="w-3.5 h-3.5" /> Ajouter un Module
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border text-xs font-bold transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        Annuler
                    </button>
                    <button onClick={() => { onSave(); onClose(); }} className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20">
                        <Save className="w-3.5 h-3.5 inline mr-2" /> Créer le Programme
                    </button>
                </div>
            </div>
        </div>
    );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const AdminInstitutionalManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('schools');
    const [showCreateSchool, setShowCreateSchool] = useState(false);
    const [showCreateCohort, setShowCreateCohort] = useState(false);
    const [showCreateProgram, setShowCreateProgram] = useState(false);
    const [expandedDomain, setExpandedDomain] = useState<string | null>('d1');
    const [searchQuery, setSearchQuery] = useState('');

    const getCreateAction = () => {
        switch (activeTab) {
            case 'schools': return { label: 'Ajouter une École', action: () => setShowCreateSchool(true) };
            case 'cohorts': return { label: 'Créer une Promotion', action: () => setShowCreateCohort(true) };
            case 'referentiel': return { label: 'Ajouter un Domaine', action: () => { } };
            case 'programs': return { label: 'Créer un Programme', action: () => setShowCreateProgram(true) };
        }
    };

    const createAction = getCreateAction();

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Modals */}
            {showCreateSchool && <CreateSchoolModal onClose={() => setShowCreateSchool(false)} onSave={() => { }} />}
            {showCreateCohort && <CreateCohortModal onClose={() => setShowCreateCohort(false)} onSave={() => { }} />}
            {showCreateProgram && <CreateProgramModal onClose={() => setShowCreateProgram(false)} onSave={() => { }} />}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 text-indigo-500 text-[10px] font-mono font-black mb-2 uppercase tracking-[0.3em]">
                        <Building2 className="w-4 h-4" />
                        <span>Gestion Institutionnelle</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                        Management des Institutions
                    </h1>
                </div>
                <button
                    onClick={createAction.action}
                    className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" /> {createAction.label}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Écoles Partenaires', value: MOCK_SCHOOLS.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Promotions Actives', value: MOCK_COHORTS.filter(c => c.status === 'active').length, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Programmes', value: MOCK_PROGRAMS.length, icon: GraduationCap, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                    { label: 'Apprenants Total', value: MOCK_SCHOOLS.reduce((a, s) => a + s.learnersCount, 0), icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((card, idx) => (
                    <div key={idx} className="border p-5 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-1.5 rounded-lg ${card.bg}`}><card.icon className={`w-3.5 h-3.5 ${card.color}`} /></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{card.label}</span>
                        </div>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-b flex items-center gap-1" style={{ borderColor: 'var(--border-color)' }}>
                {TABS.map(tab => {
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.key ? 'border-indigo-500 text-indigo-500' : 'border-transparent'}`}
                            style={activeTab !== tab.key ? { color: 'var(--text-muted)' } : {}}
                        >
                            <TabIcon className="w-4 h-4" /> {tab.label}
                        </button>
                    );
                })}
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="border rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 w-56 transition-colors"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            placeholder="Rechercher..."
                        />
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {/* === SCHOOLS TAB === */}
                {activeTab === 'schools' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {MOCK_SCHOOLS.map(school => (
                            <div key={school.id} className="border rounded-[24px] p-6 transition-all hover:border-indigo-500/30 group cursor-pointer" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                <div className="flex items-start gap-4 mb-4">
                                    <img src={school.logo} alt={school.name} className="w-14 h-14 rounded-2xl object-cover border" style={{ borderColor: 'var(--border-color)' }} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{school.name}</h4>
                                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${school.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {school.status === 'active' ? 'Actif' : 'En attente'}
                                            </span>
                                        </div>
                                        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                            <MapPin className="w-3 h-3" /> {school.city}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        <Users className="w-3.5 h-3.5" /> {school.contact}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        <Mail className="w-3.5 h-3.5" /> {school.email}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-primary)' }}>{school.learnersCount}</strong> apprenants</span>
                                        <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-primary)' }}>{school.cohortsCount}</strong> promotions</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"><Edit3 className="w-3.5 h-3.5 text-blue-500" /></button>
                                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Add Card */}
                        <button
                            onClick={() => setShowCreateSchool(true)}
                            className="border-2 border-dashed rounded-[24px] p-6 flex flex-col items-center justify-center min-h-[220px] hover:border-indigo-500/30 transition-all group"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <div className="p-3 rounded-2xl bg-indigo-500/10 mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-indigo-500" />
                            </div>
                            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Ajouter une école partenaire</span>
                        </button>
                    </div>
                )}

                {/* === COHORTS TAB === */}
                {activeTab === 'cohorts' && (
                    <div className="border rounded-[24px] overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        {/* Table Header */}
                        <div className="grid grid-cols-7 gap-4 p-4 border-b text-[10px] font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                            <span className="col-span-2">Promotion</span>
                            <span>École</span>
                            <span>Programme</span>
                            <span>Période</span>
                            <span>Étudiants</span>
                            <span>Actions</span>
                        </div>
                        {/* Rows */}
                        {MOCK_COHORTS.map(cohort => (
                            <div key={cohort.id} className="grid grid-cols-7 gap-4 p-4 border-b items-center hover:bg-blue-500/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                                <div className="col-span-2 flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${cohort.status === 'active' ? 'bg-green-500' : cohort.status === 'upcoming' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>
                                    <div>
                                        <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{cohort.name}</p>
                                        <span className={`text-[9px] font-bold uppercase ${cohort.status === 'active' ? 'text-green-500' : cohort.status === 'upcoming' ? 'text-amber-500' : 'text-slate-500'}`}>
                                            {cohort.status === 'active' ? 'Active' : cohort.status === 'upcoming' ? 'À venir' : 'Terminée'}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{cohort.school}</span>
                                <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{cohort.program}</span>
                                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{cohort.startDate}<br />→ {cohort.endDate}</span>
                                <div className="flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{cohort.students}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                                    <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"><UserPlus className="w-3.5 h-3.5 text-indigo-500" /></button>
                                    <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"><Edit3 className="w-3.5 h-3.5 text-amber-500" /></button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* === REFERENTIEL TAB === */}
                {activeTab === 'referentiel' && (
                    <div className="space-y-4">
                        {/* Info Banner */}
                        <div className="flex items-center gap-3 p-4 rounded-2xl border bg-indigo-500/5" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
                            <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                Le référentiel de compétences définit les domaines, compétences et niveaux de maîtrise attendus. Il est attribué aux programmes de certification.
                            </p>
                        </div>

                        {MOCK_REFERENTIEL.map(domain => {
                            const isExpanded = expandedDomain === domain.id;
                            const totalComps = domain.skills.reduce((a, s) => a + s.competencies.length, 0);
                            const DomainIcon = domain.icon === 'layers' ? Layers : domain.icon === 'code' ? Code : Shield;

                            return (
                                <div key={domain.id} className={`border rounded-[24px] overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-indigo-500/20' : ''}`} style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                    <button
                                        onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                                        className="w-full text-left p-6 flex items-center gap-4 group"
                                    >
                                        <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                                            <DomainIcon className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{domain.name}</h3>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{domain.skills.length} compétences clés • {totalComps} niveaux</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors opacity-0 group-hover:opacity-100"><Edit3 className="w-3.5 h-3.5 text-blue-500" /></button>
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors opacity-0 group-hover:opacity-100"><Plus className="w-3.5 h-3.5 text-green-500" /></button>
                                            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="px-6 pb-6 space-y-4">
                                            {domain.skills.map(skill => (
                                                <div key={skill.id} className="border rounded-2xl p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                                            <Target className="w-3.5 h-3.5 text-indigo-400" /> {skill.name}
                                                        </h4>
                                                        <div className="flex items-center gap-1">
                                                            <button className="p-1 rounded-md hover:bg-green-500/10 transition-colors"><Plus className="w-3 h-3 text-green-500" /></button>
                                                            <button className="p-1 rounded-md hover:bg-blue-500/10 transition-colors"><Edit3 className="w-3 h-3 text-blue-500" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {skill.competencies.map(comp => {
                                                            const lvl = LEVEL_LABELS[comp.level];
                                                            return (
                                                                <div key={comp.id} className="flex items-center gap-3 p-3 rounded-xl border group hover:border-indigo-500/20 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                                                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${lvl.bg} ${lvl.color} shrink-0`}>{lvl.label}</span>
                                                                    <span className="text-xs font-medium flex-1" style={{ color: 'var(--text-secondary)' }}>{comp.name}</span>
                                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button className="p-1 rounded-md hover:bg-blue-500/10"><Edit3 className="w-3 h-3 text-blue-500" /></button>
                                                                        <button className="p-1 rounded-md hover:bg-red-500/10"><Trash2 className="w-3 h-3 text-red-500" /></button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="w-full p-3 border border-dashed rounded-xl text-xs font-bold text-indigo-500 hover:border-indigo-500/30 transition-colors flex items-center justify-center gap-2" style={{ borderColor: 'var(--border-color)' }}>
                                                <Plus className="w-3.5 h-3.5" /> Ajouter une Compétence Clé
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Add Domain */}
                        <button className="w-full border-2 border-dashed rounded-[24px] p-6 flex items-center justify-center gap-3 hover:border-indigo-500/30 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                            <Plus className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>Ajouter un Domaine de Compétences</span>
                        </button>
                    </div>
                )}

                {/* === PROGRAMS TAB === */}
                {activeTab === 'programs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_PROGRAMS.map(prog => (
                            <div key={prog.id} className="border rounded-[24px] p-6 transition-all hover:border-indigo-500/30 group cursor-pointer relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-[30px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${prog.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {prog.status === 'active' ? 'Actif' : 'Brouillon'}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10"><Edit3 className="w-3.5 h-3.5 text-amber-500" /></button>
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10"><Copy className="w-3.5 h-3.5 text-indigo-500" /></button>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-base mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{prog.name}</h4>
                                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{prog.description}</p>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="p-3 rounded-xl border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                            <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{prog.modulesCount}</p>
                                            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Modules</p>
                                        </div>
                                        <div className="p-3 rounded-xl border text-center" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                            <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{prog.competenciesCount}</p>
                                            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Compétences</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                            <Clock className="w-3 h-3" /> {prog.duration}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                            <Users className="w-3 h-3" /> {prog.assignedCohorts} cohortes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Add Card */}
                        <button
                            onClick={() => setShowCreateProgram(true)}
                            className="border-2 border-dashed rounded-[24px] p-6 flex flex-col items-center justify-center min-h-[280px] hover:border-indigo-500/30 transition-all group"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <div className="p-3 rounded-2xl bg-indigo-500/10 mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-indigo-500" />
                            </div>
                            <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>Créer un nouveau programme</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminInstitutionalManager;
