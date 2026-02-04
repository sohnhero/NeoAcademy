import React from 'react';
import {
    Zap, Shield, Target, Cpu, ArrowRight, ChevronRight, Library, Users, BarChart3,
    Hexagon, Globe, Star, Layers, Rocket, CheckCircle, Lock, MessageSquare,
    User, Settings, History, Trophy, Award, AlertTriangle, Lightbulb,
    MousePointer2, TrendingUp, GraduationCap, Code2, BadgeCheck, LayoutGrid,
    Sparkles, Command, MoveDown, Terminal, Activity, Milestone, BrainCircuit,
    Fingerprint, Network, ShieldCheck, Share2, Search, ZapOff,
    Code, Binary, Database, Sun, Moon
} from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen text-white relative overflow-hidden bg-primary font-sans selection:bg-blue-500/30 grid-pattern transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Functional UI Elements */}
            <div className="scroll-progress"></div>

            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-blue-600/[0.04] to-transparent pointer-events-none"></div>
            <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/[0.03] blur-[150px] rounded-full animate-pulse"></div>

            {/* Industrial Dividers (Systematic Decor) */}
            <div className="absolute top-0 left-[8%] w-[1px] h-full bg-white/[0.015] hidden xl:block"></div>
            <div className="absolute top-0 right-[8%] w-[1px] h-full bg-white/[0.015] hidden xl:block"></div>

            {/* Navigation - Ultra Minimalist Editorial */}
            <nav className="fixed top-0 w-full z-50 px-8 py-6 md:px-16 flex justify-between items-center transition-all duration-500 border-b" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(24px)' }}>
                <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Hexagon className="w-6 h-6 relative z-10 transition-transform duration-500" style={{ color: 'var(--text-primary)', fill: 'var(--accent-primary)', fillOpacity: 0.1 }} />
                        </div>
                        <h1 className="text-sm font-black tracking-[0.3em] uppercase transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>NeoAcademy</h1>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-16 text-[9px] font-black uppercase tracking-[0.45em]" style={{ color: 'var(--text-secondary)' }}>
                    <a href="#vision" className="hover:text-blue-500 transition-all hover:translate-y-[-1px]">Origine</a>
                    <a href="#protocol" className="hover:text-blue-500 transition-all hover:translate-y-[-1px]">Moteur</a>
                    <a href="#terminal" className="hover:text-blue-500 transition-all hover:translate-y-[-1px]">Terminal</a>
                    <a href="#curriculum" className="hover:text-blue-500 transition-all hover:translate-y-[-1px]">Syndicat</a>
                </div>

                <div className="flex items-center gap-8 text-primary" style={{ color: 'var(--text-primary)' }}>
                    <button onClick={onStart} className="text-[9px] font-black uppercase tracking-[0.4em] hover:text-blue-500 transition-colors hidden sm:block" style={{ color: 'var(--text-secondary)' }}>Autorisation</button>
                    <button
                        onClick={onStart}
                        className="group relative px-10 py-3.5 overflow-hidden transition-all hover:invert"
                        style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                    >
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em]">Établir le Lien</span>
                    </button>
                </div>
            </nav>

            {/* Hero Section - The "Elite" Visual Statement */}
            <section className="relative px-8 md:px-16 max-w-[1400px] mx-auto z-10 pt-32 pb-32 md:pt-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12 lg:space-y-16 reveal">
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Protocole Neural 4.5.1</span>
                            <div className="w-12 h-[1px] bg-blue-500/30"></div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-[-0.05em] leading-[0.85] uppercase transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
                                <span className="text-shine">Forger</span> <br />
                                <span className="opacity-10 italic font-light tracking-[-0.08em] block -mt-2">L'Excellence</span>
                                <span className="text-shine block -mt-4">Systémique.</span>
                            </h2>
                        </div>

                        <div className="space-y-10 max-w-xl">
                            <p className="text-sm font-medium leading-relaxed uppercase tracking-wider border-l-2 border-blue-600 pl-6" style={{ color: 'var(--text-secondary)' }}>
                                L'architecture pédagogique la plus rigoureuse du Web3. <br />
                                Validation neurale. Audit systémique. <br />
                                Élite exclusive.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 pt-4">
                                <button
                                    onClick={onStart}
                                    className="group relative px-10 py-5 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl"
                                    style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Établir le Lien</span>
                                </button>
                                <button
                                    onClick={onStart}
                                    className="px-10 py-5 border hover:border-blue-500 transition-all text-sm font-black uppercase tracking-[0.4em]"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                >
                                    Voir le Protocole
                                </button>
                            </div>

                            <div className="flex justify-between text-[7px] font-black uppercase tracking-[0.5em] pt-4 border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                                <span>[ STATUT : OPTIMISÉ ]</span>
                                <span>[ NŒUDS : 1,294 ]</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative reveal active" style={{ animationDelay: '0.4s' }}>
                        <div className="relative group max-w-lg mx-auto lg:ml-auto">
                            <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000 animate-pulse"></div>
                            <div className="relative z-10 transform group-hover:scale-105 transition-all duration-700">
                                <img
                                    src="/hero-artifact.png"
                                    alt="Nœud Élite"
                                    className="w-full h-auto mix-blend-lighten drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                />
                            </div>

                            {/* Technical Overlays */}
                            <div className="absolute -top-6 -right-6 p-5 border rounded-2xl z-20 animate-float transition-all duration-500 shadow-2xl" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(12px)' }}>
                                <Activity className="w-5 h-5 text-blue-500 mb-2" />
                                <div className="text-[7px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Sync Neurale</div>
                                <div className="text-[11px] font-mono font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>99.4% VALIDE</div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 p-5 border rounded-2xl z-20 animate-float-delayed transition-all duration-500 shadow-2xl" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(12px)' }}>
                                <BrainCircuit className="w-5 h-5 text-purple-500 mb-2" />
                                <div className="text-[7px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Traitement</div>
                                <div className="text-[11px] font-mono text-blue-400">0.00ms</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Neural Terminal Section - Tech Credibility */}
            <section id="terminal" className="py-24 border-y reveal transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-4">
                            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em]">Accès Terminal</span>
                            <h3 className="text-4xl font-black uppercase tracking-tighter transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>L'Environnement d'Audit.</h3>
                        </div>
                        <p className="text-sm font-medium leading-relaxed uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                            Une interface de bas niveau conçue pour l'analyse profonde. Pas de distraction, juste de la rigueur technique.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            {["VM Temps Réel", "Sync Ledger", "Trace Neurale", "Analyse Opcodes"].map((t, i) => (
                                <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="border rounded-2xl overflow-hidden shadow-3xl premium-border transition-all duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                            <div className="px-6 py-3 border-b flex items-center justify-between transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }}></div>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }}></div>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }}></div>
                                </div>
                                <span className="text-[9px] font-mono font-bold tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>NEURAL_SHELL_v4.2</span>
                            </div>
                            <div className="p-8 font-mono text-[11px] leading-relaxed relative min-h-[400px]">
                                <div className="text-blue-500 mb-4 tracking-tighter">Initialisation_Poignée_de_Main_Sécurisée... [OK]</div>
                                <div className="mb-2" style={{ color: 'var(--text-muted)' }}>/usr/local/academy/audit --target=smart_proxy.sol</div>
                                <div className="text-blue-400 mb-6">Analyse de la disposition du stockage...</div>
                                <div className="border p-4 rounded mb-6 flex flex-col gap-2 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                    <div className="italic font-bold" style={{ color: 'var(--text-muted)' }}>// ALERTE_NEURALE_IA //</div>
                                    <div className="text-primary font-bold" style={{ color: 'var(--text-primary)' }}>Collision détectée au slot 0x0. Le contrat Proxy utilise la même adresse de stockage que l'implémentation logique.</div>
                                    <div className="text-blue-500 font-bold uppercase tracking-widest text-[9px] pt-2">Tâche: Résoudre la collision via EIP-1967.</div>
                                </div>
                                <div className="text-primary font-bold animate-pulse inline-block border-r-[6px] border-blue-500 pr-1" style={{ color: 'var(--text-primary)' }}>attente_entrée_</div>

                                {/* Pattern Decorator */}
                                <div className="absolute bottom-8 right-8 opacity-10">
                                    <Binary className="w-24 h-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protocol Deep-Drive - Engineered Visuals */}
            <section id="protocol" className="py-48 px-8 md:px-16 max-w-7xl mx-auto reveal">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div className="space-y-12">
                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em]">02 / Le Moteur</span>
                        <h3 className="text-6xl font-black uppercase tracking-tight leading-[0.9] transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>Moteur de <br /> Maîtrise <br /> <span className="text-shine">Propriétaire.</span></h3>
                        <p className="text-lg font-medium leading-relaxed uppercase tracking-wider max-w-md" style={{ color: 'var(--text-secondary)' }}>
                            Notre architecture fusionne la puissance des modèles LLM avec des agents d'exécution VM locaux pour vérifier vos assertions techniques.
                        </p>
                        <div className="space-y-4 pt-10">
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--text-primary)' }}>
                                    <Target className="w-6 h-6" style={{ color: 'var(--bg-primary)' }} />
                                </div>
                                <div>
                                    <h5 className="text-[11px] font-black uppercase tracking-widest transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>Feedback Socratique</h5>
                                    <p className="text-[9px] font-bold uppercase tracking-widest leading-none mt-1" style={{ color: 'var(--text-muted)' }}>L'IA ne donne jamais la réponse, elle la fait naître.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 py-1 transition-colors duration-500" style={{ backgroundColor: 'var(--border-color)' }}>
                        {[
                            { icon: <ShieldCheck className="w-6 h-6 text-blue-500" />, title: "Validation-ZK", desc: "Preuve de compétence sans divulgation." },
                            { icon: <Database className="w-6 h-6 text-purple-500" />, title: "Registre Immortel", desc: "Historique indélébile sur Neo." },
                            { icon: <Cpu className="w-6 h-6 text-primary" style={{ color: 'var(--text-primary)' }} />, title: "Sync Neurale", desc: "Difficulté adaptative en temps réel." },
                            { icon: <Network className="w-6 h-6 text-cyan-400" />, title: "Revue P2P", desc: "Audit croisé par l'élite." }
                        ].map((item, i) => (
                            <div key={i} className="p-12 space-y-8 transition-all duration-500 hover:brightness-95" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                    {item.icon}
                                </div>
                                <div className="space-y-2">
                                    <h5 className="text-sm font-black uppercase tracking-widest transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>{item.title}</h5>
                                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum - The Industrial Syndicate */}
            <section id="curriculum" className="py-48 px-8 md:px-16 max-w-7xl mx-auto reveal border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-32">
                    <div className="space-y-6">
                        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em]">03 / Syllabus</span>
                        <h3 className="text-7xl md:text-[100px] font-black tracking-tighter uppercase leading-none italic opacity-100 transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>Le Syndicat.</h3>
                    </div>
                    <button onClick={onStart} className="px-10 py-4 text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-600 hover:text-white" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                        Accéder au Roadmap
                    </button>
                </div>

                <div className="space-y-[1px] transition-colors" style={{ backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
                    {[
                        { id: "NODE_01", title: "Physique Profonde EVM", tag: "Systèmes", x: "Opcodes, Gas, Slots Mémoire" },
                        { id: "NODE_02", title: "Audit Offensif", tag: "Sécurité", x: "Réentrance, Logique, Risques MEV" },
                        { id: "NODE_03", title: "Design de Protocole", tag: "Arch", x: "Liquidity Pools, AMMs, Oracles" },
                        { id: "NODE_04", title: "Vie Privée Avancée", tag: "Chiffrement", x: "ZK-Snarks, Circom, Tx Furtives" }
                    ].map((c, i) => (
                        <div key={i} className="group flex flex-col md:flex-row items-center justify-between px-16 py-12 transition-colors duration-500 cursor-crosshair hover:bg-slate-500/5" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            <div className="flex items-center gap-16 w-full md:w-auto">
                                <span className="text-[10px] font-mono font-black tracking-[0.3em] transition-colors duration-500" style={{ color: 'var(--text-secondary)' }}>{c.id}</span>
                                <div className="space-y-1">
                                    <h4 className="text-3xl font-black uppercase tracking-tight group-hover:text-blue-500 transition-colors uppercase" style={{ color: 'var(--text-primary)' }}>{c.title}</h4>
                                    <p className="text-[8px] font-black uppercase tracking-[0.5em]" style={{ color: 'var(--text-muted)' }}>{c.x}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-12 mt-8 md:mt-0">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] italic opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>Module_Autorisé</span>
                                <div className="w-10 h-[1px] opacity-10 group-hover:opacity-100 group-hover:w-20 transition-all" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] border px-4 py-1.5 rounded-full" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>{c.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Master CTA - Final Authorization */}
            <section className="py-64 relative text-center reveal overflow-hidden border-t transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className="absolute inset-0 grid-pattern opacity-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.07] blur-[150px] rounded-full"></div>

                <div className="max-w-5xl mx-auto space-y-20 relative z-10 px-8">
                    <div className="w-20 h-[1px] bg-blue-500 mx-auto"></div>
                    <h3 className="text-8xl md:text-[160px] font-black tracking-[-0.08em] leading-[0.75] uppercase italic text-shine transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
                        INIT <br /> <span className="text-blue-600">SYNCC.</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
                        <button onClick={onStart} className="group relative px-16 py-8 bg-blue-600 text-white rounded-none transition-all hover:scale-110 active:scale-95 shadow-[0_30px_60px_rgba(37,99,235,0.4)]">
                            <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.5em]">Établir la Connexion</span>
                        </button>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] max-w-[200px] text-left leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            Accédez à l'élite mondiale du Web3. <br /> Validation requise.
                        </p>
                    </div>
                    <div className="flex justify-center gap-16 text-[9px] font-black uppercase tracking-[0.5em] pt-20" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-3"> <Lock className="w-3 h-3" /> Lien Chiffré</span>
                        <span className="flex items-center gap-3"> <Globe className="w-3 h-3" /> Nœud Global</span>
                        <span className="flex items-center gap-3"> <Binary className="w-3 h-3" /> Sync P2P</span>
                    </div>
                </div>
            </section>

            {/* Footer - Professional Minimalism Expanded */}
            <footer className="py-40 border-t px-8 md:px-16 relative z-10 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-32">
                    <div className="md:col-span-5 space-y-12">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <Hexagon className="w-8 h-8 transition-transform" style={{ color: 'var(--text-primary)', fill: 'var(--accent-primary)', fillOpacity: 0.1 }} />
                            <h1 className="text-xl font-black uppercase tracking-[0.4em]" style={{ color: 'var(--text-primary)' }}>NeoAcademy</h1>
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
                            Le standard pédagogique pour l'ère Web3. Des compétences certifiées par l'intelligence neurale propriétaire.
                        </p>
                        <div className="flex gap-4">
                            {[Globe, Share2].map((Icon, i) => (
                                <div key={i} className="w-12 h-12 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-20">
                        <div className="space-y-8">
                            <h6 className="text-[11px] font-black uppercase tracking-[0.5em]" style={{ color: 'var(--text-primary)' }}>Protocole</h6>
                            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                                <li><a href="#" className="hover:text-blue-500 transition-colors italic">Specs Noyau</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors uppercase">Audits-ZK</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors italic">Fix Mainnet</a></li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h6 className="text-[11px] font-black uppercase tracking-[0.5em]" style={{ color: 'var(--text-primary)' }}>Syndicat</h6>
                            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                                <li><a href="#" className="hover:text-blue-500 transition-colors uppercase">Genèse</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors italic">Le Coffre</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors uppercase">Lien Élite</a></li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h6 className="text-[11px] font-black uppercase tracking-[0.5em] transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>Identité</h6>
                            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                                <li><a href="#" className="hover:text-blue-500 transition-colors italic">Standard_v4</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors uppercase">Vie Privée</a></li>
                                <li><a href="#" className="hover:text-blue-500 transition-colors italic">Légal</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-48 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-10" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="text-[10px] font-black uppercase tracking-[0.6em]" style={{ color: 'var(--text-muted)' }}>
                        © 2026_NeoACADEMY_STD // ELITE_WEB3_PROTOCOL
                    </div>
                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
                        <span className="text-blue-500">Français (FR)</span>
                        <span className="hover:text-blue-500 cursor-pointer transition-all italic opacity-40">English (US)</span>
                        <span className="hover:text-blue-500 cursor-pointer transition-all italic opacity-40">Deutsh (DE)</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
