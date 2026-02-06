
import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, BookOpen, Target, Zap, CheckCircle2, Send, Sparkles, X } from 'lucide-react';
import { Remediation, Course } from '../types';

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
    const [result, setResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);

    const handleEvaluate = async () => {
        if (!userSubmission.trim()) return;

        setIsEvaluating(true);
        // Simulate AI evaluation
        await new Promise(resolve => setTimeout(resolve, 2000));

        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        const passed = score >= remediation.exercise.passingScore;

        setResult({
            passed,
            score,
            feedback: passed
                ? 'Excellent ! Vous avez comblé les lacunes identifiées. Vous pouvez maintenant retenter l\'exercice du cours principal.'
                : 'Vous progressez, mais certains points nécessitent encore une révision. Reprenez le contenu de remédiation.'
        });
        setIsEvaluating(false);
    };

    const handleContinue = () => {
        if (result) {
            onComplete(result.passed, result.score);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <header className="mb-12">
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
            <section className="border rounded-[40px] p-10 mb-10 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Contenu de Remédiation</h2>
                </div>

                <div className="space-y-6">
                    {remediation.content.map((item) => (
                        <div key={item.id} className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-amber-500/10 text-amber-500">
                                    {item.type}
                                </span>
                                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                            </div>
                            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Exercise Section */}
            <section className="border rounded-[40px] p-10 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Exercice de Validation</h2>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Score minimum requis : {remediation.exercise.passingScore}%
                        </p>
                    </div>
                </div>

                {!result ? (
                    <div className="space-y-8">
                        <div className="p-6 border-l-4 border-blue-600 rounded-r-2xl" style={{ backgroundColor: 'var(--glow-color)' }}>
                            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                                {remediation.exercise.prompt}
                            </p>
                        </div>

                        <textarea
                            value={userSubmission}
                            onChange={(e) => setUserSubmission(e.target.value)}
                            placeholder="Rédigez votre réponse ici..."
                            className="w-full border rounded-3xl p-8 h-48 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all font-mono text-sm"
                            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />

                        <div className="flex justify-end">
                            <button
                                onClick={handleEvaluate}
                                disabled={isEvaluating || !userSubmission.trim()}
                                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all"
                            >
                                {isEvaluating ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Zap className="w-4 h-4" />
                                )}
                                <span>Valider la Remédiation</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`p-8 rounded-3xl border-2 ${result.passed ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${result.passed ? 'bg-green-500' : 'bg-amber-500'}`}>
                                {result.passed ? <CheckCircle2 className="w-7 h-7 text-white" /> : <AlertTriangle className="w-7 h-7 text-white" />}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                                    {result.passed ? 'Remédiation Validée !' : 'Continuez vos efforts'}
                                </h3>
                                <p className={`text-sm font-bold ${result.passed ? 'text-green-500' : 'text-amber-500'}`}>
                                    Score : {result.score}%
                                </p>
                            </div>
                        </div>

                        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                            {result.feedback}
                        </p>

                        <div className="flex gap-4">
                            {result.passed ? (
                                <button
                                    onClick={handleContinue}
                                    className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                                >
                                    Retenter le Cours Principal <Zap className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => { setResult(null); setUserSubmission(''); }}
                                    className="border px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                >
                                    Revoir le Contenu
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default RemediationView;
