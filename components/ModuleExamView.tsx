
import React, { useState } from 'react';
import { ArrowLeft, Award, Clock, Target, CheckCircle2, XCircle, Send, Zap, AlertTriangle, BookOpen } from 'lucide-react';
import { ModuleExam, PathModule } from '../types';

interface ModuleExamViewProps {
    module: PathModule;
    exam: ModuleExam;
    onComplete: (passed: boolean, score: number) => void;
    onBack: () => void;
}

const ModuleExamView: React.FC<ModuleExamViewProps> = ({ module, exam, onComplete, onBack }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        const score = Math.floor(Math.random() * 35) + 65; // 65-100
        const passed = score >= exam.passingScore;

        setResult({
            passed,
            score,
            feedback: passed
                ? 'Félicitations ! Vous avez validé l\'examen du module. Le badge du module vous a été attribué et vous pouvez accéder au module suivant.'
                : 'L\'examen n\'est pas validé. Un cours de remédiation vous sera proposé pour renforcer vos acquis.'
        });
        setIsSubmitting(false);
    };

    const handleContinue = () => {
        if (result) {
            onComplete(result.passed, result.score);
        }
    };

    const allAnswered = exam.questions.every(q => answers[q.id]?.trim());

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

                <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-purple-500/20">
                    <Award className="w-4 h-4" />
                    <span>Examen de Module</span>
                </div>

                <h1 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                    {exam.title}
                </h1>
                <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {exam.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span style={{ color: 'var(--text-secondary)' }}>Durée : {exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <Target className="w-4 h-4 text-green-500" />
                        <span style={{ color: 'var(--text-secondary)' }}>Score minimum : {exam.passingScore}%</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span style={{ color: 'var(--text-secondary)' }}>Module : {module.title}</span>
                    </div>
                </div>
            </header>

            {!result ? (
                <>
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                                Question {currentQuestion + 1} / {exam.questions.length}
                            </span>
                            <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                                {Object.keys(answers).length} répondues
                            </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                            <div
                                className="h-full bg-purple-500 transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    <section className="border rounded-[40px] p-10 mb-8 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {currentQuestion + 1}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-purple-500/10 text-purple-500">
                                        {exam.questions[currentQuestion].type}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                        {exam.questions[currentQuestion].points} points
                                    </span>
                                </div>
                                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {exam.questions[currentQuestion].question}
                                </p>
                            </div>
                        </div>

                        <textarea
                            value={answers[exam.questions[currentQuestion].id] || ''}
                            onChange={(e) => setAnswers(prev => ({ ...prev, [exam.questions[currentQuestion].id]: e.target.value }))}
                            placeholder="Rédigez votre réponse..."
                            className="w-full border rounded-2xl p-6 h-40 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 outline-none transition-all font-mono text-sm"
                            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                    </section>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className="px-6 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest disabled:opacity-30 transition-colors"
                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                        >
                            Question Précédente
                        </button>

                        <div className="flex gap-2">
                            {exam.questions.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentQuestion(i)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentQuestion === i
                                            ? 'bg-purple-600 text-white'
                                            : answers[exam.questions[i].id]
                                                ? 'bg-green-500/20 text-green-500'
                                                : ''
                                        }`}
                                    style={{
                                        backgroundColor: currentQuestion !== i && !answers[exam.questions[i].id] ? 'var(--bg-secondary)' : undefined,
                                        color: currentQuestion !== i && !answers[exam.questions[i].id] ? 'var(--text-muted)' : undefined
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        {currentQuestion < exam.questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                            >
                                Question Suivante
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!allAnswered || isSubmitting}
                                className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                Soumettre l'Examen
                            </button>
                        )}
                    </div>
                </>
            ) : (
                /* Result View */
                <section className={`border-2 rounded-[40px] p-12 text-center ${result.passed ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                    }`}>
                    <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${result.passed ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                        {result.passed ? (
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        ) : (
                            <XCircle className="w-12 h-12 text-white" />
                        )}
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                        {result.passed ? 'Module Validé !' : 'Examen Non Validé'}
                    </h2>

                    <div className="mb-8">
                        <span className={`text-6xl font-black ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                            {result.score}%
                        </span>
                        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            Score minimum requis : {exam.passingScore}%
                        </p>
                    </div>

                    <p className="max-w-lg mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
                        {result.feedback}
                    </p>

                    {result.passed && module.badge && (
                        <div className="inline-flex items-center gap-4 p-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 mb-10">
                            <Award className="w-8 h-8 text-yellow-500" />
                            <div className="text-left">
                                <p className="font-bold text-yellow-500">Badge Obtenu !</p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{module.badge.name}</p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleContinue}
                        className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${result.passed
                                ? 'bg-green-500 hover:bg-green-400 text-white'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                            }`}
                    >
                        {result.passed ? 'Continuer vers le Module Suivant' : 'Accéder à la Remédiation'}
                    </button>
                </section>
            )}
        </div>
    );
};

export default ModuleExamView;
