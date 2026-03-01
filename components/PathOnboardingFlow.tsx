import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronRight, CheckCircle2, FileCode2, ArrowRight, Activity, MessageSquare, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { LearningPath } from '../types';
import { MOCK_LEARNING_PATHS } from '../constants';

interface PathOnboardingFlowProps {
    onComplete: (path: LearningPath) => void;
    onBack: () => void;
    initialPath?: LearningPath | null;
}

type OnboardingStep =
    | 'intro'
    | 'diagnostic-qcm'
    | 'diagnostic-open'
    | 'diagnostic-code'
    | 'evaluating'
    | 'path-preview'
    | 'generating';

const PathOnboardingFlow: React.FC<PathOnboardingFlowProps> = ({ onComplete, onBack, initialPath }) => {
    // Current state in the 1-week diagnostic flow
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');

    // Test data
    const [qcmAnswer, setQcmAnswer] = useState<string>('');
    const [openAnswer, setOpenAnswer] = useState<string>('');
    const [codeAnswer, setCodeAnswer] = useState<string>('function optimizeGas() {\n  // Votre code ici\n}');

    // Path modification prompt
    const [userPrompt, setUserPrompt] = useState('');
    const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(initialPath || null);

    // Animations text
    const [loadingText, setLoadingText] = useState('');

    const runLoader = (steps: string[], durationMs: number = 3000, callback: () => void) => {
        let i = 0;
        setLoadingText(steps[0]);
        const interval = setInterval(() => {
            i++;
            if (i < steps.length) {
                setLoadingText(steps[i]);
            } else {
                clearInterval(interval);
                callback();
            }
        }, durationMs / steps.length);
    };

    // ---------------- HANDLERS ----------------

    const handleStartDiagnostic = () => {
        setCurrentStep('diagnostic-qcm');
    };

    const handleQcmSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep('diagnostic-open');
    };

    const handleOpenSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep('diagnostic-code');
    };

    const handleCodeSubmit = () => {
        setCurrentStep('evaluating');
        runLoader([
            "Analyse de vos réponses QCM...",
            "Évaluation de votre approche architecturale...",
            "Audit de votre code (complexité cyclomatique, sécurité)...",
            "Génération de votre profil de compétences...",
            "Construction du parcours personnalisé..."
        ], 4000, () => {
            // Mock generating a path based on evaluation
            setGeneratedPath(MOCK_LEARNING_PATHS[0]); // Using Blockchain Architect for demo
            setCurrentStep('path-preview');
        });
    };

    const handleRegeneratePath = () => {
        if (!userPrompt.trim()) return;

        setCurrentStep('generating');
        runLoader([
            "Analyse de votre requête : '" + userPrompt + "'...",
            "Restructuration des modules...",
            "Ajustement du focus théorique vs pratique...",
            "Finalisation du nouveau parcours..."
        ], 3000, () => {
            // Mock regeneration (in a real app, we'd update generatedPath here)
            setUserPrompt('');
            setCurrentStep('path-preview');
        });
    };

    const handleConfirmPath = () => {
        if (generatedPath) {
            onComplete(generatedPath);
        }
    };

    // ---------------- RENDERS ----------------

    const renderIntro = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-8 text-center pt-8">
            <div className="w-20 h-20 mx-auto bg-[#2964ea]/10 rounded-2xl flex items-center justify-center border border-[#2964ea]/30">
                <Brain className="w-10 h-10 text-[#2964ea]" />
            </div>

            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Phase de Diagnostic <span className="text-[#2964ea]">Intensif</span></h2>
                <p className="text-slate-400 text-lg">Semaine 1 : Évaluation Globale</p>
            </div>

            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl text-left space-y-4 shadow-xl">
                <p className="text-slate-300 leading-relaxed">
                    Avant de plonger dans le programme, nous devons déterminer votre niveau exact.
                    Cette phase simule une première <strong className="text-white">semaine d'évaluation en entreprise</strong>.
                </p>
                <div className="space-y-3 pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-3 text-slate-300 bg-[#0a0f1a] p-3 rounded-lg border border-slate-800/50">
                        <CheckCircle2 className="w-5 h-5 text-[#2964ea]" />
                        <span className="text-sm font-medium">Tests de connaissances techniques (QCM)</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-[#0a0f1a] p-3 rounded-lg border border-slate-800/50">
                        <MessageSquare className="w-5 h-5 text-[#2964ea]" />
                        <span className="text-sm font-medium">Question de réflexion architecturale</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 bg-[#0a0f1a] p-3 rounded-lg border border-slate-800/50">
                        <FileCode2 className="w-5 h-5 text-[#2964ea]" />
                        <span className="text-sm font-medium">Simulation de revue de code / Algorithmie</span>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex justify-between items-center">
                <button type="button" onClick={onBack} className="text-slate-500 hover:text-white transition-colors text-sm font-semibold">
                    Retour
                </button>
                <button onClick={handleStartDiagnostic} className="bg-[#2964ea] hover:bg-[#1e4eb8] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#2964ea]/20">
                    Démarrer l'évaluation <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );

    const renderQcm = () => (
        <motion.form onSubmit={handleQcmSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div>
                    <span className="text-[#2964ea] font-mono text-xs font-bold tracking-widest uppercase">Étape 1/3</span>
                    <h3 className="text-xl font-bold text-white mt-1">Fondamentaux Techniques</h3>
                </div>
                <div className="w-10 h-10 bg-[#0f172a] rounded-full border border-slate-800 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="text-lg text-slate-200">Quelle est la principale différence architecturale entre un réseau Layer 1 et Layer 2 ?</h4>
                <div className="space-y-3">
                    {[
                        "A. Layer 1 est asynchrone, Layer 2 est synchrone.",
                        "B. Layer 1 assure le consensus (sécurité), Layer 2 délègue l'exécution pour la scalabilité.",
                        "C. Layer 2 remplace complètement la machine d'état du Layer 1.",
                        "D. Il n'y a aucune différence technique, ce sont des termes marketing."
                    ].map((opt) => (
                        <label key={opt} className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer border transition-colors ${qcmAnswer === opt ? 'bg-[#2964ea]/10 border-[#2964ea]' : 'bg-[#0f172a] border-slate-800 hover:border-slate-700'}`}>
                            <input
                                type="radio"
                                name="qcm"
                                value={opt}
                                checked={qcmAnswer === opt}
                                onChange={(e) => setQcmAnswer(e.target.value)}
                                className="mt-1"
                                required
                            />
                            <span className="text-sm text-slate-300 leading-relaxed font-medium">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pt-6 flex justify-between items-center border-t border-slate-800">
                <button type="button" onClick={() => setCurrentStep('intro')} className="text-slate-500 hover:text-white font-semibold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Précédent
                </button>
                <button type="submit" disabled={!qcmAnswer} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${qcmAnswer ? 'bg-[#2964ea] hover:bg-[#1e4eb8] text-white shadow-lg shadow-[#2964ea]/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                    Suivant <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.form>
    );

    const renderOpen = () => (
        <motion.form onSubmit={handleOpenSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div>
                    <span className="text-[#2964ea] font-mono text-xs font-bold tracking-widest uppercase">Étape 2/3</span>
                    <h3 className="text-xl font-bold text-white mt-1">Réflexion Architecturale</h3>
                </div>
                <div className="w-10 h-10 bg-[#0f172a] rounded-full border border-slate-800 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-md">
                    <h4 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-[#2964ea]" /> Cas Pratique :
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Un client institutionnel souhaite lancer un DEX (Decentralized Exchange) où les utilisateurs paient le moins de frais de gas possibles, sans compromettre la sécurité des fonds.
                        Expliquez brièvement les choix d'architecture que vous lui recommanderiez (réseau, design pattern, gestion off-chain/on-chain).
                    </p>
                </div>

                <textarea
                    required
                    rows={8}
                    placeholder="Votre analyse argumentée ici..."
                    className="w-full bg-[#050810] border border-slate-800 rounded-xl p-5 text-sm text-slate-300 focus:border-[#2964ea] focus:ring-1 focus:ring-[#2964ea] outline-none resize-none shadow-inner"
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                />
            </div>

            <div className="pt-6 flex justify-between items-center border-t border-slate-800">
                <button type="button" onClick={() => setCurrentStep('diagnostic-qcm')} className="text-slate-500 hover:text-white font-semibold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Précédent
                </button>
                <button type="submit" disabled={openAnswer.length < 20} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${openAnswer.length >= 20 ? 'bg-[#2964ea] hover:bg-[#1e4eb8] text-white shadow-lg shadow-[#2964ea]/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                    Suivant <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.form>
    );

    const renderCode = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div>
                    <span className="text-[#2964ea] font-mono text-xs font-bold tracking-widest uppercase">Étape 3/3</span>
                    <h3 className="text-xl font-bold text-white mt-1">Épreuve de Code / Sécurité</h3>
                </div>
                <div className="w-10 h-10 bg-[#0f172a] rounded-full border border-slate-800 flex items-center justify-center">
                    <FileCode2 className="w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="bg-[#0f172a] p-5 rounded-xl border border-[#2964ea]/30 flex items-start gap-4 shadow-[#2964ea]/5 shadow-lg">
                <AlertCircle className="w-5 h-5 text-[#2964ea] shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-slate-200 text-sm mb-2">Vulnérabilité Reentrancy</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Le contrat ci-dessous gère des retraits de fonds. Sécurisez ce processus (conceptuellement ou en pseudo-code court).
                    </p>
                </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#050810] shadow-2xl">
                <div className="flex items-center bg-[#0a0f1a] px-4 py-3 border-b border-slate-800">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-4">Vault.sol (Extrait)</span>
                </div>
                <textarea
                    className="w-full text-sm font-mono text-slate-300 bg-transparent p-5 min-h-[250px] outline-none resize-none selection:bg-[#2964ea]/30"
                    value={codeAnswer}
                    onChange={(e) => setCodeAnswer(e.target.value)}
                    spellCheck={false}
                />
            </div>

            <div className="pt-6 flex justify-between items-center">
                <button type="button" onClick={() => setCurrentStep('diagnostic-open')} className="text-slate-500 hover:text-white font-semibold flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Précédent
                </button>
                <button onClick={handleCodeSubmit} className="bg-[#2964ea] hover:bg-[#1e4eb8] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#2964ea]/30">
                    Soumettre l'Évaluation <CheckCircle2 className="w-5 h-5 ml-1" />
                </button>
            </div>
        </motion.div>
    );

    const renderLoading = () => (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-10 py-24">
            <div className="relative w-32 h-32 mx-auto">
                {/* Clean, modern dark mode orbital animation */}
                <div className="absolute inset-0 bg-transparent border-[3px] border-t-transparent border-r-transparent border-[#2964ea]/20 rounded-full animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-2 bg-transparent border-[2px] border-b-transparent border-l-transparent border-[#2964ea]/40 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                <div className="relative w-full h-full bg-[#0a0f1a] rounded-full flex items-center justify-center border border-slate-800 shadow-[0_0_50px_rgba(41,100,234,0.15)] z-10">
                    <Brain className="w-10 h-10 text-[#2964ea] animate-pulse" />
                </div>
            </div>

            <div className="space-y-4 max-w-xs mx-auto">
                <h3 className="text-2xl font-bold text-white tracking-tight">Analyse de Profil</h3>

                {/* Modern subtle loading bar */}
                <div className="h-1 w-full bg-slate-800/50 rounded-full overflow-hidden my-4 relative">
                    <div className="absolute top-0 bottom-0 w-1/3 bg-[#2964ea] rounded-full opacity-80 blur-[2px] animate-[shimmer_1.5s_infinite_ease-in-out]" />
                    <div className="absolute top-0 bottom-0 w-1/4 bg-white rounded-full opacity-40 animate-[shimmer_1.5s_infinite_ease-in-out]" style={{ animationDelay: '0.1s' }} />
                </div>

                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                    {loadingText}
                </p>
            </div>
        </motion.div>
    );

    const renderPreview = () => {
        if (!generatedPath) return null;

        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">

                <div className="text-center space-y-3 mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2964ea]/10 text-[#2964ea] text-xs font-bold border border-[#2964ea]/20">
                        <CheckCircle2 className="w-4 h-4" /> Analyse Terminée
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Programme d'Études Suggéré</h2>
                    <p className="text-slate-400 text-lg">Curriculum conçu intelligemment basé sur votre niveau réel.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Path Details (Left Column) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{generatedPath.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{generatedPath.description}</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-500 text-xs tracking-[0.2em] uppercase mb-4">Aperçu du Curriculum</h4>
                                <div className="space-y-4">
                                    {generatedPath.modules.slice(0, 4).map((mod, idx) => (
                                        <div key={mod.id} className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0f1a] border border-slate-800/60 hover:border-[#2964ea]/30 transition-colors group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800/80 group-hover:bg-[#2964ea]/10 flex items-center justify-center text-slate-400 group-hover:text-[#2964ea] font-bold text-sm transition-colors border border-slate-700/50">
                                                    0{idx + 1}
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-slate-200">{mod.title}</h5>
                                                    <div className="flex gap-4 mt-1">
                                                        <span className="text-xs text-slate-500 font-medium">{mod.courses.length} unités</span>
                                                        <span className="text-xs text-[#2964ea]/70 font-medium">Validations requises</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {generatedPath.modules.length > 4 && (
                                        <div className="text-center text-xs font-bold text-slate-500 py-3 uppercase tracking-wider">
                                            + {generatedPath.modules.length - 4} autres modules
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Adjustment Box (Right Column) */}
                    <div className="space-y-6">
                        {/* AI Prompting Modifier */}
                        <div className="bg-[#0a0f1a] border border-[#2964ea]/30 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-[#2964ea]/5">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2964ea] to-transparent opacity-50"></div>

                            <h4 className="font-bold text-white flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-[#2964ea]" /> Ajustement du Programme
                            </h4>
                            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                                Donnez vos directives à l'IA pour ajuster ce programme.
                            </p>

                            <div className="relative">
                                <textarea
                                    rows={5}
                                    placeholder="Ex: 'Ajoute un focus sur React, je veux moins de théorie.'"
                                    className="w-full bg-[#050810] text-sm text-slate-200 border border-slate-800 rounded-xl p-4 pr-12 focus:outline-none focus:border-[#2964ea] transition-colors resize-none mb-2"
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleRegeneratePath}
                                disabled={!userPrompt.trim()}
                                className="w-full bg-[#0f172a] hover:bg-slate-800 border border-slate-700 hover:border-[#2964ea]/50 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all mt-2"
                            >
                                <RefreshCw className="w-4 h-4 text-[#2964ea]" /> Regénérer le Curriculum
                            </button>
                        </div>

                        {/* Metadatas */}
                        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Métriques Estimées</h4>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Durée d'apprentissage</span>
                                        <span className="text-white font-bold">~12 semaines</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-500 rounded-full w-2/3"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Complexité / Niveau</span>
                                        <span className="text-[#2964ea] font-bold">Avancé</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#2964ea] shadow-[0_0_10px_#2964ea] rounded-full w-4/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-10">
                    <button onClick={handleConfirmPath} className="bg-[#2964ea] hover:bg-[#1e4eb8] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-[#2964ea]/20 text-lg">
                        Accepter le Programme et Démarrer <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 bg-[#050810] font-sans">
            <AnimatePresence mode="wait">
                {currentStep === 'intro' && <motion.div key="intro" className="w-full">{renderIntro()}</motion.div>}
                {currentStep === 'diagnostic-qcm' && <motion.div key="qcm" className="w-full">{renderQcm()}</motion.div>}
                {currentStep === 'diagnostic-open' && <motion.div key="open" className="w-full">{renderOpen()}</motion.div>}
                {currentStep === 'diagnostic-code' && <motion.div key="code" className="w-full">{renderCode()}</motion.div>}
                {currentStep === 'evaluating' && <motion.div key="eval" className="w-full">{renderLoading()}</motion.div>}
                {currentStep === 'generating' && <motion.div key="gen" className="w-full">{renderLoading()}</motion.div>}
                {currentStep === 'path-preview' && <motion.div key="preview" className="w-full">{renderPreview()}</motion.div>}
            </AnimatePresence>

            <style>{`
                 @keyframes shimmer {
                    100% { transform: translateX(300px); }
                 }
            `}</style>
        </div>
    );
};

export default PathOnboardingFlow;
