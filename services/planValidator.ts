import { ProjectPlan, PlannedTask } from '../types';

export interface ValidationResult {
    isValid: boolean;
    totalHours: number;
    availableHours: number;
    warnings: string[];
    suggestions: string[];
    riskLevel: 'low' | 'medium' | 'high';
    pacingHealth?: 'relaxed' | 'balanced' | 'aggressive';
}

/**
 * Validates a project plan against a global deadline.
 */
export const validatePlan = (
    plan: ProjectPlan,
    globalDeadlineISO: string,
    projectType: 'module' | 'final'
): ValidationResult => {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // 1. Check individual deadlines
    const tasksWithDeadlines = [...plan.tasks].filter(t => t.deadline).sort((a, b) => a.order - b.order);
    let lastDeadline: Date | null = null;
    const globalDeadlineDate = new Date(globalDeadlineISO);

    tasksWithDeadlines.forEach(task => {
        const taskDeadline = new Date(task.deadline!);

        if (taskDeadline > globalDeadlineDate) {
            warnings.push(`Le jalon "${task.title}" dépasse la deadline finale du projet.`);
            riskLevel = 'high';
        }

        if (lastDeadline && taskDeadline < lastDeadline) {
            warnings.push(`Les deadlines sont incohérentes : "${task.title}" est prévu avant un jalon précédent.`);
            riskLevel = 'high';
        }
        lastDeadline = taskDeadline;
    });

    // 2. Calculate Pacing Health
    let pacingHealth: 'relaxed' | 'balanced' | 'aggressive' = 'balanced';
    if (tasksWithDeadlines.length > 0) {
        const totalDays = Math.max(1, Math.ceil((globalDeadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
        const daysPerTask = totalDays / plan.tasks.length;

        if (daysPerTask > 7) pacingHealth = 'relaxed';
        else if (daysPerTask < 3) pacingHealth = 'aggressive';
    }

    if (tasksWithDeadlines.length < plan.tasks.length && plan.tasks.length > 0) {
        suggestions.push("Pensez à assigner une deadline à chaque jalon pour un meilleur suivi.");
    }

    if (plan.tasks.length < 3) {
        suggestions.push("Découper votre projet en plus de jalons vous aidera à mieux suivre votre progression.");
    }

    return {
        isValid: (riskLevel as string) !== 'high',
        totalHours: 0,
        availableHours: 0,
        warnings,
        suggestions,
        riskLevel,
        pacingHealth
    };
};

/**
 * Suggests distributed dates for tasks based on available time.
 */
export const suggestDistributedDates = (
    taskCount: number,
    globalDeadlineISO: string
): string[] => {
    const start = new Date();
    const end = new Date(globalDeadlineISO);
    const totalMs = end.getTime() - start.getTime();
    const interval = totalMs / (taskCount + 1);

    const dates: string[] = [];
    for (let i = 1; i <= taskCount; i++) {
        const date = new Date(start.getTime() + interval * i);
        dates.push(date.toISOString());
    }
    return dates;
};

/**
 * Suggests default jalons for a project type.
 */
export const suggestDefaultPlan = (
    projectType: 'module' | 'final'
): PlannedTask[] => {
    if (projectType === 'module') {
        return [
            { id: 't1', title: 'Analyse du cahier des charges', durationInHours: 0, status: 'pending', order: 1 },
            { id: 't2', title: 'Exécution technique / Audit', durationInHours: 0, status: 'pending', order: 2 },
            { id: 't3', title: 'Rédaction du rapport final', durationInHours: 0, status: 'pending', order: 3 },
        ];
    } else {
        return [
            { id: 't1', title: 'Conception & Architecture', durationInHours: 0, status: 'pending', order: 1 },
            { id: 't2', title: 'Développement core features', durationInHours: 0, status: 'pending', order: 2 },
            { id: 't3', title: 'Sécurité & Tests unitaires', durationInHours: 0, status: 'pending', order: 3 },
            { id: 't4', title: 'Finalisation & Documentation', durationInHours: 0, status: 'pending', order: 4 },
        ];
    }
};
