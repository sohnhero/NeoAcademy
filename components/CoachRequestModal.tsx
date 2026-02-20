
import React, { useState } from 'react';
import { X, MessageSquare, Send, User, Clock, Calendar, Sparkles, HelpCircle, AlertTriangle, CreditCard, CheckCircle, Shield, Loader2 } from 'lucide-react';
import { Coach, CoachMessage, CoachRate } from '../types';
import { MOCK_COACHES, COACH_RATES } from '../constants';

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

    // Session booking state
    const [showBooking, setShowBooking] = useState(false);
    const [selectedRate, setSelectedRate] = useState<CoachRate | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const coach = MOCK_COACHES[0];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR').format(price);
    };

    const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

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

    const handleConfirmPayment = async () => {
        if (!selectedRate || !selectedDate || !selectedTime) return;
        setIsProcessingPayment(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessingPayment(false);
        setPaymentConfirmed(true);
        setSessionRequested(true);
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
                                {showBooking ? 'Réserver une Session' : "Demander l'aide d'un Coach"}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {showBooking ? 'Choisissez la durée et l\'horaire qui vous convient' : 'Un expert vous accompagne dans votre progression'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => showBooking ? setShowBooking(false) : onClose()}
                        className="p-3 rounded-xl border hover:bg-red-500/10 hover:border-red-500/50 transition-all group"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                    >
                        <X className="w-5 h-5 group-hover:text-red-500 transition-colors" style={{ color: 'var(--text-muted)' }} />
                    </button>
                </header>

                {/* BOOKING VIEW */}
                {showBooking ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        {paymentConfirmed ? (
                            /* Success State */
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h4 className="text-2xl font-black text-white mb-2">Session Confirmée !</h4>
                                <p className="text-sm text-slate-400 mb-6 max-w-sm">
                                    Votre session avec <span className="text-white font-bold">{coach.name}</span> est confirmée pour le <span className="text-white font-bold">{selectedDate}</span> à <span className="text-white font-bold">{selectedTime}</span>.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold transition-all"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Coach Avatar & Info */}
                                <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                                    <div className="relative">
                                        <img src={coach.avatar} alt={coach.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2" style={{ borderColor: 'var(--bg-primary)' }} />
                                    </div>
                                    <div>
                                        <p className="font-black text-white">{coach.name}</p>
                                        <p className="text-xs text-slate-400">{coach.specialties.join(' • ')}</p>
                                    </div>
                                </div>

                                {/* Duration Selection */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Durée de la Session</h4>
                                    <div className="space-y-3">
                                        {COACH_RATES.map((rate) => (
                                            <button
                                                key={rate.id}
                                                onClick={() => setSelectedRate(rate)}
                                                className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 text-left ${selectedRate?.id === rate.id
                                                    ? 'border-blue-500/50 bg-blue-500/10'
                                                    : 'hover:border-blue-500/30'
                                                    }`}
                                                style={{
                                                    borderColor: selectedRate?.id !== rate.id ? 'var(--border-color)' : undefined,
                                                    backgroundColor: selectedRate?.id !== rate.id ? 'var(--bg-secondary)' : undefined
                                                }}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRate?.id === rate.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-white text-sm">{rate.label}</p>
                                                    <p className="text-xs text-slate-400">{rate.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-lg font-black text-white">{formatPrice(rate.price)}</span>
                                                    <span className="text-xs text-slate-500 ml-1">FCFA</span>
                                                </div>
                                                {selectedRate?.id === rate.id && (
                                                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Date & Time Selection */}
                                {selectedRate && (
                                    <div className="mb-8">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Date & Horaire</h4>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 mb-2 block">Date</label>
                                                <input
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 mb-2 block">Créneaux disponibles</label>
                                                <select
                                                    value={selectedTime}
                                                    onChange={(e) => setSelectedTime(e.target.value)}
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors text-sm"
                                                >
                                                    <option value="">Choisir...</option>
                                                    {availableTimes.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Summary & Confirm */}
                                {selectedRate && selectedDate && selectedTime && (
                                    <div className="border border-slate-800 rounded-2xl p-5 mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Récapitulatif</span>
                                            <CreditCard className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Session {selectedRate.label}</span>
                                                <span className="text-white font-bold">{formatPrice(selectedRate.price)} FCFA</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Coach</span>
                                                <span className="text-white">{coach.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Date</span>
                                                <span className="text-white">{selectedDate} à {selectedTime}</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                                            <span className="font-bold text-white">Total</span>
                                            <span className="text-xl font-black text-white">{formatPrice(selectedRate.price)} <span className="text-xs text-slate-500">FCFA</span></span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={!selectedRate || !selectedDate || !selectedTime || isProcessingPayment}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
                                >
                                    {isProcessingPayment ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Traitement du paiement...</>
                                    ) : (
                                        <><Shield className="w-5 h-5" /> {selectedRate ? `Payer ${formatPrice(selectedRate.price)} FCFA` : 'Sélectionnez une durée'}</>
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-600 mt-3 flex items-center justify-center gap-1">
                                    <Shield className="w-3 h-3" /> Paiement sécurisé — Remboursement si annulation 24h avant
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    /* CHAT VIEW (original) */
                    <>
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

                        {/* Coach Info + Book Session Button */}
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
                                    onClick={() => setShowBooking(true)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Réserver & Payer
                                </button>
                            ) : (
                                <span className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-green-500/30 flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4" /> Session Confirmée
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
                    </>
                )}
            </div>
        </div>
    );
};

export default CoachRequestModal;
