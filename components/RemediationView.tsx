
import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, BookOpen, Target, Zap, CheckCircle2, Send, Sparkles, X, ChevronRight, BrainCircuit, ShieldAlert, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Remediation, Course } from '../types';
import AIProcessOverlay from './AIProcessOverlay';

interface RemediationViewProps {
    remediation: Remediation;
    originalCourse: Course;
    onComplete: (passed: boolean, score: number) => void;
    onBack: () => void;
}

const RemediationView: React.FC<RemediationViewProps> = ({
    remediation,
    originalCourse,
    onComplete,
    onBack
}) => {
    const [userSubmission, setUserSubmission] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [showAIOverlay, setShowAIOverlay] = useState(false);
    const [step, setStep] = useState<'content' | 'verification'>('content');
    const [result, setResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);

    const handleStartVerification = () => {
        setStep('verification');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEvaluate = async () => {
        if (!userSubmission.trim()) return;

        setShowAIOverlay(true);
        // Overlay will call onComplete after animation
    };

    const handleOverlayComplete = async () => {
        setShowAIOverlay(false);
        setIsEvaluating(true);
        // Simulate AI evaluation after overlay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setResult({
            passed: true,
            score: 95,
            feedback: "Analyse neurale terminée. Votre maîtrise des concepts de sécurité et de gestion d'état est désormais solidement établie. Le nœud de connaissance est synchronisé. Vous pouvez maintenant retenter l'exercice du cours principal."
        });
        setIsEvaluating(false);
    };

    const handleContinue = () => {
        if (result) {
            onComplete(result.passed, result.score);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-6">
            <AIProcessOverlay
                isVisible={showAIOverlay}
                type="remediation"
                onComplete={handleOverlayComplete}
            />

            {/* Header */}
            <header className="mb-12 pt-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 hover:text-blue-500 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <ArrowLeft className="w-4 h-4" /> Retour
                </button>

                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Cours de Remédiation</span>
                </div>

                <h1 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                    {remediation.title}
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {remediation.description}
                </p>

                <div className="mt-6 p-4 rounded-2xl border bg-amber-500/5 border-amber-500/20">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <strong className="text-amber-500">Cours original :</strong> {originalCourse.title}
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                        <strong>Lacunes ciblées :</strong> {remediation.targetedGaps.join(', ')}
                    </p>
                </div>
            </header>

            {/* Content Section */}
            {step === 'content' ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <section className="border rounded-[48px] p-12 mb-10 transition-all border-amber-500/10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <BookOpen className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Parcours de Consolidation</h2>
                                <p className="text-sm opacity-60" style={{ color: 'var(--text-muted)' }}>Contenu ciblé pour vos besoins spécifiques.</p>
                            </div>
                        </div>

                        <div className="grid gap-8 mb-12">
                            {remediation.content.map((item) => (
                                <div key={item.id} className="p-8 rounded-[32px] border group hover:border-amber-500/30 transition-all" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                            {item.type}
                                        </span>
                                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                            <button
                                onClick={handleStartVerification}
                                className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                            >
                                <Zap className="w-4 h-4 text-amber-500" />
                                <span>Passer à la Vérification</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </section>
                </div>
            ) : (
                /* Exercise Section */
                <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                    <section className="border rounded-[48px] p-12 transition-all border-blue-500/10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Défi de Validation</h2>
                                    <p className="text-sm opacity-60" style={{ color: 'var(--text-muted)' }}>Score de précision requis : {remediation.exercise.passingScore}%</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep('content')}
                                className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2 transition-colors"
                            >
                                <ArrowLeft className="w-3 h-3" /> Revoir le contenu
                            </button>
                        </div>

                        {!result ? (
                            <div className="space-y-10">
                                <div className="p-8 rounded-[32px] border-l-8 border-blue-600 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-center gap-3 mb-4 opacity-40">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Énoncé du défi</span>
                                    </div>
                                    <p className="text-xl font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                        {remediation.exercise.prompt}
                                    </p>
                                </div>

                                <div className="group relative">
                                    <textarea
                                        value={userSubmission}
                                        onChange={(e) => setUserSubmission(e.target.value)}
                                        placeholder="Décrivez votre solution technique ici..."
                                        className="w-full border rounded-[32px] p-10 h-64 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-mono text-base leading-relaxed group-hover:shadow-2xl group-hover:shadow-blue-500/5"
                                        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                    />
                                    <div className="absolute bottom-6 right-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                                        Prêt pour l'audit IA
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleEvaluate}
                                        disabled={isEvaluating || !userSubmission.trim()}
                                        className="group relative bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white px-16 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center gap-4 shadow-2xl shadow-blue-500/40 transition-all active:scale-95"
                                    >
                                        <BrainCircuit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        <span>Soumettre pour Validation IA</span>
                                        <Send className="w-4 h-4 opacity-50" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`p-12 rounded-[40px] border-2 animate-in zoom-in-95 duration-500 ${result.passed ? 'border-green-500/30 bg-green-500/5 shadow-[0_0_100px_rgba(34,197,94,0.1)]' : 'border-amber-500/30 bg-amber-500/5 shadow-[0_0_100px_rgba(245,158,11,0.1)]'}`}>
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 ${result.passed ? 'bg-green-500 shadow-xl shadow-green-500/30' : 'bg-amber-500 shadow-xl shadow-amber-500/30'}`}>
                                        {result.passed ? <ShieldCheck className="w-12 h-12 text-white" /> : <AlertTriangle className="w-12 h-12 text-white" />}
                                    </div>

                                    <h3 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                                        {result.passed ? 'Maîtrise Validée' : 'Analyse Insuffisante'}
                                    </h3>

                                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-black text-sm uppercase mb-8 ${result.passed ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                        Indices de précision : {result.score}%
                                    </div>

                                    <p className="text-xl leading-relaxed max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
                                        {result.feedback}
                                    </p>

                                    <div className="flex gap-6">
                                        {result.passed ? (
                                            <button
                                                onClick={handleContinue}
                                                className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all shadow-2xl active:scale-95"
                                            >
                                                <span>Retour à l'Exercice Principal</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => { setResult(null); setUserSubmission(''); setStep('content'); }}
                                                className="border-2 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-white/5 transition-all"
                                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                <span>Reprendre l'étude</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};

export default RemediationView;
