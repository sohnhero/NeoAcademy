
import React, { useState } from 'react';
import { Hexagon, ArrowRight, Shield, Cpu, User, Users, ShieldAlert } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('apprenant');

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>

      <div className="w-full max-w-xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 glow-blue">
            <Hexagon className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">NeoAcademy <span className="text-blue-500">AI</span></h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Système de Formation Web3 Intelligent</p>
        </div>

        <div className="border rounded-[40px] p-10 shadow-2xl transition-all duration-500" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(24px)' }}>
          <h2 className="text-xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>Sélectionnez votre profil d'accès</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { id: 'apprenant', label: 'Apprenant', icon: User, desc: 'Suivi de parcours' },
              { id: 'coach', label: 'Coach', icon: Users, desc: 'Accompagnement' },
              { id: 'admin', label: 'Admin', icon: ShieldAlert, desc: 'Pilotage système' }
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-3 group ${selectedRole === role.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-transparent hover:border-blue-500/30'
                  }`}
                style={{
                  backgroundColor: selectedRole === role.id ? 'rgba(37, 99, 235, 0.05)' : 'var(--bg-secondary)',
                  borderColor: selectedRole === role.id ? 'var(--accent-primary)' : 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <role.icon className={`w-8 h-8 ${selectedRole === role.id ? 'text-blue-500' : 'text-slate-500 group-hover:text-blue-400'}`} />
                <div>
                  <p className="font-bold text-sm">{role.label}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => onLogin(selectedRole)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all transform active:scale-[0.98] flex items-center justify-center group shadow-xl shadow-blue-500/20"
          >
            <span>Initialiser la Session {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="mt-8 text-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">
          Protocol v4.5.0 • LLM Audit Engine Enabled
        </p>
      </div>
    </div>
  );
};

export default Auth;
