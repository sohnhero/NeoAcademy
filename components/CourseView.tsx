
import React, { useState, useMemo } from 'react';
import {
  ChevronRight, ChevronDown, Lock, CheckCircle2, Circle, MessageSquare,
  BookOpen, Target, Sparkles, Send, Zap, ArrowRight, ShieldCheck,
  Users, X, Play, FileText, BarChart3, Headphones, Code, Award, Terminal,
  Lightbulb, BrainCircuit, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course, LearningPath, PathModule, Remediation, ProjectPlan, UserSubscription } from '../types';
import { askTutor, evaluateModule } from '../services/geminiService';
import RemediationView from './RemediationView';
import DeadlineQuickView from './DeadlineQuickView';

interface CourseViewProps {
  learningPath: LearningPath;
  activeModuleId: string;
  activeCourseId: string;
  showIDE?: boolean;
  onCourseComplete: (moduleId: string, courseId: string, score: number) => void;
  onBack?: () => void;
  onOpenIDE?: (context: { type: 'course' | 'module' | 'final'; title: string; courseId?: string; moduleId?: string }) => void;
  onNavigate: (moduleId: string, courseId: string) => void;
  onOpenCoachHelp?: (course: string, module: string, blocking?: string) => void;
  activeRemediation?: { remediation: Remediation, course: Course } | null;
  isShowingRemediation?: boolean;
  onSelectRemediation?: () => void;
  onSelectCourse?: () => void;
  onRemediationComplete?: () => void;
  onOpenPlanning?: (type: 'module' | 'final', id: string, deadline: string, title: string, initialPlan?: ProjectPlan) => void;
  userSubscription?: UserSubscription;
  onNavigateToSubscription?: () => void;
}

const CourseView: React.FC<CourseViewProps> = ({
  learningPath,
  activeModuleId,
  activeCourseId,
  showIDE = false,
  onCourseComplete,
  onBack,
  onOpenIDE,
  onNavigate,
  onOpenCoachHelp,
  activeRemediation,
  isShowingRemediation = false,
  onSelectRemediation,
  onSelectCourse,
  onRemediationComplete,
  onOpenPlanning,
  userSubscription,
  onNavigateToSubscription
}) => {
  // Local state for sidebar accordions
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([activeModuleId]));

  // Determine free module limit based on subscription tier
  const getFreeModuleCount = () => {
    if (!userSubscription) return 99;
    switch (userSubscription.currentTier) {
      case 'free': return 2;
      case 'starter': return 4;
      default: return 99;
    }
  };
  const freeModuleLimit = getFreeModuleCount();
  const [userSubmission, setUserSubmission] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // Find active module and course from the learning path
  const activeModule = useMemo(() =>
    learningPath.modules.find(m => m.id === activeModuleId) || learningPath.modules[0],
    [learningPath, activeModuleId]
  );

  const activeCourse = useMemo(() =>
    activeModule.courses.find(c => c.id === activeCourseId) || activeModule.courses[0],
    [activeModule, activeCourseId]
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleEvaluate = async () => {
    if (!userSubmission.trim()) return;
    setIsEvaluating(true);
    const result = await evaluateModule(
      activeCourse.title,
      activeCourse.content.map(c => c.content).join('\n\n') || activeCourse.description,
      activeCourse.objectives,
      userSubmission,
      activeCourse.llmConfig?.evaluationPrompt,
      activeCourse.llmConfig?.strictness
    );
    setEvaluationResult(result);
    setIsEvaluating(false);

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

    // Contextualized as an expert of the CURRENT MODULE
    const tutorResponse = await askTutor(
      chatInput,
      `Vous êtes un expert du module : ${activeModule.title}. Description: ${activeModule.description}. Le cours actuel est : ${activeCourse.title}.`,
      activeCourse.llmConfig?.tutorContext
    );
    setChatMessages(prev => [...prev, { role: 'assistant', content: tutorResponse || '' }]);
  };

  const neuralHooks = [
    "Explique-moi ce concept avec une analogie.",
    "Quels sont les risques de sécurité ici ?",
    "Comment optimiser le Gas pour cette logique ?",
    "Donne-moi un exemple d'implémentation."
  ];

  const handleHookClick = (hook: string) => {
    setChatInput(hook);
  };

  // Visibility logic: hide bot during validation exercises
  const isTutorVisible = !showIDE && activeCourse.status !== 'completed';

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 max-w-[1600px] mx-auto pt-6" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="lg:hidden mb-4">
        <button onClick={onBack} className="hover:text-blue-500 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ArrowRight className="w-4 h-4 rotate-180" /> Retour au Parcours
        </button>
      </div>

      {/* Curriculum Sidebar - Sticky */}
      <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-6 lg:h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin pb-20">
        <div className="flex items-center gap-3 mb-6 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h2 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{learningPath.title}</h2>
        </div>

        <div className="space-y-2">
          {learningPath.modules.map((m, idx) => {
            const isExpanded = expandedModules.has(m.id);
            const isCompleted = m.status === 'completed';
            const isPremiumLocked = idx >= freeModuleLimit;
            const isLocked = (m.isLocked || isPremiumLocked) && !isCompleted;
            const isActive = activeModuleId === m.id;

            return (
              <div key={m.id} className="border-b last:border-0 pb-2" style={{ borderColor: 'var(--border-color)' }}>
                {/* Module Dropdown Header */}
                <button
                  onClick={() => toggleModule(m.id)}
                  className={`w-full flex items-center gap-3 py-3 px-2 rounded-xl text-left transition-all ${isActive ? 'bg-blue-600/5' : 'hover:bg-white/5'}`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isPremiumLocked ? (
                      <Lock className="w-5 h-5 text-yellow-500" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 opacity-30" style={{ color: 'var(--text-muted)' }} />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-blue-500' : 'border-slate-700'}`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[11px] block uppercase font-black tracking-wider truncate transition-colors ${isActive ? 'text-blue-500' : isPremiumLocked ? 'text-yellow-600' : 'text-slate-400'}`}>
                      {m.title}
                      {isPremiumLocked && (
                        <span className="ml-2 text-[8px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20">PREMIUM</span>
                      )}
                    </span>
                    <span className="text-[9px] opacity-70 uppercase tracking-widest font-mono" style={{ color: 'var(--text-muted)' }}>
                      {m.duration} • {m.courses.length} Cours
                    </span>
                  </div>
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </div>
                </button>

                {/* Nested Courses List */}
                {isExpanded && (
                  <div className="mt-1 space-y-1 pl-4 animate-in slide-in-from-top-1 duration-200">
                    {m.courses.map((c) => {
                      const isCourseActive = activeCourseId === c.id;
                      const isCourseCompleted = c.status === 'completed';
                      const isCourseLocked = (m.isLocked && !isCompleted) || c.isLocked;

                      return (
                        <React.Fragment key={c.id}>
                          <button
                            onClick={() => {
                              if (!isCourseLocked) {
                                onNavigate(m.id, c.id);
                                onSelectCourse?.();
                              } else if (isPremiumLocked && onNavigateToSubscription) {
                                onNavigateToSubscription();
                              }
                            }}
                            disabled={isCourseLocked && !isPremiumLocked}
                            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all ${isCourseActive
                              ? 'bg-blue-600/20 border border-blue-500/30'
                              : isCourseLocked
                                ? 'opacity-40 grayscale cursor-not-allowed group'
                                : 'hover:bg-white/5'
                              }`}
                          >
                            <div className="flex-shrink-0">
                              {isCourseCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              ) : isPremiumLocked ? (
                                <Lock className="w-3.5 h-3.5 text-yellow-600" />
                              ) : isCourseLocked ? (
                                <Lock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                              ) : isCourseActive ? (
                                <Circle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                              ) : (
                                <Circle className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                              )}
                            </div>
                            <span className={`text-xs truncate transition-colors ${isCourseActive ? 'text-blue-400 font-bold' : 'text-slate-200'}`}>
                              {c.title}
                            </span>
                          </button>

                          {/* Remediation Injection */}
                          {activeRemediation?.course.id === c.id && (
                            <button
                              onClick={onSelectRemediation}
                              className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all mt-1 mb-2 group active:scale-[0.98] ${isShowingRemediation
                                ? 'bg-amber-500/20 border border-amber-500/50'
                                : 'bg-amber-500/10 border border-amber-500/30'}`}
                            >
                              <div className="flex-shrink-0">
                                <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] block font-black uppercase tracking-widest text-amber-500">Soutien IA</span>
                                <span className="text-xs text-amber-200 font-bold truncate">Reprendre : Remédiation</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {/* Module Exam Entry */}
                    {m.exam && (
                      <button
                        onClick={() => {
                          const allCoursesCompleted = m.courses.every(c => c.status === 'completed');
                          if (allCoursesCompleted && m.exam?.status !== 'completed') {
                            onOpenIDE?.({
                              type: 'module',
                              title: m.exam?.title || "Examen de Module",
                              moduleId: m.id
                            } as any);
                          }
                        }}
                        disabled={!m.courses.every(c => c.status === 'completed') || m.exam.status === 'completed'}
                        className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all mt-2 border-2 ${m.exam.status === 'completed'
                          ? 'bg-purple-500/10 border-purple-500/20 opacity-70'
                          : m.courses.every(c => c.status === 'completed')
                            ? 'bg-purple-500/20 border-purple-500/40 hover:border-purple-500/60 active:scale-[0.98]'
                            : 'opacity-40 grayscale cursor-not-allowed border-transparent'
                          }`}
                      >
                        <div className="flex-shrink-0">
                          {m.exam.status === 'completed' ? (
                            <Award className="w-3.5 h-3.5 text-purple-400" />
                          ) : (
                            <Zap className={`w-3.5 h-3.5 ${m.courses.every(c => c.status === 'completed') ? 'text-purple-400 animate-pulse' : 'text-slate-500'}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] block font-black uppercase tracking-widest ${m.courses.every(c => c.status === 'completed') ? 'text-purple-400' : 'text-slate-500'}`}>Étape de Validation</span>
                          <span className={`text-xs truncate font-bold ${m.exam.status === 'completed' ? 'text-purple-300' : 'text-white'}`}>
                            {m.exam.title}
                          </span>
                        </div>
                        {m.exam.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-purple-400" />}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Planning Context in Sidebar */}
        <div className="mt-8 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-2 flex items-center gap-2">
            <Target className="w-3 h-3" /> Focus Projet
          </h3>

          {/* Active Module Plan */}
          {activeModule.exam?.plan && activeModule.exam.globalDeadline && (
            <div className="px-1 transform scale-95 origin-top">
              <DeadlineQuickView
                plan={activeModule.exam.plan}
                globalDeadline={activeModule.exam.globalDeadline}
                onOpenPlanning={() => onOpenPlanning?.('module', activeModule.id, activeModule.exam!.globalDeadline!, activeModule.exam!.title, activeModule.exam!.plan)}
              />
            </div>
          )}

          {/* Fallback for other modules or Final Project if applicable */}
          {!activeModule.exam?.plan && activeModule.status === 'in-progress' && activeModule.exam?.globalDeadline && (
            <button
              onClick={() => onOpenPlanning?.('module', activeModule.id, activeModule.exam!.globalDeadline!, activeModule.exam!.title)}
              className="w-full py-4 bg-blue-600/5 hover:bg-blue-600/10 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-400 transition-all flex flex-col items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Initialiser ma Stratégie
            </button>
          )}

          {learningPath.finalProject?.plan && (
            <div className="px-1 transform scale-95 origin-top border-t border-slate-800 pt-4 mt-4">
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-2 px-1">Projet de Fin de Parcours</div>
              <DeadlineQuickView
                plan={learningPath.finalProject.plan}
                globalDeadline={learningPath.finalProject.globalDeadline}
                onOpenPlanning={() => onOpenPlanning?.('final', learningPath.finalProject!.id, learningPath.finalProject!.globalDeadline, learningPath.finalProject!.title, learningPath.finalProject!.plan)}
              />
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-12 scrollbar-thin">
        {isShowingRemediation && activeRemediation ? (
          <RemediationView
            remediation={activeRemediation.remediation}
            originalCourse={activeRemediation.course}
            onComplete={() => onRemediationComplete?.()}
            onBack={() => onSelectCourse?.()}
          />
        ) : (
          <section className="border rounded-[48px] p-8 md:p-14 relative overflow-hidden shadow-2xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="relative z-10">
              <header className="mb-12">
                <div className="flex items-center space-x-3 text-blue-500 text-[10px] font-mono font-black mb-4 uppercase tracking-[0.3em]">
                  <BookOpen className="w-4 h-4" />
                  <span>Nœud d'Acquisition de Connaissances</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>{activeCourse.title}</h1>
                <div className="h-1 w-20 bg-blue-600 rounded-full mb-8"></div>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">{activeCourse.description}</p>
              </header>

              {/* Course Content */}
              <div className="space-y-10 mb-16">
                {activeCourse.content.map((block) => (
                  <div key={block.id} className="space-y-6">
                    {block.type === 'video' && (
                      <div className="aspect-video bg-slate-900 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                        <div className="text-center relative z-10">
                          <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/40 cursor-pointer hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 md:w-8 md:h-8 text-white ml-1" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{block.title}</h3>
                          <p className="text-sm text-slate-400">{block.duration}</p>
                        </div>
                      </div>
                    )}
                    {block.type === 'text' && (
                      <article className="prose prose-lg max-w-none leading-relaxed font-medium relative transition-colors duration-500" style={{ color: 'var(--text-secondary)' }}>
                        {block.content.split('\n').map((para, i) => (
                          <div key={i} className="mb-6 group relative">
                            <p>{para.trim()}</p>
                          </div>
                        ))}
                      </article>
                    )}
                  </div>
                ))}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-3xl p-6 group hover:border-blue-500/30 transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="aspect-video bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-2xl flex items-center justify-center mb-4">
                      <BarChart3 className="w-12 h-12 text-blue-500 opacity-50" />
                    </div>
                    <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Concepts de Base</h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Modèles et architectures clés</p>
                  </div>
                  <div className="border rounded-3xl p-6 group hover:border-blue-500/30 transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="aspect-video bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-2xl flex items-center justify-center mb-4">
                      <Code className="w-12 h-12 text-blue-500 opacity-50" />
                    </div>
                    <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Application Pratique</h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Exemples d'implémentation</p>
                  </div>
                </div>
              </div>

              {/* Verification Section */}
              <div className="border-t pt-20" style={{ borderColor: 'var(--border-color)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <div className="border p-8 rounded-3xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] mb-6 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Objectifs à Valider
                    </h4>
                    <ul className="space-y-4">
                      {activeCourse.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm group" style={{ color: 'var(--text-secondary)' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                          <span className="font-medium">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Preuve de Maîtrise</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Validez vos connaissances par la pratique.</p>
                    </div>
                  </div>

                  {activeCourse.status === 'completed' ? (
                    <div className="border rounded-[40px] p-12 text-center relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                      <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-3xl"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30">
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Cours Validé !</h3>
                        <div className="mb-10 text-center">
                          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 tracking-tighter">
                            {activeCourse.score || 95}%
                          </span>
                          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mt-2">Score de Précision</p>
                        </div>
                        <button
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="px-10 py-4 rounded-xl border font-bold text-xs uppercase tracking-widest transition"
                          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                        >
                          Revoir le Contenu
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-[32px] p-10 text-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
                      <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                          <Terminal className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>{activeCourse.exercise.title}</h4>
                        <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
                          {activeCourse.exercise.description}
                        </p>
                        <button
                          onClick={() => onOpenIDE?.({
                            type: 'course',
                            title: activeCourse.exercise.title,
                            courseId: activeCourse.id
                          })}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-4 mx-auto shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                          <Terminal className="w-5 h-5" />
                          <span>Ouvrir l'Environnement de Travail</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* FLOATING TUTOR BUBBLE & COACH ACTION */}
      {isTutorVisible && (
        <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4 z-[60]">
          {/* Ask Coach Button */}
          <button
            onClick={() => onOpenCoachHelp?.(activeCourse.title, activeModule.title)}
            className="w-14 h-14 bg-white/10 hover:bg-white/20 border-2 border-white/10 text-white rounded-full flex items-center justify-center shadow-xl backdrop-blur-md group relative transition-all hover:-translate-y-1 active:scale-95"
          >
            <Users className="w-6 h-6" />
            <div className="absolute right-full mr-5 bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl">
              Demander l'aide d'un Coach
            </div>
          </button>

          {/* AI Tutor Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all group border-4 border-white/10"
          >
            <Sparkles className="w-7 h-7" />
            <div className="absolute right-full mr-4 bg-slate-900 border border-blue-500/30 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              Aide IA (Expert {activeModule.title})
            </div>
          </button>
        </div>
      )}

      {/* Neural Hub - Premium Floating Tutor */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-[450px] h-[650px] z-[70] flex flex-col overflow-hidden rounded-[40px] border border-blue-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl bg-[#0a0f1d]/95"
          >
            {/* Header */}
            <header className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Hub</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Expert: {activeModule.title}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-white/5 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {chatMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-6 opacity-60">
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                    <Sparkles className="w-10 h-10 text-blue-400" />
                  </div>
                  <h4 className="text-white font-black uppercase text-sm mb-2">Analyse de Contexte Terminée</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Je suis prêt à vous assister sur les spécificités techniques de <strong>{activeModule.title}</strong>. Que souhaitez-vous approfondir ?
                  </p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-medium'
                    }`}>
                    <div className="text-[13px] prose prose-sm prose-invert leading-relaxed">{msg.content}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer / Input */}
            <div className="p-6 border-t border-white/5 bg-[#0f172a]/50">
              {/* Neural Hooks (Suggestions) */}
              {chatMessages.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {neuralHooks.map((hook, i) => (
                    <button
                      key={i}
                      onClick={() => handleHookClick(hook)}
                      className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-all flex items-center gap-2"
                    >
                      <Lightbulb className="w-3 h-3" />
                      {hook}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleChat} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-1 group focus-within:border-blue-500/50 transition-all">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Posez votre question technique..."
                  className="flex-1 bg-transparent border-none outline-none py-3 text-[13px] text-white placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseView;
