import React, { useState, useEffect } from 'react';
import {
    Calendar, Clock, AlertTriangle, CheckCircle2, Plus, Trash2,
    ArrowRight, Info, Lightbulb, ShieldAlert, Sparkles, Activity, Wand2
} from 'lucide-react';
import { ProjectPlan, PlannedTask } from '../types';
import { validatePlan, suggestDefaultPlan, suggestDistributedDates, ValidationResult } from '../services/planValidator';
import CustomDatePicker from './CustomDatePicker';

interface DeadlinePlanningBoardProps {
    globalDeadline: string; // ISO string
    projectType: 'module' | 'final';
    initialPlan?: ProjectPlan;
    subBlocks?: { id: string; title: string }[];
    onSavePlan: (plan: ProjectPlan) => void;
    onCancel: () => void;
}

const DeadlinePlanningBoard: React.FC<DeadlinePlanningBoardProps> = ({
    globalDeadline,
    projectType,
    initialPlan,
    subBlocks = [],
    onSavePlan,
    onCancel
}) => {
    const deadlineDate = new Date(globalDeadline);
    const now = new Date();

    // Timeline calculation Points
    const getTimelinePoints = (currentTasks: PlannedTask[]) => {
        const start = now.getTime();
        const end = deadlineDate.getTime();
        const total = Math.max(1, end - start);

        return currentTasks
            .filter(t => t.deadline)
            .map(t => {
                const taskTime = new Date(t.deadline!).getTime();
                const position = ((taskTime - start) / total) * 100;
                return { ...t, position: Math.min(100, Math.max(0, position)) };
            })
            .sort((a, b) => a.position - b.position);
    };

    const getDefaultTasks = (): PlannedTask[] => {
        if (initialPlan?.tasks && initialPlan.tasks.length > 0) return initialPlan.tasks;
        if (subBlocks.length > 0) {
            return subBlocks.map((block, index) => ({
                id: `task_${block.id}`,
                originalId: block.id,
                title: block.title,
                durationInHours: 0,
                status: 'pending',
                order: index + 1
            }));
        }
        return suggestDefaultPlan(projectType);
    };

    const [tasks, setTasks] = useState<PlannedTask[]>(getDefaultTasks());
    const [validation, setValidation] = useState<ValidationResult>({
        isValid: true,
        totalHours: 0,
        availableHours: 0,
        warnings: [],
        suggestions: [],
        riskLevel: 'low',
        pacingHealth: 'balanced'
    });

    useEffect(() => {
        const plan: ProjectPlan = {
            id: initialPlan?.id || `plan_${Math.random().toString(36).substr(2, 9)}`,
            tasks,
            totalAllocatedHours: 0,
            lastUpdated: new Date().toISOString()
        };
        setValidation(validatePlan(plan, globalDeadline, projectType));
    }, [tasks, globalDeadline, projectType, initialPlan]);

    const autoBalance = () => {
        const distributedDates = suggestDistributedDates(tasks.length, globalDeadline);
        setTasks(prev => prev.map((t, i) => ({
            ...t,
            deadline: distributedDates[i]
        })));
    };

    const addTask = () => {
        const newTask: PlannedTask = {
            id: `task_${Math.random().toString(36).substr(2, 9)}`,
            title: 'Nouvelle étape',
            durationInHours: 0,
            status: 'pending',
            order: tasks.length + 1
        };
        setTasks([...tasks, newTask]);
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const updateTask = (id: string, updates: Partial<PlannedTask>) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const handleSave = () => {
        if (validation.isValid) {
            onSavePlan({
                id: initialPlan?.id || `plan_${Math.random().toString(36).substr(2, 9)}`,
                tasks,
                totalAllocatedHours: 0,
                lastUpdated: new Date().toISOString()
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900/50 to-blue-900/10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Ma Stratégie de Livraison</h2>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Définissez vos propres jalons pour réussir votre {projectType === 'module' ? 'Audit de Module' : 'Projet de Fin de Parcours'}.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-sm bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            Deadline finale : {deadlineDate.toLocaleDateString('fr-FR')}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Visual Timeline Bar */}
                    <div className="bg-slate-800/20 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group/timeline">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover/timeline:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-end mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <span>Aujourd'hui</span>
                            <div className="flex items-center gap-2 text-blue-400">
                                <Activity className="w-3 h-3" />
                                Timeline de Livraison
                            </div>
                            <span>Date Finale</span>
                        </div>

                        <div className="relative h-12 flex items-center">
                            {/* Track */}
                            <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full" />
                            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 shadow-[0_0_15px_rgba(37,99,235,0.3)]" />

                            {/* Points */}
                            {getTimelinePoints(tasks).map((point) => (
                                <div
                                    key={point.id}
                                    className="absolute group/point"
                                    style={{ left: `${point.position}%` }}
                                >
                                    <div className="w-4 h-4 -ml-2 rounded-full bg-blue-500 border-4 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover/point:scale-125 transition-transform cursor-help relative z-20" />
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/point:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-[9px] font-bold text-white border border-slate-700 pointer-events-none z-30">
                                        {point.title}
                                    </div>
                                </div>
                            ))}

                            {/* Start/End Markers */}
                            <div className="absolute left-0 w-1.5 h-6 -ml-0.5 bg-slate-700 rounded-full z-10" />
                            <div className="absolute right-0 w-1.5 h-6 -mr-0.5 bg-orange-500 rounded-full z-10 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Plan Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-end">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Vos Jalons Stratégiques
                                </h3>
                                <button
                                    onClick={autoBalance}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-500/20 transition-all active:scale-95"
                                >
                                    <Wand2 className="w-3 h-3" />
                                    Répartir Équitablement
                                </button>
                            </div>

                            <div className="space-y-4 text-left">
                                {tasks.map((task, index) => (
                                    <div key={task.id} className="group relative bg-slate-800/30 hover:bg-slate-800/50 border border-slate-800/50 rounded-2xl p-5 transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-600">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={task.title}
                                                    onChange={(e) => updateTask(task.id, { title: e.target.value })}
                                                    className="bg-transparent text-white font-medium border-none focus:ring-0 w-full p-0 text-lg placeholder-slate-600 outline-none"
                                                    placeholder="Nom du jalon..."
                                                />
                                                <div className="flex items-center gap-4">
                                                    <CustomDatePicker
                                                        value={task.deadline}
                                                        min={new Date().toISOString()}
                                                        max={globalDeadline}
                                                        onChange={(date) => updateTask(task.id, { deadline: date })}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeTask(task.id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addTask}
                                    className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                >
                                    <Plus className="w-4 h-4" /> Ajouter un Jalon Personnalisé
                                </button>
                            </div>
                        </div>

                        {/* Right Panel: Intelligence */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-6 shadow-inner">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-700 pb-3">
                                    <Lightbulb className="w-4 h-4 text-yellow-400" /> Intelligence Layer
                                </h3>

                                {/* Pacing Health */}
                                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Santé du Planning</span>
                                        <div className={`w-2 h-2 rounded-full ${validation.isValid ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </div>
                                    <div className="flex items-end gap-2 text-left">
                                        <span className={`text-xl font-black uppercase tracking-tighter ${validation.pacingHealth === 'relaxed' ? 'text-green-400' :
                                                validation.pacingHealth === 'aggressive' ? 'text-orange-400' : 'text-blue-400'
                                            }`}>
                                            {validation.pacingHealth === 'relaxed' ? 'Détendu' :
                                                validation.pacingHealth === 'aggressive' ? 'Intense' : 'Équilibré'}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold mb-1 opacity-60">Rythme Estimé</span>
                                    </div>
                                </div>

                                {/* Warnings & Suggestions */}
                                <div className="space-y-3 text-left">
                                    {validation.warnings.map((w, i) => (
                                        <div key={i} className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-200 leading-relaxed">
                                            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
                                            {w}
                                        </div>
                                    ))}
                                    {validation.suggestions.map((s, i) => (
                                        <div key={i} className="flex gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200 leading-relaxed">
                                            <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
                                            {s}
                                        </div>
                                    ))}
                                    {validation.isValid && validation.warnings.length === 0 && (
                                        <div className="flex gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-200 leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-400" />
                                            Votre stratégie est cohérente avec la deadline finale.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl text-[11px] text-orange-200/60 leading-relaxed italic text-left">
                                "En définissant vos propres jalons, vous vous donnez 70% de chances supplémentaires de terminer avant la deadline."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between gap-4 items-center">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 text-slate-400 hover:text-white font-bold text-sm transition-all"
                    >
                        Plus tard
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!validation.isValid}
                        className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${validation.isValid
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        Valider ma Stratégie <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeadlinePlanningBoard;
