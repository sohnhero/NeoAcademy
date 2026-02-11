import React, { useState, useEffect } from 'react';
import {
    Calendar, Clock, AlertTriangle, CheckCircle2, Plus, Trash2,
    ArrowRight, Info, Lightbulb, ShieldAlert, Sparkles
} from 'lucide-react';
import { ProjectPlan, PlannedTask } from '../types';
import { validatePlan, suggestDefaultPlan, ValidationResult } from '../services/planValidator';

interface DeadlinePlanningBoardProps {
    globalDeadline: string; // ISO string
    projectType: 'module' | 'final';
    initialPlan?: ProjectPlan;
    onSavePlan: (plan: ProjectPlan) => void;
    onCancel: () => void;
}

const DeadlinePlanningBoard: React.FC<DeadlinePlanningBoardProps> = ({
    globalDeadline,
    projectType,
    initialPlan,
    onSavePlan,
    onCancel
}) => {
    const deadlineDate = new Date(globalDeadline);
    const now = new Date();

    // Calculate total available hours from now to deadline
    const diffMs = deadlineDate.getTime() - now.getTime();
    const availableHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

    const [tasks, setTasks] = useState<PlannedTask[]>(
        initialPlan?.tasks || suggestDefaultPlan(availableHours, projectType)
    );

    const [validation, setValidation] = useState<ValidationResult>({
        isValid: true,
        totalHours: 0,
        availableHours,
        warnings: [],
        suggestions: [],
        riskLevel: 'low'
    });

    useEffect(() => {
        const plan: ProjectPlan = {
            id: initialPlan?.id || `plan_${Math.random().toString(36).substr(2, 9)}`,
            tasks,
            totalAllocatedHours: tasks.reduce((acc, t) => acc + t.durationInHours, 0),
            lastUpdated: new Date().toISOString()
        };
        setValidation(validatePlan(plan, availableHours, projectType));
    }, [tasks, availableHours, projectType, initialPlan]);

    const addTask = () => {
        const newTask: PlannedTask = {
            id: `task_${Math.random().toString(36).substr(2, 9)}`,
            title: 'Nouvelle étape',
            durationInHours: 2,
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
                totalAllocatedHours: validation.totalHours,
                lastUpdated: new Date().toISOString()
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
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
                            Deadline: {deadlineDate.toLocaleDateString('fr-FR')}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                            Temps total disponible : <span className="text-white font-bold">{availableHours}h</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Plan Editor */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Vos Jalons Pensés
                        </h3>

                        {tasks.map((task, index) => (
                            <div key={task.id} className="group relative bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700 rounded-xl p-4 transition-all hover:border-blue-500/30">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-600">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            value={task.title}
                                            onChange={(e) => updateTask(task.id, { title: e.target.value })}
                                            className="bg-transparent text-white font-medium border-none focus:ring-0 w-full p-0 text-lg placeholder-slate-600"
                                            placeholder="Nom du jalon..."
                                        />
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700">
                                                <Clock className="w-3.5 h-3.5 text-blue-400" />
                                                <input
                                                    type="number"
                                                    value={task.durationInHours}
                                                    onChange={(e) => updateTask(task.id, { durationInHours: parseInt(e.target.value) || 0 })}
                                                    className="bg-transparent text-blue-100 text-sm font-bold w-12 border-none focus:ring-0 p-0"
                                                />
                                                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Heures</span>
                                            </div>
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

                    {/* Smart Panel */}
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-inner">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-yellow-400" /> Intelligence Layer
                            </h3>

                            {/* Progress Summary */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Progression Planifiée</span>
                                    <span className={validation.isValid ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>
                                        {validation.totalHours}h / {availableHours}h
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${validation.isValid ? (validation.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-blue-500') : 'bg-red-500'}`}
                                        style={{ width: `${Math.min(100, (validation.totalHours / availableHours) * 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Warnings & Suggestions */}
                            <div className="space-y-3">
                                {validation.warnings.map((w, i) => (
                                    <div key={i} className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-200 leading-relaxed animate-pulse">
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
                                        Votre planification est saine et équilibrée. Prêt à commencer ?
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl text-[11px] text-orange-200/60 leading-relaxed italic">
                            "L'autonomie demande de la rigueur. En définissant vos propres jalons, vous vous donnez 70% de chances supplémentaires de terminer avant la deadline."
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
