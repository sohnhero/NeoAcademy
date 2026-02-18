
import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Puzzle,
    Award,
    ArrowRight,
    ArrowLeft,
    Target,
    Brain,
    CheckCircle,
    Search,
    Plus,
    Trash2,
    AlertCircle,
    Loader2,
    Layers,
    Zap,
    Send,
    RefreshCw,
    Filter,
    Clock,
    Star,
    FileQuestion,
    TrendingUp,
    ShieldAlert,
    GraduationCap,
    ChevronRight,
    BarChart3
} from 'lucide-react';
import { LearningPath, DiagnosticQuestion, DiagnosticResult } from '../types';
import { generateDiagnosticTest, evaluateDiagnostic } from '../services/geminiService';
import { MOCK_LEARNING_PATHS, PREDEFINED_PATHS_CATALOG } from '../constants';

interface PathFinderViewProps {
    onPathConfirmed: (path: LearningPath) => void;
    onBack?: () => void;
    availablePaths?: LearningPath[];
}

type FlowType = 'ai' | 'modular' | 'certified' | null;

// Available modules for the builder
const AVAILABLE_MODULES = [
    { id: 'mod-sol-basics', title: 'Solidity Fondamentaux', category: 'Development', duration: '8h', difficulty: 'Débutant' },
    { id: 'mod-evm-deep', title: 'Architecture EVM', category: 'Development', duration: '12h', difficulty: 'Intermédiaire' },
    { id: 'mod-security', title: 'Sécurité Smart Contracts', category: 'Security', duration: '15h', difficulty: 'Avancé' },
    { id: 'mod-defi', title: 'Protocoles DeFi', category: 'Finance', duration: '10h', difficulty: 'Intermédiaire' },
    { id: 'mod-nft', title: 'Standards NFT (ERC-721/1155)', category: 'Development', duration: '6h', difficulty: 'Débutant' },
    { id: 'mod-audit', title: 'Audit de Code', category: 'Security', duration: '20h', difficulty: 'Expert' },
    { id: 'mod-gas', title: 'Optimisation Gas', category: 'Development', duration: '8h', difficulty: 'Avancé' },
    { id: 'mod-testing', title: 'Testing & Fuzzing', category: 'Testing', duration: '10h', difficulty: 'Intermédiaire' },
    { id: 'mod-governance', title: 'Gouvernance DAO', category: 'Governance', duration: '8h', difficulty: 'Intermédiaire' },
    { id: 'mod-l2', title: 'Solutions Layer 2', category: 'Infrastructure', duration: '12h', difficulty: 'Avancé' }
];

// Analysis steps for animation
const ANALYSIS_STEPS = [
    { text: 'Analyse de votre profil...', icon: Brain },
    { text: 'Identification des compétences requises...', icon: Target },
    { text: 'Sélection des modules optimaux...', icon: Layers },
    { text: 'Construction du parcours personnalisé...', icon: Sparkles }
];

const DIAGNOSTIC_STEPS = [
    { text: 'Analyse du contexte sélectionné...', icon: Brain },
    { text: 'Calibration du niveau de difficulté...', icon: Target },
    { text: 'Génération des questions diagnostiques...', icon: FileQuestion },
    { text: 'Préparation du test personnalisé...', icon: Sparkles }
];

const PathFinderView: React.FC<PathFinderViewProps> = ({ onPathConfirmed, availablePaths = [] }) => {
    const [selectedFlow, setSelectedFlow] = useState<FlowType>(null);

    // AI Flow State
    const [profileInput, setProfileInput] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(null);
    const [adjustmentPrompt, setAdjustmentPrompt] = useState('');
    const [isAdjusting, setIsAdjusting] = useState(false);

    // Modular Builder State
    const [selectedModules, setSelectedModules] = useState<typeof AVAILABLE_MODULES>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [moduleAnalyzing, setModuleAnalyzing] = useState(false);
    const [moduleAnalysis, setModuleAnalysis] = useState<{ coherent: boolean; profile: string; suggestions: string[] } | null>(null);

    // Certified Tracks State
    const [selectedCertifiedPath, setSelectedCertifiedPath] = useState<Partial<LearningPath> | null>(null);
    const [certifiedCategory, setCertifiedCategory] = useState('Tous');
    const certifiedCategories = ['Tous', 'Développement', 'Sécurité', 'Infrastructure', 'DeFi'];

    // ===== DIAGNOSTIC TEST STATE =====
    const [diagnosticPhase, setDiagnosticPhase] = useState<'idle' | 'generating' | 'testing' | 'evaluating' | 'results'>('idle');
    const [diagnosticStep, setDiagnosticStep] = useState(0);
    const [diagnosticQuestions, setDiagnosticQuestions] = useState<DiagnosticQuestion[]>([]);
    const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
    const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [pendingPath, setPendingPath] = useState<LearningPath | null>(null);
    const [diagnosticContext, setDiagnosticContext] = useState('');
    const [diagnosticFlowType, setDiagnosticFlowType] = useState<'ai' | 'modular' | 'certified'>('ai');

    // Analysis animation effect
    useEffect(() => {
        if (isAnalyzing && analysisStep < ANALYSIS_STEPS.length) {
            const timer = setTimeout(() => {
                setAnalysisStep(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        } else if (isAnalyzing && analysisStep >= ANALYSIS_STEPS.length) {
            setTimeout(() => {
                setGeneratedPath(MOCK_LEARNING_PATHS[0]);
                setIsAnalyzing(false);
                setAnalysisStep(0);
            }, 500);
        }
    }, [isAnalyzing, analysisStep]);

    // Diagnostic generation animation effect
    useEffect(() => {
        if (diagnosticPhase === 'generating' && diagnosticStep < DIAGNOSTIC_STEPS.length) {
            const timer = setTimeout(() => {
                setDiagnosticStep(prev => prev + 1);
            }, 700);
            return () => clearTimeout(timer);
        } else if (diagnosticPhase === 'generating' && diagnosticStep >= DIAGNOSTIC_STEPS.length) {
            // Kick off actual generation
            (async () => {
                const result = await generateDiagnosticTest(diagnosticContext, diagnosticFlowType);
                setDiagnosticQuestions(result.questions || []);
                setDiagnosticPhase('testing');
                setDiagnosticStep(0);
                setCurrentQuestionIndex(0);
            })();
        }
    }, [diagnosticPhase, diagnosticStep]);

    // ===== DIAGNOSTIC HANDLERS =====
    const startDiagnostic = (path: LearningPath, context: string, flowType: 'ai' | 'modular' | 'certified') => {
        setPendingPath(path);
        setDiagnosticContext(context);
        setDiagnosticFlowType(flowType);
        setDiagnosticAnswers({});
        setDiagnosticResults(null);
        setDiagnosticStep(0);
        setCurrentQuestionIndex(0);
        setDiagnosticPhase('generating');
    };

    const handleDiagnosticAnswer = (questionId: string, answer: string) => {
        setDiagnosticAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmitDiagnostic = async () => {
        setDiagnosticPhase('evaluating');
        const results = await evaluateDiagnostic(diagnosticQuestions, diagnosticAnswers, diagnosticContext);
        setDiagnosticResults(results);
        setDiagnosticPhase('results');
    };

    const handleConfirmAfterDiagnostic = () => {
        if (pendingPath) {
            onPathConfirmed(pendingPath);
        }
    };

    // AI Flow: Submit profile for analysis
    const handleSubmitProfile = () => {
        if (!profileInput.trim()) return;
        setIsAnalyzing(true);
        setAnalysisStep(0);
    };

    // AI Flow: Request adjustments
    const handleRequestAdjustment = async () => {
        if (!adjustmentPrompt.trim() || !generatedPath) return;
        setIsAdjusting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate adjustment
        setAdjustmentPrompt('');
        setIsAdjusting(false);
    };

    // Modular Builder handlers
    const handleAddModule = (module: typeof AVAILABLE_MODULES[0]) => {
        if (!selectedModules.find(m => m.id === module.id)) {
            setSelectedModules([...selectedModules, module]);
            setModuleAnalysis(null);
        }
    };

    const handleRemoveModule = (moduleId: string) => {
        setSelectedModules(selectedModules.filter(m => m.id !== moduleId));
        setModuleAnalysis(null);
    };

    const handleAnalyzeModules = async () => {
        if (selectedModules.length === 0) return;
        setModuleAnalyzing(true);

        await new Promise(resolve => setTimeout(resolve, 1800));

        setModuleAnalysis({
            coherent: selectedModules.length >= 3,
            profile: selectedModules.some(m => m.category === 'Security') ? 'Security Auditor' : 'Smart Contract Developer',
            suggestions: selectedModules.length < 3
                ? ['Ajoutez au moins 3 modules pour un parcours cohérent', 'Considérez ajouter un module de testing']
                : ['Parcours bien équilibré', 'Progression logique des difficultés']
        });
        setModuleAnalyzing(false);
    };

    const handleConfirmModularPath = () => {
        const customPath: LearningPath = {
            ...MOCK_LEARNING_PATHS[0],
            id: `custom-${Date.now()}`,
            title: 'Mon Parcours Personnalisé',
            type: 'custom',
            progress: 0
        };
        onPathConfirmed(customPath);
    };

    const filteredModules = AVAILABLE_MODULES.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ===== DIAGNOSTIC TEST UI (must be checked BEFORE flow-specific renders) =====
    if (diagnosticPhase !== 'idle') {
        return (
            <div className="min-h-screen p-6" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => {
                            setDiagnosticPhase('idle');
                            setDiagnosticQuestions([]);
                            setDiagnosticAnswers({});
                            setDiagnosticResults(null);
                            setPendingPath(null);
                        }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 text-slate-500 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </button>

                    {/* PHASE: Generating Test */}
                    {diagnosticPhase === 'generating' && (
                        <div className="border border-slate-800 rounded-3xl p-12 bg-slate-900/50">
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
                                    <FileQuestion className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mb-3 text-white">
                                    Génération du Test Diagnostic
                                </h2>
                                <p className="text-slate-400 text-sm">L'IA prépare un test adapté à votre choix de parcours</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="relative mb-10">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/40">
                                        <Brain className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping" />
                                </div>

                                <div className="space-y-4 w-full max-w-md">
                                    {DIAGNOSTIC_STEPS.map((step, idx) => {
                                        const StepIcon = step.icon;
                                        const isActive = idx === diagnosticStep;
                                        const isComplete = idx < diagnosticStep;
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-purple-500/10 border border-purple-500/30' : isComplete ? 'opacity-50' : 'opacity-20'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isComplete ? 'bg-purple-500 text-white' : isActive ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'}`}>
                                                    {isComplete ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                                                </div>
                                                <span className={`font-medium ${isActive ? 'text-purple-400' : 'text-slate-400'}`}>{step.text}</span>
                                                {isActive && <Loader2 className="w-4 h-4 text-purple-400 animate-spin ml-auto" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHASE: Taking the Test */}
                    {diagnosticPhase === 'testing' && diagnosticQuestions.length > 0 && (
                        <div>
                            {/* Header */}
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
                                    <FileQuestion className="w-4 h-4 text-purple-500" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Test Diagnostic</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mb-3 text-white">
                                    Évaluons votre Niveau
                                </h2>
                                <p className="text-slate-400 text-sm">Répondez aux questions pour personnaliser votre parcours</p>

                                {/* Progress Bar */}
                                <div className="flex items-center gap-3 mt-8 max-w-md mx-auto">
                                    <span className="text-xs font-bold text-purple-400">{currentQuestionIndex + 1}/{diagnosticQuestions.length}</span>
                                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                            style={{ width: `${((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Current Question Card */}
                            {(() => {
                                const q = diagnosticQuestions[currentQuestionIndex];
                                if (!q) return null;
                                return (
                                    <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50 mb-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                {q.topic}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-800 text-slate-400">
                                                {q.type === 'mcq' ? 'QCM' : 'Question Ouverte'}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-8 leading-relaxed">{q.question}</h3>

                                        {q.type === 'mcq' && q.options ? (
                                            <div className="space-y-3">
                                                {q.options.map((option, i) => {
                                                    const isSelected = diagnosticAnswers[q.id] === option;
                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleDiagnosticAnswer(q.id, option)}
                                                            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${isSelected
                                                                ? 'bg-blue-500/10 border-blue-500/50 text-white'
                                                                : 'bg-slate-800/30 border-slate-700/50 text-slate-300 hover:border-blue-500/30 hover:bg-slate-800/50'}`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${isSelected
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-slate-700 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400'}`}>
                                                                {String.fromCharCode(65 + i)}
                                                            </div>
                                                            <span className="font-medium text-sm">{option}</span>
                                                            {isSelected && <CheckCircle className="w-5 h-5 text-blue-400 ml-auto" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <textarea
                                                value={diagnosticAnswers[q.id] || ''}
                                                onChange={(e) => handleDiagnosticAnswer(q.id, e.target.value)}
                                                placeholder="Rédigez votre réponse ici..."
                                                className="w-full h-40 bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition-colors resize-none text-sm leading-relaxed"
                                            />
                                        )}
                                    </div>
                                );
                            })()}

                            {/* Navigation */}
                            <div className="flex gap-4">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                        className="px-8 py-4 border border-slate-700 bg-slate-800/50 text-white rounded-2xl font-bold text-sm transition-all hover:border-blue-500/50 flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Précédent
                                    </button>
                                )}
                                {currentQuestionIndex < diagnosticQuestions.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                        disabled={!diagnosticAnswers[diagnosticQuestions[currentQuestionIndex]?.id]}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                                    >
                                        Question Suivante <ChevronRight className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmitDiagnostic}
                                        disabled={Object.keys(diagnosticAnswers).length < diagnosticQuestions.length}
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-500/20"
                                    >
                                        <Send className="w-5 h-5" /> Soumettre le Test
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PHASE: Evaluating */}
                    {diagnosticPhase === 'evaluating' && (
                        <div className="border border-slate-800 rounded-3xl p-12 bg-slate-900/50 text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-purple-500/40">
                                <BarChart3 className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight mb-3 text-white">
                                Analyse en cours...
                            </h2>
                            <p className="text-slate-400 text-sm mb-8">L'IA évalue vos réponses et calibre votre parcours</p>
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                        </div>
                    )}

                    {/* PHASE: Results */}
                    {diagnosticPhase === 'results' && diagnosticResults && (
                        <div>
                            {/* Results Header */}
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Diagnostic Terminé</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mb-3 text-white">
                                    Résultats de votre Diagnostic
                                </h2>
                                <p className="text-slate-400 text-sm">Votre parcours sera adapté en fonction de ces résultats</p>
                            </div>

                            {/* Score & Level Card */}
                            <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50 mb-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Niveau Détecté</span>
                                        <span className={`text-3xl font-black uppercase tracking-wider ${diagnosticResults.level === 'avancé' ? 'text-emerald-400' : diagnosticResults.level === 'intermédiaire' ? 'text-blue-400' : 'text-yellow-400'}`}>
                                            {diagnosticResults.level}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Score Global</span>
                                        <span className="text-5xl font-black text-white">{diagnosticResults.score}<span className="text-xl text-slate-500">/100</span></span>
                                    </div>
                                </div>

                                {/* Score Bar */}
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${diagnosticResults.score >= 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : diagnosticResults.score >= 40 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-yellow-500 to-yellow-400'}`}
                                        style={{ width: `${diagnosticResults.score}%` }}
                                    />
                                </div>
                            </div>

                            {/* Gaps & Strengths */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {/* Strengths */}
                                <div className="border border-emerald-500/20 rounded-3xl p-6 bg-emerald-500/5">
                                    <div className="flex items-center gap-3 mb-5">
                                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                                        <h4 className="font-bold text-white text-sm">Points Forts</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {diagnosticResults.strengths.map((s, i) => (
                                            <li key={i} className="text-sm text-emerald-300/80 flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Gaps */}
                                <div className="border border-yellow-500/20 rounded-3xl p-6 bg-yellow-500/5">
                                    <div className="flex items-center gap-3 mb-5">
                                        <ShieldAlert className="w-5 h-5 text-yellow-400" />
                                        <h4 className="font-bold text-white text-sm">Lacunes Identifiées</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {diagnosticResults.gaps.map((g, i) => (
                                            <li key={i} className="text-sm text-yellow-300/80 flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                                {g}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="border border-blue-500/20 rounded-3xl p-6 bg-blue-500/5 mb-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <GraduationCap className="w-5 h-5 text-blue-400" />
                                    <h4 className="font-bold text-white text-sm">Recommandations d'Adaptation</h4>
                                </div>
                                <ul className="space-y-3">
                                    {diagnosticResults.recommendations.map((r, i) => (
                                        <li key={i} className="text-sm text-blue-300/80 flex items-start gap-2">
                                            <Zap className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Adapted Notes */}
                            <div className="border border-slate-800 rounded-3xl p-6 bg-slate-900/50 mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Brain className="w-5 h-5 text-purple-400" />
                                    <h4 className="font-bold text-white text-sm">Plan d'Adaptation IA</h4>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {diagnosticResults.adaptedModuleNotes}
                                </p>
                            </div>

                            {/* Final Confirm */}
                            <button
                                onClick={handleConfirmAfterDiagnostic}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Confirmer et Démarrer le Parcours Adapté
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Main selection screen
    if (!selectedFlow) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-5xl w-full">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Architecte de Parcours</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-white">
                            Construisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Parcours</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Choisissez comment vous souhaitez créer votre parcours d'apprentissage personnalisé
                        </p>
                    </div>

                    {/* Three Options */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* AI Generated */}
                        <button
                            onClick={() => setSelectedFlow('ai')}
                            className="group p-8 rounded-3xl border border-slate-800 bg-slate-900/50 text-left transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white">Parcours IA</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Décrivez votre objectif de carrière et laissez l'IA générer le parcours optimal pour vous.
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                Commencer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>

                        {/* Modular Builder */}
                        <button
                            onClick={() => setSelectedFlow('modular')}
                            className="group p-8 rounded-3xl border border-slate-800 bg-slate-900/50 text-left transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <Puzzle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white">Parcours modulaire</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Construisez votre parcours module par module. L'IA analysera la cohérence de vos choix.
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                Commencer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>

                        {/* Certified Tracks */}
                        <button
                            onClick={() => setSelectedFlow('certified')}
                            className="group p-8 rounded-3xl border border-slate-800 bg-slate-900/50 text-left transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-3 text-white">Nos parcours</h3>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Choisissez parmi nos parcours certifiants prédéfinis, conçus par des experts.
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                Commencer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // AI Flow
    if (selectedFlow === 'ai') {
        return (
            <div className="min-h-screen p-6" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => { setSelectedFlow(null); setProfileInput(''); setGeneratedPath(null); }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 text-slate-500 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </button>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-3 text-white">
                            Parcours Généré par l'IA
                        </h2>
                        <p className="text-slate-400">Décrivez votre objectif de carrière et l'IA créera votre parcours optimal</p>
                    </div>

                    {/* Analysis Animation */}
                    {isAnalyzing && (
                        <div className="border border-slate-800 rounded-3xl p-12 bg-slate-900/50 mb-8">
                            <div className="flex flex-col items-center">
                                {/* Animated Brain */}
                                <div className="relative mb-10">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/40">
                                        <Brain className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping" />
                                </div>

                                {/* Steps */}
                                <div className="space-y-4 w-full max-w-md">
                                    {ANALYSIS_STEPS.map((step, idx) => {
                                        const StepIcon = step.icon;
                                        const isActive = idx === analysisStep;
                                        const isComplete = idx < analysisStep;

                                        return (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-blue-500/10 border border-blue-500/30' : isComplete ? 'opacity-50' : 'opacity-20'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isComplete ? 'bg-blue-500 text-white' : isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'
                                                    }`}>
                                                    {isComplete ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                                                </div>
                                                <span className={`font-medium ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>{step.text}</span>
                                                {isActive && <Loader2 className="w-4 h-4 text-blue-400 animate-spin ml-auto" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Input */}
                    {!generatedPath && !isAnalyzing && (
                        <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                                Décrivez votre objectif de carrière
                            </label>
                            <textarea
                                value={profileInput}
                                onChange={(e) => setProfileInput(e.target.value)}
                                placeholder="Ex: Je souhaite devenir développeur Web3 spécialisé dans les smart contracts Solidity. J'ai une base en programmation JavaScript et je veux apprendre à auditer du code..."
                                className="w-full h-40 bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors resize-none text-sm leading-relaxed"
                            />
                            <button
                                onClick={handleSubmitProfile}
                                disabled={!profileInput.trim()}
                                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                            >
                                <Send className="w-5 h-5" />
                                Analyser mon Profil
                            </button>
                        </div>
                    )}

                    {/* Generated Path */}
                    {generatedPath && !isAnalyzing && (
                        <>
                            <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50 mb-6">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Parcours Généré</h3>
                                        <p className="text-xs text-slate-500">Basé sur votre profil de sortie</p>
                                    </div>
                                </div>

                                <h4 className="text-2xl font-black mb-3 text-white">{generatedPath.title}</h4>
                                <p className="text-slate-400 mb-8 text-sm leading-relaxed">{generatedPath.description}</p>

                                {/* Modules */}
                                <div className="space-y-3 mb-8">
                                    {generatedPath.modules.map((module, idx) => (
                                        <div
                                            key={module.id}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                                        >
                                            <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">
                                                {idx + 1}
                                            </span>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm text-white">{module.title}</p>
                                                <p className="text-xs text-slate-500">{module.courses.length} cours • {module.estimatedDuration || '8h'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Adjustment Input */}
                                <div className="border-t border-slate-800 pt-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                                        Demander un ajustement
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={adjustmentPrompt}
                                            onChange={(e) => setAdjustmentPrompt(e.target.value)}
                                            placeholder="Ex: Ajouter plus de sécurité, réduire la durée..."
                                            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-sm"
                                        />
                                        <button
                                            onClick={handleRequestAdjustment}
                                            disabled={!adjustmentPrompt.trim() || isAdjusting}
                                            className="px-6 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-40 text-blue-400 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                                        >
                                            {isAdjusting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                            Ajuster
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Button → Now triggers diagnostic */}
                            <button
                                onClick={() => startDiagnostic(generatedPath, profileInput, 'ai')}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                            >
                                <FileQuestion className="w-5 h-5" />
                                Passer le Test Diagnostic
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Modular Builder Flow
    if (selectedFlow === 'modular') {
        return (
            <div className="min-h-screen p-6" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => { setSelectedFlow(null); setSelectedModules([]); setModuleAnalysis(null); }}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 text-slate-500 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Retour
                    </button>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left: Module Search */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                    <Puzzle className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white">Module Builder</h2>
                                    <p className="text-sm text-slate-500">Construisez votre parcours sur mesure</p>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rechercher un module..."
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-sm"
                                />
                            </div>

                            {/* Available Modules */}
                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                {filteredModules.map((module) => {
                                    const isSelected = selectedModules.some(m => m.id === module.id);
                                    return (
                                        <div
                                            key={module.id}
                                            onClick={() => !isSelected && handleAddModule(module)}
                                            className={`p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? 'opacity-40 bg-slate-800/30 border-slate-800' : 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/30'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-sm text-white">{module.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{module.category}</span>
                                                        <span className="text-[10px] text-slate-500">{module.duration}</span>
                                                        <span className="text-[10px] text-slate-500">{module.difficulty}</span>
                                                    </div>
                                                </div>
                                                {!isSelected && <Plus className="w-5 h-5 text-blue-400" />}
                                                {isSelected && <CheckCircle className="w-5 h-5 text-blue-400" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right: Selected Modules */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                <Layers className="w-5 h-5 text-blue-400" />
                                Mon Parcours ({selectedModules.length} modules)
                            </h3>

                            {selectedModules.length === 0 ? (
                                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center">
                                    <Puzzle className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                                    <p className="text-slate-500">Ajoutez des modules pour construire votre parcours</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2 mb-6">
                                        {selectedModules.map((module, idx) => (
                                            <div
                                                key={module.id}
                                                className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/50 flex items-center gap-4"
                                            >
                                                <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm text-white">{module.title}</p>
                                                    <p className="text-xs text-slate-500">{module.duration} • {module.difficulty}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveModule(module.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleAnalyzeModules}
                                        disabled={moduleAnalyzing}
                                        className="w-full border border-slate-700 bg-slate-800/50 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:border-blue-500/50 mb-4 text-white"
                                    >
                                        {moduleAnalyzing ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Analyse en cours...</>
                                        ) : (
                                            <><Brain className="w-4 h-4 text-blue-400" /> Analyser la Cohérence</>
                                        )}
                                    </button>

                                    {moduleAnalysis && (
                                        <div className={`p-6 rounded-2xl border mb-6 ${moduleAnalysis.coherent ? 'bg-blue-500/5 border-blue-500/20' : 'bg-yellow-500/5 border-yellow-500/20'
                                            }`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                {moduleAnalysis.coherent ? (
                                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                                ) : (
                                                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-white">
                                                        {moduleAnalysis.coherent ? 'Parcours Cohérent' : 'Ajustements Recommandés'}
                                                    </h4>
                                                    <p className="text-sm text-slate-500">
                                                        Profil de sortie : <span className="text-blue-400 font-bold">{moduleAnalysis.profile}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <ul className="space-y-2">
                                                {moduleAnalysis.suggestions.map((suggestion, i) => (
                                                    <li key={i} className="text-sm flex items-start gap-2 text-slate-400">
                                                        <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {moduleAnalysis?.coherent && (
                                        <button
                                            onClick={() => {
                                                const customPath: LearningPath = {
                                                    ...MOCK_LEARNING_PATHS[0],
                                                    id: `custom-${Date.now()}`,
                                                    title: 'Mon Parcours Personnalisé',
                                                    type: 'custom',
                                                    progress: 0
                                                };
                                                startDiagnostic(customPath, selectedModules.map(m => m.title).join(', '), 'modular');
                                            }}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                                        >
                                            <FileQuestion className="w-5 h-5" />
                                            Passer le Test Diagnostic
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Certified Tracks Flow
    if (selectedFlow === 'certified') {
        return (
            <div className="min-h-screen p-6 pb-20 overflow-y-auto" style={{ backgroundColor: '#020617' }}>
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => { setSelectedFlow(null); setSelectedCertifiedPath(null); setSearchQuery(''); }}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Retour
                        </button>
                        <div className="flex items-center gap-2 text-blue-500/60 text-[10px] font-black uppercase tracking-widest bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Contenu Premium</span>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-5xl font-black tracking-tight mb-4 text-white">
                            Certified Tracks
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Des parcours de haute intensité conçus par des experts pour propulser votre carrière Web3.
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Rechercher un parcours, une compétence (Solidity, Audit...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-white"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {certifiedCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCertifiedCategory(cat)}
                                    className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${certifiedCategory === cat
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Paths Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {PREDEFINED_PATHS_CATALOG
                            .filter(path => {
                                const lowerQuery = searchQuery.toLowerCase();
                                const matchesSearch = (path.title?.toLowerCase() || '').includes(lowerQuery) ||
                                    (path.skills?.some(s => s.toLowerCase().includes(lowerQuery)) || false);

                                const matchesCategory = certifiedCategory === 'Tous' ||
                                    (certifiedCategory === 'Développement' && (path.exitProfile === 'web3_developer' || path.exitProfile === 'fullstack_dapp')) ||
                                    (certifiedCategory === 'Sécurité' && (path.exitProfile === 'smart_contract_auditor' || path.exitProfile === 'security_expert')) ||
                                    (certifiedCategory === 'Infrastructure' && (path.exitProfile === 'blockchain_architect' || path.exitProfile === 'infra_engineer')) ||
                                    (certifiedCategory === 'DeFi' && path.exitProfile === 'defi_specialist');

                                return matchesSearch && matchesCategory;
                            })
                            .map((path) => (
                                <div
                                    key={path.id}
                                    onClick={() => setSelectedCertifiedPath(path)}
                                    className={`group relative border rounded-[32px] overflow-hidden transition-all duration-500 cursor-pointer flex flex-col ${selectedCertifiedPath?.id === path.id
                                        ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-2xl shadow-blue-500/20 scale-[1.02]'
                                        : 'border-slate-800 bg-slate-900/50 hover:border-blue-500/30'
                                        }`}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${path.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                                        {/* Badge Overlays */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                                CERTIFIÉ
                                            </span>
                                            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20">
                                                {path.estimatedDuration}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
                                                <Zap className="w-3 h-3 fill-current" />
                                                <span>{path.exitProfileLabel}</span>
                                            </div>
                                            <h3 className="text-2xl font-black tracking-tight text-white leading-tight">
                                                {path.title}
                                            </h3>
                                        </div>

                                        {selectedCertifiedPath?.id === path.id && (
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                                            {path.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                            {path.skills?.slice(0, 4).map((skill, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-blue-500/5 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-blue-500/10">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-dashed border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <Clock className="w-4 h-4 text-slate-500" />
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    {path.estimatedDuration}
                                                </span>
                                            </div>
                                            <div className="text-blue-500 text-xs font-black uppercase tracking-widest">
                                                {selectedCertifiedPath?.id === path.id ? 'SÉLECTIONNÉ' : 'DÉTAILS'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* No Results Fallback */}
                    {PREDEFINED_PATHS_CATALOG.filter(path => {
                        const matchesSearch = (path.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                            (path.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) || false);
                        const matchesCategory = certifiedCategory === 'Tous' ||
                            (certifiedCategory === 'Développement' && (path.exitProfile === 'web3_developer' || path.exitProfile === 'fullstack_dapp')) ||
                            (certifiedCategory === 'Sécurité' && (path.exitProfile === 'smart_contract_auditor' || path.exitProfile === 'security_expert')) ||
                            (certifiedCategory === 'Infrastructure' && (path.exitProfile === 'blockchain_architect' || path.exitProfile === 'infra_engineer')) ||
                            (certifiedCategory === 'DeFi' && path.exitProfile === 'defi_specialist');
                        return matchesSearch && matchesCategory;
                    }).length === 0 && (
                            <div className="text-center py-24 bg-white/5 rounded-[40px] border border-dashed border-slate-800">
                                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Aucun parcours trouvé</h3>
                                <p className="text-slate-500">Essayez une autre recherche ou changez de catégorie.</p>
                            </div>
                        )}

                    {/* Fixed Confirm Button (Sticky-like or Bottom Spaced) */}
                    {selectedCertifiedPath && (
                        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                            <button
                                onClick={() => {
                                    const fullPath: LearningPath = {
                                        ...MOCK_LEARNING_PATHS[0],
                                        id: selectedCertifiedPath.id || `certified-${Date.now()}`,
                                        title: selectedCertifiedPath.title || 'Parcours Certifiant',
                                        description: selectedCertifiedPath.description || '',
                                        type: 'predefined',
                                        progress: 0,
                                        skills: selectedCertifiedPath.skills || [],
                                        image: selectedCertifiedPath.image || ''
                                    };
                                    startDiagnostic(fullPath, `${selectedCertifiedPath.title} — ${(selectedCertifiedPath.skills || []).join(', ')}`, 'certified');
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/40 transform hover:-translate-y-1 active:scale-95"
                            >
                                <FileQuestion className="w-5 h-5" />
                                Passer le Test Diagnostic
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default PathFinderView;
