
import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Video,
    FileText, Code, Play, Clock, Target, ArrowRight, ArrowLeft,
    ThumbsUp, HelpCircle, Menu, X
} from 'lucide-react';

// =====================================================
// MOCK DATA
// =====================================================

interface LessonBlock {
    id: string;
    type: 'video' | 'text' | 'code' | 'checkpoint';
    title: string;
    content: string;
    duration?: string;
    completed: boolean;
}

interface Lesson {
    id: string;
    title: string;
    duration: string;
    status: 'completed' | 'current' | 'locked';
    blocks: LessonBlock[];
}

const MOCK_LESSONS: Lesson[] = [
    {
        id: 'l1', title: 'Introduction à l\'Audit de Sécurité', duration: '32 min', status: 'completed',
        blocks: [
            { id: 'b1', type: 'video', title: 'Pourquoi l\'audit est essentiel', content: 'Dans cet épisode, nous explorerons les raisons pour lesquelles l\'audit de sécurité est devenu un pilier incontournable du développement blockchain...', duration: '12 min', completed: true },
            { id: 'b2', type: 'text', title: 'L\'histoire des hacks majeurs', content: 'Depuis la création d\'Ethereum, plus de 3 milliards de dollars ont été perdus dans des hacks de smart contracts. Le cas le plus emblématique reste le hack DAO de 2016, qui a provoqué une perte de 60 millions de dollars et a conduit au hard fork Ethereum/Ethereum Classic.\n\n**Les principaux hacks :**\n\n1. **The DAO (2016)** — $60M — Reentrancy attack\n2. **Parity Multisig (2017)** — $150M — Self-destruct vulnerability\n3. **Poly Network (2021)** — $611M — Cross-chain exploit\n4. **Wormhole (2022)** — $326M — Signature verification bypass\n5. **Ronin Bridge (2022)** — $625M — Compromised validators\n\nChaque incident a contribué à l\'évolution des pratiques d\'audit et des outils de détection automatisée.', completed: true },
            { id: 'b3', type: 'checkpoint', title: 'Quiz Rapide', content: 'Quel mécanisme a été exploité lors du hack DAO de 2016 ?', completed: true },
        ],
    },
    {
        id: 'l2', title: 'Les Vulnérabilités Courantes', duration: '45 min', status: 'completed',
        blocks: [
            { id: 'b4', type: 'text', title: 'OWASP Smart Contract Top 10', content: 'L\'Open Web Application Security Project a publié un référentiel spécifique aux smart contracts. Ce document classe les 10 vulnérabilités les plus fréquentes et les plus dangereuses rencontrées dans les smart contracts déployés en production.\n\n**Top 5 des vulnérabilités :**\n\n1. **Reentrancy** — L\'appel externe avant la mise à jour de l\'état\n2. **Integer Overflow/Underflow** — Dépassement de capacité des entiers\n3. **Unchecked Return Values** — Ignorer les retours de call/send\n4. **Access Control** — Absence de vérification des permissions\n5. **Front-Running** — Exploitation de l\'ordre des transactions', completed: true },
            { id: 'b5', type: 'code', title: 'Exemple de Reentrancy', content: '```solidity\n// ⚠️ VULNERABLE CONTRACT\ncontract VulnerableBank {\n    mapping(address => uint256) public balances;\n    \n    function withdraw() external {\n        uint256 balance = balances[msg.sender];\n        require(balance > 0, "No funds");\n        \n        // ❌ External call BEFORE state update\n        (bool success, ) = msg.sender.call{value: balance}("");\n        require(success, "Transfer failed");\n        \n        // State update happens AFTER the call\n        balances[msg.sender] = 0;\n    }\n}\n\n// ✅ SECURE CONTRACT — Checks-Effects-Interactions\ncontract SecureBank {\n    mapping(address => uint256) public balances;\n    \n    function withdraw() external {\n        uint256 balance = balances[msg.sender];\n        require(balance > 0, "No funds");\n        \n        // ✅ State update BEFORE external call\n        balances[msg.sender] = 0;\n        \n        (bool success, ) = msg.sender.call{value: balance}("");\n        require(success, "Transfer failed");\n    }\n}\n```', completed: true },
        ],
    },
    {
        id: 'l3', title: 'Reentrancy Attacks — Analyse du Hack DAO', duration: '28 min', status: 'current',
        blocks: [
            { id: 'b6', type: 'video', title: 'Anatomie du Hack DAO', content: 'Cette vidéo analyse en détail le mécanisme exact de l\'attaque qui a frappé The DAO en juin 2016. Nous décortiquons le code vulnérable ligne par ligne et montrons comment l\'attaquant a exploité la reentrancy pour drainer les fonds.', duration: '15 min', completed: true },
            { id: 'b7', type: 'text', title: 'Le Pattern Checks-Effects-Interactions', content: 'Le pattern CEI (Checks-Effects-Interactions) est la première ligne de défense contre les attaques de reentrancy. Il impose un ordre strict dans la logique de vos fonctions :\n\n**1. Checks** — Vérifiez toutes les conditions et pré-requis\n```solidity\nrequire(balances[msg.sender] >= amount, "Insufficient");\nrequire(amount > 0, "Zero amount");\n```\n\n**2. Effects** — Mettez à jour l\'état du contrat\n```solidity\nbalances[msg.sender] -= amount;\ntotalSupply -= amount;\n```\n\n**3. Interactions** — Effectuez les appels externes\n```solidity\n(bool success, ) = msg.sender.call{value: amount}("");\nrequire(success);\n```\n\nEn suivant ce pattern, même si l\'appel externe déclenche une reentrancy, l\'état a déjà été mis à jour et la vérification initiale échouera.', completed: false },
            { id: 'b8', type: 'code', title: 'Exercice — Implémentez un Guard', content: '```solidity\n// TODO: Implémentez un modifier "nonReentrant" \n// qui empêche la reentrancy en utilisant une variable de verrouillage\n\ncontract ReentrancyGuard {\n    // Votre code ici...\n    \n    modifier nonReentrant() {\n        // Votre implémentation...\n        _;\n    }\n}\n```\n\nIndice : Utilisez une variable `bool private _locked` pour créer un mutex simple.', completed: false },
            { id: 'b9', type: 'checkpoint', title: 'Vérification de compréhension', content: 'Dans le pattern CEI, quel est l\'ordre correct des opérations pour prévenir la reentrancy ?', completed: false },
        ],
    },
    {
        id: 'l4', title: 'Design Patterns Sécurisés', duration: '35 min', status: 'locked',
        blocks: [],
    },
    {
        id: 'l5', title: 'Outils d\'Analyse — Slither & Mythril', duration: '45 min', status: 'locked',
        blocks: [],
    },
    {
        id: 'l6', title: 'Lab : Détection de Vulnérabilités', duration: '2h', status: 'locked',
        blocks: [],
    },
];

const MOCK_MODULE_CONTEXT = {
    moduleNumber: 4,
    moduleTitle: 'Sécurité & Audit des Smart Contracts',
    competencies: ['Identifier les vulnérabilités', 'Réaliser un audit de sécurité', 'Appliquer les design patterns sécurisés'],
};

// =====================================================
// COMPONENT
// =====================================================

interface InstitutionalCourseViewProps {
    onBack?: () => void;
}

const InstitutionalCourseView: React.FC<InstitutionalCourseViewProps> = ({ onBack }) => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(2); // Current lesson: l3
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedBlocks, setCompletedBlocks] = useState<Set<string>>(
        new Set(MOCK_LESSONS.flatMap(l => l.blocks.filter(b => b.completed).map(b => b.id)))
    );

    const currentLesson = MOCK_LESSONS[currentLessonIndex];
    const totalBlocks = currentLesson.blocks.length;
    const completedCount = currentLesson.blocks.filter(b => completedBlocks.has(b.id)).length;
    const lessonProgress = totalBlocks > 0 ? Math.round((completedCount / totalBlocks) * 100) : 0;

    const handleMarkComplete = (blockId: string) => {
        setCompletedBlocks(prev => {
            const next = new Set(prev);
            if (next.has(blockId)) next.delete(blockId);
            else next.add(blockId);
            return next;
        });
    };

    const navigateLesson = (index: number) => {
        const lesson = MOCK_LESSONS[index];
        if (lesson.status !== 'locked') setCurrentLessonIndex(index);
    };

    return (
        <div className="flex h-[calc(100vh-80px)]">

            {/* Sidebar — Lesson Navigation */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-0'} border-r transition-all duration-300 overflow-hidden shrink-0`} style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="w-80 h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold mb-3 hover:text-blue-500 transition-colors" style={{ color: 'var(--text-muted)' }}>
                            <ArrowLeft className="w-3.5 h-3.5" /> Retour au module
                        </button>
                        <h3 className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Module {MOCK_MODULE_CONTEXT.moduleNumber} : {MOCK_MODULE_CONTEXT.moduleTitle}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: '45%' }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500">45%</span>
                        </div>
                    </div>

                    {/* Lesson List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        {MOCK_LESSONS.map((lesson, idx) => {
                            const isActive = idx === currentLessonIndex;
                            const lessonCompletedBlocks = lesson.blocks.filter(b => completedBlocks.has(b.id)).length;
                            const isLessonComplete = lesson.blocks.length > 0 && lessonCompletedBlocks === lesson.blocks.length;

                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => navigateLesson(idx)}
                                    disabled={lesson.status === 'locked'}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${isActive ? 'bg-blue-500/10 ring-1 ring-blue-500/20' :
                                            lesson.status === 'locked' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-500/5'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${isLessonComplete ? 'bg-green-500/10' :
                                                isActive ? 'bg-blue-500/10' : ''
                                            }`} style={!isLessonComplete && !isActive ? { backgroundColor: 'var(--bg-primary)' } : {}}>
                                            {isLessonComplete ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            ) : lesson.status === 'locked' ? (
                                                <span className="text-[10px] font-black" style={{ color: 'var(--text-muted)' }}>{idx + 1}</span>
                                            ) : isActive ? (
                                                <Play className="w-3.5 h-3.5 text-blue-500" />
                                            ) : (
                                                <span className="text-[10px] font-black" style={{ color: 'var(--text-muted)' }}>{idx + 1}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className={`text-xs font-semibold truncate ${isActive ? 'text-blue-500' : ''}`} style={!isActive ? { color: 'var(--text-primary)' } : {}}>
                                                {lesson.title}
                                            </p>
                                            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{lesson.duration}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Competencies */}
                    <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Compétences visées</p>
                        <div className="space-y-1.5">
                            {MOCK_MODULE_CONTEXT.competencies.map((comp, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Target className="w-3 h-3 text-indigo-400 shrink-0" />
                                    <span className="text-[10px] font-medium leading-tight" style={{ color: 'var(--text-secondary)' }}>{comp}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <div className="sticky top-0 z-20 border-b px-6 py-3 flex items-center justify-between backdrop-blur-xl" style={{ borderColor: 'var(--border-color)', backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)' }}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-blue-500/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
                            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Leçon {currentLessonIndex + 1} sur {MOCK_LESSONS.length}</p>
                            <h2 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{currentLesson.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                <div className="h-full rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${lessonProgress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500">{lessonProgress}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}>
                            <Clock className="w-3 h-3" /> {currentLesson.duration}
                        </div>
                    </div>
                </div>

                {/* Lesson Blocks */}
                <div className="max-w-3xl mx-auto py-8 px-6 space-y-6">
                    {currentLesson.blocks.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Contenu Verrouillé</h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Complétez les leçons précédentes pour débloquer ce contenu.</p>
                        </div>
                    ) : (
                        currentLesson.blocks.map(block => {
                            const isCompleted = completedBlocks.has(block.id);
                            return (
                                <div
                                    key={block.id}
                                    className={`border rounded-[24px] overflow-hidden transition-all ${isCompleted ? 'border-green-500/20' : ''}`}
                                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: isCompleted ? undefined : 'var(--border-color)' }}
                                >
                                    {/* Block Header */}
                                    <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-color)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${block.type === 'video' ? 'bg-violet-500/10' :
                                                    block.type === 'text' ? 'bg-blue-500/10' :
                                                        block.type === 'code' ? 'bg-green-500/10' : 'bg-amber-500/10'
                                                }`}>
                                                {block.type === 'video' && <Video className="w-4 h-4 text-violet-500" />}
                                                {block.type === 'text' && <FileText className="w-4 h-4 text-blue-500" />}
                                                {block.type === 'code' && <Code className="w-4 h-4 text-green-500" />}
                                                {block.type === 'checkpoint' && <HelpCircle className="w-4 h-4 text-amber-500" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{block.title}</h3>
                                                {block.duration && <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{block.duration}</span>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleMarkComplete(block.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isCompleted ? 'bg-green-500/10 text-green-500' : 'hover:bg-blue-500/10'
                                                }`}
                                            style={!isCompleted ? { color: 'var(--text-muted)' } : {}}
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {isCompleted ? 'Terminé' : 'Marquer terminé'}
                                        </button>
                                    </div>

                                    {/* Block Content */}
                                    <div className="p-6">
                                        {block.type === 'video' && (
                                            <div>
                                                <div className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden mb-4 cursor-pointer group" style={{ backgroundColor: '#0f0f23' }}>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20"></div>
                                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                        <Play className="w-8 h-8 text-white ml-1" />
                                                    </div>
                                                    <div className="absolute bottom-4 left-4 text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                                        {block.duration}
                                                    </div>
                                                </div>
                                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{block.content}</p>
                                            </div>
                                        )}

                                        {block.type === 'text' && (
                                            <div className="prose prose-sm max-w-none">
                                                <div className="text-sm leading-[1.8] whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                                                    {block.content.split('\n').map((line, i) => {
                                                        if (line.startsWith('**') && line.endsWith('**')) {
                                                            return <p key={i} className="font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>{line.replace(/\*\*/g, '')}</p>;
                                                        }
                                                        if (line.match(/^\d+\.\s\*\*/)) {
                                                            const parts = line.match(/^(\d+\.\s)\*\*(.+?)\*\*\s*—\s*(.*)$/);
                                                            if (parts) {
                                                                return (
                                                                    <div key={i} className="flex items-start gap-2 ml-2 mb-2">
                                                                        <span className="font-bold shrink-0" style={{ color: 'var(--text-primary)' }}>{parts[1]}</span>
                                                                        <div>
                                                                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{parts[2]}</span>
                                                                            <span style={{ color: 'var(--text-muted)' }}> — {parts[3]}</span>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        }
                                                        if (line.startsWith('```')) return null;
                                                        return line ? <p key={i}>{line}</p> : <br key={i} />;
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {block.type === 'code' && (
                                            <div>
                                                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
                                                    <div className="px-4 py-2 flex items-center justify-between border-b" style={{ backgroundColor: '#1e1e3f', borderColor: 'var(--border-color)' }}>
                                                        <span className="text-[10px] font-mono font-bold text-violet-400">Solidity</span>
                                                        <button className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors">Copier</button>
                                                    </div>
                                                    <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-mono" style={{ backgroundColor: '#0d0d1e', color: '#e2e8f0' }}>
                                                        <code>{block.content.replace(/```solidity\n?|```\n?/g, '')}</code>
                                                    </pre>
                                                </div>
                                            </div>
                                        )}

                                        {block.type === 'checkpoint' && (
                                            <div className="text-center py-4">
                                                <p className="font-bold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>{block.content}</p>
                                                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                                                    {['Reentrancy', 'Buffer Overflow', 'SQL Injection', 'Race Condition'].map((opt, i) => (
                                                        <button
                                                            key={i}
                                                            className={`p-3 rounded-xl border text-xs font-medium transition-all hover:border-blue-500/30 ${i === 0 && isCompleted ? 'border-green-500 bg-green-500/10 text-green-500' : ''}`}
                                                            style={!(i === 0 && isCompleted) ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)' } : {}}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Bottom Navigation */}
                    {currentLesson.blocks.length > 0 && (
                        <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                            <button
                                onClick={() => navigateLesson(currentLessonIndex - 1)}
                                disabled={currentLessonIndex === 0}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <ChevronLeft className="w-4 h-4" /> Leçon Précédente
                            </button>
                            {currentLessonIndex < MOCK_LESSONS.length - 1 && MOCK_LESSONS[currentLessonIndex + 1].status !== 'locked' ? (
                                <button
                                    onClick={() => navigateLesson(currentLessonIndex + 1)}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    Leçon Suivante <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-lg active:scale-95">
                                    <ThumbsUp className="w-4 h-4" /> Terminer le Module
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstitutionalCourseView;
