
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Play, Award, TrendingUp, Clock, ArrowRight, Zap, ChevronRight, Target, History, Trophy, BookOpen, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { MOCK_BADGES, MOCK_STATS, MOCK_DAILY_GOALS, MOCK_RECENT_ACTIVITY, MOCK_LEARNING_PATHS } from '../constants';
import { LearningPath, PathModule, Course } from '../types';

interface DashboardProps {
  currentPath?: LearningPath;
  onCourseSelect: (pathId: string, moduleId: string, courseId: string) => void;
  onNavigateToPortfolio?: () => void;
  onNavigateToPath?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentPath = MOCK_LEARNING_PATHS[0],
  onCourseSelect,
  onNavigateToPortfolio,
  onNavigateToPath
}) => {
  if (!currentPath) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Aucun parcours actif
        </p>
      </div>
    );
  }

  // Find current active course
  const activeModule = currentPath.modules.find(m => m.status === 'in-progress') || currentPath.modules[0];
  const activeCourse = activeModule?.courses.find(c => c.status === 'in-progress' || c.status === 'not-started' && !c.isLocked);

  const completedModules = currentPath.modules.filter(m => m.status === 'completed').length;
  const completedCourses = currentPath.modules.reduce((acc, m) =>
    acc + m.courses.filter(c => c.status === 'completed').length, 0
  );
  const totalCourses = currentPath.modules.reduce((acc, m) => acc + m.courses.length, 0);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">

      {/* Primary Hero - Current Learning Path */}
      <section className="relative overflow-hidden rounded-[40px] p-10 bg-blue-600 group shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <Zap className="w-3 h-3 fill-white" />
              <span>Parcours Actif</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tighter leading-tight text-white">
              {currentPath.title}
            </h2>
            <p className="text-white/80 text-base font-medium max-w-md">
              {activeCourse
                ? `Prochain cours : ${activeCourse.title}`
                : activeModule?.exam && activeModule.courses.every(c => c.status === 'completed')
                  ? `Examen du module : ${activeModule.title}`
                  : 'Continuez votre progression'
              }
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => activeCourse && onCourseSelect(currentPath.id, activeModule.id, activeCourse.id)}
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center group shadow-xl active:scale-95"
              >
                <span>Continuer</span>
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onNavigateToPath}
                className="bg-white/20 text-white hover:bg-white/30 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
              >
                Voir le Parcours
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-56 h-56">
              <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <circle cx="112" cy="112" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="14" />
                <circle
                  cx="112" cy="112" r="100" fill="none" stroke="white" strokeWidth="14"
                  strokeDasharray={628}
                  strokeDashoffset={628 * (1 - currentPath.progress / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{currentPath.progress}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Progression</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border p-6 rounded-3xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Cours</span>
          </div>
          <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{completedCourses}/{totalCourses}</p>
        </div>
        <div className="border p-6 rounded-3xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Modules</span>
          </div>
          <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{completedModules}/{currentPath.modules.length}</p>
        </div>
        <div className="border p-6 rounded-3xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Badges</span>
          </div>
          <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{MOCK_BADGES.filter(b => b.dateEarned !== '—').length}</p>
        </div>
        <div className="border p-6 rounded-3xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Score Moy.</span>
          </div>
          <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{MOCK_STATS.avgScore}%</p>
        </div>
      </div>

      {/* Modules Overview */}
      <section className="border p-8 rounded-[40px] transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <Target className="w-5 h-5 text-purple-500" /> Modules du Parcours
          </h3>
          <button
            onClick={onNavigateToPath}
            className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
          >
            Voir Détails
          </button>
        </div>

        <div className="space-y-4">
          {currentPath.modules.map((module, idx) => {
            const isActive = module.status === 'in-progress';
            const isCompleted = module.status === 'completed';
            const isLocked = module.isLocked;
            const coursesCompleted = module.courses.filter(c => c.status === 'completed').length;

            return (
              <div
                key={module.id}
                className={`p-5 rounded-2xl border transition-all ${isActive ? 'border-blue-500/30 bg-blue-500/5' :
                  isCompleted ? 'border-green-500/30 bg-green-500/5' :
                    ''
                  }`}
                style={{
                  backgroundColor: !isActive && !isCompleted ? 'var(--bg-primary)' : undefined,
                  borderColor: !isActive && !isCompleted ? 'var(--border-color)' : undefined
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-600 text-white' :
                      'opacity-40'
                    }`}
                    style={{ backgroundColor: isLocked ? 'var(--bg-secondary)' : undefined, color: isLocked ? 'var(--text-muted)' : undefined }}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> :
                      isLocked ? <Lock className="w-5 h-5" /> :
                        <span className="font-bold">{idx + 1}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-bold text-sm truncate ${isLocked ? 'opacity-50' : ''}`} style={{ color: 'var(--text-primary)' }}>
                        {module.title}
                      </h4>
                      {isActive && (
                        <span className="bg-blue-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                          Actif
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>{coursesCompleted}/{module.courses.length} cours</span>
                      <span>{module.duration}</span>
                    </div>
                  </div>

                  <div className="w-24">
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                      <div
                        className={`h-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Goals & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goals */}
        <section className="lg:col-span-2 border p-8 rounded-[40px] flex flex-col transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <Trophy className="w-5 h-5 text-yellow-500" /> Objectifs Quotidiens
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Reset dans 4h 32m</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_DAILY_GOALS.map(goal => (
              <div key={goal.id} className="p-5 rounded-3xl border flex flex-col justify-between transition-colors" style={{
                backgroundColor: goal.completed ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-primary)',
                borderColor: goal.completed ? 'rgba(59, 130, 246, 0.3)' : 'var(--border-color)'
              }}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-xl ${goal.completed ? 'bg-blue-600 text-white' : ''}`} style={{ backgroundColor: !goal.completed ? 'var(--bg-secondary)' : undefined, color: !goal.completed ? 'var(--text-muted)' : undefined }}>
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>+{goal.xp} XP</span>
                </div>
                <div>
                  <h4 className={`font-bold text-sm mb-2 ${goal.completed ? 'text-blue-600' : ''}`} style={{ color: !goal.completed ? 'var(--text-primary)' : undefined }}>{goal.title}</h4>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div
                      className={`h-full rounded-full ${goal.completed ? 'bg-blue-500' : ''}`}
                      style={{ width: `${(goal.progress / goal.total) * 100}%`, backgroundColor: !goal.completed ? 'var(--text-muted)' : undefined, opacity: !goal.completed ? 0.3 : 1 }}
                    />
                  </div>
                  <p className="text-right text-[10px] font-mono mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {goal.progress} / {goal.total} {goal.unit || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="border p-8 rounded-[40px] flex flex-col transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6">
            <History className="w-5 h-5 text-purple-500" /> Activité
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-[280px] pr-2">
            {MOCK_RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-600/5 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'course' ? 'bg-green-500/10 text-green-500' :
                  activity.type === 'badge' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-purple-500/10 text-purple-500'
                  }`}>
                  {activity.type === 'course' && <Zap className="w-4 h-4" />}
                  {activity.type === 'badge' && <Award className="w-4 h-4" />}
                  {activity.type === 'tutor' && <TrendingUp className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{activity.title}</p>
                  <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{activity.time}</p>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded-lg border" style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>{activity.xp}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Skill Matrix & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 border p-10 rounded-[40px] shadow-2xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold tracking-tight mb-10" style={{ color: 'var(--text-primary)' }}>Matrice de Compétences</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_STATS.skillMatrix}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                <Radar name="Compétence" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 border p-10 rounded-[40px] flex flex-col shadow-2xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>Badges Obtenus</h3>
          <div className="space-y-4 flex-1">
            {MOCK_BADGES.filter(b => b.dateEarned !== '—').map((badge) => (
              <div
                key={badge.id}
                onClick={onNavigateToPortfolio}
                className="flex items-center justify-between p-5 rounded-2xl border hover:border-blue-500/30 group cursor-pointer transition-all shadow-inner"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>{badge.name}</h4>
                    <p className="text-[10px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>{badge.dateEarned}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 transition-colors" style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
          <button
            onClick={onNavigateToPortfolio}
            className="w-full mt-8 py-4 border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-95 transition-all"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            Voir le Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
