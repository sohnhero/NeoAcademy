import { ProjectPlan, PlannedTask } from '../types';

export interface ValidationResult {
    isValid: boolean;
    totalHours: number;
    availableHours: number;
    warnings: string[];
    suggestions: string[];
    riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Validates a project plan against a global deadline.
 * Global deadline is assumed to be the total hours available from the start.
 */
export const validatePlan = (
    plan: ProjectPlan,
    globalDeadlineHours: number,
    projectType: 'module' | 'final'
): ValidationResult => {
    const totalAllocated = plan.tasks.reduce((acc, task) => acc + task.durationInHours, 0);
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // 1. Check if total plan fits in deadline
    if (totalAllocated > globalDeadlineHours) {
        warnings.push(`Votre planification (${totalAllocated}h) dépasse la date limite globale (${globalDeadlineHours}h).`);
        riskLevel = 'high';
    }

    // 2. Check for realistic task distributions (Smart Layer)
    const coreTasks = plan.tasks.filter(t =>
        t.title.toLowerCase().includes('audit') ||
        t.title.toLowerCase().includes('critique') ||
        t.title.toLowerCase().includes('développement') ||
        t.title.toLowerCase().includes('architecture')
    );

    coreTasks.forEach(task => {
        const minRecommended = projectType === 'final' ? 4 : 2;
        if (task.durationInHours < minRecommended) {
            warnings.push(`La tâche "${task.title}" semble sous-estimée (${task.durationInHours}h). Nous suggérons au moins ${minRecommended}h.`);
            riskLevel = riskLevel === 'high' ? 'high' : 'medium';
        }
    });

    // 3. Proactive Pacing Suggestions
    if (totalAllocated < globalDeadlineHours * 0.5) {
        suggestions.push("Votre planning est très optimiste. Pensez à ajouter des jalons pour la revue de code ou les tests.");
    }

    if (plan.tasks.length < 3) {
        suggestions.push("Découper votre projet en plus de jalons (3-5) vous aidera à mieux suivre votre progression.");
    }

    return {
        isValid: totalAllocated <= globalDeadlineHours,
        totalHours: totalAllocated,
        availableHours: globalDeadlineHours,
        warnings,
        suggestions,
        riskLevel
    };
};

/**
 * Suggests a default distribution of time for a given project type.
 */
export const suggestDefaultPlan = (
    globalDeadlineHours: number,
    projectType: 'module' | 'final'
): PlannedTask[] => {
    if (projectType === 'module') {
        return [
            { id: 't1', title: 'Analyse du cahier des charges', durationInHours: Math.floor(globalDeadlineHours * 0.2), status: 'pending', order: 1 },
            { id: 't2', title: 'Exécution technique / Audit', durationInHours: Math.floor(globalDeadlineHours * 0.5), status: 'pending', order: 2 },
            { id: 't3', title: 'Rédaction du rapport final', durationInHours: Math.floor(globalDeadlineHours * 0.3), status: 'pending', order: 3 },
        ];
    } else {
        return [
            { id: 't1', title: 'Conception & Architecture', durationInHours: Math.floor(globalDeadlineHours * 0.25), status: 'pending', order: 1 },
            { id: 't2', title: 'Développement core features', durationInHours: Math.floor(globalDeadlineHours * 0.4), status: 'pending', order: 2 },
            { id: 't3', title: 'Sécurité & Tests unitaires', durationInHours: Math.floor(globalDeadlineHours * 0.2), status: 'pending', order: 3 },
            { id: 't4', title: 'Finalisation & Documentation', durationInHours: Math.floor(globalDeadlineHours * 0.15), status: 'pending', order: 4 },
        ];
    }
};
