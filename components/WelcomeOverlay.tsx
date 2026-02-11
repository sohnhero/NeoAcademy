
import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Award, Zap, CheckCircle, ChevronRight } from 'lucide-react';

interface WelcomeOverlayProps {
    onComplete: () => void;
    learnerName?: string;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onComplete, learnerName = 'Blockchain Explorer' }) => {
    const [phase, setPhase] = useState<'entrance' | 'celebration' | 'ready'>('entrance');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Phase 1: Entrance (0-1s)
        const timer1 = setTimeout(() => setPhase('celebration'), 800);
        // Phase 2: Celebration (1-4s)
        const timer2 = setTimeout(() => setPhase('ready'), 3500);
        // Phase 3: Final exit (4.5s)
        const timer3 = setTimeout(() => onComplete(), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    // Confetti Logic
    useEffect(() => {
        if (phase === 'celebration' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles: any[] = [];
            const particleCount = 150;
            const colors = ['#3B82F6', '#60A5FA', '#1E40AF', '#93C5FD', '#FFFFFF'];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + Math.random() * 100,
                    size: Math.random() * 6 + 2,
                    speed: Math.random() * 5 + 4,
                    angle: Math.random() * 60 - 30,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: 1,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                });
            }

            let animationFrame: number;
            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(p => {
                    p.y -= p.speed;
                    p.x += Math.sin(p.y / 30) * 2;
                    p.rotation += p.rotationSpeed;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.globalAlpha = p.opacity;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();

                    if (p.y < -10) {
                        p.y = canvas.height + 10;
                        p.x = Math.random() * canvas.width;
                    }
                });

                animationFrame = requestAnimationFrame(render);
            };

            render();
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [phase]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020617] transition-all duration-1000 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[160px] transition-transform duration-[3000ms] ${phase === 'celebration' ? 'scale-150 opacity-100' : 'scale-75 opacity-0'}`} />
                <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse transition-opacity duration-1000 ${phase === 'celebration' ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

            <div className="relative text-center px-6 max-w-2xl w-full">
                {/* Icon Animation */}
                <div className="flex justify-center mb-12">
                    <div className="relative">
                        <div className={`absolute inset-0 bg-blue-500/30 rounded-full blur-2xl transition-all duration-1000 ${phase === 'celebration' ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
                        <div className={`w-32 h-32 rounded-[40px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-500/40 relative transform transition-all duration-700 ${phase !== 'entrance' ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}>
                            <Award className="w-16 h-16 text-white" />

                            {/* Floating Micro-icons */}
                            <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-slate-900 border border-blue-500/30 flex items-center justify-center shadow-xl transition-all duration-500 delay-300 ${phase === 'celebration' ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                                <Sparkles className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className={`absolute -bottom-2 -left-6 w-10 h-10 rounded-xl bg-slate-900 border border-blue-500/30 flex items-center justify-center shadow-xl transition-all duration-500 delay-500 ${phase === 'celebration' ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                                <Zap className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Animations */}
                <div className="space-y-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 transition-all duration-700 delay-100 ${phase !== 'entrance' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Parcours Validé</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none transition-all duration-1000 delay-200">
                        <span className={`block transition-all duration-700 ${phase !== 'entrance' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            Bienvenue,
                        </span>
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 transition-all duration-1000 delay-500 ${phase !== 'entrance' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            NeoLearner
                        </span>
                    </h1>

                    <p className={`text-xl text-slate-400 font-medium transition-all duration-700 delay-700 ${phase !== 'entrance' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        Votre nouvelle aventure vers l'excellence Web3 commence maintenant.
                    </p>

                    <div className={`pt-12 transition-all duration-700 delay-1000 ${phase === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center justify-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] text-sm group cursor-pointer">
                            Initialisation du Dashboard
                            <ChevronRight className="w-5 h-5 animate-bounce-x" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-[4500ms] ease-linear"
                    style={{ width: phase === 'ready' ? '100%' : '0%' }}
                />
            </div>

            <style>{`
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1s infinite;
                }
            `}</style>
        </div>
    );
};

export default WelcomeOverlay;
