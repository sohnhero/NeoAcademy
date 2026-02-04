
import React from 'react';
import { Settings, Shield, Cpu, BookOpen, Layers, Target, Activity, Database, Plus, AlertTriangle, TrendingUp, TrendingDown, Bell, Zap, FileText } from 'lucide-react';
import { MOCK_ADMIN_DASHBOARD_DATA } from '../constants';

// Added interface for AdminDashboard props to fix type error in App.tsx
interface AdminDashboardProps {
  onGoToConfig?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoToConfig }) => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      <header className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 text-blue-500 text-[10px] font-mono font-black mb-2 uppercase tracking-[0.3em]" style={{ color: 'var(--accent-primary)' }}>
            <Shield className="w-4 h-4" />
            <span>Pilotage Système & Gouvernance</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">Tableau de Bord</h2>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 glow-blue">
          <Plus className="w-4 h-4" /> Créer un nouveau parcours
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_ADMIN_DASHBOARD_DATA.kpis.map((kpi, i) => (
          <div key={i} className="border p-6 rounded-[24px] relative overflow-hidden group transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className={`absolute top-0 right-0 p-4 opacity-50 ${kpi.alert ? 'text-red-500' : 'text-blue-500'}`}>
              {kpi.alert ? <AlertTriangle className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>{kpi.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{kpi.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg mb-1 flex items-center gap-1 ${kpi.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            {kpi.alert && (
              <div className="mt-4 text-[10px] text-red-400 font-bold bg-red-500/10 p-2 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> Attention requise
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Intelligent Alerts */}
        <section className="border p-8 rounded-[40px] flex flex-col h-full lg:col-span-1 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Alertes Intelligentes</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Détectées par IA</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {MOCK_ADMIN_DASHBOARD_DATA.alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-2xl border transition-colors ${alert.type === 'critical' ? 'bg-red-500/5 border-red-500/20' :
                alert.type === 'warning' ? 'bg-orange-500/5 border-orange-500/20' :
                  'bg-blue-500/5 border-blue-500/20'
                }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${alert.type === 'critical' ? 'bg-red-500 text-white' :
                    alert.type === 'warning' ? 'bg-orange-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>{alert.type}</span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>{alert.time}</span>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-90" style={{ color: 'var(--text-primary)' }}>{alert.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Synthesis */}
        <section className="border p-8 rounded-[40px] flex flex-col h-full lg:col-span-2 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Synthèse Exécutive</h3>
                <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Générée par Gemini 3 Pro</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border px-4 py-2 rounded-xl transition-all" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <FileText className="w-3 h-3" /> Exporter PDF
            </button>
          </div>

          <div className="border rounded-3xl p-8 flex-1 relative z-10 transition-colors" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line leading-loose font-medium" style={{ color: 'var(--text-secondary)' }}>
                {MOCK_ADMIN_DASHBOARD_DATA.executiveSummary}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={onGoToConfig} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20">
                Ajuster les Paramètres IA
              </button>
              <button className="hover:bg-blue-600/10 border transition-all px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-inner transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                Détails du Rapport
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
