
import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap, Activity, Save, RefreshCw, Sliders, BrainCircuit } from 'lucide-react';

const AdminConfigView: React.FC = () => {
  const [temp, setTemp] = useState(0.4);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">Neural Hub Control</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Paramètres du moteur d'audit LLM</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Sauvegarder les Modifications
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Model Settings */}
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/20 border border-slate-800 p-10 rounded-[48px] shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Configuration du Modèle Central</h3>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Sélecteur de Nœud LLM</label>
                  <span className="text-[10px] font-mono text-blue-500 bg-blue-500/5 px-2 py-1 rounded">STABLE : GEMINI-3-PRO</span>
                </div>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:border-blue-500/50 transition-all">
                  <option>Gemini 3 Pro (Audit Expert)</option>
                  <option>Gemini 3 Flash (Fast Tutor)</option>
                </select>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  <span>Indice de Créativité (Température)</span>
                  <span className="font-mono text-blue-500">{temp}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={temp} 
                  onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600" 
                />
                <div className="flex justify-between text-[8px] font-bold text-slate-700 uppercase tracking-widest">
                  <span>Strict (Audit)</span>
                  <span>Créatif (Tutorat)</span>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-800 space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-3xl border border-slate-800">
                  <div>
                    <p className="font-bold text-sm">Contrôle de Réentrance IA</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Vérification multicouche des audits de code</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Monitoring */}
        <section className="space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[40px] flex flex-col gap-8">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-500" /> État des Services
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Latency Engine', status: '82ms', color: 'text-green-500' },
                { label: 'Memory Pool', status: '4.2 GB', color: 'text-blue-500' },
                { label: 'Token Cache', status: '98%', color: 'text-green-500' }
              ].map((service, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-900">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{service.label}</span>
                  <span className={`text-xs font-mono font-bold ${service.color}`}>{service.status}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
              Redémarrer les Nœuds IA
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminConfigView;
