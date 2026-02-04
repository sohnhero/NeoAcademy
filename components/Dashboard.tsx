
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Play, Star, Award, TrendingUp, Clock, ArrowRight, Zap, ChevronRight, Target, History, Trophy } from 'lucide-react';
import { MOCK_BADGES, MOCK_STATS, MOCK_DAILY_GOALS, MOCK_RECENT_ACTIVITY } from '../constants';
import { Course } from '../types';

interface DashboardProps {
  onCourseSelect: (id: string) => void;
  courses: Course[];
  onNavigateToPortfolio?: () => void;
  onNavigateToCourse?: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCourseSelect, courses, onNavigateToPortfolio, onNavigateToCourse }) => {
  const currentCourse = courses.length > 0 ? courses[0] : null;

  if (!currentCourse) return <div className="p-10 font-bold uppercase tracking-widest text-xs" style={{ color: 'var(--text-muted)' }}>No courses available.</div>;

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {/* Primary Hero */}
      <section className="relative overflow-hidden rounded-[40px] p-12 bg-blue-600 group shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <Zap className="w-3 h-3 fill-white" />
              <span>Continuer le Voyage d'Apprentissage</span>
            </div>
            <h2 className="text-5xl font-extrabold tracking-tighter leading-tight text-white">
              {currentCourse.title}
            </h2>
            <p className="text-white/80 text-lg font-medium max-w-md">
              Terminez l'audit final de l'architecture EVM pour obtenir votre Certification d'Architecte.
            </p>
            <button
              onClick={() => onCourseSelect(currentCourse.id)}
              className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center group shadow-xl active:scale-95"
            >
              <span>Reprendre le Nœud Actif</span>
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <circle cx="128" cy="128" r="110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="16" />
                <circle
                  cx="128" cy="128" r="110" fill="none" stroke="white" strokeWidth="16"
                  strokeDasharray={691.15}
                  strokeDashoffset={691.15 * (1 - currentCourse.progress / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center ">
                <span className="text-5xl font-black text-white">{currentCourse.progress}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Nœud Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Goals & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goals */}
        <section className="lg:col-span-2 border p-8 rounded-[40px] flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <Trophy className="w-5 h-5 text-yellow-500" /> Objectifs Quotidiens
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Reset dans 4h 32m</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_DAILY_GOALS.map(goal => (
              <div key={goal.id} className="p-5 rounded-3xl border flex flex-col justify-between transition-colors duration-500" style={{
                backgroundColor: goal.completed ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-primary)',
                borderColor: goal.completed ? 'rgba(59, 130, 246, 0.3)' : 'var(--border-color)'
              }}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-xl ${goal.completed ? 'bg-blue-600 text-white' : 'transition-colors duration-500 opacity-60'}`} style={{ backgroundColor: !goal.completed ? 'var(--bg-secondary)' : undefined, color: !goal.completed ? 'var(--text-primary)' : undefined }}>
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>+{goal.xp} XP</span>
                </div>
                <div>
                  <h4 className={`font-bold text-sm mb-2 ${goal.completed ? 'text-blue-600' : ''}`} style={{ color: !goal.completed ? 'var(--text-primary)' : undefined }}>{goal.title}</h4>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div
                      className={`h-full rounded-full ${goal.completed ? 'bg-blue-500' : 'opacity-30'}`}
                      style={{ width: `${(goal.progress / goal.total) * 100}%`, backgroundColor: !goal.completed ? 'var(--text-muted)' : undefined }}
                    ></div>
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
        <section className="border p-8 rounded-[40px] flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-3 mb-6">
            <History className="w-5 h-5 text-purple-500" /> Flux d'Activité
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
            {MOCK_RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-600/5 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'module' ? 'bg-green-500/10 text-green-500' :
                  activity.type === 'social' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-purple-500/10 text-purple-500'
                  }`}>
                  {activity.type === 'module' && <Zap className="w-4 h-4" />}
                  {activity.type === 'social' && <Award className="w-4 h-4" />}
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Radar Matrix (Existing) */}
        <div className="lg:col-span-3 border p-10 rounded-[40px] shadow-2xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold tracking-tight">Nœud de Maîtrise Technique</h3>
            <button
              onClick={() => onNavigateToCourse && currentCourse && onNavigateToCourse(currentCourse.id)}
              className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
            >
              Détails de l'Audit
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_STATS.skillMatrix}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                <Radar
                  name="Compétence"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Badges Terminal (Existing) */}
        <div className="lg:col-span-2 border p-10 rounded-[40px] flex flex-col shadow-2xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold tracking-tight mb-8">Registre Vérifié</h3>
          <div className="space-y-4 flex-1">
            {MOCK_BADGES.map((badge) => (
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
            Explorer le Portfolio Certifié
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
