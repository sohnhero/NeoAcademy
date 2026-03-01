import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Clock, Briefcase, Brain, Sparkles, ChevronRight,
    CheckCircle2, FileQuestion, ArrowRight, Activity, Zap, ShieldAlert
} from 'lucide-react';
import { LearningPath } from '../types';
import { MOCK_LEARNING_PATHS } from '../constants';

interface PathOnboardingFlowProps {
    onComplete: (path: LearningPath) => void;
    onBack: () => void;
    initialPath?: LearningPath | null;
}

type OnboardingStep =
    | 'form'
    | 'analyzing-form'
    | 'plan-preview'
    | 'diagnostic-intro'
    | 'diagnostic-quiz'
    | 'evaluating-quiz'
    | 'diagnostic-results';

export const PathOnboardingFlow: React.FC<PathOnboardingFlowProps> = ({ onComplete, onBack, initialPath }) => {
    // If we have an initial path, we can skip the form and go straight to preview/diagnostic
    const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialPath ? 'diagnostic-intro' : 'form');

    // Step 1 Form Data
    const [formData, setFormData] = useState({
        domain: '',
        targetSkill: '',
        level: '',
        timeAvailable: '',
        context: ''
    });

    // Diagnostic Quiz Data
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Animations states
    const [loadingText, setLoadingText] = useState('');

    const mockQuestions = [
        {
            id: 1,
            question: "Quelle est la principale différence entre Layer 1 et Layer 2 ?",
            options: [
                "Layer 1 est plus rapide, Layer 2 est plus sécurisé",
                "Layer 1 est la blockchain de base, Layer 2 s'appuie dessus pour la scalabilité",
                "Layer 2 remplace complètement Layer 1",
                "Il n'y a aucune différence technique"
            ]
        },
        {
            id: 2,
            question: "Dans un Smart Contract Solidity, à quoi sert le modificateur 'payable' ?",
            options: [
                "A payer les frais de gas",
                "A autoriser la fonction à recevoir de l'Ether",
                "A rendre le contrat open-source",
                "A définir le salaire du développeur"
            ]
        },
        {
            id: 3,
            question: "Qu'est-ce qu'une attaque par 'Reentrancy' ?",
            options: [
                "Un piratage du mot de passe",
                "Une faille permettant d'appeler plusieurs fois une fonction avant la mise à jour de l'état",
                "Une saturation du réseau (DDoS)",
                "Une erreur de compilation"
            ]
        }
    ];

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep('analyzing-form');
        simulateLoading([
            "Analyse de votre profil et de vos objectifs...",
            "Identification des compétences requises...",
            "Structuration du plan d'apprentissage personnalisé..."
        ], () => setCurrentStep('plan-preview'));
    };

    const handleQuizSubmit = () => {
        setCurrentStep('evaluating-quiz');
        simulateLoading([
            "Correction de vos réponses...",
            "Analyse de vos lacunes techniques...",
            "Ajustement algorithmique du parcours..."
        ], () => setCurrentStep('diagnostic-results'));
    };

    const simulateLoading = (steps: string[], callback: () => void) => {
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
        }, 1500);
    };

    // ---------------- RENDERS ----------------

    const renderForm = () => (
        <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleFormSubmit}
            className="max-w-2xl mx-auto space-y-6"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-4">Définissons vos objectifs</h2>
                <p className="text-slate-400">Aidez-nous à calibrer notre IA pour créer le parcours parfait pour vous.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Domaine principal</label>
                    <select required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white outline-none"
                        value={formData.domain} onChange={e => setFormData({ ...formData, domain: e.target.value })}>
                        <option value="">Sélectionnez un domaine</option>
                        <option value="web3">Développement Web3 / Smart Contracts</option>
                        <option value="defi">DeFi & Finance Décentralisée</option>
                        <option value="security">Sécurité & Audit de Contrats</option>
                        <option value="architecture">Architecture Blockchain</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Compétence cible</label>
                    <input required type="text" placeholder="Ex: Créer un DEX, Auditer un NFT..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white outline-none"
                        value={formData.targetSkill} onChange={e => setFormData({ ...formData, targetSkill: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Niveau Actuel</label>
                    <select required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white outline-none"
                        value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="beginner">Débutant (Aucune expérience)</option>
                        <option value="intermediate">Intermédiaire (Quelques bases)</option>
                        <option value="advanced">Avancé (Pratique déjà)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Temps disponible</label>
                    <select required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white outline-none"
                        value={formData.timeAvailable} onChange={e => setFormData({ ...formData, timeAvailable: e.target.value })}>
                        <option value="">Temps par semaine</option>
                        <option value="2h">~2h / semaine (Rythme chill)</option>
                        <option value="5h">~5h / semaine (Rythme régulier)</option>
                        <option value="10h">10h+ / semaine (Rythme intensif)</option>
                    </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Contexte de l'apprentissage</label>
                    <select required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white outline-none"
                        value={formData.context} onChange={e => setFormData({ ...formData, context: e.target.value })}>
                        <option value="">Pourquoi voulez-vous apprendre ?</option>
                        <option value="projet_perso">Projet personnel / Passion</option>
                        <option value="reconversion">Reconversion professionnelle</option>
                        <option value="freelance">Devenir Freelance</option>
                        <option value="startup">Lancer ma Startup</option>
                    </select>
                </div>
            </div>

            <div className="pt-8 flex justify-between items-center">
                <button type="button" onClick={onBack} className="text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Annuler
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                    Analyser mon profil <Sparkles className="w-4 h-4" />
                </button>
            </div>
        </motion.form>
    );

    const renderLoading = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center space-y-8 py-20"
        >
            <div className="w-24 h-24 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse"></div>
                <Brain className="w-10 h-10 text-blue-500 relative z-10 animate-bounce" />
            </div>
            <div>
                <h3 className="text-xl font-black mb-2 animate-pulse">Traitement Neural en cours</h3>
                <p className="text-blue-400 font-mono text-xs">{loadingText}</p>
            </div>
        </motion.div>
    );

    const renderPlanPreview = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-8"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4" /> Plan Préliminaire Généré
                </div>
                <h2 className="text-3xl font-black mb-4">Voici ce que nous visons</h2>
                <p className="text-slate-400">Objectifs projetés basés sur vos informations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <Target className="w-8 h-8 text-blue-500 mb-4" />
                    <h4 className="font-bold text-white mb-2">Objectifs Mesurables</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                        <li>• Maîtriser {formData.targetSkill || 'les concepts clés'}</li>
                        <li>• Déployer 3 projets pratiques</li>
                        <li>• Obtenir la certification finale</li>
                    </ul>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <Brain className="w-8 h-8 text-purple-500 mb-4" />
                    <h4 className="font-bold text-white mb-2">Compétences Ciblées</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                        <li>• Smart Contracts</li>
                        <li>• Intégration Web3.js</li>
                        <li>• Sécurité de base</li>
                    </ul>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <Clock className="w-8 h-8 text-yellow-500 mb-4" />
                    <h4 className="font-bold text-white mb-2">Durée Estimée</h4>
                    <div className="text-3xl font-black mt-2">12 <span className="text-base text-slate-500 font-normal">Semaines</span></div>
                    <p className="text-xs text-slate-500 mt-2">À raison de {formData.timeAvailable || '5h'} / semaine</p>
                </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-start gap-4 mt-8">
                <Activity className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white mb-1">Étape suivante : Personnalisation profonde</h4>
                    <p className="text-sm text-slate-400">Pour adapter parfaitement la difficulté de ce parcours, nous devons évaluer votre niveau technique réel avec un bref diagnostic.</p>
                </div>
            </div>

            <div className="pt-6 text-center">
                <button
                    onClick={() => setCurrentStep('diagnostic-intro')}
                    className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                >
                    Passer le Diagnostic Initial <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );

    const renderDiagnosticIntro = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center space-y-8 py-10"
        >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <FileQuestion className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
                <h2 className="text-3xl font-black mb-4">Diagnostic Initial</h2>
                <p className="text-slate-400 text-lg">3 questions rapides pour calibrer la complexité de votre parcours.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-left space-y-4">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-300">Ne vous inquiétez pas si vous ne connaissez pas les réponses.</span>
                </div>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-300">Cela sert uniquement à identifier vos pré-requis.</span>
                </div>
            </div>
            <button
                onClick={() => setCurrentStep('diagnostic-quiz')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all text-lg"
            >
                Démarrer le Test
            </button>
        </motion.div>
    );

    const renderQuiz = () => {
        const q = mockQuestions[currentQuestion];

        return (
            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl mx-auto space-y-8"
            >
                <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                    <span>Question {currentQuestion + 1} sur {mockQuestions.length}</span>
                    <span className="text-emerald-500">{Math.round(((currentQuestion) / mockQuestions.length) * 100)}% complété</span>
                </div>

                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((currentQuestion) / mockQuestions.length) * 100}%` }}></div>
                </div>

                <h3 className="text-2xl font-black leading-snug">{q.question}</h3>

                <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                            className={`w-full text-left p-5 rounded-2xl border transition-all ${answers[q.id] === opt
                                ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        disabled={!answers[q.id]}
                        onClick={() => {
                            if (currentQuestion < mockQuestions.length - 1) {
                                setCurrentQuestion(prev => prev + 1);
                            } else {
                                handleQuizSubmit();
                            }
                        }}
                        className="disabled:opacity-50 bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
                    >
                        {currentQuestion < mockQuestions.length - 1 ? 'Question Suivante' : 'Terminer le diagnostic'} <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        );
    };

    const renderResults = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto space-y-8"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                    <Sparkles className="w-4 h-4" /> Profil Technique Formé
                </div>
                <h2 className="text-3xl font-black mb-4">Résultats du Diagnostic</h2>
                <p className="text-slate-400">Le parcours a été adapté à vos résultats.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Niveau Évalué</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                        Intermédiaire <Activity className="w-5 h-5 text-emerald-500" />
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Vous avez de bonnes bases mais certains concepts profonds vous échappent.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Pré-requis Manquants</div>
                    <div className="text-lg font-bold text-orange-400 flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-5 h-5" /> Sécurité des Smart Contracts
                    </div>
                    <p className="text-sm text-slate-400">Des lacunes identifiées sur les attaques courantes (Reentrancy).</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-8 rounded-2xl text-center">
                <h3 className="text-xl font-black text-white mb-2">Recommandation de l'IA</h3>
                <p className="text-blue-200 mb-6">Nous avons ajouté un module de renforcement sur la sécurité Web3 avant d'aborder la création de DEX.</p>

                <button
                    onClick={() => onComplete(initialPath || MOCK_LEARNING_PATHS[0])} // Use the provided path or mock
                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
                >
                    Générer mon parcours définitif
                </button>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-[80vh] flex flex-col justify-center py-20 px-4">
            <AnimatePresence mode="wait">
                {currentStep === 'form' && renderForm()}
                {currentStep === 'analyzing-form' && renderLoading()}
                {currentStep === 'plan-preview' && renderPlanPreview()}
                {currentStep === 'diagnostic-intro' && renderDiagnosticIntro()}
                {currentStep === 'diagnostic-quiz' && renderQuiz()}
                {currentStep === 'evaluating-quiz' && renderLoading()}
                {currentStep === 'diagnostic-results' && renderResults()}
            </AnimatePresence>
        </div>
    );
};

export default PathOnboardingFlow;
