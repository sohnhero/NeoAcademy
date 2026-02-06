
import React, { useState, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import {
  Award, Share2, Download, ExternalLink, Hexagon, Globe, Code, Shield,
  CheckCircle2, ShieldCheck, Target, TrendingUp, Zap, Trophy, Star,
  Terminal, Database, Unlock, Fuel, ChevronRight
} from 'lucide-react';
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

      {/* Detail Credential Modal - Refined Premium Design */}
      {selectedCredential && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="border rounded-[60px] max-w-lg w-full p-12 shadow-[0_0_150px_rgba(37,99,235,0.15)] relative transition-all duration-700 overflow-hidden group/modal"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>

            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <button
              onClick={() => setSelectedCredential(null)}
              className="absolute top-10 right-10 p-4 rounded-3xl border hover:bg-red-500/10 hover:border-red-500/40 transition-all z-20 group/close"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            >
              <X className="w-6 h-6 group-hover/close:rotate-90 transition-transform" />
            </button>

            <div className="relative z-10 space-y-12">
              <div className="flex flex-col items-center gap-8">
                <div className={`w-32 h-32 rounded-[45px] flex items-center justify-center border-2 shadow-2xl relative overflow-hidden group-hover/modal:scale-110 transition-transform duration-700`}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: selectedCredential.type === 'certification' ? 'rgba(234,179,8,0.3)' : 'var(--border-color)',
                    color: selectedCredential.type === 'certification' ? '#eab308' : selectedCredential.type === 'module' ? '#10b981' : '#3b82f6'
                  }}>
                  {selectedCredential.type === 'certification' ? <Trophy className="w-16 h-16" /> :
                    selectedCredential.type === 'module' ? <Award className="w-16 h-16" /> :
                      <Zap className="w-16 h-16" />}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                </div>

                <div className="text-center space-y-3">
                  <h3 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{selectedCredential.name}</h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-lg ${selectedCredential.type === 'certification' ? 'bg-yellow-500/10 text-yellow-500' :
                      selectedCredential.type === 'module' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                      {selectedCredential.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 rounded-[40px] p-10 border shadow-inner relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

                <p className="text-base text-center font-medium leading-relaxed opacity-80 italic" style={{ color: 'var(--text-secondary)' }}>
                  "{selectedCredential.description}"
                </p>

                <div className="pt-8 grid grid-cols-2 gap-6 border-t border-white/5">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Date de Fusion</span>
                    <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>{selectedCredential.dateEarned}</p>
                  </div>
                  <div className="space-y-1.5 text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Autorité</span>
                    <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>NeoAcademy Engine</p>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 text-center">Identifiant Haché (TX)</p>
                  <div className="p-4 bg-black/40 rounded-2xl font-mono text-[11px] text-center opacity-70 break-all select-all hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    0x2b8e7d8f9a0c1b2d3e4f5g6h7i8j9k0l1m2n3o4p
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <ExternalLink className="w-5 h-5" />
                  <span>Explorer</span>
                </button>
                <button className="flex-1 py-5 bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl glow-blue hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Lock Icon
const Lock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

// Internal X Icon
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default PortfolioView;
