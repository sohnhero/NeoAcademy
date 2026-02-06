
import React, { useState } from 'react';
import { ArrowLeft, Trophy, Clock, Calendar, Upload, CheckCircle2, AlertTriangle, FileText, Target, Zap, Bell, Award } from 'lucide-react';
import { FinalProject, LearningPath, Deliverable } from '../types';

interface FinalProjectViewProps {
    learningPath: LearningPath;
    project: FinalProject;
    onComplete: (passed: boolean, score: number) => void;
    onBack: () => void;
}

const FinalProjectView: React.FC<FinalProjectViewProps> = ({ learningPath, project, onComplete, onBack }) => {
    const [deliverables, setDeliverables] = useState<Record<string, string>>(
        Object.fromEntries(project.deliverables.map(d => [d.id, '']))
    );
    const [submittedDeliverables, setSubmittedDeliverables] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
    const [finalResult, setFinalResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);

    const getDaysRemaining = (deadline: string) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const handleSubmitDeliverable = async (deliverableId: string) => {
        if (!deliverables[deliverableId]?.trim()) return;

        setIsSubmitting(deliverableId);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmittedDeliverables(prev => new Set([...prev, deliverableId]));
        setIsSubmitting(null);
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting('final');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const score = Math.floor(Math.random() * 25) + 75; // 75-100
        const passed = score >= 70;

        setFinalResult({
            passed,
            score,
            feedback: passed
                ? 'Félicitations ! Vous avez brillamment réussi le projet final. Votre certification est validée !'
                : 'Le projet ne répond pas encore à tous les critères. Des cours de remédiation vous seront proposés.'
        });
        setIsSubmitting(null);
    };

    const allDeliverablesDone = project.deliverables.every(d => submittedDeliverables.has(d.id));

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <header className="mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 hover:text-blue-500 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <ArrowLeft className="w-4 h-4" /> Retour au Parcours
                </button>

                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/20">
                    <Trophy className="w-4 h-4" />
                    <span>Projet Final / Examen de Certification</span>
                </div>

                <h1 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                </h1>
                <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                </p>

                {/* Deadline Banner */}
                <div className={`p-6 rounded-2xl border flex items-center justify-between ${getDaysRemaining(project.globalDeadline) <= 7
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}>
                    <div className="flex items-center gap-4">
                        <Clock className={`w-6 h-6 ${getDaysRemaining(project.globalDeadline) <= 7 ? 'text-red-500' : 'text-blue-500'}`} />
                        <div>
                            <p className={`font-bold ${getDaysRemaining(project.globalDeadline) <= 7 ? 'text-red-500' : 'text-blue-500'}`}>
                                Deadline Globale
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {new Date(project.globalDeadline).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-3xl font-black ${getDaysRemaining(project.globalDeadline) <= 7 ? 'text-red-500' : 'text-blue-500'}`}>
                            {getDaysRemaining(project.globalDeadline)}
                        </span>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>jours restants</p>
                    </div>
                </div>
            </header>

            {!finalResult ? (
                <>
                    {/* Requirements */}
                    <section className="border rounded-[32px] p-8 mb-10 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-5 h-5 text-blue-500" />
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Exigences du Projet</h2>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-3 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span style={{ color: 'var(--text-secondary)' }}>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Deliverables */}
                    <section className="space-y-6 mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-5 h-5 text-purple-500" />
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Livrables à Soumettre</h2>
                        </div>

                        {project.deliverables.map((deliverable) => {
                            const daysLeft = getDaysRemaining(deliverable.deadline);
                            const isSubmitted = submittedDeliverables.has(deliverable.id);
                            const isUrgent = daysLeft <= 3 && !isSubmitted;

                            return (
                                <div
                                    key={deliverable.id}
                                    className={`border rounded-[24px] p-6 transition-all ${isSubmitted ? 'border-green-500/30 bg-green-500/5' :
                                            isUrgent ? 'border-red-500/30 bg-red-500/5' : ''
                                        }`}
                                    style={{
                                        backgroundColor: !isSubmitted && !isUrgent ? 'var(--bg-secondary)' : undefined,
                                        borderColor: !isSubmitted && !isUrgent ? 'var(--border-color)' : undefined
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                                    {deliverable.title}
                                                </h3>
                                                {isSubmitted && (
                                                    <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                                                        Soumis
                                                    </span>
                                                )}
                                                {isUrgent && (
                                                    <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1">
                                                        <Bell className="w-3 h-3" /> Urgent
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                {deliverable.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm" style={{ color: isUrgent ? 'rgb(239, 68, 68)' : 'var(--text-muted)' }}>
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {new Date(deliverable.deadline).toLocaleDateString('fr-FR')} ({daysLeft}j)
                                            </span>
                                        </div>
                                    </div>

                                    {!isSubmitted && (
                                        <div className="space-y-4">
                                            <textarea
                                                value={deliverables[deliverable.id]}
                                                onChange={(e) => setDeliverables(prev => ({ ...prev, [deliverable.id]: e.target.value }))}
                                                placeholder="Décrivez votre travail ou collez un lien vers votre livrable..."
                                                className="w-full border rounded-xl p-4 h-24 focus:border-blue-500 outline-none transition-all text-sm"
                                                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                            />
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleSubmitDeliverable(deliverable.id)}
                                                    disabled={!deliverables[deliverable.id]?.trim() || isSubmitting === deliverable.id}
                                                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                                                >
                                                    {isSubmitting === deliverable.id ? (
                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <Upload className="w-4 h-4" />
                                                    )}
                                                    Soumettre
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </section>

                    {/* Final Submit */}
                    {allDeliverablesDone && (
                        <div className="border-2 border-yellow-500/30 bg-yellow-500/10 rounded-[32px] p-8 text-center">
                            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
                                Tous les livrables sont soumis !
                            </h3>
                            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                                Vous pouvez maintenant soumettre votre projet à l'évaluation finale.
                            </p>
                            <button
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting === 'final'}
                                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 mx-auto transition-all"
                            >
                                {isSubmitting === 'final' ? (
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <Zap className="w-4 h-4" />
                                )}
                                Soumettre pour Certification
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* Final Result */
                <section className={`border-2 rounded-[40px] p-12 text-center ${finalResult.passed ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-500/5' : 'border-red-500/30 bg-red-500/5'
                    }`}>
                    <div className={`w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center ${finalResult.passed ? 'bg-gradient-to-br from-yellow-400 to-amber-500' : 'bg-red-500'
                        }`}>
                        {finalResult.passed ? (
                            <Award className="w-14 h-14 text-white" />
                        ) : (
                            <AlertTriangle className="w-14 h-14 text-white" />
                        )}
                    </div>

                    <h2 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                        {finalResult.passed ? 'Certification Obtenue !' : 'Projet à Réviser'}
                    </h2>

                    <div className="mb-8">
                        <span className={`text-7xl font-black ${finalResult.passed ? 'text-yellow-500' : 'text-red-500'}`}>
                            {finalResult.score}%
                        </span>
                    </div>

                    <p className="max-w-lg mx-auto mb-10 text-lg" style={{ color: 'var(--text-secondary)' }}>
                        {finalResult.feedback}
                    </p>

                    {finalResult.passed && (
                        <div className="inline-flex items-center gap-4 p-6 rounded-3xl border-2 border-yellow-500/30 bg-yellow-500/10 mb-10">
                            <Award className="w-10 h-10 text-yellow-500" />
                            <div className="text-left">
                                <p className="font-black text-xl text-yellow-500">Certification {learningPath.exitProfileLabel}</p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    Parcours : {learningPath.title}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => onComplete(finalResult.passed, finalResult.score)}
                        className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${finalResult.passed
                                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                            }`}
                    >
                        {finalResult.passed ? 'Voir mon Portfolio' : 'Accéder à la Remédiation'}
                    </button>
                </section>
            )}
        </div>
    );
};

export default FinalProjectView;
