
import React, { useState, useMemo, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Award, Share2, Download, ExternalLink, Hexagon, Globe, Code, Shield,
  CheckCircle2, ShieldCheck, Target, TrendingUp, Zap, Trophy, Star,
  Terminal, Database, Unlock, Fuel, ChevronRight, X, BrainCircuit, Globe2, Lock,
  Briefcase, GraduationCap, Cpu, CheckSquare, Github, MessageSquareQuote, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BADGES, MOCK_STATS, MOCK_PORTFOLIO_PROJECTS, MOCK_SKILL_SCORES, MOCK_RECOMMENDATIONS } from '../constants';

const PortfolioView: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'recommendations' | 'certifications'>('overview');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState(0);

  // Group badges by type
  const certifications = useMemo(() => MOCK_BADGES.filter(b => b.type === 'certification'), []);
  const moduleBadges = useMemo(() => MOCK_BADGES.filter(b => b.type === 'module'), []);
  const courseBadges = useMemo(() => MOCK_BADGES.filter(b => b.type === 'course'), []);

  // Export Animation Logic
  const handleExport = () => {
    setIsExporting(true);
    setExportStep(1);
  };

  useEffect(() => {
    if (isExporting) {
      if (exportStep < 4) {
        const timer = setTimeout(() => setExportStep(s => s + 1), 1200);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsExporting(false);
          setExportStep(0);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isExporting, exportStep]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-4 sm:px-6">

      {/* Identity Node - Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 border rounded-[60px] p-12 relative overflow-hidden transition-all duration-700 shadow-2xl group bg-[#0F172A] border-blue-500/20">
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

        <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
          <div className="space-y-2">
            <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 flex items-center gap-2 justify-center md:justify-start">
              <BrainCircuit className="w-4 h-4" /> Profil IA Généré & Certifié
            </p>
            <h2 className="text-6xl font-black tracking-tighter text-white">Alex Cipher</h2>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <span className="flex items-center space-x-2 px-5 py-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>NŒUD MAÎTRE</span>
            </span>
            <span className="px-5 py-2 rounded-2xl border border-white/10 bg-white/5 text-slate-400">TOP 1% Coder</span>
            <span className="px-5 py-2 rounded-2xl border border-white/10 bg-white/5 text-slate-400">0x7f...3a2b</span>
          </div>

          <p className="text-xl max-w-2xl leading-relaxed font-medium text-slate-300">
            Expert en protocoles décentralisés et architecture de smart contracts.
            Maîtrise complète de l'écosystème Ethereum, certifié par des simulations d'incidents réels.
          </p>

          <div className="pt-4 flex flex-wrap gap-5 justify-center md:justify-start">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 disabled:opacity-80 disabled:scale-100 min-w-[300px] justify-center"
            >
              {isExporting ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>
                    {exportStep === 1 ? 'Compilation des Projets...' :
                      exportStep === 2 ? 'Validation Cryptographique...' :
                        exportStep === 3 ? 'Génération du Dossier PDF...' :
                          'Dossier Prêt !'}
                  </span>
                </div>
              ) : (
                <>
                  <Download className="w-5 h-5 animate-bounce-subtle" />
                  <span>Dossier Entreprise (PDF)</span>
                </>
              )}
            </button>
            <button className="flex items-center space-x-3 border border-white/10 bg-white/5 px-8 py-5 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] text-slate-300 hover:bg-white/10 active:scale-95">
              <Share2 className="w-5 h-5" />
              <span>Lien Public</span>
            </button>
          </div>
        </div>
      </section>

      {/* Smart Portfolio Tabs */}
      <div className="flex items-center justify-center gap-2 p-2 bg-[#0F172A] border border-white/10 rounded-full w-max mx-auto overflow-hidden shadow-2xl relative z-20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Target className="w-4 h-4" /> Vue d'Ensemble
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Briefcase className="w-4 h-4" /> Projets Validés
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'recommendations' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <MessageSquareQuote className="w-4 h-4" /> Avis & Reco
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'certifications' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Trophy className="w-4 h-4" /> Certifications
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Radar Chart */}
            <section className="bg-[#0F172A] border border-white/5 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-white">Analyse Cognitive IA</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Profil de Compétences</p>
                </div>
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_STATS.skillMatrix}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }} />
                    <Radar name="Compétence" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Top Skills List */}
            <section className="bg-[#0F172A] border border-white/5 p-10 rounded-[40px] shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-white">Domaines d'Expertise</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Scores Prouvés en Simulation</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <CheckSquare className="w-5 h-5" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-6">
                {MOCK_SKILL_SCORES.map((skill, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-slate-200 flex items-center gap-2">
                        {skill.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />} {skill.domain}
                      </span>
                      <span className="font-mono font-black text-blue-400">{skill.masteryLevel}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.masteryLevel}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Projets Finaux Validés</h3>
                <p className="text-sm font-medium text-slate-400">Applications complètes développées et auditées en condition réelle.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {MOCK_PORTFOLIO_PROJECTS.map(project => (
                <div key={project.id} className="bg-[#0F172A] border border-white/5 rounded-[32px] overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
                  <div className="h-48 relative overflow-hidden">
                    <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                      <h4 className="text-2xl font-black text-white leading-tight">{project.title}</h4>
                      <div className="w-14 h-14 rounded-2xl bg-[#0F172A]/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-blue-400 font-black shadow-lg">
                        <span className="text-xs leading-none">SCORE</span>
                        <span className="text-lg leading-none">{project.score}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{project.objective}</p>

                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stack Technique</span>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Validé le {project.completionDate}
                      </div>
                      <a href={`https://${project.gitLink}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-600 hover:text-white text-blue-400 rounded-xl transition-colors font-black text-[10px] uppercase tracking-widest">
                        <Github className="w-3.5 h-3.5" /> Voir le Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* RECOMMENDATIONS TAB */}
        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Recommandations & Avis</h3>
                <p className="text-sm font-medium text-slate-400">Évaluations laissées par les experts et moteurs de simulation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_RECOMMENDATIONS.map(rec => (
                <div key={rec.id} className="bg-[#0F172A] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group hover:border-white/10 transition-colors">
                  <MessageSquareQuote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />

                  <div className="relative z-10 space-y-6">
                    <p className="text-lg text-slate-300 font-medium leading-relaxed italic">
                      "{rec.text}"
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <img src={rec.avatarUrl} alt={rec.author} className="w-12 h-12 rounded-full border-2 border-slate-700" />
                      <div>
                        <h4 className="font-black text-white text-sm">{rec.author}</h4>
                        <p className="text-xs font-bold text-slate-500">{rec.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <motion.div
            key="certifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Certifications Officielles & Badges</h3>
                <p className="text-sm font-medium text-slate-400">Preuves cryptographiques des compétences acquises.</p>
              </div>
            </div>

            {/* Certifications (Major) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifications.map(cert => (
                <div key={cert.id} onClick={() => setSelectedCredential(cert)} className="bg-[#0F172A] border border-white/5 p-8 rounded-[32px] flex flex-col items-center text-center gap-4 cursor-pointer hover:border-yellow-500/30 transition-all shadow-lg hover:-translate-y-1 overflow-hidden relative">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                  <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-2">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg">{cert.name}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">{cert.dateEarned}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Module Badges */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-6 px-4">Nœuds de Maîtrise (Modules)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moduleBadges.map((badge) => (
                  <div key={badge.id} onClick={() => setSelectedCredential(badge)} className="bg-[#0F172A] border border-white/5 p-6 rounded-[24px] hover:border-emerald-500/30 transition-all cursor-pointer flex items-center gap-4 shadow-md">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-emerald-400 bg-emerald-500/10 flex-shrink-0">
                      {badge.icon === 'Award' && <Award className="w-6 h-6" />}
                      {badge.icon === 'Terminal' && <Terminal className="w-6 h-6" />}
                      {badge.icon === 'Shield' && <Shield className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white leading-tight">{badge.name}</h4>
                      <p className="text-[10px] font-mono text-slate-500 mt-1">{badge.dateEarned}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
