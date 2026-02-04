import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send } from 'lucide-react';
import { askTutor } from '../services/geminiService';

interface AdminPreviewChatProps {
    moduleTitle: string;
    moduleContent: string;
    llmConfig: {
        tutorContext?: string;
        strictness?: 'low' | 'medium' | 'high';
        style?: 'socratic' | 'didactic' | 'concise';
        depth?: 'overview' | 'detailed' | 'expert';
    };
    onClose: () => void;
}

const AdminPreviewChat: React.FC<AdminPreviewChatProps> = ({ moduleTitle, moduleContent, llmConfig, onClose }) => {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Contextualize based on config
        const enhancedContext = `
      ${llmConfig.tutorContext || ''}
      [STRICTNESS: ${llmConfig.strictness || 'medium'}]
      [STYLE: ${llmConfig.style || 'didactic'}]
      [DEPTH: ${llmConfig.depth || 'detailed'}]
    `;

        try {
            const response = await askTutor(
                userMsg.content,
                `Module: ${moduleTitle}. ${moduleContent}`,
                enhancedContext
            );
            setMessages(prev => [...prev, { role: 'assistant', content: response || "Désolé, je ne peux pas répondre pour le moment." }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Erreur de connexion au nœud neural." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
            <div className="bg-[#020617] border border-blue-500/20 w-full max-w-2xl h-[80vh] rounded-[48px] shadow-2xl flex flex-col overflow-hidden">
                <header className="p-6 border-b border-slate-900 flex items-center justify-between bg-slate-900/10">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tight text-white">Simulation Apprenant</h3>
                            <div className="flex gap-2">
                                <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-widest">{llmConfig.style || 'Standard'}</span>
                                <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-widest">{llmConfig.strictness || 'Medium'}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-600 hover:text-white bg-slate-900 p-2 rounded-full transition-all"
                    >
                        ✕
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-6 opacity-60">
                            <MessageSquare className="w-12 h-12" />
                            <p className="text-sm font-medium">Posez une question pour tester le nœud.</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-[24px] rounded-tl-none flex gap-1">
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSend} className="p-6 bg-slate-950/80 border-t border-slate-900">
                    <div className="flex items-center space-x-3 bg-slate-900 rounded-2xl border border-slate-800 px-4 py-2 focus-within:border-purple-500/50 transition-all shadow-inner">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Testez le prompt..."
                            className="flex-1 bg-transparent border-none outline-none py-3 text-sm font-medium placeholder-slate-700 text-white"
                        />
                        <button
                            type="submit"
                            disabled={isTyping}
                            className="bg-purple-600 hover:bg-purple-500 p-2 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-90 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPreviewChat;
