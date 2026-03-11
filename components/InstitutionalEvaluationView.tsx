
import React, { useState } from 'react';
import {
    Target, CheckCircle2, Clock, ChevronRight, ChevronLeft,
    AlertCircle, Code, FileText, MessageSquare, Zap, Award,
    Timer, ArrowRight, Send
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

const MOCK_EVALUATION = {
    title: 'Évaluation Module 3 — Architecture DApp',
    type: 'Examen de Module',
    competencies: ['Intégrer Web3 au frontend', 'Gérer les wallets utilisateurs', 'Utiliser IPFS pour le stockage'],
    difficulty: 'Intermédiaire',
    duration: '2h 00min',
    totalQuestions: 8,
    passingScore: 70,
};

interface Question {
    id: string;
    type: 'mcq' | 'code' | 'scenario';
    question: string;
    options?: string[];
    competency: string;
    points: number;
    answered: boolean;
    selectedAnswer?: number;
    codeAnswer?: string;
    textAnswer?: string;
}

const MOCK_QUESTIONS: Question[] = [
    {
        id: 'q1', type: 'mcq', competency: 'Intégrer Web3 au frontend', points: 10, answered: true, selectedAnswer: 2,
        question: 'Quel est le rôle principal d\'un provider Web3 dans une DApp ?',
        options: [
            'Gérer l\'état de l\'interface utilisateur',
            'Compiler les smart contracts',
            'Établir la connexion entre le frontend et la blockchain',
            'Gérer la base de données centralisée',
        ],
    },
    {
        id: 'q2', type: 'mcq', competency: 'Gérer les wallets utilisateurs', points: 10, answered: true, selectedAnswer: 1,
        question: 'Quelle méthode est utilisée pour demander la connexion d\'un wallet MetaMask ?',
        options: [
            'ethereum.request({ method: "eth_requestAccounts" })',
            'ethereum.connect()',
            'web3.eth.getAccounts()',
            'window.metamask.login()',
        ],
    },
    {
        id: 'q3', type: 'code', competency: 'Intégrer Web3 au frontend', points: 20, answered: true,
        question: 'Écrivez une fonction React qui se connecte à MetaMask et retourne l\'adresse du wallet connecté. Utilisez ethers.js v6.',
        codeAnswer: `async function connectWallet() {\n  if (!window.ethereum) throw new Error("MetaMask not found");\n  const provider = new ethers.BrowserProvider(window.ethereum);\n  const signer = await provider.getSigner();\n  return await signer.getAddress();\n}`,
    },
    {
        id: 'q4', type: 'mcq', competency: 'Utiliser IPFS pour le stockage', points: 10, answered: true, selectedAnswer: 0,
        question: 'Quel est l\'avantage principal d\'IPFS par rapport au stockage centralisé ?',
        options: [
            'Adressage par contenu (CID) garantissant l\'intégrité des données',
            'Vitesse de lecture supérieure',
            'Coût nul de stockage',
            'Compatibilité native avec tous les navigateurs',
        ],
    },
    {
        id: 'q5', type: 'scenario', competency: 'Gérer les wallets utilisateurs', points: 15, answered: false,
        question: 'Un utilisateur se plaint que la DApp ne détecte pas le changement de réseau sur MetaMask. Décrivez votre approche pour résoudre ce problème et proposez une implémentation.',
    },
    {
        id: 'q6', type: 'code', competency: 'Intégrer Web3 au frontend', points: 20, answered: false,
        question: 'Implémentez un hook React personnalisé `useContract` qui prend une adresse de contrat et un ABI, et retourne une instance de contrat ethers.js avec gestion d\'erreur.',
    },
    {
        id: 'q7', type: 'mcq', competency: 'Utiliser IPFS pour le stockage', points: 10, answered: false,
        question: 'Comment stocker les métadonnées d\'un NFT de manière décentralisée ?',
        options: [
            'Stocker directement dans le smart contract',
            'Utiliser IPFS et enregistrer le CID dans le contrat',
            'Utiliser une base de données SQL',
            'Stocker dans le localStorage du navigateur',
        ],
    },
    {
        id: 'q8', type: 'scenario', competency: 'Intégrer Web3 au frontend', points: 15, answered: false,
        question: 'Votre DApp doit supporter plusieurs chaînes EVM (Ethereum, Polygon, Arbitrum). Décrivez l\'architecture que vous mettriez en place pour gérer le multi-chain de manière élégante.',
    },
];

// =====================================================
// COMPONENT
// =====================================================

interface InstitutionalEvaluationViewProps {
    onBack?: () => void;
}

const InstitutionalEvaluationView: React.FC<InstitutionalEvaluationViewProps> = ({ onBack }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState(MOCK_QUESTIONS);
    const [showOverview, setShowOverview] = useState(true);

    const answeredCount = questions.filter(q => q.answered).length;
    const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
    const progress = Math.round((answeredCount / questions.length) * 100);

    const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
        setQuestions(prev => prev.map((q, i) =>
            i === qIndex ? { ...q, selectedAnswer: optionIndex, answered: true } : q
        ));
    };

    const handleTextAnswer = (qIndex: number, text: string) => {
        setQuestions(prev => prev.map((q, i) =>
            i === qIndex ? { ...q, textAnswer: text, answered: text.length > 10 } : q
        ));
    };

    if (showOverview) {
        return (
            <div className="space-y-8 max-w-4xl mx-auto pb-20">
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={onBack}>Modules</span>
                    <ChevronRight className="w-3 h-3" />
                    <span style={{ color: 'var(--text-primary)' }}>Évaluation</span>
                </div>

                <section className="border rounded-[32px] p-10 text-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[80px] rounded-full -translate-x-1/3 -translate-y-1/3"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tighter mb-3" style={{ color: 'var(--text-primary)' }}>
                            {MOCK_EVALUATION.title}
                        </h1>
                        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                            {MOCK_EVALUATION.type} — Difficulté : {MOCK_EVALUATION.difficulty}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                            <div className="border rounded-2xl p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                <Clock className="w-4 h-4 text-blue-500 mx-auto mb-2" />
                                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{MOCK_EVALUATION.duration}</p>
                                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Durée</p>
                            </div>
                            <div className="border rounded-2xl p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                <FileText className="w-4 h-4 text-violet-500 mx-auto mb-2" />
                                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{MOCK_EVALUATION.totalQuestions}</p>
                                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Questions</p>
                            </div>
                            <div className="border rounded-2xl p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                <Target className="w-4 h-4 text-green-500 mx-auto mb-2" />
                                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{MOCK_EVALUATION.passingScore}%</p>
                                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Score Min.</p>
                            </div>
                            <div className="border rounded-2xl p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                                <Zap className="w-4 h-4 text-amber-500 mx-auto mb-2" />
                                <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{totalPoints}</p>
                                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Points Total</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Compétences Évaluées</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {MOCK_EVALUATION.competencies.map((c, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-xl border text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowOverview(false)}
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95"
                        >
                            Commencer l'Évaluation
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="max-w-5xl mx-auto pb-20">

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowOverview(true)} className="p-2 rounded-xl hover:bg-blue-500/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{MOCK_EVALUATION.title}</h2>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Question {currentQuestion + 1} sur {questions.length}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                        <Timer className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-primary)' }}>1:23:45</span>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Progression</p>
                        <p className="text-xs font-black text-blue-500">{answeredCount}/{questions.length} ({progress}%)</p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full overflow-hidden mb-8" style={{ backgroundColor: 'var(--border-color)' }}>
                <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Question Content */}
                <div className="lg:col-span-3">
                    <div className="border rounded-[24px] p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        {/* Question Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg ${q.type === 'mcq' ? 'bg-violet-500/10 text-violet-500' :
                                    q.type === 'code' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                {q.type === 'mcq' ? 'QCM' : q.type === 'code' ? 'Code' : 'Scénario'}
                            </span>
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-500">{q.points} pts</span>
                            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{q.competency}</span>
                        </div>

                        {/* Question Text */}
                        <h3 className="text-lg font-bold leading-relaxed mb-8" style={{ color: 'var(--text-primary)' }}>
                            {q.question}
                        </h3>

                        {/* MCQ Options */}
                        {q.type === 'mcq' && q.options && (
                            <div className="space-y-3">
                                {q.options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelectAnswer(currentQuestion, i)}
                                        className={`w-full text-left p-5 rounded-2xl border transition-all ${q.selectedAnswer === i
                                                ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/30'
                                                : 'hover:border-blue-500/30'
                                            }`}
                                        style={q.selectedAnswer !== i ? { borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' } : {}}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${q.selectedAnswer === i ? 'bg-blue-500 text-white' : ''
                                                }`} style={q.selectedAnswer !== i ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' } : {}}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Code/Scenario Answer */}
                        {(q.type === 'code' || q.type === 'scenario') && (
                            <div>
                                <textarea
                                    className="w-full h-48 p-5 rounded-2xl border resize-none font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                    placeholder={q.type === 'code' ? 'Écrivez votre code ici...' : 'Décrivez votre approche ici...'}
                                    value={q.codeAnswer || q.textAnswer || ''}
                                    onChange={(e) => handleTextAnswer(currentQuestion, e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <ChevronLeft className="w-4 h-4" /> Précédent
                        </button>
                        {currentQuestion < questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all hover:bg-blue-700 active:scale-95"
                            >
                                Suivant <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-lg active:scale-95">
                                <Send className="w-4 h-4" /> Soumettre
                            </button>
                        )}
                    </div>
                </div>

                {/* Question Navigator */}
                <div className="border rounded-[24px] p-6 h-fit" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Questions</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {questions.map((qq, i) => (
                            <button
                                key={qq.id}
                                onClick={() => setCurrentQuestion(i)}
                                className={`w-full aspect-square rounded-xl text-xs font-black flex items-center justify-center transition-all ${i === currentQuestion ? 'bg-blue-600 text-white ring-2 ring-blue-500/30' :
                                        qq.answered ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                            'border'
                                    }`}
                                style={i !== currentQuestion && !qq.answered ? { borderColor: 'var(--border-color)', color: 'var(--text-muted)' } : {}}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-500/10 border border-green-500/20"></div>
                            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Répondu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-600"></div>
                            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Actuelle</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded border" style={{ borderColor: 'var(--border-color)' }}></div>
                            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>En attente</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionalEvaluationView;
