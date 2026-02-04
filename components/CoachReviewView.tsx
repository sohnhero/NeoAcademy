import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, ShieldCheck, BrainCircuit, ExternalLink, Send, Sparkles, Clock } from 'lucide-react';

interface CoachReviewViewProps {
    reviewId: string;
    onBack: () => void;
    onComplete: () => void;
}

const CoachReviewView: React.FC<CoachReviewViewProps> = ({ reviewId, onBack, onComplete }) => {
    // In a real app, fetch the review detail. For now, use mock or constants.
    const [score, setScore] = useState(75);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReviewSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onComplete();
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/20 border border-slate-800 p-8 rounded-[40px]">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter">Audit de Compétence Manuel</h2>
                        <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-1">Évaluation de la logique complexe & Architecture</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Candidat</p>
                        <p className="font-bold text-white">Alice Vance</p>
                    </div>
                    <div className="w-[1px] h-10 bg-slate-800" />
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Module</p>
                        <p className="font-bold text-blue-500">Audit ZK-Rollups</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Submission Details */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-blue-500" /> Soumission de l'Apprenant
                        </h3>
                        <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 text-slate-300 leading-relaxed font-medium">
                            "J'ai implémenté le circuit circom, mais j'ai un doute sur la gestion du signal d'entrée public pour éviter les attaques de double dépense. J'ai utilisé un nullifier dérivé de la clé privée, mais est-ce suffisant sans une contrainte de multiplicité ?"
                        </div>

                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Soumis il y a 3h</span>
                            <span className="flex items-center gap-2 text-blue-500"><ExternalLink className="w-4 h-4" /> Voir le code sur GitHub</span>
                        </div>
                    </section>

                    <section className="bg-purple-900/10 border border-purple-500/20 rounded-[40px] p-10 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <BrainCircuit className="w-32 h-32 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold flex items-center gap-3 relative z-10 text-purple-100">
                            <Sparkles className="w-5 h-5 text-purple-400" /> Analyse Préliminaire IA
                        </h3>
                        <div className="bg-slate-950/50 p-8 rounded-3xl border border-purple-500/20 text-slate-300 leading-relaxed relative z-10 italic">
                            "L'IA a identifié une structure de circuit correcte. Le nullifier est bien implémenté, mais la question de l'apprenant sur la contrainte de multiplicité est pertinente pour la sécurité du smart contract de vérification. Score suggéré : 72/100."
                        </div>
                    </section>
                </div>

                {/* Right: Grading Pane */}
                <div className="space-y-8">
                    <section className="bg-slate-900/40 border border-blue-500/30 rounded-[40px] p-10 sticky top-8">
                        <h3 className="text-xl font-bold mb-8">Verdict du Coach</h3>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score de Compétence</label>
                                    <span className="text-2xl font-black text-blue-500">{score}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={score}
                                    onChange={(e) => setScore(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Feedback Constructif</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Détaillez vos conseils techniques..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 h-40 outline-none focus:border-blue-500 transition-all font-medium text-sm text-slate-300"
                                />
                            </div>

                            <div className="space-y-3 pt-4">
                                <button
                                    onClick={handleReviewSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    {isSubmitting ? 'Finalisation...' : <><CheckCircle className="w-4 h-4" /> Valider l'Audit</>}
                                </button>
                                <button className="w-full bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-500 hover:border-red-500/30 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all">
                                    <XCircle className="w-4 h-4" /> Rejeter pour Correction
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CoachReviewView;
