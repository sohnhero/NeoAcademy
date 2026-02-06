
import React, { useState, useEffect } from 'react';
import {
    X, Play, Save, Terminal, File, Folder, ChevronRight, ChevronDown,
    Send, Clock, AlertTriangle, CheckCircle2, Code, FileText, Settings,
    Layout, Maximize2, Minimize2, RotateCcw, Copy, Download, ShieldAlert
} from 'lucide-react';

interface ExerciseIDEViewProps {
    exerciseType: 'course' | 'module' | 'final';
    title: string;
    description: string;
    instructions: string[];
    timeLimit?: number; // in minutes, optional
    onSubmit: (code: string, output: string) => void;
    onCancel: () => void;
    onOpenCoachHelp?: (course: string, module: string, blocking?: string) => void;
}

const ExerciseIDEView: React.FC<ExerciseIDEViewProps> = ({
    exerciseType,
    title,
    description,
    instructions,
    timeLimit,
    onSubmit,
    onCancel,
    onOpenCoachHelp,
    onTestRemediation
}) => {
    const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
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
}`);
    const [output, setOutput] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<string[]>([
        '> Environnement Solidity initialisé',
        '> Compilateur version: 0.8.20',
        '> Prêt pour la compilation...'
    ]);
    const [activeFile, setActiveFile] = useState('contract.sol');
    const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : 0);
    const [isCompiling, setIsCompiling] = useState(false);
    const [isMaximized, setIsMaximized] = useState(true);
    const [showInstructions, setShowInstructions] = useState(true);
    const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'output'>('code');

    // File tree structure
    const fileTree = [
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
        {
            name: 'test', type: 'folder', children: [
                { name: 'Contract.test.js', type: 'file' }
            ]
        },
        { name: 'hardhat.config.js', type: 'file' },
        { name: 'package.json', type: 'file' }
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

    const handleCompile = async () => {
        setIsCompiling(true);
        setConsoleOutput(prev => [...prev, '> Compilation en cours...']);

        // Simulate compilation
        await new Promise(resolve => setTimeout(resolve, 1500));

        setConsoleOutput(prev => [
            ...prev,
            '> Compiled 1 Solidity file successfully',
            '> Contract size: 2.4 KB',
            '> Estimated gas: 245,000'
        ]);
        setOutput('Contract compiled successfully.\n\nBytecode: 0x608060405234801561001057600080fd5b50...\n\nABI exported to artifacts/');
        setIsCompiling(false);
    };

    const handleRun = async () => {
        setConsoleOutput(prev => [...prev, '> Running tests...']);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setConsoleOutput(prev => [
            ...prev,
            '  ✓ Should deploy contract',
            '  ✓ Should accept deposits',
            '  ✓ Should allow withdrawals',
            '> 3 tests passed'
        ]);
    };

    const handleSubmit = () => {
        onSubmit(code, output);
    };

    const renderFileTree = (items: any[], depth = 0) => {
        return items.map((item, idx) => (
            <div key={idx}>
                <div
                    className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-slate-700/50 transition-colors ${activeFile === item.name ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400'}`}
                    style={{ paddingLeft: `${12 + depth * 16}px` }}
                    onClick={() => item.type === 'file' && setActiveFile(item.name)}
                >
                    {item.type === 'folder' ? (
                        <>
                            <ChevronDown className="w-3 h-3" />
                            <Folder className="w-4 h-4 text-blue-400" />
                        </>
                    ) : (
                        <>
                            <div className="w-3" />
                            <FileText className="w-4 h-4 text-slate-500" />
                        </>
                    )}
                    <span className="text-xs font-medium">{item.name}</span>
                </div>
                {item.children && renderFileTree(item.children, depth + 1)}
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col">
            {/* Top Bar */}
            <header className="h-12 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="font-bold text-white text-sm">ChainAcademy IDE</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-400 font-bold uppercase tracking-wider">
                        {exerciseType === 'course' ? 'Exercice de Cours' : exerciseType === 'module' ? 'Projet de Module' : 'Projet Final'}
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    {timeLimit && (
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeRemaining < 300 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="font-mono font-bold text-sm">{formatTime(timeRemaining)}</span>
                        </div>
                    )}
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* File Explorer */}
                <aside className="w-56 bg-slate-800/50 border-r border-slate-700 flex flex-col">
                    <div className="p-3 border-b border-slate-700">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Explorateur</span>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        {renderFileTree(fileTree)}
                    </div>
                </aside>

                {/* Editor Area */}
                <main className="flex-1 flex flex-col">
                    {/* Editor Tabs */}
                    <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-2">
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 rounded-t-lg border-t border-x border-slate-700">
                            <FileText className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-medium text-white">{activeFile}</span>
                            <button className="ml-2 p-0.5 hover:bg-slate-700 rounded">
                                <X className="w-3 h-3 text-slate-500" />
                            </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 flex">
                        {/* Code Editor */}
                        <div className="flex-1 flex flex-col">
                            {/* Line numbers + Code */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Line Numbers */}
                                <div className="w-12 bg-slate-800/50 text-right pr-3 pt-4 text-slate-600 text-xs font-mono select-none">
                                    {code.split('\n').map((_, i) => (
                                        <div key={i} className="leading-6">{i + 1}</div>
                                    ))}
                                </div>
                                {/* Code Area */}
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="flex-1 bg-slate-900 p-4 text-green-400 font-mono text-sm leading-6 resize-none focus:outline-none"
                                    spellCheck={false}
                                />
                            </div>

                            {/* Bottom Panel - Terminal/Output */}
                            <div className="h-48 border-t border-slate-700 flex flex-col">
                                {/* Panel Tabs */}
                                <div className="h-8 bg-slate-800 flex items-center px-2 gap-1">
                                    {['terminal', 'output'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as any)}
                                            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors ${activeTab === tab ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                        >
                                            {tab === 'terminal' ? 'Terminal' : 'Output'}
                                        </button>
                                    ))}
                                </div>
                                {/* Panel Content */}
                                <div className="flex-1 bg-slate-900 p-3 overflow-auto font-mono text-xs">
                                    {activeTab === 'terminal' ? (
                                        consoleOutput.map((line, i) => (
                                            <div key={i} className={`${line.includes('✓') ? 'text-green-400' : line.includes('Error') ? 'text-red-400' : 'text-slate-400'}`}>
                                                {line}
                                            </div>
                                        ))
                                    ) : (
                                        <pre className="text-slate-400 whitespace-pre-wrap">{output || 'No output yet. Compile and run your code.'}</pre>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Instructions Panel */}
                        {showInstructions && (
                            <aside className="w-80 bg-slate-800/50 border-l border-slate-700 flex flex-col">
                                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Instructions</span>
                                    <button onClick={() => setShowInstructions(false)} className="p-1 hover:bg-slate-700 rounded">
                                        <X className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-4 space-y-4">
                                    <h3 className="font-bold text-white">{title}</h3>
                                    <p className="text-sm text-slate-400">{description}</p>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Objectifs</p>
                                        <ul className="space-y-2">
                                            {instructions.map((inst, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                    <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                        {i + 1}
                                                    </div>
                                                    <span>{inst}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </main>
            </div>

            {/* Bottom Action Bar */}
            <footer className="h-14 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCompile}
                        disabled={isCompiling}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                        {isCompiling ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Settings className="w-4 h-4" />
                        )}
                        Compiler
                    </button>
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <Play className="w-4 h-4" />
                        Exécuter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                        <Save className="w-4 h-4" />
                        Sauvegarder
                    </button>
                    <button
                        onClick={() => onOpenCoachHelp?.(title, 'Module', 'Blocage exercice technique')}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        Aide Coach
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {!showInstructions && (
                        <button
                            onClick={() => setShowInstructions(true)}
                            className="text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            Afficher les instructions
                        </button>
                    )}
                    <button
                        onClick={onTestRemediation}
                        className="flex items-center gap-2 px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        Simuler Échec (V2)
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Send className="w-4 h-4" />
                        Soumettre
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ExerciseIDEView;
