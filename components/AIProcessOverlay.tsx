import React, { useEffect, useState } from 'react';
import { Cpu, Zap, ShieldCheck, BrainCircuit, Loader2 } from 'lucide-react';

interface AIProcessOverlayProps {
    isVisible: boolean;
    type: 'analysis' | 'generation' | 'audit' | 'remediation';
    onComplete?: () => void;
}

const AIProcessOverlay: React.FC<AIProcessOverlayProps> = ({ isVisible, type, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');

    const statusMap = {
        analysis: [
            "Lecture du code...",
            "Analyse de la complexité...",
            "Vérification des standards...",
            "Synthèse des résultats..."
        ],
        generation: [
            "Analyse de votre profil...",
            "Sélection des modules adaptées...",
            "Structuration du parcours...",
            "Finalisation..."
        ],
        audit: [
            "Recherche de vulnérabilités...",
            "Analyse des flux d'exécution...",
            "Vérification des règles de sécurité...",
            "Calcul du score final..."
        ],
        remediation: [
            "Identification des points de blocage...",
            "Recherche de ressources adaptées...",
            "Génération d'un exercice ciblé...",
            "Préparation de la session..."
        ]
    };

    const titleMap = {
        analysis: "Analyse IA en cours",
        generation: "Génération du parcours",
        audit: "Audit de sécurité IA",
        remediation: "Création du soutien"
    };

    useEffect(() => {
        if (isVisible) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => onComplete?.(), 600);
                        return 100;
                    }
                    const increment = prev > 80 ? 1.5 : prev > 40 ? 1 : 0.8;
                    return Math.min(100, prev + increment);
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isVisible, onComplete]);

    useEffect(() => {
        if (!isVisible) return;
        const currentStatuses = statusMap[type];
        const statusInterval = setInterval(() => {
            const index = Math.floor((progress / 100) * currentStatuses.length);
            setStatusText(currentStatuses[Math.min(index, currentStatuses.length - 1)]);
        }, 400);
        return () => clearInterval(statusInterval);
    }, [isVisible, type, progress]);

    if (!isVisible) return null;

    const Icon = type === 'analysis' ? BrainCircuit : type === 'audit' ? ShieldCheck : type === 'generation' ? Zap : Cpu;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md transition-opacity duration-300 font-sans">
            <div className="relative w-full max-w-sm p-8 bg-[#0a0f1a] rounded-3xl shadow-2xl flex flex-col items-center text-center mx-4 overflow-hidden border border-[#1e293b]">

                {/* Subtle animated background gradient glow */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#2964ea]/10 to-transparent pointer-events-none" />

                {/* Animated Icon Container */}
                <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-[#2964ea]/20 rounded-2xl rotate-3 animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-0 bg-[#2964ea]/20 rounded-2xl -rotate-3 animate-[spin_6s_linear_infinite_reverse]" />
                    <div className="relative flex items-center justify-center w-14 h-14 bg-[#0f172a] rounded-xl shadow-inner border border-slate-800">
                        <Icon className="w-7 h-7 text-[#2964ea]" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">
                    {titleMap[type]}
                </h2>

                <div className="flex items-center justify-center gap-2 h-6 mb-8 text-[#2964ea]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="font-medium text-sm animate-pulse">
                        {statusText}
                    </p>
                </div>

                {/* Simulated "Analysis" text block skeleton */}
                <div className="w-full space-y-2.5 mb-8">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-[#2964ea]/30"
                                style={{
                                    width: '100%',
                                    transform: 'translateX(-100%)',
                                    animation: `skeleton-scan 2s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Main Progress Bar */}
                <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progression</span>
                        <span className="text-xs font-bold text-[#2964ea]">{Math.floor(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#2964ea] transition-all duration-100 ease-out rounded-full shadow-[0_0_10px_#2964ea]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes skeleton-scan {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default AIProcessOverlay;
