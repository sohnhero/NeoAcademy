import React, { useState, useEffect } from 'react';
import {
    X, Play, Save, Terminal, File, Folder, ChevronRight, ChevronDown,
    Send, Clock, AlertTriangle, CheckCircle2, Code, FileText, Settings,
    Layout, Maximize2, Minimize2, RotateCcw, Copy, Download, ShieldAlert,
    Eye, Edit3, Sparkles, User, Target
} from 'lucide-react';

import { SimulationEvent } from '../types';

interface ExerciseIDEViewProps {
    exerciseType: 'course' | 'module' | 'final';
    title: string;
    description: string;
    instructions: string[];
    timeLimit?: number; // in minutes, optional
    onSubmit: (code: string, output: string) => void;
    onCancel: () => void;
    onTestRemediation?: () => void;
    isLiveSession?: boolean;
    coachName?: string;
    isSimulationMode?: boolean;
    simulationEvents?: SimulationEvent[];
}

const ExerciseIDEView: React.FC<ExerciseIDEViewProps> = ({
    exerciseType,
    title,
    description,
    instructions,
    timeLimit,
    onSubmit,
    onCancel,
    onTestRemediation,
    isLiveSession,
    coachName,
    isSimulationMode,
    simulationEvents = []
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

    // Simulation State (Chaos Engine)
    const [clientMessages, setClientMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
    const [isScreenFlashing, setIsScreenFlashing] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

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

    // Timer and Chaos Engine Loop
    useEffect(() => {
        if (!timeLimit) return;
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                const newTime = prev - 1;

                // --- Chaos Engine Logic ---
                if (isSimulationMode && simulationEvents.length > 0) {
                    const event = simulationEvents.find(e => e.triggerAtSeconds === newTime);
                    if (event) {
                        triggerSimulationEvent(event);
                    }

                    // Visual stress when time < 30s
                    if (newTime <= 30 && newTime > 0) {
                        setIsScreenFlashing(newTime % 2 === 0);
                    } else if (newTime === 0) {
                        setIsScreenFlashing(true);
                    }
                }
                // -------------------------

                return newTime;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLimit, isSimulationMode, simulationEvents]);

    const triggerSimulationEvent = (event: SimulationEvent) => {
        if (event.type === 'bug_injection') {
            // Overwrite code with buggy version
            setCode(event.payload);
            setConsoleOutput(prev => [...prev, '> FATAL ERROR: CRITICAL VULNERABILITY DETECTED IN DEPLOYMENT', '> SYSTEM PANIC!']);
            setIsScreenFlashing(true);
            setTimeout(() => setIsScreenFlashing(false), 2000);
            setActiveTab('terminal'); // Force open terminal
        } else if (event.type === 'incident') {
            setConsoleOutput(prev => [...prev, '> SERVER INCIDENT: ' + event.payload]);
            setIsScreenFlashing(true);
            setTimeout(() => setIsScreenFlashing(false), 2000);
        } else if (event.type === 'client_message') {
            const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setClientMessages(prev => [...prev, { sender: 'Client VIP', text: event.payload, time: nowTime }]);
            setIsChatOpen(true);
            // Flash screen lightly for new message
            setTimeout(() => setIsScreenFlashing(true), 100);
            setTimeout(() => setIsScreenFlashing(false), 500);
        }
    };

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

    const [bottomPanelTab, setBottomPanelTab] = useState<'terminal' | 'chat' | 'problems'>('terminal');

    return (
        <div className={`fixed inset-0 z-[100] ${isScreenFlashing ? 'bg-red-950/40 ring-2 ring-inset ring-red-500/50' : 'bg-[#0F111A]'} text-slate-300 flex flex-col font-sans selection:bg-blue-500/30 transition-colors duration-300`}>

            {/* Top Navigation Bar - VS Code Style Menu Bar */}
            <header className="h-10 bg-[#1A1D27] border-b border-[#2D313F] flex items-center justify-between px-4 text-[11px] font-medium text-slate-400 select-none">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                            <Code className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="font-bold tracking-widest uppercase text-[9px] opacity-90">Neural IDE</span>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                        <span className="hover:text-white cursor-pointer transition-colors">File</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Selection</span>
                        <span className="hover:text-white cursor-pointer transition-colors">View</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Go</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Run</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terminal</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Help</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[400px] min-w-[200px] h-6 bg-[#252836] border border-[#2D313F] rounded flex items-center px-4 justify-center">
                        <span className="truncate text-slate-500">{title} — {exerciseType === 'course' ? 'Project' : 'Evaluation'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 flex items-center justify-center hover:bg-red-500/10 hover:text-red-400 rounded transition-colors group"
                        title="Fermer l'IDE"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    {!showInstructions && (
                        <button onClick={() => setShowInstructions(true)} className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors" title="Afficher les instructions">
                            <Layout className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </header>

            {/* Main Application Area (Activity Bar + Sidebar + Editor) */}
            <div className="flex-1 flex overflow-hidden">

                {/* Visual Studio Code Style Activity Bar */}
                <div className="w-12 bg-[#1A1D27] border-r border-[#2D313F] flex flex-col items-center py-4 gap-6 z-10">
                    <button className="text-white hover:text-white relative group">
                        <FileText className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute -left-3 top-0 bottom-0 w-0.5 bg-blue-500 rounded-r-full" />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Target className="w-6 h-6 opacity-80" />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Code className="w-6 h-6 opacity-80" />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors relative">
                        <Terminal className="w-6 h-6 opacity-80" />
                        {isScreenFlashing && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        )}
                    </button>
                    <div className="flex-1" />
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <User className="w-6 h-6 opacity-80" />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Settings className="w-6 h-6 opacity-80" />
                    </button>
                </div>

                {/* Left Sidebar (Explorer & Instructions) */}
                <div className="w-64 bg-[#1E212B] border-r border-[#2D313F] flex flex-col flex-shrink-0 z-10 transition-all duration-300">
                    <div className="h-8 flex items-center px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 select-none">
                        Explorer
                    </div>

                    {/* File Tree Section */}
                    <div className="flex-1 overflow-auto scrollbar-thin">
                        <div className="flex items-center gap-1 px-1 py-1 text-[11px] font-bold text-slate-300 cursor-pointer hover:bg-white/5 select-none uppercase tracking-widest">
                            <ChevronDown className="w-3.5 h-3.5" />
                            {exerciseType === 'course' ? 'WORKSPACE' : 'PROJECT_ROOT'}
                        </div>
                        <div className="pl-2 pb-4">
                            {renderFileTree(fileTree)}
                        </div>
                    </div>

                    {/* Instructions Panel Integrated into Sidebar */}
                    {showInstructions && (
                        <div className="h-1/2 border-t border-[#2D313F] flex flex-col bg-[#1A1D27]">
                            <div className="h-8 flex items-center justify-between px-4 border-b border-[#2D313F]">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">📝 Instructions</span>
                                <button onClick={() => setShowInstructions(false)} className="hover:text-white transition-colors">
                                    <Minimize2 className="w-3 h-3 text-slate-500" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-4 scrollbar-thin space-y-4">
                                <div>
                                    <h4 className="text-white text-xs font-bold mb-2">{title}</h4>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-mono">{description}</p>
                                </div>
                                <div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2 block">TODO LIST</span>
                                    <ul className="space-y-2">
                                        {instructions.map((inst, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[10px] text-slate-300">
                                                <div className="w-3.5 h-3.5 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    {i + 1}
                                                </div>
                                                <span className="leading-snug">{inst}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Editor Content Area */}
                <main className={`flex-1 flex flex-col relative min-w-0 transition-all duration-300 bg-[#1E212B]`}>

                    {/* Live Presence Overlay */}
                    {isLiveSession && (
                        <>
                            <div className="absolute inset-0 pointer-events-none border-2 border-indigo-500/20 z-50 animate-pulse" />
                            <div className="absolute top-[20%] left-[30%] z-[60] pointer-events-none animate-bounce">
                                <div className="relative">
                                    <div className="w-0.5 h-6 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                    <div className="absolute -top-6 -left-2 px-2 py-0.5 rounded bg-indigo-600 text-[9px] font-black text-white whitespace-nowrap shadow-lg">
                                        {coachName} (Coach)
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-[25%] left-[20%] right-[30%] h-6 bg-indigo-500/10 border-y border-indigo-500/30 blur-[1px] z-[55] pointer-events-none" />
                        </>
                    )}

                    {/* Editor Tabs */}
                    <div className="h-10 bg-[#1A1D27] flex items-end overflow-hidden select-none border-b border-[transparent]">
                        <div className="h-9 px-4 bg-[#1E212B] border-t border-blue-500 flex items-center gap-2 cursor-pointer relative group">
                            <FileText className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[11px] text-blue-100 font-medium tracking-wide">{activeFile}</span>
                            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors ml-2 flex items-center justify-center">
                                <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        {activeTab === 'preview' && (
                            <div className="h-9 px-4 bg-[#1A1D27] hover:bg-[#1E212B]/50 flex items-center gap-2 cursor-pointer transition-colors border-t border-slate-700/50">
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-[11px] text-slate-400 font-medium tracking-wide">Preview</span>
                            </div>
                        )}
                        <div className="flex-1 border-b border-[#2D313F] h-9" />

                        {/* Tab Actions */}
                        <div className="flex items-center gap-2 px-4 border-b border-[#2D313F] h-9">
                            <button onClick={() => setActiveTab('editor')} className={`p-1 rounded hover:bg-white/10 transition-colors ${activeTab === 'editor' ? 'text-white' : 'text-slate-500'}`} title="Code">
                                <Code className="w-4 h-4" />
                            </button>
                            <button onClick={() => setActiveTab('preview')} className={`p-1 rounded hover:bg-white/10 transition-colors ${activeTab === 'preview' ? 'text-white' : 'text-slate-500'}`} title="Preview">
                                <Layout className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={isCompiling}
                                className="ml-2 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
                            >
                                {isCompiling ? <RotateCcw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                                {exerciseType === 'course' ? 'Run' : 'Check'}
                            </button>
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="flex-1 flex overflow-hidden relative">
                        {/* Line Numbers */}
                        {activeTab === 'editor' && (
                            <div className="w-12 bg-[#1E212B] border-r border-transparent flex flex-col text-right pr-4 pt-4 text-[#5C6370] text-[12px] font-mono select-none overflow-hidden h-full">
                                {code.split('\n').map((_, i) => (
                                    <div key={i} className="h-6 leading-6">{i + 1}</div>
                                ))}
                            </div>
                        )}

                        {/* Editor Surface */}
                        <div className="flex-1 relative overflow-auto scrollbar-thin bg-[#1E212B]">
                            {activeTab === 'editor' ? (
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className={`w-full h-full bg-transparent p-4 pt-4 text-[#ABB2BF] font-mono text-[13px] leading-6 resize-none focus:outline-none whitespace-pre ${isScreenFlashing ? 'animate-pulse text-red-100' : ''}`}
                                    spellCheck={false}
                                    style={{ tabSize: 4 }}
                                />
                            ) : (
                                <div className="p-8 max-w-3xl mx-auto">
                                    <article className="prose prose-invert prose-sm">
                                        <pre className="bg-[#1A1D27] p-6 rounded-lg border border-[#2D313F] text-[#ABB2BF]">{code}</pre>
                                    </article>
                                </div>
                            )}
                        </div>

                        {/* Fake Minimap (Visual embellishment) */}
                        {activeTab === 'editor' && (
                            <div className="hidden lg:block w-24 bg-[#1A1D27]/50 border-l border-[#2D313F] overflow-hidden opacity-30 pointer-events-none select-none p-1">
                                <div className="w-full text-[2px] leading-[3px] text-slate-500 font-mono tracking-tighter mix-blend-screen scale-x-50 origin-left">
                                    {code}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Integrated Bottom Panel (Terminal / Chat / Output) */}
                    <div className="h-64 bg-[#1E212B] border-t border-[#2D313F] flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-20 transition-all duration-300">
                        {/* Bottom Panel Tabs */}
                        <div className="h-9 flex items-center px-4 gap-6 select-none border-b border-[#2D313F]">
                            <button onClick={() => setBottomPanelTab('terminal')} className={`flex items-center gap-2 h-full text-[11px] font-medium tracking-wide uppercase transition-colors relative ${bottomPanelTab === 'terminal' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                                TERMINAL
                            </button>
                            <button onClick={() => setBottomPanelTab('problems')} className={`flex items-center gap-2 h-full text-[11px] font-medium tracking-wide uppercase transition-colors relative ${bottomPanelTab === 'problems' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                                PROBLEMS {isScreenFlashing && <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">1</span>}
                            </button>
                            {isSimulationMode && (
                                <button onClick={() => setBottomPanelTab('chat')} className={`flex items-center gap-2 h-full text-[11px] font-medium tracking-wide uppercase transition-colors relative ${bottomPanelTab === 'chat' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
                                    CLIENT MESSAGES
                                    {clientMessages.length > 0 && bottomPanelTab !== 'chat' && (
                                        <span className="bg-amber-500 text-black font-black rounded-full w-4 h-4 flex items-center justify-center text-[9px] animate-bounce">{clientMessages.length}</span>
                                    )}
                                </button>
                            )}
                            <div className="flex-1" />

                            {/* Final Submit Action Integrated into Panel Header */}
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                            >
                                <Send className="w-3 h-3" /> Submit Final
                            </button>
                        </div>

                        {/* Bottom Panel Content */}
                        <div className="flex-1 overflow-auto bg-[#1A1D27] p-2 scrollbar-thin font-mono text-[12px]">
                            {bottomPanelTab === 'terminal' && (
                                <div className="text-[#ABB2BF] space-y-1 p-2">
                                    {consoleOutput.map((line, i) => (
                                        <div key={i} className={`flex ${line.includes('FATAL') || line.includes('INCIDENT') ? 'text-red-400 font-bold bg-red-500/10 p-1 -mx-1 px-2 border-l-2 border-red-500' : ''}`}>
                                            <span className="text-green-400 select-none mr-3 ml-1">visitor@neural~ %</span>
                                            <span className="whitespace-pre-wrap">{line.replace('> ', '')}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center animate-pulse">
                                        <span className="text-green-400 select-none mr-3 ml-1">visitor@neural~ %</span>
                                        <div className="w-2 h-4 bg-slate-500" />
                                    </div>
                                </div>
                            )}

                            {bottomPanelTab === 'problems' && (
                                <div className="p-4 flex flex-col gap-2">
                                    {isScreenFlashing ? (
                                        <div className="flex items-start gap-3 text-red-400 bg-red-950/30 p-3 rounded border border-red-900/50">
                                            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="font-bold text-[11px] uppercase tracking-wider mb-1">Critical Vulnerability [E001]</div>
                                                <div className="text-red-300">Self-destruct mechanism exposed without access control in contract fallback. High severity.</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-center mt-10">No problems have been detected in the workspace.</div>
                                    )}
                                </div>
                            )}

                            {bottomPanelTab === 'chat' && isSimulationMode && (
                                <div className="h-full flex flex-col p-4 bg-[#1E212B] rounded-lg border border-[#2D313F] shadow-inner font-sans text-sm">
                                    {clientMessages.length === 0 ? (
                                        <div className="m-auto text-slate-500 text-center flex flex-col items-center gap-3">
                                            <User className="w-8 h-8 opacity-20" />
                                            <span>Aucun message du client. L'environnement est calme... pour l'instant.</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 overflow-y-auto pr-2">
                                            {clientMessages.map((msg, i) => (
                                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#252836] border border-[#2D313F] animate-in slide-in-from-bottom-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg cursor-help group relative">
                                                        <AlertTriangle className="w-5 h-5 text-white" />
                                                        <div className="absolute -top-8 bg-black/80 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">VIP Client</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-baseline justify-between mb-1">
                                                            <span className="font-black text-amber-500 tracking-wide text-xs">{msg.sender}</span>
                                                            <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                                                        </div>
                                                        <p className="text-slate-300 leading-relaxed font-medium">{msg.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Status Bar - VS Code Style */}
            <footer className={`h-6 ${isScreenFlashing ? 'bg-red-600' : 'bg-blue-600'} flex items-center justify-between px-3 text-white text-[10px] select-none transition-colors duration-300`}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full">
                        <Code className="w-3.5 h-3.5" />
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full opacity-80">
                        <RotateCcw className="w-3 h-3" />
                        <span>0 ↓ 1 ↑</span>
                    </div>
                    {isScreenFlashing && (
                        <div className="flex items-center gap-1.5 px-2 bg-black/20 font-bold uppercase tracking-widest animate-pulse h-full text-red-100">
                            <AlertTriangle className="w-3.5 h-3.5" /> INCIDENT PRODUCTION
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 h-full">
                    {timeLimit && (
                        <div className={`flex items-center gap-1.5 px-2 h-full font-mono font-bold font-black ${timeRemaining < 300 ? 'bg-red-500 animate-pulse border-x border-white/20' : 'opacity-90'}`}>
                            <Clock className="w-3 h-3" />
                            {formatTime(timeRemaining)}
                        </div>
                    )}

                    {/* System Resources Simulation */}
                    <div className="flex items-center gap-2 hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full opacity-90 border-l border-white/20 pl-4">
                        <span className="font-mono">CPU: <span className={isScreenFlashing ? 'font-black text-red-200' : ''}>{isScreenFlashing ? '98' : '12'}%</span></span>
                        <span className="font-mono">RAM: <span className={isScreenFlashing ? 'font-black text-red-200' : ''}>{isScreenFlashing ? '15.8' : '2.4'}GB</span></span>
                    </div>

                    <div className="flex items-center hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full opacity-80 border-l border-white/20 pl-4">
                        UTF-8
                    </div>
                    <div className="flex items-center hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full opacity-80 border-l border-white/20 pl-4">
                        {exerciseType === 'course' ? 'Solidity' : 'Markdown'}
                    </div>
                    <button
                        onClick={onTestRemediation}
                        className="flex items-center hover:bg-white/20 px-1.5 rounded cursor-pointer transition-colors h-full opacity-60 ml-2"
                        title="Injecter une erreur (Debug V2)"
                    >
                        <ShieldAlert className="w-3.5 h-3.5" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExerciseIDEView;
