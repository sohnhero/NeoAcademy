import React, { useState } from 'react';
import {
  Users, AlertTriangle, CheckCircle, MessageCircle, BarChart3, TrendingUp, Zap, Clock, ArrowRight,
  BrainCircuit, Activity, BookOpen, AlertCircle, ShieldCheck
} from 'lucide-react';
import { MOCK_INSIGHTS_LLM, MOCK_PENDING_REVIEWS, MOCK_STUDENTS, MOCK_COACH_KPI, MOCK_MODULE_PERFORMANCE, MOCK_BLOCKED_STUDENTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CoachDashboardProps {
  onGoToInsights?: () => void;
  showOnlyInsights?: boolean;
  onReviewStudent?: (reviewId: string) => void;
  onInterveneStudent?: (studentId: string) => void;
}

const CoachDashboard: React.FC<CoachDashboardProps> = ({
  onGoToInsights,
  showOnlyInsights,
  onReviewStudent,
  onInterveneStudent
}) => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      {!showOnlyInsights && (
        <>
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
            <div>
              <h2 className="text-4xl font-black tracking-tighter">Vue d'ensemble Formateur</h2>
              <p className="font-medium mt-1 uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-muted)' }}>Monitoring de cohorte & Analyse LLM</p>
            </div>

            <div className="flex gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none transition-colors duration-500"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette Semaine</option>
                <option value="month">Ce Mois</option>
              </select>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border p-6 rounded-[24px] flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Apprenants Actifs</p>
                <p className="text-3xl font-black transition-colors" style={{ color: 'var(--text-primary)' }}>{MOCK_COACH_KPI.activeStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="border p-6 rounded-[24px] flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Taux de Réussite</p>
                <p className="text-3xl font-black text-green-500">{MOCK_COACH_KPI.avgSuccessRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="border p-6 rounded-[24px] flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Étudiants Bloqués</p>
                <p className="text-3xl font-black text-red-500">{MOCK_COACH_KPI.blockedStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="border p-6 rounded-[24px] flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Moy. Validation</p>
                <p className="text-xl font-black transition-colors" style={{ color: 'var(--text-primary)' }}>{MOCK_COACH_KPI.avgValidationTime}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {!showOnlyInsights && (
          <>
            <section className="lg:col-span-2 border p-8 rounded-[40px] transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Performance par Module
                </h3>
                <span className="text-[10px] px-3 py-1 rounded-full uppercase font-bold" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>Taux de Réussite vs Temps Moyen</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_MODULE_PERFORMANCE} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                    <Tooltip
                      cursor={{ fill: 'var(--accent-primary)', opacity: 0.1 }}
                      contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="successRate" name="Réussite (%)" radius={[4, 4, 0, 0]}>
                      {MOCK_MODULE_PERFORMANCE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.successRate < 70 ? '#f87171' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <div className="space-y-8">
              <section className="border p-8 rounded-[40px] flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Blocages IA
                  </h3>
                  <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full uppercase tracking-tighter animate-pulse">
                    {MOCK_BLOCKED_STUDENTS.length} Alertes
                  </span>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {MOCK_BLOCKED_STUDENTS.map(student => (
                    <div key={student.id} className="p-5 rounded-3xl border flex flex-col gap-4 hover:border-red-500/20 transition-all group shadow-inner" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/${student.id}/100`} className="w-10 h-10 rounded-full transition-all" alt="" />
                          <div>
                            <span className="font-bold text-sm block" style={{ color: 'var(--text-primary)' }}>{student.name}</span>
                            <span className="text-[10px] font-medium truncate w-32 block" style={{ color: 'var(--text-secondary)' }}>{student.blockInfo.moduleTitle}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${student.blockInfo.urgency === 'critical' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-orange-500/20 text-orange-500'}`}>
                          {student.blockInfo.urgency}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed font-medium p-3 rounded-2xl border transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        "{student.blockInfo.aiSynthesis}"
                      </p>
                      <button onClick={() => onInterveneStudent?.(student.id)} className="text-blue-500 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-end gap-2 group-hover:gap-3 transition-all">
                        Intervenir <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border p-8 rounded-[40px] flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    Audits Manuels
                  </h3>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                    {MOCK_PENDING_REVIEWS.length} En attente
                  </span>
                </div>
                <div className="space-y-3">
                  {MOCK_PENDING_REVIEWS.map(review => (
                    <div key={review.id} className="p-4 rounded-2xl border hover:border-blue-500/20 transition-all flex items-center justify-between group shadow-inner" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-xs block" style={{ color: 'var(--text-primary)' }}>{review.studentName}</span>
                          <span className="text-[9px]" style={{ color: 'var(--text-secondary)' }}>{review.moduleTitle}</span>
                        </div>
                      </div>
                      <button onClick={() => onReviewStudent?.(review.id)} className="p-2 bg-blue-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        <section className={`${showOnlyInsights ? 'col-span-full' : 'col-span-full'} border p-10 rounded-[40px] relative overflow-hidden transition-colors duration-500`} style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BrainCircuit className="w-32 h-32 text-purple-500" />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-purple-500 w-6 h-6" />
              <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Intelligence Pédagogique Active</h3>
            </div>
            {!showOnlyInsights && onGoToInsights && (
              <button onClick={onGoToInsights} className="text-purple-500 text-[10px] font-bold uppercase tracking-widest hover:text-purple-600 transition-all">
                Détails du Nœud →
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {MOCK_INSIGHTS_LLM.map((insight) => (
              <div key={insight.id} className="border p-6 rounded-3xl flex items-start gap-6 transition-all group shadow-inner" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${insight.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{insight.topic}</h4>
                  <p className="text-xs mb-4 leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>{insight.recommendation}</p>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold uppercase" style={{ color: 'var(--text-muted)' }}>{insight.studentCount} Étudiants</span>
                    <button className="text-purple-500 font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-purple-400 transition-colors">
                      Générer Action <Zap className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoachDashboard;
