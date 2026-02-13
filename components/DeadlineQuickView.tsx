import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, Target, Calendar } from 'lucide-react';
import { ProjectPlan, PlannedTask } from '../types';

interface DeadlineQuickViewProps {
    plan: ProjectPlan;
    globalDeadline: string;
    onOpenPlanning: () => void;
    isCompact?: boolean;
}

const DeadlineQuickView: React.FC<DeadlineQuickViewProps> = ({
    plan,
    globalDeadline,
    onOpenPlanning,
    isCompact = false
}) => {
    const deadlineDate = new Date(globalDeadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const totalTasks = plan.tasks.length;
    const completedTasks = plan.tasks.filter(t => t.status === 'completed').length;
    const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const currentTask = plan.tasks.find(t => t.status !== 'completed') || plan.tasks[plan.tasks.length - 1];

    if (isCompact) {
        return (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-white w-full max-w-sm group">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/10">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-wider">Objectif Livraison</h4>
                            <p className="text-[10px] text-white/60 font-medium">Jalon : {currentTask?.title}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-lg font-black ${daysLeft <= 3 ? 'text-orange-300' : 'text-white'}`}>
                            J-{daysLeft}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span>Progression Jalons</span>
                    <span>{completedTasks}/{totalTasks}</span>
                </div>

                <button
                    onClick={onOpenPlanning}
                    className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                    <Calendar className="w-3.5 h-3.5" /> Ajuster ma Stratégie
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group shadow-xl">
            {/* Top Progress Bar */}
            <div className="h-1 bg-slate-800 w-full">
                <div
                    className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Target className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Objectif Livraison</h4>
                            <p className="text-[10px] text-slate-500 font-medium">Auto-planification active</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-sm font-black ${daysLeft <= 3 ? 'text-orange-400' : 'text-slate-300'}`}>
                            J-{daysLeft}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Échéance</div>
                    </div>
                </div>

                {/* Current Custom Milestone */}
                <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Votre Jalon Actuel</span>
                        {currentTask?.status === 'at-risk' && (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded border border-orange-400/20">
                                <AlertTriangle className="w-2.5 h-2.5" /> RETARD
                            </span>
                        )}
                    </div>
                    <div className="text-xs font-semibold text-blue-100 mb-1 truncate">
                        {currentTask?.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {currentTask?.deadline ? new Date(currentTask.deadline).toLocaleDateString('fr-FR') : 'Pas de date'}
                    </div>
                </div>

                {/* Timeline Preview */}
                <div className="flex items-center gap-1 px-1">
                    {plan.tasks.map((task, i) => (
                        <div
                            key={task.id}
                            className={`h-1 flex-1 rounded-full transition-all ${task.status === 'completed' ? 'bg-green-500' :
                                task.status === 'at-risk' ? 'bg-orange-500' : 'bg-slate-700'
                                }`}
                            title={task.title}
                        />
                    ))}
                </div>

                <button
                    onClick={onOpenPlanning}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                    <Calendar className="w-3.5 h-3.5" /> Ajuster ma Stratégie
                </button>
            </div>
        </div>
    );
};

export default DeadlineQuickView;
