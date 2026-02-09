import React, { useState, useEffect } from 'react';
import {
    X, Play, Save, Terminal, File, Folder, ChevronRight, ChevronDown,
    Send, Clock, AlertTriangle, CheckCircle2, Code, FileText, Settings,
    Layout, Maximize2, Minimize2, RotateCcw, Copy, Download, ShieldAlert,
    Eye, Edit3, Sparkles
} from 'lucide-react';

interface ExerciseIDEViewProps {
    exerciseType: 'course' | 'module' | 'final';
    title: string;
    description: string;
    instructions: string[];
    timeLimit?: number; // in minutes, optional
    onSubmit: (code: string, output: string) => void;
    onCancel: () => void;
    onTestRemediation?: () => void;
}

const ExerciseIDEView: React.FC<ExerciseIDEViewProps> = ({
    exerciseType,
    title,
    description,
    instructions,
    timeLimit,
    onSubmit,
    onCancel,
    onTestRemediation
}) => {
    const [code, setCode] = useState(exerciseType === 'course' ? `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    // Write your code here...
    
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}` : `# Projet : ${title}\n\n## Description\n${description}\n\n## Rapport d'Analyse\n- [ ] Analyse des pré-requis\n- [ ] Architecture proposée\n- [ ] Implémentation critique\n\n### Notes\nSaisissez votre analyse ici...`);

    const [output, setOutput] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>(
        exerciseType === 'course'
            ? ['> Environnement Solidity initialisé', '> Prêt pour la compilation...']
            : ['> Environnement de Projet initialisé', '> Mode : Analyse & Conception', '> En attente de soumission...']
    );
    const [activeFile, setActiveFile] = useState(exerciseType === 'course' ? 'contract.sol' : 'project_plan.md');
    const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : 0);
    const [isCompiling, setIsCompiling] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'terminal'>('editor');

    // File tree structure (dynamic based on type)
    const fileTree = exerciseType === 'course' ? [
        {
            name: 'contracts', type: 'folder', children: [
                { name: 'contract.sol', type: 'file' },
                {
                    name: 'interfaces', type: 'folder', children: [
                        { name: 'IERC20.sol', type: 'file' }
                    ]
                }
            ]
        },
        { name: 'hardhat.config.js', type: 'file' }
    ] : [
        { name: 'project_plan.md', type: 'file' },
        { name: 'architecture.txt', type: 'file' },
        { name: 'requirements.md', type: 'file' }
    ];

    // Timer countdown
    useEffect(() => {
        if (!timeLimit) return;
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLimit]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAction = async () => {
        setIsCompiling(true);
        const actionLabel = exerciseType === 'course' ? 'Compilation' : 'Analyse';
        setConsoleOutput(prev => [...prev, `> ${actionLabel} en cours...`]);

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (exerciseType === 'course') {
            setConsoleOutput(prev => [
                ...prev,
                '> Compiled successfully',
                '> Gas estimate: 245,000'
            ]);
            setOutput('Succès de la compilation.');
        } else {
            setConsoleOutput(prev => [
                ...prev,
                '> Analyse de structure terminée',
                '> Cohérence vérifiée : 100%',
                '> Prêt pour la soumission finale'
            ]);
            setOutput('Le document est prêt à être audité par l\'IA.');
        }
        setIsCompiling(false);
    };

    const handleSubmit = () => {
        onSubmit(code, output);
    };

    const renderFileTree = (items: any[], depth = 0) => {
        return items.map((item, idx) => (
            <div key={idx}>
                <div
                    className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-white/5 transition-colors ${activeFile === item.name ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500' : 'text-slate-400'}`}
                    style={{ paddingLeft: `${12 + depth * 16}px` }}
                    onClick={() => item.type === 'file' && setActiveFile(item.name)}
                >
                    {item.type === 'folder' ? (
                        <Folder className="w-3.5 h-3.5 text-blue-500/60" />
                    ) : (
                        <FileText className="w-3.5 h-3.5 opacity-40" />
                    )}
                    <span className="text-[11px] font-medium tracking-tight truncate">{item.name}</span>
                </div>
                {item.children && renderFileTree(item.children, depth + 1)}
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#0B0F19] text-slate-300 flex flex-col font-sans selection:bg-blue-500/30">
            {/* Top Navigation Bar - Premium Style */}
            <header className="h-14 bg-[#111827] border-b border-white/5 flex items-center justify-between px-6 shadow-2xl relative z-20">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Layout className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-white text-xs uppercase tracking-widest leading-none mb-1">Environnement Neural</span>
                            <span className="text-[9px] text-blue-400 font-mono font-black uppercase tracking-tighter opacity-70">Dedicated Workspace v2.0</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-white/5" />

                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-1">Cible Actuelle</span>
                        <h2 className="text-sm font-black text-white truncate max-w-[300px] leading-none">{title}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {timeLimit && (
                        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all ${timeRemaining < 300 ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' : 'bg-white/5 border-white/5 text-blue-300'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="font-mono font-black text-sm tracking-widest">{formatTime(timeRemaining)}</span>
                        </div>
                    )}

                    <button
                        onClick={onCancel}
                        className="p-3 hover:bg-red-500/10 rounded-2xl transition-all text-slate-500 hover:text-red-400 group"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </header>

            {/* Main Project Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Project File Manager */}
                <aside className="w-64 bg-[#0F172A] border-r border-white/5 flex flex-col pt-4">
                    <div className="px-6 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Workspace</span>
                    </div>
                    <div className="flex-1 overflow-auto scrollbar-thin">
                        <div className="space-y-1">
                            {renderFileTree(fileTree)}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5">
                        <div className="bg-blue-600/5 rounded-2xl p-4 border border-blue-500/10">
                            <div className="flex items-center gap-2 mb-2 text-blue-400">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Type Projet</span>
                            </div>
                            <span className="text-[11px] font-bold text-slate-300">
                                {exerciseType === 'course' ? 'Exercice Technique' : exerciseType === 'module' ? 'Audit de Module' : 'Parcours Final'}
                            </span>
                        </div>
                    </div>
                </aside>

                {/* Editor & Content Workspace */}
                <main className="flex-1 flex flex-col relative bg-[#111827]">
                    {/* View Controls */}
                    <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B0F19]/50 backdrop-blur-xl">
                        <div className="flex items-center gap-1 group">
                            <FileText className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-white ml-2">{activeFile}</span>
                        </div>

                        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => setActiveTab('editor')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                Éditer
                            </button>
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <Eye className="w-3.5 h-3.5" />
                                Aperçu
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        <div className="flex-1 flex flex-col relative">
                            {activeTab === 'editor' ? (
                                <div className="flex-1 flex overflow-hidden">
                                    <div className="w-12 bg-[#0B0F19] text-right pr-4 pt-6 text-slate-700 text-[10px] font-mono select-none border-r border-white/5">
                                        {code.split('\n').map((_, i) => (
                                            <div key={i} className="leading-6 opacity-40">{i + 1}</div>
                                        ))}
                                    </div>
                                    <textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="flex-1 bg-transparent p-6 text-slate-200 font-mono text-xs leading-6 resize-none focus:outline-none scrollbar-thin"
                                        spellCheck={false}
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 p-10 overflow-auto scrollbar-thin">
                                    <article className="prose prose-invert max-w-none">
                                        <pre className="bg-[#0B0F19] !p-8 rounded-[32px] border border-white/5 text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                                            {code}
                                        </pre>
                                    </article>
                                </div>
                            )}

                            {/* Terminal Panel - Minimized by default if not code */}
                            <div className="h-32 border-t border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
                                <div className="px-6 py-2 border-b border-white/5 flex items-center justify-between bg-[#111827]">
                                    <div className="flex items-center gap-3">
                                        <Terminal className="w-3.5 h-3.5 text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Flux de Sortie</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                    </div>
                                </div>
                                <div className="p-4 font-mono text-[11px] h-full overflow-auto scrollbar-thin">
                                    {consoleOutput.map((line, i) => (
                                        <div key={i} className={`mb-1 ${line.startsWith('>') ? 'text-blue-400' : 'text-slate-500'}`}>
                                            <span className="opacity-30 mr-2">$</span> {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Instructions Sidebar */}
                        {showInstructions && (
                            <aside className="w-96 bg-[#0F172A] border-l border-white/5 flex flex-col">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Consignes d'Expert</span>
                                    </div>
                                    <button onClick={() => setShowInstructions(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                                        <Minimize2 className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-8 scrollbar-thin">
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-black text-white mb-3 tracking-tighter">{title}</h3>
                                            <p className="text-xs text-slate-400 leading-relaxed font-medium">{description}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Critères de Succès</span>
                                            <ul className="space-y-4">
                                                {instructions.map((inst, i) => (
                                                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                                                        <div className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-xs text-slate-300 font-medium leading-relaxed">{inst}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </main>
            </div>

            {/* Bottom Global Actions */}
            <footer className="h-18 min-h-[72px] bg-[#111827] border-t border-white/5 flex items-center justify-between px-8 relative z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleAction}
                        disabled={isCompiling}
                        className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-[20px] text-xs font-black uppercase tracking-widest transition-all border border-white/5 disabled:opacity-50 active:scale-95"
                    >
                        {isCompiling ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Settings className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
                        )}
                        {exerciseType === 'course' ? 'Lancer Compilation' : 'Vérifier Structure'}
                    </button>

                    <button
                        onClick={onTestRemediation}
                        className="flex items-center gap-3 px-6 py-3 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/20 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                    >
                        <ShieldAlert className="w-4 h-4 animate-pulse" />
                        Simuler Échec (V2)
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    {!showInstructions && (
                        <button
                            onClick={() => setShowInstructions(true)}
                            className="text-[10px] font-black tracking-widest uppercase text-slate-500 hover:text-white transition-all flex items-center gap-2"
                        >
                            <Maximize2 className="w-3.5 h-3.5" />
                            Consignes
                        </button>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="group flex items-center gap-4 px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-blue-500/20 active:scale-95 active:shadow-none"
                    >
                        <span>Finaliser Soumission</span>
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                            <Send className="w-3.5 h-3.5" />
                        </div>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExerciseIDEView;
