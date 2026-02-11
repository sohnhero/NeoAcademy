import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, Target, Calendar } from 'lucide-react';
import { ProjectPlan, PlannedTask } from '../types';

interface DeadlineQuickViewProps {
    plan: ProjectPlan;
    globalDeadline: string;
    onOpenPlanning: () => void;
}

const DeadlineQuickView: React.FC<DeadlineQuickViewProps> = ({
    plan,
    globalDeadline,
    onOpenPlanning
}) => {
    const deadlineDate = new Date(globalDeadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const totalHours = plan.totalAllocatedHours;
    const completedHours = plan.tasks
        .filter(t => t.status === 'completed')
        .reduce((acc, t) => acc + t.durationInHours, 0);

    const progressPercent = (completedHours / totalHours) * 100;

    const currentTask = plan.tasks.find(t => t.status !== 'completed') || plan.tasks[plan.tasks.length - 1];

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group">
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
                        {currentTask.status === 'at-risk' && (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded border border-orange-400/20">
                                <AlertTriangle className="w-2.5 h-2.5" /> RETARD
                            </span>
                        )}
                    </div>
                    <div className="text-xs font-semibold text-blue-100 mb-1 truncate">
                        {currentTask.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <Clock className="w-3 h-3" />
                        {currentTask.durationInHours}h estimées
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
