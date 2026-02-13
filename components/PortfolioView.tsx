
import React, { useState, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import {
  Award, Share2, Download, ExternalLink, Hexagon, Globe, Code, Shield,
  CheckCircle2, ShieldCheck, Target, TrendingUp, Zap, Trophy, Star,
  Terminal, Database, Unlock, Fuel, ChevronRight, X, BrainCircuit, Globe2, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BADGES, MOCK_STATS } from '../constants';

const PortfolioView: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<any>(null);

  // Group badges by type
  const certifications = useMemo(() => MOCK_BADGES.filter(b => b.type === 'certification'), []);
  const moduleBadges = useMemo(() => MOCK_BADGES.filter(b => b.type === 'module'), []);
  const courseBadges = useMemo(() => MOCK_BADGES.filter(b => b.type === 'course'), []);

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-24 px-4 sm:px-6">

      {/* Identity Node - Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 border rounded-[60px] p-12 relative overflow-hidden transition-all duration-700 shadow-2xl group"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

        <div className="relative">
          <div className="w-56 h-56 rounded-[50px] overflow-hidden border-8 border-blue-500/10 shadow-2xl relative group/avatar">
            <img src="https://picsum.photos/seed/alex/400" alt="Profil" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover/avatar:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-5 rounded-[22px] shadow-[0_10px_30px_rgba(37,99,235,0.4)] glow-blue animate-bounce-subtle">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 animate-in fade-in slide-in-from-left duration-700">Identité Validée On-Chain</p>
            <h2 className="text-6xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>Alex Cipher</h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <span className="flex items-center space-x-2 px-5 py-2 rounded-2xl border bg-blue-500/5 transition-all duration-500 hover:bg-blue-500/10" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>NŒUD MAÎTRE</span>
            </span>
            <span className="px-5 py-2 rounded-2xl border bg-white/5" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>RANG #1204</span>
            <span className="px-5 py-2 rounded-2xl border bg-white/5" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>0x7f...3a2b</span>
          </div>

          <p className="text-xl max-w-2xl leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Expert en protocoles décentralisés et architecture de smart contracts.
            Maîtrise complète de l'écosystème Ethereum et des paradigmes Web3.
          </p>

          <div className="pt-4 flex flex-wrap gap-5 justify-center md:justify-start">
            <button className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] glow-blue-md group/btn active:scale-95">
              <Download className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
              <span>Télécharger Dossier</span>
            </button>
            <button className="flex items-center space-x-3 border px-8 py-5 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 active:scale-95"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <Share2 className="w-5 h-5" />
              <span>Diffuser Preuves</span>
            </button>
          </div>
        </div>
      </section>

      {/* Analytics & Credentials Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column: Skill Matrix & Categorized Badges (8/12) */}
        <div className="lg:col-span-8 space-y-16">

          {/* Matrice de Compétences (Radar) */}
          <section className="border p-12 rounded-[50px] shadow-2xl transition-all duration-500 relative overflow-hidden group"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h3 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Analyse Cognitive IA</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">Cartographie des Nœuds de Savoir</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 animate-pulse">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_STATS.skillMatrix}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--text-muted)", fontSize: 13, fontWeight: 800, letterSpacing: '0.1em' }} />
                  <Radar name="Compétence" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Categorized Badges Display */}
          <section className="space-y-12">

            {/* 1. MODULE BADGES (Mid-tier) */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
                <h3 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Nœuds de Maîtrise <span className="text-emerald-500">(Modules)</span></h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {moduleBadges.map((badge) => (
                  <div
                    key={badge.id}
                    onClick={() => setSelectedCredential(badge)}
                    className="border p-8 rounded-[35px] hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden bg-gradient-to-br from-transparent to-emerald-500/5 shadow-lg shadow-emerald-500/5 hover:-translate-y-1"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl border flex items-center justify-center text-emerald-400 bg-emerald-500/5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner" style={{ borderColor: 'var(--border-color)' }}>
                        {badge.icon === 'Award' && <Award className="w-10 h-10" />}
                        {badge.icon === 'Terminal' && <Terminal className="w-10 h-10" />}
                        {badge.icon === 'Shield' && <Shield className="w-10 h-10" />}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-black tracking-tight group-hover:text-emerald-400 transition-colors" style={{ color: 'var(--text-primary)' }}>{badge.name}</h4>
                        <p className="text-xs font-mono text-emerald-500/70 font-bold tracking-widest uppercase">SYNCHRONISÉ : {badge.dateEarned}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. COURSE BADGES (Lower-tier but sleek) */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                <h3 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Fragments de Savoir <span className="text-blue-500">(Cours)</span></h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {courseBadges.map((badge) => (
                  <div
                    key={badge.id}
                    onClick={() => setSelectedCredential(badge)}
                    className="border p-5 rounded-[25px] hover:border-blue-500/40 transition-all duration-300 group cursor-pointer flex items-center gap-4 hover:bg-blue-500/5 shadow-sm"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="w-12 h-12 rounded-2xl border flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-inner" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                      {badge.icon === 'Zap' && <Zap className="w-6 h-6" />}
                      {badge.icon === 'Unlock' && <Unlock className="w-6 h-6" />}
                      {badge.icon === 'Database' && <Database className="w-6 h-6" />}
                      {badge.icon === 'Fuel' && <Fuel className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{badge.name}</h4>
                      <p className="text-[9px] font-black font-mono text-blue-500/50 uppercase">{badge.dateEarned}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-white/5 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: PATH CERTIFICATIONS (MINIMALISTIC DISPLAY) (4/12) */}
        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-8 sticky top-24">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Certifications</h3>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="space-y-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCredential(cert)}
                  className="group cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="relative border rounded-[32px] p-8 flex flex-col items-center text-center gap-6 transition-all duration-500 hover:border-yellow-500/30 shadow-sm hover:shadow-yellow-500/5 overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>

                    {/* Subtle Gradient Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative">
                      <div className="w-24 h-24 rounded-[28px] bg-white/5 border flex items-center justify-center text-yellow-500 group-hover:scale-105 transition-transform duration-500" style={{ borderColor: 'var(--border-color)' }}>
                        <Trophy className="w-12 h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {cert.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {cert.dateEarned}
                      </p>
                    </div>

                    <div className="w-full pt-6 border-t border-white/5 flex flex-col gap-3">
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-500/80">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Vérifié On-Chain</span>
                      </div>
                      <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-xl border transition-all" style={{ borderColor: 'var(--border-color)' }}>
                        Voir Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-8 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center text-center gap-3 opacity-30"
                style={{ borderColor: 'var(--border-color)' }}>
                <Lock className="w-6 h-6 text-white/20" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Prochaine Certification</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Detail Credential Modal - Premium Neural Overhaul */}
      <AnimatePresence>
        {selectedCredential && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCredential(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0f1d] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.2)] max-h-[95vh] overflow-y-auto"
            >
              {/* Dynamic Accent Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-[120px] opacity-20 ${selectedCredential.type === 'certification' ? 'bg-yellow-500' :
                    selectedCredential.type === 'module' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                />
              </div>

              {/* Header Content */}
              <div className="relative z-10 p-8 flex flex-col items-center text-center">
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badge Visualization */}
                <div className="relative mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className={`w-28 h-28 rounded-[35px] flex items-center justify-center shadow-2xl relative z-10 border-4 border-white/5 bg-gradient-to-br ${selectedCredential.type === 'certification' ? 'from-yellow-400 to-yellow-700 shadow-yellow-500/30' :
                      selectedCredential.type === 'module' ? 'from-emerald-400 to-emerald-700 shadow-emerald-500/30' :
                        'from-blue-400 to-blue-700 shadow-blue-500/30'
                      }`}
                  >
                    {selectedCredential.type === 'certification' ? <Trophy className="w-14 h-14 text-white" /> :
                      selectedCredential.type === 'module' ? <Award className="w-14 h-14 text-white" /> :
                        <Zap className="w-14 h-14 text-white" />}
                  </motion.div>

                  {/* Decorative Neural Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border border-dashed border-white/10 rounded-full"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-white/5 ${selectedCredential.type === 'certification' ? 'bg-yellow-500/10 text-yellow-500' :
                    selectedCredential.type === 'module' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                    {selectedCredential.type === 'certification' ? 'Certification Or' : 'Validé On-Chain'}
                  </span>
                  <h2 className="text-3xl font-black text-white tracking-tighter leading-tight">
                    {selectedCredential.name}
                  </h2>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto font-medium leading-relaxed italic">
                    "{selectedCredential.description}"
                  </p>
                </motion.div>

                {/* Neural Verification Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full mt-8 grid grid-cols-1 gap-4"
                >
                  <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 text-left relative overflow-hidden group/verify">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <BrainCircuit className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Neural Verification</span>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>

                    <div className="space-y-6 text-sm">
                      <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">Autorité de Fusion</span>
                        <span className="text-white font-black text-xs uppercase tracking-widest">NeoAcademy Engine V2</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">Date d'Indexation</span>
                        <span className="text-white font-mono text-xs">{selectedCredential.dateEarned}</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider block mb-3">Transaction ID (Hachage)</span>
                        <div className="p-4 bg-black/60 rounded-2xl font-mono text-[10px] text-blue-400/80 break-all select-all border border-blue-500/10 group-hover/verify:border-blue-500/30 transition-all">
                          0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 15)}6fb2c9
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full grid grid-cols-2 gap-4 mt-8"
                >
                  <button className="py-5 bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-[24px] hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Propager</span>
                  </button>
                  <button className={`py-5 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-[24px] transition-all shadow-xl flex items-center justify-center gap-3 group ${selectedCredential.type === 'certification' ? 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/20' :
                    'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                    }`}>
                    <Globe2 className="w-5 h-5 group-hover:animate-spin-slow" />
                    <span>Explorer</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioView;
