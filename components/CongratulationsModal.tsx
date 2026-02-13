
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, Star, Zap, X, ChevronRight } from 'lucide-react';

interface CongratulationsModalProps {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    type: 'course' | 'module' | 'badge';
    score?: number;
    badgeName?: string;
    xpEarned?: number;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
    isVisible,
    onClose,
    title,
    type,
    score,
    badgeName,
    xpEarned = 500
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.3)]"
                    >
                        {/* Animated Background Gradients */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0],
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-600/20 rounded-full blur-[120px]"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -90, 0],
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-600/20 rounded-full blur-[120px]"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col items-center text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Icon / Badge Section */}
                            <div className="relative mb-10">
                                <motion.div
                                    initial={{ rotate: -10, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[28px] flex items-center justify-center shadow-2xl shadow-blue-500/40 relative z-10"
                                >
                                    {type === 'badge' ? (
                                        <Award className="w-12 h-12 text-white" />
                                    ) : type === 'module' ? (
                                        <Star className="w-12 h-12 text-white" />
                                    ) : (
                                        <CheckCircle2 className="w-12 h-12 text-white" />
                                    )}
                                </motion.div>

                                {/* Particle Bursts (Dots) */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, x: 0, y: 0 }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            x: Math.cos(i * 45 * (Math.PI / 180)) * 100,
                                            y: Math.sin(i * 45 * (Math.PI / 180)) * 100,
                                        }}
                                        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                                    />
                                ))}
                            </div>

                            {/* Text Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">
                                    {type === 'badge' ? 'Nouveau Badge Débloqué' : 'Validation de Compétence'}
                                </span>
                                <h2 className="text-3xl font-black text-white tracking-tighter leading-none">
                                    {type === 'badge' ? badgeName : title}
                                </h2>
                                <p className="text-slate-400 text-sm max-w-[300px] mx-auto font-medium leading-relaxed">
                                    {type === 'badge'
                                        ? `Vous avez obtenu le badge "${badgeName}". Vos compétences sont reconnues par le réseau.`
                                        : `L'analyse neuronale de votre travail est un succès. Vous maîtrisez désormais ce concept.`}
                                </p>
                            </motion.div>

                            {/* Stats Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-4 w-full mt-10"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Score Audit</span>
                                    <span className="text-2xl font-black text-blue-400">{score || 95}%</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">XP Gagné</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-2xl font-black text-white">+{xpEarned}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={onClose}
                                className="mt-10 w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center group shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all"
                            >
                                <span>Continuer le Parcours</span>
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CongratulationsModal;
