
import React, { useState } from 'react';
import { Plus, Layers, Shield, Code, ChevronRight, Edit3, Trash2, Eye, Save, X, ArrowLeft, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { LegacyCourse as Course, Module } from '../types';
import AdminPreviewChat from './AdminPreviewChat';
import { generateModuleContent } from '../services/geminiService';

interface AdminPathBuilderProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
}

const AdminPathBuilder: React.FC<AdminPathBuilderProps> = ({ courses, onUpdateCourses }) => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handlers
  const handleSaveCourse = () => {
    if (!editingCourse) return;
    const exists = courses.find(c => c.id === editingCourse.id);
    let updatedCourses;
    if (exists) {
      updatedCourses = courses.map(c => c.id === editingCourse.id ? editingCourse : c);
    } else {
      updatedCourses = [...courses, editingCourse];
    }
    onUpdateCourses(updatedCourses);
    setEditingCourse(null);
    setEditingModule(null);
  };

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: `c${Date.now()}`,
      title: 'Nouveau Curriculum',
      category: 'blockchain',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
      status: 'draft',
      version: '0.1',
      modules: []
    };
    setEditingCourse(newCourse);
  };

  const handleAddModule = () => {
    if (!editingCourse) return;
    const newModule: Module = {
      id: `m${Date.now()}`,
      title: 'Nouveau Module',
      description: 'Description du module...',
      duration: '45 mins',
      isLocked: false,
      status: 'not-started',
      content: 'Contenu pédagogique ici...',
      objectives: ['Objectif 1'],
      llmConfig: {
        strictness: 'medium'
      }
    };
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newModule]
    });
    setEditingModule(newModule); // Auto-select new module
  };

  const updateEditingModule = (updates: Partial<Module>) => {
    if (!editingModule || !editingCourse) return;
    const updatedModule = { ...editingModule, ...updates };
    setEditingModule(updatedModule);
    setEditingCourse({
      ...editingCourse,
      modules: editingCourse.modules.map(m => m.id === updatedModule.id ? updatedModule : m)
    });
  };
  const updateLLMConfig = (updates: any) => {
    if (!editingModule) return;
    updateEditingModule({
      llmConfig: {
        ...editingModule.llmConfig,
        ...updates
      }
    });
  };

  const handleAIGenerate = async () => {
    if (!editingModule || !aiPrompt) return;
    setIsGenerating(true);
    try {
      const result = await generateModuleContent(aiPrompt, editingModule.title);
      if (result) {
        updateEditingModule({
          content: result.content,
          objectives: result.objectives,
          llmConfig: {
            ...editingModule.llmConfig,
            evaluationPrompt: result.evaluationCriteria
          }
        });
        setShowAIGenerator(false);
        setAiPrompt('');
      }
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (editingCourse) {
    return (
      <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-in slide-in-from-right duration-500">
        {/* Editor Header */}
        <header className="flex items-center justify-between p-6 rounded-[32px] border backdrop-blur-md sticky top-4 z-20 transition-colors duration-500" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditingCourse(null)}
              className="p-3 rounded-xl transition-colors border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                Édition : <input
                  value={editingCourse.title}
                  onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="bg-transparent border-b border-transparent hover:border-blue-500 focus:border-blue-500 outline-none transition-all px-2"
                  style={{ color: 'var(--text-primary)' }}
                />
              </h2>
              <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest pl-2">Mode Architecte Actif</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex rounded-lg p-1 border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              {['draft', 'published', 'archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => setEditingCourse({ ...editingCourse, status: status as any })}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${editingCourse.status === status ? 'bg-blue-600 text-white' : ''
                    }`}
                  style={{ color: editingCourse.status !== status ? 'var(--text-muted)' : undefined }}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
              <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Ver.</span>
              <input
                value={editingCourse.version || '1.0'}
                onChange={(e) => setEditingCourse({ ...editingCourse, version: e.target.value })}
                className="w-12 bg-transparent text-xs font-mono font-bold outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
            <button
              onClick={handleSaveCourse}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module List & Structure */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border rounded-[40px] p-8 min-h-[600px] transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold uppercase tracking-widest text-xs" style={{ color: 'var(--text-muted)' }}>Séquence des Modules</h3>
                <button onClick={handleAddModule} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {editingCourse.modules.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => setEditingModule(m)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${editingModule?.id === m.id
                      ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/10'
                      : 'hover:border-slate-700'
                      }`}
                    style={{
                      backgroundColor: editingModule?.id !== m.id ? 'var(--bg-primary)' : undefined,
                      borderColor: editingModule?.id !== m.id ? 'var(--border-color)' : undefined,
                      color: editingModule?.id !== m.id ? 'var(--text-muted)' : undefined
                    }}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black border transition-colors duration-500 ${editingModule?.id === m.id ? 'bg-white/20' : ''}`} style={{ backgroundColor: editingModule?.id !== m.id ? 'var(--bg-secondary)' : undefined, borderColor: 'var(--border-color)' }}>{i + 1}</div>
                      <span className="font-bold text-sm truncate">{m.title}</span>
                    </div>
                    {m.llmConfig && <Bot className={`w-3 h-3 ${editingModule?.id === m.id ? 'text-white/70' : 'text-blue-500'}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Module Editor */}
          <div className="lg:col-span-2">
            {editingModule ? (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                {/* Content Editor */}
                <div className="border rounded-[40px] p-8 backdrop-blur-sm transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  <header className="mb-6 flex items-center justify-between pb-6 border-b transition-colors duration-500" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center gap-3 flex-1">
                      <Layers className="w-5 h-5 text-blue-500" />
                      <input
                        value={editingModule.title}
                        onChange={e => updateEditingModule({ title: e.target.value })}
                        className="bg-transparent text-2xl font-black tracking-tight outline-none w-full"
                        style={{ color: 'var(--text-primary)' }}
                        placeholder="Titre du Module"
                      />
                    </div>
                    <button
                      onClick={() => setShowAIGenerator(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/30 rounded-xl text-purple-400 text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all group"
                    >
                      <Sparkles className="w-3 h-3 group-hover:animate-pulse" /> Générer via IA
                    </button>
                  </header>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Contenu Pédagogique (Markdown)</label>
                      <textarea
                        value={editingModule.content}
                        onChange={e => updateEditingModule({ content: e.target.value })}
                        className="w-full h-64 border rounded-3xl p-6 text-sm font-mono focus:border-blue-500 outline-none transition-all leading-relaxed"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        placeholder="# Introduction..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Objectifs (séparés par virgule)</label>
                      <input
                        value={editingModule.objectives.join(', ')}
                        onChange={e => updateEditingModule({ objectives: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full border rounded-xl p-4 text-sm focus:border-blue-500 outline-none transition-colors duration-500"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Dépendances d'Accès (Prérequis)</label>
                      <div className="border rounded-xl p-4 space-y-2 max-h-40 overflow-y-auto transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                        {editingCourse.modules.filter(m => m.id !== editingModule.id).length === 0 ? (
                          <p className="text-xs text-slate-600 italic">Aucun autre module disponible.</p>
                        ) : (
                          editingCourse.modules
                            .filter(m => m.id !== editingModule.id)
                            .map(m => {
                              const isSelected = editingModule.prerequisites?.includes(m.id);
                              return (
                                <div
                                  key={m.id}
                                  onClick={() => {
                                    const currentPrereqs = editingModule.prerequisites || [];
                                    const newPrereqs = isSelected
                                      ? currentPrereqs.filter(id => id !== m.id)
                                      : [...currentPrereqs, m.id];
                                    updateEditingModule({ prerequisites: newPrereqs });
                                  }}
                                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border ${isSelected
                                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-200'
                                    : 'hover:bg-slate-800'
                                    }`}
                                  style={{
                                    backgroundColor: !isSelected ? 'var(--bg-secondary)' : undefined,
                                    borderColor: !isSelected ? 'var(--border-color)' : undefined,
                                    color: !isSelected ? 'var(--text-muted)' : undefined
                                  }}
                                >
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
                                    }`}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                                  </div>
                                  <span className="text-xs font-medium truncate">{m.title}</span>
                                </div>
                              );
                            })
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LLM Configurator - Neural Node Configuration */}
                <div className="border rounded-[40px] p-8 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--glow-color)', borderColor: 'var(--border-color)' }}>
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Bot className="w-32 h-32 text-blue-500" />
                  </div>

                  <header className="mb-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Configuration du Nœud Neural (LLM)</h3>
                    </div>
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-xl text-blue-300 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                      <Eye className="w-3 h-3" /> Simulation Apprenant
                    </button>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          Contexte Tuteur <AlertCircle className="w-3 h-3" />
                        </label>
                        <textarea
                          value={editingModule.llmConfig?.tutorContext || ''}
                          onChange={e => updateLLMConfig({ tutorContext: e.target.value })}
                          className="w-full h-24 border rounded-2xl p-4 text-xs font-mono focus:border-blue-400 outline-none placeholder-blue-500/30 resize-none"
                          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                          placeholder="Ex: Agis comme un expert en sécurité offensive. Concentre-toi sur les vulnérabilités de re-entrance."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Rigueur</label>
                          <select
                            value={editingModule.llmConfig?.strictness || 'medium'}
                            onChange={e => updateLLMConfig({ strictness: e.target.value })}
                            className="w-full border rounded-xl p-3 text-xs font-bold uppercase outline-none"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                          >
                            <option value="low">Permissif</option>
                            <option value="medium">Standard</option>
                            <option value="high">Strict</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Profondeur</label>
                          <select
                            value={editingModule.llmConfig?.depth || 'detailed'}
                            onChange={e => updateLLMConfig({ depth: e.target.value })}
                            className="w-full border rounded-xl p-3 text-xs font-bold uppercase outline-none"
                            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                          >
                            <option value="overview">Synthétique</option>
                            <option value="detailed">Détaillé</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Style Pédagogique</label>
                        <div className="flex gap-2">
                          {['socratic', 'didactic', 'concise'].map((style) => (
                            <button
                              key={style}
                              onClick={() => updateLLMConfig({ style })}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${editingModule.llmConfig?.style === style
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'hover:border-blue-400'
                                }`}
                              style={{
                                backgroundColor: editingModule.llmConfig?.style !== style ? 'var(--bg-primary)' : undefined,
                                borderColor: editingModule.llmConfig?.style !== style ? 'var(--border-color)' : undefined,
                                color: editingModule.llmConfig?.style !== style ? 'var(--text-muted)' : undefined
                              }}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)' }}>Prompt d'Évaluation (Critères)</label>
                      <textarea
                        value={editingModule.llmConfig?.evaluationPrompt || ''}
                        onChange={e => updateLLMConfig({ evaluationPrompt: e.target.value })}
                        className="w-full h-full min-h-[180px] border rounded-2xl p-4 text-xs font-mono focus:border-blue-400 outline-none placeholder-blue-500/30"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        placeholder="Instructions spécifiques pour l'IA lors de la correction..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 border rounded-[40px] border-dashed transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                <Layers className="w-16 h-16 mb-6 opacity-20" />
                <p className="font-bold text-lg">Sélectionnez un module pour l'éditer</p>
                <p className="text-sm opacity-60">ou créez-en un nouveau</p>
              </div>
            )}
          </div>
        </div>

        {showPreview && editingModule && (
          <AdminPreviewChat
            moduleTitle={editingModule.title}
            moduleContent={editingModule.content}
            llmConfig={editingModule.llmConfig || {}}
            onClose={() => setShowPreview(false)}
          />
        )}

        {/* AI Content Generator Modal */}
        {showAIGenerator && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-[#020617]/80 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[40px] p-10 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-64 h-64 text-purple-500" />
              </div>

              <button
                onClick={() => setShowAIGenerator(false)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-600/20 mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-2">Générateur de Module IA</h3>
                <p className="text-slate-500 text-sm mb-10 max-w-md">Décrivez l'intention pédagogique de ce module. L'IA va structurer le cours, les objectifs et l'audit technique.</p>

                <div className="w-full space-y-6">
                  <div className="text-left">
                    <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3 block">Intention Pédagogique (Sujet, Profondeur, Focus)</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ex: Un cours sur la gestion du gas en Solidity, focus sur les opcodes SSTORE et MLOAD. Niveau expert."
                      className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 h-40 outline-none focus:border-purple-500 transition-all text-slate-300 font-medium shadow-inner"
                    />
                  </div>

                  <button
                    onClick={handleAIGenerate}
                    disabled={isGenerating || !aiPrompt}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-purple-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Expansion du Nœud de Connaissance...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Matérialiser le Contenu
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>Architecte de Parcours</h2>
          <p className="font-medium mt-1 uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-muted)' }}>Design de curriculum progressif & verrouillé</p>
        </div>
        <button
          onClick={handleCreateCourse}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Nouveau Curriculum
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-10 hover:border-blue-500/30 transition-all group" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl shrink-0 border" style={{ borderColor: 'var(--border-color)' }}>
              <img src={course.image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/5 px-2 py-1 rounded border border-blue-500/20">{course.category}</span>
                <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{course.title}</h3>
              </div>
              <p className="text-sm font-medium mb-6" style={{ color: 'var(--text-muted)' }}>Structure active : {course.modules.length} modules vérifiés par IA</p>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {course.modules.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-black transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                      M{i + 1}
                    </div>
                    {i < course.modules.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setEditingCourse(course)}
                className="p-4 border rounded-2xl hover:text-blue-500 hover:border-blue-500 transition-all shadow-lg active:scale-95"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                title="Modifier"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button
                className="p-4 border rounded-2xl hover:text-red-500 hover:border-red-500 transition-all shadow-lg active:scale-95"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleCreateCourse}
          className="w-full border-2 border-dashed py-12 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
        >
          <Plus className="w-10 h-10 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Ajouter un parcours technique</span>
        </button>
      </div>
    </div >
  );
};

export default AdminPathBuilder;
