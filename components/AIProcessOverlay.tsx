
import React, { useEffect, useState } from 'react';
import { Cpu, Zap, ShieldCheck, BrainCircuit, Search, Loader2 } from 'lucide-react';

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
            "Synchronisation avec l'EVM...",
            "Analyse du bytecode...",
            "Vérification des invariants...",
            "Génération du feedback socratique..."
        ],
        generation: [
            "Consultation de la base de connaissances...",
            "Structuration du parcours personnalisé...",
            "Optimisation de la courbe d'apprentissage...",
            "Finalisation du module..."
        ],
        audit: [
            "Scan des vulnérabilités (SWC)...",
            "Analyse du flux de contrôle...",
            "Vérification de la logique de transfert...",
            "Calcul du score de sécurité..."
        ],
        remediation: [
            "Identification des lacunes...",
            "Sélection des ressources de soutien...",
            "Conception de l'exercice de validation...",
            "Initialisation du cours de remédiation..."
        ]
    };

    useEffect(() => {
        if (isVisible) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => onComplete?.(), 500);
                        return 100;
                    }
                    return prev + 1;
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
        }, 500);
        return () => clearInterval(statusInterval);
    }, [isVisible, type, progress]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-500">
            {/* Animated Neural Background */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] animate-[pulse_4s_infinite]" />
            </div>

            <div className="relative w-full max-w-lg p-12 text-center">
                {/* Central Icon Container */}
                <div className="relative mx-auto w-32 h-32 mb-10">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-2 border-2 border-blue-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
                    <div className="absolute inset-4 border border-blue-400/20 rounded-full animate-[spin_2s_linear_infinite_reverse]" />

                    <div className="relative w-full h-full bg-slate-900 border border-blue-500/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                        {type === 'analysis' && <BrainCircuit className="w-12 h-12 text-blue-400" />}
                        {type === 'audit' && <ShieldCheck className="w-12 h-12 text-blue-400" />}
                        {type === 'generation' && <Zap className="w-12 h-12 text-blue-400" />}
                        {type === 'remediation' && <Cpu className="w-12 h-12 text-blue-400" />}
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                        {type === 'audit' ? 'Audit en cours' :
                            type === 'analysis' ? 'Analyse IA' :
                                type === 'generation' ? 'Optimisation' : 'Soutien IA'}
                    </h2>

                    <div className="h-6 flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                        <p className="text-blue-400 font-bold text-xs uppercase tracking-widest animate-pulse">
                            {statusText}
                        </p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative mt-8 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                        <span>Calcul vectoriel</span>
                        <span className="text-blue-400">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIProcessOverlay;
