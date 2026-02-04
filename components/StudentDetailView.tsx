import React from 'react';
import {
    ArrowLeft, BrainCircuit, TrendingUp, Calendar, Mail, FileText, CheckCircle, AlertTriangle, MessageSquare, Zap
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE, MOCK_BLOCKED_STUDENTS } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { InterventionMode, StudentProfile } from '../types';

interface StudentDetailViewProps {
    studentId: string;
    onBack: () => void;
}

const StudentDetailView: React.FC<StudentDetailViewProps> = ({ studentId, onBack }) => {
    // In a real app, fetch student by ID. For now, use mock.
    const baseStudent = MOCK_STUDENT_PROFILE;
    const blockedStudent = MOCK_BLOCKED_STUDENTS.find(s => s.id === studentId);

    // Proper casting to match StudentProfile which now includes blockInfo?
    const student = (blockedStudent ? { ...baseStudent, ...blockedStudent } : baseStudent) as StudentProfile;
    const isBlocked = !!student.blockInfo;

    const [activeIntervention, setActiveIntervention] = React.useState<InterventionMode | null>(null);
    const [message, setMessage] = React.useState('');
    const [aiDraft, setAiDraft] = React.useState("L'apprenant confond 'Memory' (RAM éphémère) et 'Storage' (Disque dur persistant). Bob, imagine que la Memory est ton plan de travail temporaire et le Storage ton armoire d'archives.");
    const [status, setStatus] = React.useState<'idle' | 'sending' | 'success'>('idle');
    const [interventionHistory, setInterventionHistory] = React.useState([
        { id: 'h1', date: 'Hier, 11:45', mode: 'asynchronous', content: "Encouragement : 'Tu y es presque, regarde bien l'opcode SSTORE.'", status: 'Read' }
    ]);

    const handleSend = () => {
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            if (activeIntervention === 'asynchronous') {
                setInterventionHistory(prev => [{ id: Date.now().toString(), date: 'À l\'instant', mode: 'asynchronous', content: message, status: 'Sent' }, ...prev]);
            }
            setTimeout(() => {
                setStatus('idle');
                setActiveIntervention(null);
                setMessage('');
            }, 2000);
        }, 1200);
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Retour à la Cohorte
            </button>

            {/* Header Profile */}
            <header className={`bg-slate-900/20 border rounded-[40px] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden transition-all duration-500 ${isBlocked ? 'border-red-500/30' : 'border-slate-800'}`}>
                {isBlocked && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-2 rotate-45 translate-x-[30%] translate-y-[50%] shadow-xl">
                        Bloqué par IA
                    </div>
                )}

                <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-24 h-24 rounded-3xl bg-slate-800 border-2 overflow-hidden shadow-2xl transition-colors duration-500 ${isBlocked ? 'border-red-500' : 'border-slate-700'}`}>
                        <img src={`https://picsum.photos/seed/${student.name}/200`} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black tracking-tighter">{student.name}</h1>
                            {isBlocked && <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[8px] font-black uppercase tracking-widest">Urgence {student.blockInfo?.urgency}</span>}
                        </div>
                        <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                            <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {student.email}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Rejoint le {student.joinedDate}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 relative z-10">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Progression Globale</p>
                        <p className="text-4xl font-black text-blue-500">{student.overallProgress}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Score Moyen</p>
                        <p className="text-4xl font-black text-purple-500">{student.avgScore}/100</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Stats & Skills */}
                <div className="space-y-8">
                    {/* Skill Matrix */}
                    <div className="bg-slate-900/20 border border-slate-800 p-8 rounded-[32px]">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Matrice de Compétences
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={student.skills}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                    <Radar name="Compétences" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* LLM Synthesis */}
                    <div className="bg-slate-900/20 border border-slate-800 p-8 rounded-[32px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full"></div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                            <BrainCircuit className="w-5 h-5 text-purple-500" /> Synthèse IA
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">Forces Identifiées</p>
                                <ul className="space-y-2">
                                    {student.strengths.map((str, i) => (
                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500/50 mt-0.5" /> {str}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Lacunes Persistantes</p>
                                <ul className="space-y-2">
                                    {student.weaknesses.map((w, i) => (
                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                            <AlertTriangle className="w-4 h-4 text-rose-500/50 mt-0.5" /> {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline & Activity + Intervention */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Block Analysis (Only if blocked) */}
                    {isBlocked && (
                        <div className="bg-slate-900/20 border border-red-500/20 p-10 rounded-[40px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                                            <AlertTriangle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight">Analyse du Blocage</h3>
                                            <p className="text-[10px] text-red-500 font-mono font-bold uppercase tracking-[0.3em]">Détecté sur : {student.blockInfo?.moduleTitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-red-500">{student.blockInfo?.failCount}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Échecs Successifs</p>
                                    </div>
                                </div>

                                <div className="bg-[#020617] p-8 rounded-[32px] border border-slate-800 mb-10">
                                    <div className="flex items-center gap-2 mb-4 text-purple-500">
                                        <BrainCircuit className="w-4 h-4" />
                                        <span className="text-xs font-black uppercase tracking-[0.2em]">Synthèse Neural LLM</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed italic text-lg opacity-80">
                                        "{student.blockInfo?.aiSynthesis}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setActiveIntervention('asynchronous')}
                                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-3 group relative overflow-hidden ${activeIntervention === 'asynchronous' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-blue-500/30'}`}
                                    >
                                        <MessageSquare className={`w-6 h-6 ${activeIntervention === 'asynchronous' ? 'text-white' : 'text-blue-500'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Mode 1: Message Asynchrone</span>
                                        {activeIntervention === 'asynchronous' && <div className="absolute top-0 right-0 p-2"><CheckCircle className="w-3 h-3 text-white" /></div>}
                                    </button>

                                    <button
                                        onClick={() => setActiveIntervention('ai_guided')}
                                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-3 group relative overflow-hidden ${activeIntervention === 'ai_guided' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-purple-500/30'}`}
                                    >
                                        <Zap className={`w-6 h-6 ${activeIntervention === 'ai_guided' ? 'text-white' : 'text-purple-500'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Mode 2: Assistance IA + Coach</span>
                                        {activeIntervention === 'ai_guided' && <div className="absolute top-0 right-0 p-2"><CheckCircle className="w-3 h-3 text-white" /></div>}
                                    </button>

                                    <button
                                        onClick={() => setActiveIntervention('synchronous')}
                                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-3 group relative overflow-hidden ${activeIntervention === 'synchronous' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-orange-500/30'}`}
                                    >
                                        <Calendar className={`w-6 h-6 ${activeIntervention === 'synchronous' ? 'text-white' : 'text-orange-500'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Mode 3: Session Synchrone</span>
                                        {activeIntervention === 'synchronous' && <div className="absolute top-0 right-0 p-2"><CheckCircle className="w-3 h-3 text-white" /></div>}
                                    </button>
                                </div>

                                {/* Intervention Action Pane */}
                                {activeIntervention && (
                                    <div className="mt-8 p-10 bg-slate-900 shadow-2xl rounded-[40px] border border-blue-500/30 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                                            {status === 'sending' && <div className="h-full bg-blue-500 animate-progress"></div>}
                                        </div>

                                        {status === 'success' ? (
                                            <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in-95">
                                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
                                                    <CheckCircle className="w-10 h-10 text-white" />
                                                </div>
                                                <h4 className="text-2xl font-black text-white mb-2">Transmission Réussie</h4>
                                                <p className="text-slate-500 text-sm">L'apprenant recevra une notification immédiate sur son nœud.</p>
                                            </div>
                                        ) : (
                                            <>
                                                {activeIntervention === 'asynchronous' && (
                                                    <div className="space-y-6">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="font-bold text-xl flex items-center gap-3">
                                                                <MessageSquare className="w-5 h-5 text-blue-500" /> Support Asynchrone
                                                            </h4>
                                                            <span className="text-[10px] text-slate-500 font-mono">ID: MSG-942-X</span>
                                                        </div>
                                                        <textarea
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            placeholder="Rédigez votre conseil personnalisé..."
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 h-40 text-slate-300 outline-none focus:border-blue-500 transition-all font-medium resize-none shadow-inner"
                                                        />
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">L'historique sera conservé dans le registre.</p>
                                                            <button
                                                                onClick={handleSend}
                                                                disabled={!message.trim() || status === 'sending'}
                                                                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                                                            >
                                                                {status === 'sending' ? 'Transmission...' : 'Envoyer le message'} <ArrowLeft className="w-4 h-4 rotate-180" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeIntervention === 'ai_guided' && (
                                                    <div className="space-y-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg">
                                                                <Zap className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xl font-bold">Assistance Guidée par IA</h4>
                                                                <p className="text-xs text-purple-400 font-medium uppercase tracking-widest">Le LLM a préparé une ébauche d'analogie</p>
                                                            </div>
                                                        </div>

                                                        <div className="bg-purple-600/5 border border-purple-500/20 p-8 rounded-3xl space-y-4">
                                                            <p className="text-xs font-black text-purple-400 uppercase tracking-widest">Brouillon IA (Modifiable) :</p>
                                                            <textarea
                                                                value={aiDraft}
                                                                onChange={(e) => setAiDraft(e.target.value)}
                                                                className="w-full bg-transparent border-none outline-none text-slate-300 leading-relaxed italic text-lg resize-none h-32 focus:ring-0"
                                                            />
                                                        </div>

                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={handleSend}
                                                                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-600/20 transition-all active:scale-95"
                                                            >
                                                                Valider et Envoyer l'allégorie
                                                            </button>
                                                            <button className="px-8 bg-slate-950 border border-slate-800 text-slate-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                                                Régénérer
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeIntervention === 'synchronous' && (
                                                    <div className="text-center space-y-8 py-4">
                                                        <div className="w-20 h-20 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-600/20">
                                                            <Calendar className="w-10 h-10 text-orange-500" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-2xl font-black mb-2">Session Synchrone (15-30m)</h4>
                                                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                                                Réservez un créneau critique pour une clarification directe via le nœud de communication audio/vidéo.
                                                            </p>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                                            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left">
                                                                <span className="text-[8px] font-black text-slate-600 uppercase block mb-1">Date estimée</span>
                                                                <span className="text-sm font-bold text-slate-300">Aujourd'hui, 17:00</span>
                                                            </div>
                                                            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left">
                                                                <span className="text-[8px] font-black text-slate-600 uppercase block mb-1">Durée</span>
                                                                <span className="text-sm font-bold text-slate-300">20 minutes</span>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={handleSend}
                                                            className="bg-orange-600 hover:bg-orange-500 text-white px-12 py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-orange-600/30 active:scale-95 transition-all"
                                                        >
                                                            Envoyer l'invitation
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Intervention History (The "Concrete" part) */}
                                {interventionHistory.length > 0 && (
                                    <div className="mt-12 space-y-4">
                                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Historique des Interventions sur ce bloc</h5>
                                        {interventionHistory.map((item) => (
                                            <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl flex justify-between items-center group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.mode === 'asynchronous' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                                                        {item.mode === 'asynchronous' ? <MessageSquare className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-300">{item.content}</p>
                                                        <p className="text-[8px] text-slate-500 font-mono">{item.date}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-500 transition-colors">{item.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-slate-900/20 border border-slate-800 p-10 rounded-[40px]">
                        <h3 className="text-2xl font-bold tracking-tight mb-8">Journal d'Activité</h3>

                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-800">
                            {student.activityLog.map((activity, index) => (
                                <div key={activity.id} className="relative pl-12 group">
                                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-[#020617] flex items-center justify-center z-10 ${activity.type === 'module_completion' ? 'bg-green-500' :
                                        activity.type === 'audit_submission' ? 'bg-blue-500' : 'bg-purple-500'
                                        }`}>
                                        {activity.type === 'module_completion' && <CheckCircle className="w-5 h-5 text-white" />}
                                        {activity.type === 'audit_submission' && <FileText className="w-5 h-5 text-white" />}
                                        {activity.type === 'tutor_interaction' && <MessageSquare className="w-5 h-5 text-white" />}
                                    </div>

                                    <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${activity.type === 'module_completion' ? 'bg-green-500/10 text-green-400' :
                                                activity.type === 'audit_submission' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                                                }`}>
                                                {activity.type.replace('_', ' ')}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500">{activity.date}</span>
                                        </div>

                                        <p className="text-slate-300 font-medium text-lg mb-2">{activity.description}</p>

                                        {activity.score && (
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
                                                <span className="text-xs text-slate-500 font-bold uppercase">Score Obtenu</span>
                                                <span className={`text-xl font-black ${activity.score < 50 ? 'text-rose-500' : 'text-slate-200'}`}>
                                                    {activity.score}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentDetailView;
