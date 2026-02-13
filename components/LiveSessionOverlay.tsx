import React, { useState, useEffect } from 'react';
import {
    Video, VideoOff, Mic, MicOff, PhoneOff, Maximize2, Minimize2,
    MoreHorizontal, Share2, MessageSquare, BrainCircuit, Activity,
    User, Sparkles, Zap, Send, Settings, PenTool, Eraser, StickyNote,
    MousePointer2, Plus, GripVertical
} from 'lucide-react';

interface LiveSessionOverlayProps {
    sessionType: 'module' | 'final';
    targetTitle: string;
    coachName: string;
    coachAvatar: string;
    onEndSession: () => void;
}

const LiveSessionOverlay: React.FC<LiveSessionOverlayProps> = ({
    sessionType,
    targetTitle,
    coachName,
    coachAvatar,
    onEndSession
}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeTab, setActiveTab] = useState<'video' | 'chat' | 'whiteboard'>('video');
    const [syncHealth, setSyncHealth] = useState(98);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
        const healthTimer = setInterval(() => {
            setSyncHealth(prev => {
                const change = (Math.random() - 0.5) * 2;
                return Math.min(100, Math.max(90, prev + change));
            });
        }, 3000);
        return () => {
            clearInterval(timer);
            clearInterval(healthTimer);
        };
    }, []);

    const formatElapsedTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (isFullScreen) {
        return (
            <div className="fixed inset-0 z-[300] bg-[#0B0F19] flex flex-col animate-in fade-in duration-500">
                {/* Full Screen Header */}
                <header className="h-20 px-10 border-b border-white/5 flex items-center justify-between bg-[#111827]">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight">Session Collaborative Live</h3>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{targetTitle} • {coachName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'video' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                        >Video Room</button>
                        <button
                            onClick={() => setActiveTab('whiteboard')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'whiteboard' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                        >Neural Board</button>
                    </div>

                    <button
                        onClick={() => setIsFullScreen(false)}
                        className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                    >
                        <Minimize2 className="w-5 h-5" />
                    </button>
                </header>

                <main className="flex-1 flex p-10 gap-10 overflow-hidden">
                    {/* Main Content Area */}
                    <div className="flex-1 rounded-[48px] bg-[#0F172A] border border-white/5 overflow-hidden shadow-2xl relative">
                        {activeTab === 'video' ? (
                            <div className="grid grid-cols-2 h-full gap-4 p-4">
                                <div className="rounded-[32px] overflow-hidden bg-slate-800 relative group border border-white/5">
                                    <img src={coachAvatar} className="w-full h-full object-cover" alt="" />
                                    <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                                        {coachName} (Coach)
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="rounded-[32px] overflow-hidden bg-slate-800 relative group border border-white/5">
                                    <img src="https://picsum.photos/seed/user123/800" className="w-full h-full object-cover" alt="" />
                                    <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                                        Vous (Apprenant)
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col bg-[#0B0F19] relative group">
                                {/* Neural Board Canvas Simulated */}
                                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

                                {/* Board Toolbar */}
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                                    <button className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20"><MousePointer2 className="w-4 h-4" /></button>
                                    <button className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"><PenTool className="w-4 h-4" /></button>
                                    <button className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"><Eraser className="w-4 h-4" /></button>
                                    <div className="w-px h-6 bg-white/10 mx-1" />
                                    <button className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"><StickyNote className="w-4 h-4" /></button>
                                    <button className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"><Plus className="w-4 h-4" /></button>
                                </div>

                                {/* Simulated Board Content */}
                                <div className="flex-1 flex items-center justify-center relative p-20">
                                    <div className="relative animate-in zoom-in-95 duration-700">
                                        {/* Floating Notes */}
                                        <div className="absolute -top-32 -left-32 w-48 p-4 rounded-2xl bg-yellow-500/90 shadow-2xl rotate-[-4deg] border border-white/20">
                                            <div className="flex items-center gap-2 mb-2 opacity-50">
                                                <GripVertical className="w-3 h-3" />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-black">Apprenant</span>
                                            </div>
                                            <p className="text-[11px] font-bold text-black leading-tight">Vérifier l'overflow sur le mapping des balances.</p>
                                        </div>

                                        <div className="absolute -top-10 -right-40 w-56 p-5 rounded-3xl bg-blue-600/90 shadow-2xl rotate-[2deg] border border-white/20">
                                            <div className="flex items-center gap-2 mb-2 opacity-60">
                                                <GripVertical className="w-3 h-3" />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white">Coach</span>
                                            </div>
                                            <p className="text-[11px] font-bold text-white leading-tight italic">"L'utilisation d'OpenZeppelin SafeERC20 est recommandée ici pour plus de sécurité."</p>
                                        </div>

                                        {/* Brainstorming Diagram Simulation */}
                                        <div className="flex flex-col items-center gap-12">
                                            <div className="px-8 py-4 rounded-3xl bg-slate-800 border-2 border-blue-500/40 text-sm font-black text-white shadow-2xl relative">
                                                Withdraw Function
                                                <div className="absolute h-12 w-0.5 bg-blue-500/40 -bottom-12 left-1/2 -translate-x-1/2" />
                                            </div>
                                            <div className="flex gap-16">
                                                <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-400">Security Check</div>
                                                <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-400">Transfer Logic</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Board Footer / AI Insights */}
                                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
                                    <div className="px-4 py-2 rounded-xl bg-blue-500/10 backdrop-blur-md border border-blue-500/20 flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                        <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Co-Pilote Neural Actif</span>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Espace collaboratif synchronisé</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat/Context Sidebar */}
                    <aside className="w-96 flex flex-col gap-6">
                        <div className="flex-1 rounded-[40px] bg-[#111827] border border-white/5 p-6 flex flex-col">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">Neural Chat</span>
                            <div className="flex-1 overflow-auto space-y-4 pr-2 custom-scrollbar">
                                <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-xs font-medium text-slate-300">
                                    Coach : "J'ai jeté un œil à votre contrat. Regardons ensemble la fonction de retrait."
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-medium text-slate-400 text-right">
                                    Vous : "D'accord, je ne suis pas sûr de la gestion du gas ici."
                                </div>
                            </div>
                            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                <input type="text" placeholder="Message neurale..." className="flex-1 bg-transparent text-xs text-white outline-none" />
                                <button className="p-2.5 rounded-xl bg-blue-600 text-white"><Send className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-xl shadow-blue-500/20">
                            <h5 className="font-black text-lg mb-2">Neural Sync</h5>
                            <p className="text-[10px] font-bold uppercase opacity-80 leading-relaxed">Le coach peut désormais interagir directement avec votre code en temps réel.</p>
                        </div>
                    </aside>
                </main>

                {/* Footer Controls */}
                <footer className="h-28 px-10 flex items-center justify-between bg-[#111827] border-t border-white/5 shadow-2xl">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status de Session</span>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-black text-white">Chiffré de bout en bout</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`p-5 rounded-[24px] border transition-all ${isMuted ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`p-5 rounded-[24px] border transition-all ${isVideoOff ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={onEndSession}
                            className="px-10 py-5 rounded-[24px] bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 active:scale-95 transition-all flex items-center gap-3"
                        >
                            <PhoneOff className="w-6 h-6" />
                            <span>Quitter la session</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Share2 className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                        <Settings className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </footer>
            </div>
        );
    }

    if (isMinimized) {
        return (
            <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-3 group">
                <div
                    onClick={() => setIsMinimized(false)}
                    className="w-16 h-16 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-all border border-white/20 relative animate-pulse"
                >
                    <Activity className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Session Active • {formatElapsedTime(elapsedTime)}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-24 right-8 z-[200] w-[340px] animate-in slide-in-from-right-10 duration-500">
            {/* Main Video Bubble (Coach) */}
            <div className="relative group mb-4">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden border-2 border-white/10 bg-slate-900 shadow-2xl relative">
                    {!isVideoOff ? (
                        <div className="w-full h-full relative">
                            <img
                                src={coachAvatar}
                                alt={coachName}
                                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                            />
                            {/* Neural Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-60" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
                            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                                <User className="w-12 h-12 text-slate-500" />
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Caméra désactivée</span>
                        </div>
                    )}

                    {/* Overlay Info */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-xl bg-blue-600/80 backdrop-blur-md border border-white/20 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE</span>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 flex items-center gap-2">
                        <button
                            onClick={() => setIsFullScreen(true)}
                            className="p-2.5 rounded-xl bg-blue-600 border border-blue-500/50 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 group"
                        >
                            <Maximize2 className="w-4 h-4" />
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Plein Écran</span>
                        </button>
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="p-2.5 rounded-xl bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            title="Réduire"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-black text-white tracking-tight">{coachName}</h4>
                            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest opacity-80">Coach Expert NeoAcademy</p>
                        </div>
                    </div>
                </div>

                {/* Self View Bubble (Small) */}
                <div className="absolute -bottom-2 -left-6 w-32 aspect-square rounded-3xl border-4 border-[#0B0F19] bg-slate-800 overflow-hidden shadow-xl">
                    <img
                        src="https://picsum.photos/seed/user123/200"
                        alt="Self"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-500/10" />
                </div>
            </div>

            {/* Session Control Center */}
            <div className="bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl space-y-6">
                {/* Sync Status */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                            <BrainCircuit className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-0.5">Neural Sync</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-white">{syncHealth.toFixed(1)}%</span>
                                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-1000"
                                        style={{ width: `${syncHealth}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-0.5">Durée</span>
                        <span className="text-xs font-black text-white font-mono">{formatElapsedTime(elapsedTime)}</span>
                    </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${isMuted ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
                    >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        <span className="text-[9px] font-black uppercase tracking-widest">{isMuted ? 'MUTE' : 'MICRO'}</span>
                    </button>

                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${isVideoOff ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
                    >
                        {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                        <span className="text-[9px] font-black uppercase tracking-widest">{isVideoOff ? 'OFF' : 'CAM'}</span>
                    </button>

                    <button
                        onClick={onEndSession}
                        className="flex-1 p-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white transition-all flex flex-col items-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        <PhoneOff className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">FIN</span>
                    </button>
                </div>

                {/* Collaborative Context */}
                <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Environnement Partagé</p>
                        <p className="text-[11px] font-black text-slate-200 truncate max-w-[180px]">{targetTitle}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveSessionOverlay;
