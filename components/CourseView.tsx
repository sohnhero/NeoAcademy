
import React, { useState } from 'react';
import { ChevronRight, Lock, CheckCircle2, Circle, MessageSquare, BookOpen, Target, Sparkles, Send, Zap, ArrowRight, ShieldCheck, Users, X } from 'lucide-react';
import { Course, Module } from '../types';
import { askTutor, evaluateModule } from '../services/geminiService';

interface CourseViewProps {
  course: Course;
  onModuleComplete: (moduleId: string, score: number) => void;
  onBack?: () => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, onModuleComplete, onBack }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules[0].id);
  const [userSubmission, setUserSubmission] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // Derived state to ensure we always have the latest module data (status, locks)
  const activeModule = course.modules.find(m => m.id === activeModuleId) || course.modules[0];

  const handleEvaluate = async () => {
    if (!userSubmission.trim()) return;
    setIsEvaluating(true);
    const result = await evaluateModule(
      activeModule.title,
      activeModule.content,
      activeModule.objectives,
      userSubmission,
      activeModule.llmConfig?.evaluationPrompt,
      activeModule.llmConfig?.strictness
    );
    setEvaluationResult(result);
    setIsEvaluating(false);

    // Scroll to feedback automatically
    setTimeout(() => {
      document.getElementById('audit-feedback')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    const tutorResponse = await askTutor(
      chatInput,
      `Module: ${activeModule.title}. ${activeModule.description}`,
      activeModule.llmConfig?.tutorContext
    );
    setChatMessages(prev => [...prev, { role: 'assistant', content: tutorResponse || '' }]);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-12 max-w-7xl mx-auto pb-32 pt-6">
      <div className="lg:hidden mb-4">
        <button onClick={onBack} className="hover:text-blue-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ArrowRight className="w-4 h-4 rotate-180" /> Retour au Registre
        </button>
      </div>

      {/* Curriculum Sidebar */}
      <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="hidden lg:flex w-10 h-10 rounded-full border items-center justify-center hover:text-blue-500 transition-all duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Parcours</h2>
        </div>
        <div className="space-y-4">
          {course.modules.map((m) => {
            const isActive = activeModuleId === m.id;
            const isCompleted = m.status === 'completed';
            const isLocked = m.isLocked && !isCompleted;

            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModuleId(m.id);
                  setEvaluationResult(null);
                  setUserSubmission('');
                }}
                disabled={isLocked}
                className={`w-full group text-left p-6 rounded-[24px] border transition-all duration-500 relative overflow-hidden ${isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20'
                  : isLocked
                    ? 'opacity-40 grayscale cursor-not-allowed'
                    : 'hover:border-blue-500/30'
                  }`}
                style={{
                  backgroundColor: !isActive && !isLocked ? 'var(--bg-secondary)' : (isLocked ? 'var(--bg-primary)' : undefined),
                  borderColor: !isActive ? 'var(--border-color)' : undefined,
                  color: !isActive ? 'var(--text-primary)' : undefined
                }}
              >
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="mt-1 flex-shrink-0">
                    {isCompleted ? (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 opacity-30" style={{ color: 'var(--text-primary)' }} />
                    ) : (
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white' : 'border-blue-500'}`}>
                        {isActive && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-tight mb-2 ${isLocked ? 'opacity-30' : ''}`}>{m.title}</p>
                    <p className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-blue-200' : ''}`} style={{ color: !isActive ? 'var(--text-muted)' : undefined }}>{m.duration}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border p-8 rounded-[32px] mt-12 relative overflow-hidden group transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 relative z-10">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h4 className="font-bold text-xl mb-3 tracking-tight relative z-10" style={{ color: 'var(--text-primary)' }}>Tuteur IA Neural</h4>
          <p className="text-xs leading-relaxed mb-8 font-medium uppercase tracking-wider relative z-10" style={{ color: 'var(--text-muted)' }}>
            Comblez le fossé entre la théorie et le code. Demandez des analogies concrètes.
          </p>

          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-lg relative z-10"
          >
            Initier le Nœud de Support
          </button>
        </div>
      </aside>

      {/* Main Content Node */}
      <div className="flex-1 space-y-12">
        <section className="border rounded-[48px] p-8 md:p-14 relative overflow-hidden shadow-2xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="relative z-10">
            <header className="mb-12">
              <div className="flex items-center space-x-3 text-blue-500 text-[10px] font-mono font-black mb-4 uppercase tracking-[0.3em]">
                <BookOpen className="w-4 h-4" />
                <span>Nœud d'Acquisition de Connaissances</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>{activeModule.title}</h1>
              <div className="h-1 w-20 bg-blue-600 rounded-full mb-8"></div>
            </header>

            <article className="prose prose-lg max-w-none leading-relaxed mb-16 font-medium relative transition-colors duration-500" style={{ color: 'var(--text-secondary)' }}>
              {activeModule.content.split('\n').map((para, i) => (
                <div key={i} className="mb-6 group relative">
                  <p>{para.trim()}</p>
                  <div className="absolute -right-4 top-0 translate-x-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setChatInput(`Explique moi ce concept autrement : "${para.substring(0, 50)}..."`);
                        setIsChatOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      title="Expliquer autrement"
                    >
                      <Sparkles className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setChatInput(`Donne moi un exemple concret pour : "${para.substring(0, 50)}..."`);
                        setIsChatOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      title="Donner un exemple"
                    >
                      <Zap className="w-3 h-3" />
                    </button>
                    <button
                      title="Prendre une note"
                      onClick={() => setIsNotesOpen(true)}
                      className="p-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    >
                      <BookOpen className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="border p-8 rounded-3xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Objectifs de Vérification
                </h4>
                <ul className="space-y-4">
                  {activeModule.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm group" style={{ color: 'var(--text-secondary)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Assessment Interface */}
            <div className="border-t pt-20 transition-colors duration-500" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Audit de Compétence</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Fournissez un récit complet des concepts appris.</p>
                </div>
                <div className="hidden sm:block text-[10px] font-mono px-4 py-2 rounded-lg uppercase tracking-widest border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Méthode : Vérification de Raisonnement Sémantique
                </div>
              </div>

              {activeModule.status === 'completed' ? (
                // SUCCESS GRAPHIC VIEW
                <div className="border rounded-[40px] p-12 text-center relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Module Validé !</h3>
                    <p className="font-medium mb-8" style={{ color: 'var(--text-muted)' }}>Votre compétence a été certifiée par le NŒud Neural.</p>

                    <div className="mb-10">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 tracking-tighter">
                        {activeModule.score || 95}%
                      </span>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mt-2">Score de Précision</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition"
                        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        Revoir le Contenu
                      </button>
                      {(course.modules.findIndex(m => m.id === activeModuleId) < course.modules.length - 1) && (
                        <button
                          onClick={() => {
                            const currentIndex = course.modules.findIndex(m => m.id === activeModuleId);
                            setActiveModuleId(course.modules[currentIndex + 1].id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition"
                        >
                          Module Suivant →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // NORMAL AUDIT FORM
                <div className="space-y-8">
                  {/* Coach Intervention Alert (Simulated Block) */}
                  {evaluationResult && !evaluationResult.isPassed && (
                    <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-3xl flex items-center justify-between animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Un coach est disponible pou vous aider</p>
                          <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Le système a détecté un point de friction complexe</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Solliciter de l'aide
                      </button>
                    </div>
                  )}

                  <div className="p-6 border-l-4 border-blue-600 rounded-r-2xl" style={{ backgroundColor: 'var(--glow-color)' }}>
                    <p className="font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      "Sur la base du contenu fourni, expliquez les transitions de la machine à états impliquées dans l'exécution d'une transaction et comment la gestion de la mémoire impacte l'efficacité globale du gas du système."
                    </p>
                  </div>

                  <textarea
                    value={userSubmission}
                    onChange={(e) => setUserSubmission(e.target.value)}
                    placeholder="Rédigez votre analyse technique ici..."
                    className="w-full border rounded-3xl p-8 h-64 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all font-mono text-sm leading-relaxed"
                    style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  />

                  <div className="flex justify-end items-center space-x-6">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-right max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
                      Soumettre au Nœud Neural pour vérification
                    </p>
                    <button
                      onClick={handleEvaluate}
                      disabled={isEvaluating || !userSubmission.trim()}
                      className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center space-x-4 shadow-xl shadow-blue-500/20 active:scale-95 group"
                    >
                      {isEvaluating ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Zap className="w-4 h-4 group-hover:animate-pulse" />
                      )}
                      <span>Transmettre le Rapport d'Audit</span>
                    </button>
                  </div>

                  {/* Audit Feedback Result */}
                  {evaluationResult && (
                    <div id="audit-feedback" className="p-10 rounded-[40px] border-2 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: evaluationResult.isPassed ? 'rgba(37, 99, 235, 0.2)' : 'var(--border-color)' }}>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                        <div className="flex items-center space-x-6">
                          <div className={`w-16 h-16 rounded-3xl ${evaluationResult.isPassed ? 'bg-blue-600 shadow-xl shadow-blue-500/20' : 'bg-slate-800'} flex items-center justify-center text-white`}>
                            {evaluationResult.isPassed ? <CheckCircle2 className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8 opacity-40" />}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Audit : {evaluationResult.isPassed ? 'Succès' : 'Révision Nécessaire'}</h4>
                            <p className={`text-[10px] font-mono font-bold uppercase tracking-[0.3em] ${evaluationResult.isPassed ? 'text-blue-500' : ''}`} style={{ color: !evaluationResult.isPassed ? 'var(--text-secondary)' : undefined }}>
                              {evaluationResult.isPassed ? 'NŒUD SYNCHRONISÉ' : 'CACHE LOCAL PURGÉ'}
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-black font-mono tracking-tighter" style={{ color: 'var(--text-primary)' }}>{evaluationResult.score}%</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Indice de Compétence</div>
                        </div>
                      </div>

                      <div className="max-w-none mb-10 leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                        "{evaluationResult.feedback}"
                      </div>

                      {evaluationResult.nextSteps && (
                        <div className="pt-10 border-t" style={{ borderColor: 'var(--border-color)' }}>
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Protocole d'Optimisation</p>
                          <div className="flex flex-wrap gap-3">
                            {evaluationResult.nextSteps.map((step: string, i: number) => (
                              <span key={i} className="border px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                <ArrowRight className="w-3 h-3 text-blue-500" /> {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {evaluationResult.isPassed && (
                        <div className="mt-10 flex justify-center">
                          <button
                            onClick={() => {
                              const currentIndex = course.modules.findIndex(m => m.id === activeModule.id);
                              if (currentIndex < course.modules.length - 1) {
                                onModuleComplete(activeModule.id, evaluationResult.score || 0);
                                // We tentatively switch to next module, assuming parent will unlock it. 
                                // Current mock data logic in App.tsx needs to handle this update synchronously or we might see a "locked" state briefly if we don't optimistic update or if parent is slow.
                                // For now, we trust parent updates quickly.
                                setActiveModuleId(course.modules[currentIndex + 1].id);
                                setUserSubmission('');
                                setEvaluationResult(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className="px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                          >
                            Déverrouiller le Prochain Nœud <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Notes Modal */}
      {isNotesOpen && (
        <div className="fixed top-24 right-8 bottom-8 w-full max-w-md border p-8 shadow-2xl z-[70] rounded-[40px] transform transition-all duration-500 ease-out flex flex-col animate-in slide-in-from-right-8" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border-color)', backdropFilter: 'blur(32px)' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <BookOpen className="w-5 h-5 text-blue-500" /> Mes Notes
            </h3>
            <button
              onClick={() => setIsNotesOpen(false)}
              className="hover:text-white p-2 rounded-xl transition-all duration-300 border hover:border-red-500/50 hover:bg-red-500/10 group"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <textarea
            className="flex-1 w-full border rounded-2xl p-6 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm leading-relaxed mb-4 transition-colors"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            placeholder="Prenez vos notes personnelles sur ce module ici..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <p className="text-[10px] text-center uppercase tracking-widest flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <CheckCircle2 className="w-3 h-3" /> Sauvegarde automatique
          </p>
        </div>
      )}

      {/* Tutor Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4 transition-all duration-500">
          <div className="border border-blue-500/20 w-full max-w-2xl h-[80vh] rounded-[48px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <header className="p-8 border-b flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Tuteur Nœud Neural</h3>
                  <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-widest">Assistance Contextuelle Active</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:text-white p-2 rounded-xl transition-all duration-300 border hover:border-red-500/50 hover:bg-red-500/10 group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-10 space-y-8">
              {chatMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                  <div className="w-24 h-24 rounded-full border border-blue-500/10 flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 opacity-10" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-bold uppercase tracking-widest text-xs" style={{ color: 'var(--text-muted)' }}>En attente d'entrée</p>
                    <p className="max-w-xs font-medium italic opacity-40 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      "J'ai indexé les spécificités techniques de {activeModule.title}. Demandez-moi de clarifier n'importe quel modèle architectural."
                    </p>
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[32px] ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'border rounded-tl-none font-medium transition-colors'
                    }`}
                    style={{
                      backgroundColor: msg.role === 'assistant' ? 'var(--bg-secondary)' : undefined,
                      borderColor: msg.role === 'assistant' ? 'var(--border-color)' : undefined,
                      color: msg.role === 'assistant' ? 'var(--text-primary)' : undefined
                    }}
                  >
                    <div className={`text-sm max-w-none leading-relaxed prose-p:mb-4 ${msg.role === 'assistant' ? 'prose prose-sm' : ''}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChat} className="p-8 border-t transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center space-x-4 rounded-3xl border px-6 py-2 focus-within:border-blue-500/50 transition-all shadow-inner" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Demander une clarification technique..."
                  className="flex-1 bg-transparent border-none outline-none py-4 text-sm font-medium transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 p-3 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-90"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseView;
