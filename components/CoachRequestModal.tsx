
import React, { useState } from 'react';
import { X, MessageSquare, Send, User, Clock, Calendar, Sparkles, HelpCircle, AlertTriangle } from 'lucide-react';
import { Coach, CoachMessage } from '../types';
import { MOCK_COACHES } from '../constants';

interface CoachRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    contextCourse?: string;
    contextModule?: string;
    blockingPoint?: string;
}

const CoachRequestModal: React.FC<CoachRequestModalProps> = ({
    isOpen,
    onClose,
    contextCourse,
    contextModule,
    blockingPoint
}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<CoachMessage[]>([]);
    const [isRequesting, setIsRequesting] = useState(false);
    const [sessionRequested, setSessionRequested] = useState(false);

    const coach = MOCK_COACHES[0];

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage: CoachMessage = {
            id: `msg-${Date.now()}`,
            senderId: 'learner',
            senderRole: 'learner',
            content: message,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        // Simulate coach response
        setTimeout(() => {
            const coachResponse: CoachMessage = {
                id: `msg-${Date.now() + 1}`,
                senderId: coach.id,
                senderRole: 'coach',
                content: 'Merci pour votre message. Je comprends votre difficulté et je vais vous aider à surmonter ce blocage. Pouvez-vous me donner plus de détails sur ce qui vous pose problème spécifiquement ?',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, coachResponse]);
        }, 1500);
    };

    const handleRequestSession = async () => {
        setIsRequesting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSessionRequested(true);
        setIsRequesting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80] flex items-center justify-center p-4">
            <div
                className="w-full max-w-2xl max-h-[85vh] rounded-[40px] border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
                {/* Header */}
                <header className="p-6 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <MessageSquare className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                Demander l'aide d'un Coach
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                Un expert vous accompagne dans votre progression
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-xl border hover:bg-red-500/10 hover:border-red-500/50 transition-all group"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                    >
                        <X className="w-5 h-5 group-hover:text-red-500 transition-colors" style={{ color: 'var(--text-muted)' }} />
                    </button>
                </header>

                {/* Context Info */}
                {(contextCourse || contextModule || blockingPoint) && (
                    <div className="p-4 border-b" style={{ backgroundColor: 'var(--glow-color)', borderColor: 'var(--border-color)' }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                            Contexte Automatique
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {contextModule && (
                                <span className="px-3 py-1 rounded-lg text-xs font-medium border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                    Module : {contextModule}
                                </span>
                            )}
                            {contextCourse && (
                                <span className="px-3 py-1 rounded-lg text-xs font-medium border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                    Cours : {contextCourse}
                                </span>
                            )}
                            {blockingPoint && (
                                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-500">
                                    <AlertTriangle className="w-3 h-3 inline-block mr-1" />
                                    {blockingPoint}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Coach Info */}
                <div className="p-4 border-b flex items-center gap-4" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="relative">
                        <img
                            src={coach.avatar}
                            alt={coach.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2" style={{ borderColor: 'var(--bg-primary)' }} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{coach.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Spécialités : {coach.specialties.join(', ')}
                        </p>
                    </div>
                    {!sessionRequested ? (
                        <button
                            onClick={handleRequestSession}
                            disabled={isRequesting}
                            className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                        >
                            {isRequesting ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Calendar className="w-4 h-4" />
                            )}
                            Planifier une Session
                        </button>
                    ) : (
                        <span className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-green-500/30">
                            Session Demandée ✓
                        </span>
                    )}
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                            <div className="w-20 h-20 rounded-full border flex items-center justify-center mb-6" style={{ borderColor: 'var(--border-color)' }}>
                                <HelpCircle className="w-10 h-10 opacity-20" style={{ color: 'var(--text-muted)' }} />
                            </div>
                            <p className="font-bold mb-2" style={{ color: 'var(--text-muted)' }}>
                                Décrivez votre difficulté
                            </p>
                            <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                Expliquez ce qui vous bloque et le coach pourra vous aider de manière personnalisée.
                            </p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.senderRole === 'learner' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-4 rounded-2xl ${msg.senderRole === 'learner'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'border rounded-tl-none'
                                        }`}
                                    style={{
                                        backgroundColor: msg.senderRole === 'coach' ? 'var(--bg-secondary)' : undefined,
                                        borderColor: msg.senderRole === 'coach' ? 'var(--border-color)' : undefined,
                                        color: msg.senderRole === 'coach' ? 'var(--text-primary)' : undefined
                                    }}
                                >
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <p className={`text-[10px] mt-2 ${msg.senderRole === 'learner' ? 'text-blue-200' : ''}`} style={{ color: msg.senderRole === 'coach' ? 'var(--text-muted)' : undefined }}>
                                        {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-3 rounded-2xl border px-4 py-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Décrivez votre problème..."
                            className="flex-1 bg-transparent border-none outline-none py-3 text-sm"
                            style={{ color: 'var(--text-primary)' }}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 p-3 rounded-xl transition-all"
                        >
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachRequestModal;
