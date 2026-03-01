
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LandingPageProps {
    onStart: () => void;
}

// Premium Custom Icons (Bespoke SVG compositions)
interface IconProps {
    className?: string;
    style?: React.CSSProperties;
}

const PremiumBrain = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M9.5 14.5L14.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PremiumTarget = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PremiumNetwork = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M12 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <path d="M18.36 5.64L16.24 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.76 16.24L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.36 18.36L16.24 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.76 7.76L5.64 5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PremiumShield = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M12 2L4 5V11C4 16.18 7.41 21.05 12 22C16.59 21.05 20 16.18 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 21.5V18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PremiumLogo = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M22 12V17.5L12 23L2 17.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 1L22 6.5V12L12 17.5L2 12V6.5L12 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 1V17.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
);

const PremiumArrow = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PremiumStars = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
    </svg>
);

const PremiumCube = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M21 16.09V7.91C21 7.21 20.62 6.56 20 6.21L13 2.21C12.38 1.86 11.62 1.86 11 2.21L4 6.21C3.38 6.56 3 7.21 3 7.91V16.09C3 16.79 3.38 17.44 4 17.79L11 21.79C11.62 22.14 12.38 22.14 13 21.79L20 17.79C20.62 17.44 21 16.79 21 16.09Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 22.08V12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const PremiumPlay = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
);

const PremiumTerminal = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M4 17L10 11L4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PremiumChevron = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: PremiumBrain,
            title: "Moteur Neural Adaptatif",
            description: "Notre IA ne se contente pas de suivre votre progression. Elle l'anticipe, sculptant un parcours unique adapté à votre vitesse neuronale.",
            color: "blue",
            gradient: "from-blue-600 to-indigo-600",
            borderColor: "group-hover:border-blue-500/30",
            bgColor: "group-hover:bg-blue-500/10",
            iconColor: "group-hover:text-blue-400"
        },
        {
            icon: PremiumTarget,
            title: "Maîtrise Vérifiable",
            description: "Au-delà des simples quiz, validez vos acquis par des défis de code complexes, audités en temps réel par notre moteur d'évaluation.",
            color: "purple",
            gradient: "from-purple-600 to-pink-600",
            borderColor: "group-hover:border-purple-500/30",
            bgColor: "group-hover:bg-purple-500/10",
            iconColor: "group-hover:text-purple-400"
        },
        {
            icon: PremiumNetwork,
            title: "Écosystème Web3",
            description: "De la théorie cryptographique au déploiement de Smart Contracts, maîtrisez la stack complète dans un environnement simulé haute fidélité.",
            color: "cyan",
            gradient: "from-cyan-600 to-blue-600",
            borderColor: "group-hover:border-cyan-500/30",
            bgColor: "group-hover:bg-cyan-500/10",
            iconColor: "group-hover:text-cyan-400"
        },
        {
            icon: PremiumShield,
            title: "Certification On-Chain",
            description: "Chaque compétence validée génère une preuve cryptographique, construisant un portfolio immuable de votre expertise technique.",
            color: "emerald",
            gradient: "from-emerald-600 to-teal-600",
            borderColor: "group-hover:border-emerald-500/30",
            bgColor: "group-hover:bg-emerald-500/10",
            iconColor: "group-hover:text-emerald-400"
        }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-hidden font-sans selection:bg-blue-500/30 relative">
            {/* Premium Ambient Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030712] to-[#030712]"></div>

            {/* Dynamic Grid Background with fade */}
            <div className="fixed inset-0 z-0 perspective-1000 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform-gpu rotate-x-12 animate-grid-flow"></div>
            </div>

            {/* Modern nav */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto backdrop-blur-md border-b border-white/5 bg-[#030712]/50 sticky top-0 transition-all duration-500">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.8)] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-cyan-400 opacity-80"></div>
                        <PremiumLogo className="text-white w-6 h-6 relative z-10" />
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">NeoAcademy<span className="text-blue-500 font-mono">_AI</span></span>
                </div>

                <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                    {['Fonctionnalités', 'Parcours', 'Méthodologie'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            {item}
                        </a>
                    ))}
                </div>

                <button
                    onClick={onStart}
                    className="relative px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-blue-50 transition-all overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Connexion <PremiumArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)] animate-float ring-1 ring-blue-500/20">
                            <PremiumStars className="w-3 h-3 animate-pulse text-blue-400" />
                            <span>LMS Intelligent v2.0</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 drop-shadow-2xl">
                            Maîtrisez les métiers du <br />
                            <span className="relative text-blue-500">
                                Web

                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                            Une plateforme d'apprentissage <span className="text-white font-medium">nouvelle génération</span> où l'IA structure, adapte et certifie votre montée en compétences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 pt-4">
                            <button
                                onClick={onStart}
                                className="group relative px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    Commencer l'Aventure
                                    <PremiumCube className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </div>
                            </button>

                        </div>

                        <div className="flex items-center gap-8 pt-8">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#030712] bg-slate-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 hover:z-10 hover:scale-110">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} className="w-full h-full object-cover" alt="User" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-[#030712] bg-blue-600 flex items-center justify-center text-xs font-bold z-10">
                                    2k+
                                </div>
                            </div>
                            <div className="h-10 w-px bg-white/10"></div>
                            <div className="text-sm">
                                <div className="flex text-yellow-500 mb-1">★★★★★</div>
                                <div className="text-slate-400 font-medium">Rejoint par l'élite Web3</div>
                            </div>
                        </div>
                    </div>

                    <div className={`relative transition-all duration-1000 delay-200 perspective-1000 ${isVisible ? 'opacity-100 rotate-y-0 translate-x-0' : 'opacity-0 rotate-y-12 translate-x-10'}`}>
                        <div className="relative z-10">
                            {/* Terminal Glass Container */}
                            <div className="bg-[#0f1420]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Decorative Header */}
                                <div className="bg-[#030712] rounded-t-[1.5rem] p-4 flex items-center justify-between border-b border-white/5 relative z-10">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                                        <PremiumTerminal className="w-3 h-3" />
                                        neo_audit_engine.ts
                                    </div>
                                </div>

                                {/* Code Area */}
                                <div className="bg-[#030712] rounded-b-[1.5rem] p-8 font-mono text-sm relative min-h-[400px] overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>

                                    <div className="relative z-10 space-y-2">
                                        <div className="text-slate-500">// Initialisation du scan neural...</div>
                                        <div className="text-purple-400">async function <span className="text-blue-400">auditSmartContract</span>(code) <span className="text-white">{`{`}</span></div>
                                        <div className="pl-6 border-l border-white/10 space-y-2">
                                            <div className="text-slate-300">const <span className="text-cyan-400">vulnerabilities</span> = await ai.scan(code);</div>
                                            <div className="text-slate-300">if (vulnerabilities.length {`>`} 0) <span className="text-white">{`{`}</span></div>
                                            <div className="pl-6 text-emerald-400">
                                                // Pattern matching IA détecté
                                                return generateRemediationPlan(vulnerabilities);
                                            </div>
                                            <div className="text-white">{`}`}</div>
                                        </div>
                                        <div className="text-white">{`}`}</div>
                                    </div>

                                    {/* Active Scan Effect */}
                                    <div className="absolute top-[40%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-scanline"></div>

                                    {/* Floating Success Card */}
                                    <div className="absolute bottom-6 right-6 bg-[#0f172a]/90 backdrop-blur-xl border border-emerald-500/30 p-5 rounded-2xl shadow-2xl w-auto max-w-xs animate-[float_5s_ease-in-out_infinite] z-20 hover:scale-105 transition-transform cursor-default">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white mb-1">Vulnérabilité Corrigée</div>
                                                <div className="text-xs text-slate-400 leading-tight">Optimisation Gas + Sécurité Reentrancy validées par l'IA.</div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md uppercase tracking-wider">+150 XP</span>
                                                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md uppercase tracking-wider">Skill Up</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background Glows */}
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                        </div>
                    </div>
                </div>

                {/* Features - Premium Cards */}
                <div id="features" className="mt-40 relative">
                    <div className="text-center mb-24 relative z-10">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block animate-pulse">Technologie Avancée</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
                            L'Intelligence au <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Service de l'Excellence</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 px-4">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative h-full perspective-1000"
                                onMouseEnter={() => setActiveFeature(idx)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className={`relative h-full bg-[#0B0F19] rounded-[2.5rem] p-8 border border-white/5 ${feature.borderColor} transition-all duration-300 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                                    {/* Inner Gradient */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500`}></div>

                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-slate-900 border border-white/5 ${feature.borderColor} ${feature.bgColor} transition-all duration-300 shadow-lg`}>
                                        <feature.icon className={`w-8 h-8 text-slate-400 ${feature.iconColor} transition-colors`} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">{feature.title}</h3>

                                    <p className="text-slate-400 leading-relaxed font-light text-sm group-hover:text-slate-300 line-clamp-4">
                                        {feature.description}
                                    </p>

                                    <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        En savoir plus <PremiumChevron className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Methodology - Cyber Structure */}
                <div id="methodology" className="mt-40 pt-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0B0F19] to-[#030712] -z-10"></div>

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                                    Architecture <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 ">Pédagogique Cybernétique</span>
                                </h2>
                                <p className="text-lg text-slate-400 font-light max-w-lg">
                                    Chaque interaction nourrit votre profil de compétences dans une boucle d'apprentissage infinie.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-20 h-20 rounded-full border border-dashed border-white/20 animate-spin-slow flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 blur-md"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { title: "Graphes de Savoir", icon: PremiumLogo, color: "blue", hex: "#3b82f6", desc: "Structure dynamique qui évolue. Chaque module débloqué agit comme une clé cryptographique pour le niveau suivant." },
                                { title: "Symbiose IA", icon: PremiumBrain, color: "purple", hex: "#a855f7", desc: "Analyse sémantique de votre code et feedback contextuel instantané. Une boucle de rétroaction ultra-rapide." },
                                { title: "Preuve d'Expertise", icon: PremiumShield, color: "emerald", hex: "#10b981", desc: "Validation granulaire et certification blockchain. Construisez une réputation technique irréfutable." }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0B0F19] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-white/20 hover:-translate-y-2 transition-all duration-500">
                                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>

                                    <item.icon className="w-12 h-12 mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ color: item.hex }} />

                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ultra Premium CTA */}
                <div className="mt-40 mb-20 relative px-6">
                    <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-[#0B0F19] border border-blue-500/30 p-12 md:p-24 text-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0B0F19] to-[#0B0F19] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        {/* Animated rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/10 rounded-full animate-ping-slow"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-500/10 rounded-full animate-ping-slower"></div>

                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white drop-shadow-xl">
                                Prêt à Coder le <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Futur</span> ?
                            </h2>
                            <p className="text-xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">
                                Rejoignez l'élite des développeurs Web3 formés par l'intelligence artificielle.
                            </p>
                            <button
                                onClick={onStart}
                                className="px-12 py-6 bg-white text-black hover:bg-blue-50 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.3)] flex items-center gap-4 mx-auto"
                            >
                                Accès Anticipé Gratuit
                                <PremiumArrow className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="py-12 border-t border-white/5 bg-[#030712]">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
                            <PremiumLogo className="w-6 h-6 text-blue-500" />
                            <span className="font-bold text-sm tracking-widest text-slate-300 uppercase">NeoAcademy _AI</span>
                        </div>
                        <div className="flex gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <a href="#" className="hover:text-blue-400 transition-colors">Politique</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Conditions</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                        </div>
                        <div className="text-xs text-slate-600 font-mono">Build v2.1.4 • Paris, FR</div>
                    </div>
                </footer>
            </main>
            <ToastContainer aria-label="Notifie les événements de l'application" />

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes ping-slow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.05; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        @keyframes scanline {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 4rem 4rem; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
            animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-ping-slow {
             animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
             animation: ping-slower 6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-scanline {
            animation: scanline 3s linear infinite;
        }
        .animate-grid-flow {
            animation: grid-flow 20s linear infinite;
        }
        .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
        }
        .typing-effect {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #3b82f6;
            animation: typing 3s steps(40, end);
        }
      `}</style>
        </div>
    );
};

// Helper component for the check icon in the demo
const CheckCircle = ({ className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default LandingPage;
