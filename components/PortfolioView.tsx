
import React, { useState } from 'react';
import { Award, Share2, Download, ExternalLink, Hexagon, Globe, Code, Shield, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MOCK_BADGES } from '../constants';

const PortfolioView: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<any>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Identity Node */}
      <section className="flex flex-col md:flex-row items-center gap-12 border rounded-[48px] p-12 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative">
          <div className="w-48 h-48 rounded-[40px] overflow-hidden border-4 border-blue-500/20 shadow-2xl relative group">
            <img src="https://picsum.photos/seed/alex/300" alt="Profil" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-2xl shadow-xl glow-blue">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>Alex Cipher</h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8 font-mono text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center space-x-2 px-4 py-1.5 rounded-full border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>NŒUD MAÎTRE</span>
            </span>
            <span className="px-4 py-1.5 rounded-full border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>RANG #1204</span>
            <span className="px-4 py-1.5 rounded-full border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>ID: 0x7f...3a2b</span>
          </div>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Architecte de protocoles décentralisés et développeur full-stack avec une expertise en sécurité blockchain et systèmes distribués.
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest glow-blue-md">
              <Download className="w-4 h-4" />
              <span>Télécharger CV</span>
            </button>
            <button className="flex items-center space-x-2 border px-6 py-3 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <Share2 className="w-4 h-4" />
              <span>Partager le Profil</span>
            </button>
          </div>
        </div>
      </section>

      {/* Verification Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Identifiants Vérifiés</h3>
            <Award className="w-6 h-6 text-blue-500" />
          </div>

          <div className="space-y-4">
            {MOCK_BADGES.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedCredential({
                  title: badge.name,
                  date: badge.dateEarned,
                  type: "badge",
                  description: badge.description
                })}
                className="border p-8 rounded-[32px] hover:bg-slate-900 transition-all group flex items-center justify-between cursor-pointer"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl border flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <Hexagon className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold tracking-tight mb-1 group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{badge.name}</h4>
                    <p className="text-sm max-w-xs font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>{badge.description}</p>
                    <div className="mt-4 flex items-center text-[10px] font-mono font-bold uppercase tracking-widest gap-4" style={{ color: 'var(--text-muted)' }}>
                      <span>SYNCHRONISÉ : {badge.dateEarned}</span>
                      <span className="text-blue-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> VÉRIFIÉ ON-CHAIN
                      </span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-800 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Nœuds de Maîtrise Technique</h3>
          <div className="border p-10 rounded-[48px] h-full transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="space-y-10">
              {[
                { name: 'Solidity & EVM', progress: 92, icon: Code },
                { name: 'Mécanique DeFi', progress: 78, icon: Globe },
                { name: 'Sécurité des Contrats', progress: 85, icon: Shield },
                { name: 'Rust & Solana', progress: 45, icon: Hexagon }
              ].map((skill, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                        <skill.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                    </div>
                    <span className="font-mono text-blue-500 font-black">{skill.progress}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full overflow-hidden border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div
                      className="h-full bg-blue-600 glow-blue rounded-full transition-all duration-1000"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedCredential && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="border rounded-[32px] max-w-md w-full p-8 shadow-2xl relative transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedCredential(null); }}
              className="absolute top-6 right-6 p-2 rounded-full border transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            >
              ✕
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-500/30">
                <ShieldCheck className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-center mb-2" style={{ color: 'var(--text-primary)' }}>{selectedCredential.title}</h3>
            <p className="text-center text-sm mb-8 font-medium" style={{ color: 'var(--text-muted)' }}>Authenticité Cryptographique Confirmée</p>

            <div className="space-y-4 rounded-2xl p-6 border transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Type</span>
                <span className="text-sm font-mono capitalize" style={{ color: 'var(--text-primary)' }}>{selectedCredential.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Date</span>
                <span className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{selectedCredential.date}</span>
              </div>
              {selectedCredential.score && (
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Score Final</span>
                  <span className="text-sm font-black text-blue-500">{selectedCredential.score}</span>
                </div>
              )}
              {selectedCredential.hash && (
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Hash TX</span>
                  <span className="text-xs font-mono truncate max-w-[120px]" style={{ color: 'var(--text-muted)' }}>{selectedCredential.hash}</span>
                </div>
              )}
            </div>

            <button className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors shadow-lg">
              Explorer sur Etherscan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioView;
