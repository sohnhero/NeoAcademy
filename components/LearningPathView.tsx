
import React, { useState } from 'react';
import {
  Shield,
  Cpu,
  Code,
  Lock,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Layers,
  ShieldCheck,
  Award,
  Zap,
  Play,
  Sparkles,
  Activity,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { MOCK_LEARNING_PATHS } from '../constants';
import { LearningPath, PathModule, Course, UserSubscription } from '../types';

interface MilestoneNodeProps {
  status: 'completed' | 'active' | 'locked';
  title: string;
  desc: string;
  icon: any;
  isLast?: boolean;
  onClick?: () => void;
  badge?: { name: string };
  isPremium?: boolean;
  onNavigateToSubscription?: () => void;
}

const MilestoneNode: React.FC<MilestoneNodeProps> = ({
  status,
  title,
  desc,
  icon: Icon,
  isLast,
  onClick,
  badge,
  isPremium,
  onNavigateToSubscription
}) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  return (
    <div className="relative flex gap-8 group">
      {!isLast && (
        <div className={`absolute left-8 top-16 bottom-0 w-0.5 -translate-x-1/2 ${isCompleted ? 'bg-blue-600' : 'bg-slate-800'}`}></div>
      )}

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${isCompleted
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-blue-600'
          : isPremium
            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-yellow-500'
            : isActive
              ? 'animate-pulse'
              : ''
          }`} style={{
            backgroundColor: (!isCompleted && !isPremium) ? 'var(--bg-primary)' : undefined,
            borderColor: (!isCompleted && !isPremium) ? (isActive ? 'var(--accent-primary)' : 'var(--border-color)') : undefined,
            color: (!isCompleted && !isPremium) ? (isActive ? 'var(--accent-primary)' : 'var(--text-muted)') : undefined
          }}>
          {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : isPremium ? <Lock className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
        </div>
      </div>

      <div className="pb-16 pt-2 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-xl font-black tracking-tight" style={{ color: (status === 'locked' || isPremium) ? 'var(--text-muted)' : 'var(--text-primary)' }}>
            {title}
          </h4>
          {(status === 'locked' && !isPremium) && <Lock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />}
          {isPremium && (
            <span className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-yellow-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Premium
            </span>
          )}
          {isActive && (
            <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-blue-500/20">
              En Cours
            </span>
          )}
          {isCompleted && badge && (
            <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-green-500/20 flex items-center gap-1">
              <Award className="w-3 h-3" /> {badge.name}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed max-w-md font-medium" style={{ color: (status === 'locked' || isPremium) ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
          {isPremium ? "Ce contenu est réservé aux membres premium. Passez à l'étape supérieure pour débloquer ce module." : desc}
        </p>

        {isPremium && onNavigateToSubscription && (
          <button
            onClick={onNavigateToSubscription}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-yellow-500/20 transition-all hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-yellow-500/10"
          >
            Débloquer <Zap className="w-4 h-4" />
          </button>
        )}

        {isActive && onClick && (
          <button
            onClick={onClick}
            className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors group"
          >
            Continuer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

interface LearningPathViewProps {
  learningPath?: LearningPath;
  onNavigateToCourse?: (moduleId: string, courseId: string) => void;
  onNavigateToExam?: (moduleId: string) => void;
  onNavigateToFinalProject?: () => void;
  userSubscription?: UserSubscription;
  onNavigateToSubscription?: () => void;
}

const LearningPathView: React.FC<LearningPathViewProps> = ({
  learningPath = MOCK_LEARNING_PATHS[0],
  onNavigateToCourse,
  onNavigateToExam,
  onNavigateToFinalProject,
  userSubscription,
  onNavigateToSubscription
}) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(
    learningPath.modules.find(m => m.status === 'in-progress')?.id || null
  );

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

  const getModuleStatus = (module: PathModule): 'completed' | 'active' | 'locked' => {
    if (module.status === 'completed') return 'completed';
    if (module.status === 'in-progress') return 'active';
    return 'locked';
  };

  const getModuleIcon = (index: number) => {
    const icons = [Terminal, Shield, Cpu, Code, Layers, Zap];
    return icons[index % icons.length];
  };

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Header */}
      <header className="mb-20">
        <div className="flex items-center gap-3 text-blue-500 text-[10px] font-mono font-black mb-4 uppercase tracking-[0.3em]">
          <Activity className="w-4 h-4" />
          <span>Visualisation du Parcours d'Apprentissage</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
              {learningPath.title}
            </h2>
            <p className="max-w-xl font-medium text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {learningPath.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {learningPath.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 text-xs font-bold rounded-lg border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="border p-6 rounded-3xl backdrop-blur-md min-w-[240px] transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Progression Globale</span>
              <span className="text-2xl font-black font-mono text-blue-500">{learningPath.progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="h-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${learningPath.progress}%` }}></div>
            </div>
            <div className="flex justify-between mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{learningPath.modules.filter(m => m.status === 'completed').length}/{learningPath.modules.length} modules</span>
              <span>{learningPath.estimatedDuration}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Modules Timeline */}
      <div className="space-y-0">
        {learningPath.modules.map((module, idx) => {
          const isExpanded = expandedModule === module.id;
          const status = getModuleStatus(module);
          const Icon = getModuleIcon(idx);
          const isPremiumLocked = idx >= freeModuleLimit;
          const activeCourse = module.courses.find(c => c.status === 'in-progress' || (c.status === 'not-started' && !c.isLocked));
          const allCoursesComplete = module.courses.every(c => c.status === 'completed');
          const nextAction = isPremiumLocked
            ? undefined
            : allCoursesComplete && module.exam && module.exam.status !== 'completed'
              ? () => onNavigateToExam?.(module.id)
              : activeCourse
                ? () => onNavigateToCourse?.(module.id, activeCourse.id)
                : undefined;

          return (
            <div key={module.id} className="relative">
              <MilestoneNode
                status={status}
                title={module.title}
                desc={module.description}
                icon={Icon}
                isLast={idx === learningPath.modules.length - 1 && !learningPath.finalProject}
                onClick={nextAction}
                badge={module.badge}
                isPremium={isPremiumLocked}
                onNavigateToSubscription={onNavigateToSubscription}
              />

              {/* Expanded Courses */}
              {status !== 'locked' && (
                <div className="ml-24 mb-8 space-y-3">
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                    className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <BookOpen className="w-4 h-4" />
                    {module.courses.filter(c => c.status === 'completed').length}/{module.courses.length} Cours
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 pl-6 border-l-2" style={{ borderColor: 'var(--border-color)' }}>
                      {module.courses.map((course) => (
                        <div
                          key={course.id}
                          className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-blue-500/30 ${course.status === 'completed' ? 'bg-green-500/5 border-green-500/20' :
                            course.status === 'in-progress' ? 'bg-blue-500/5 border-blue-500/20' : ''
                            }`}
                          style={{
                            backgroundColor: course.isLocked ? 'var(--bg-primary)' : undefined,
                            borderColor: course.isLocked ? 'var(--border-color)' : undefined,
                            opacity: course.isLocked ? 0.5 : 1
                          }}
                          onClick={() => !course.isLocked && onNavigateToCourse?.(module.id, course.id)}
                        >
                          <div className="flex items-center gap-3">
                            {course.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : course.isLocked ? (
                              <Lock className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            ) : course.status === 'in-progress' ? (
                              <Play className="w-5 h-5 text-blue-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-blue-500" />
                            )}
                            <div className="flex-1">
                              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{course.title}</p>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{course.duration}</p>
                            </div>
                            {course.score && (
                              <span className="text-xs font-bold text-green-500">{course.score}%</span>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Module Exam */}
                      {module.exam && (
                        <div
                          className={`p-4 rounded-xl border-2 transition-all ${module.exam.status === 'completed' ? 'bg-purple-500/5 border-purple-500/30' :
                            allCoursesComplete ? 'bg-purple-500/10 border-purple-500/30 cursor-pointer hover:border-purple-400' :
                              'opacity-50'
                            }`}
                          style={{ borderColor: !allCoursesComplete && module.exam.status !== 'completed' ? 'var(--border-color)' : undefined }}
                          onClick={() => allCoursesComplete && module.exam?.status !== 'completed' && onNavigateToExam?.(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Award className={`w-5 h-5 ${module.exam.status === 'completed' ? 'text-purple-500' : allCoursesComplete ? 'text-purple-400' : ''}`} style={{ color: !allCoursesComplete && module.exam.status !== 'completed' ? 'var(--text-muted)' : undefined }} />
                            <div className="flex-1">
                              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Examen du Module</p>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{module.exam.duration}</p>
                            </div>
                            {module.exam.score && (
                              <span className="text-xs font-bold text-purple-500">{module.exam.score}%</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Final Project */}
        {learningPath.finalProject && (
          <div className="relative flex gap-8 group mt-8">
            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${learningPath.finalProject.status === 'completed'
                ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20 border-yellow-500'
                : learningPath.modules.every(m => m.status === 'completed')
                  ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'
                  : ''
                }`}
                style={{
                  backgroundColor: !learningPath.modules.every(m => m.status === 'completed') && learningPath.finalProject.status !== 'completed' ? 'var(--bg-primary)' : undefined,
                  borderColor: !learningPath.modules.every(m => m.status === 'completed') && learningPath.finalProject.status !== 'completed' ? 'var(--border-color)' : undefined,
                  color: !learningPath.modules.every(m => m.status === 'completed') && learningPath.finalProject.status !== 'completed' ? 'var(--text-muted)' : undefined
                }}
              >
                <Award className="w-8 h-8" />
              </div>
            </div>

            <div className="pt-2 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-xl font-black tracking-tight" style={{ color: learningPath.modules.every(m => m.status === 'completed') ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {learningPath.finalProject.title}
                </h4>
                {!learningPath.modules.every(m => m.status === 'completed') && (
                  <Lock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                )}
              </div>
              <p className="text-sm leading-relaxed max-w-md font-medium" style={{ color: 'var(--text-secondary)' }}>
                {learningPath.finalProject.description}
              </p>

              {learningPath.modules.every(m => m.status === 'completed') && learningPath.finalProject.status !== 'completed' && (
                <button
                  onClick={onNavigateToFinalProject}
                  className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all"
                >
                  Accéder au Projet Final <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathView;
