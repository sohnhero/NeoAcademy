
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { Play, Award, TrendingUp, Clock, ArrowRight, Zap, ChevronRight, Target, History, Trophy, BookOpen, AlertTriangle, CheckCircle2, Lock, ShieldAlert, GraduationCap, Flame } from 'lucide-react';
import { MOCK_BADGES, MOCK_STATS, MOCK_DAILY_GOALS, MOCK_RECENT_ACTIVITY, MOCK_LEARNING_PATHS } from '../constants';
import { LearningPath, PathModule, Course, ProjectPlan } from '../types';
import DeadlineQuickView from './DeadlineQuickView';

interface DashboardProps {
  currentPath?: LearningPath;
  onCourseSelect: (pathId: string, moduleId: string, courseId: string) => void;
  onNavigateToPortfolio?: () => void;
  onNavigateToPath?: () => void;
  onOpenPlanning?: (type: 'module' | 'final', id: string, deadline: string, title: string, initialPlan?: ProjectPlan) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentPath = MOCK_LEARNING_PATHS[0],
  onCourseSelect,
  onNavigateToPortfolio,
  onNavigateToPath,
  onOpenPlanning
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

          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-end gap-10">
            {/* Objectif Livraison Integration */}
            {currentPath.modules.find(m => m.exam?.plan)?.exam && (
              <div className="hidden md:block">
                {(() => {
                  const m = currentPath.modules.find(m => m.exam?.plan);
                  if (m?.exam?.plan && m.exam.globalDeadline) {
                    return (
                      <DeadlineQuickView
                        isCompact
                        plan={m.exam.plan}
                        globalDeadline={m.exam.globalDeadline}
                        onOpenPlanning={() => onOpenPlanning?.('module', m.id, m.exam!.globalDeadline!, m.exam!.title, m.exam!.plan)}
                      />
                    );
                  }
                  return null;
                })()}
              </div>
            )}
            {currentPath.finalProject?.plan && currentPath.finalProject.globalDeadline && (
              <div className="hidden md:block">
                <DeadlineQuickView
                  isCompact
                  plan={currentPath.finalProject.plan}
                  globalDeadline={currentPath.finalProject.globalDeadline}
                  onOpenPlanning={() => onOpenPlanning?.('final', currentPath.finalProject!.id, currentPath.finalProject!.globalDeadline, currentPath.finalProject!.title, currentPath.finalProject!.plan)}
                />
              </div>
            )}

            <div className="relative w-56 h-56 flex-shrink-0">
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

      {/* NEW SECTION: Student Analytics (Level, Evolution, Gaps) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

        {/* Evolution Chart */}
        <section className="col-span-1 lg:col-span-2 border p-8 rounded-[40px] flex flex-col transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <TrendingUp className="w-5 h-5 text-blue-500" /> Évolution du Score
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">En direct</span>
            </div>
          </div>

          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_STATS.evolutionData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: 'var(--bg-primary)', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Real Level & Skills Matrix */}
        <section className="border p-8 rounded-[40px] flex flex-col transition-colors relative overflow-hidden group" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500"></div>

          <h3 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-2 relative z-10" style={{ color: 'var(--text-primary)' }}>
            <Flame className="w-5 h-5 text-purple-500" /> Profil Technique
          </h3>
          <p className="text-sm font-bold text-purple-500 mb-6 relative z-10">{MOCK_STATS.currentLevel}</p>

          <div className="flex-1 min-h-[200px] -mx-4 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_STATS.skillMatrix}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 'bold' }} />
                <Radar
                  name="Niveau"
                  dataKey="value"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>

      {/* Gaps List & Daily Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

        {/* Identified Gaps */}
        <section className="border p-8 rounded-[40px] flex flex-col transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <ShieldAlert className="w-5 h-5 text-orange-500" /> Lacunes à Combler
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            {MOCK_STATS.identifiedGaps?.map((gap, idx) => (
              <div key={idx} className="p-4 rounded-2xl border bg-orange-500/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{gap.topic}</h4>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${gap.severity === 'high' ? 'bg-red-500/10 text-red-500' :
                    gap.severity === 'medium' ? 'bg-orange-500/10 text-orange-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                    {gap.severity === 'high' ? 'Critique' : gap.severity === 'medium' ? 'Important' : 'Mineur'}
                  </span>
                </div>
                {gap.recommendedModule && (
                  <button className="text-xs font-bold text-blue-500 hover:text-blue-400 mt-2 flex items-center gap-1 transition-colors">
                    Réviser : {gap.recommendedModule} <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {(!MOCK_STATS.identifiedGaps || MOCK_STATS.identifiedGaps.length === 0) && (
              <div className="text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Aucune lacune majeure détectée.</p>
              </div>
            )}
          </div>
        </section>

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
          <div className="space-y-4 overflow-y-auto max-h-[280px] pr-2 scrollbar-thin">
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

    </div>
  );
};

export default Dashboard;
