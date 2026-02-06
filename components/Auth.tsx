
import React, { useState } from 'react';
import { Hexagon, ArrowRight, Mail, Lock, User, Phone, Eye, EyeOff, UserCheck, Users, ShieldAlert, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole, isNewUser?: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

// Demo accounts
const DEMO_ACCOUNTS = {
  apprenant: { email: 'demo@apprenant.com', password: 'demo123', role: 'apprenant' as UserRole },
  coach: { email: 'demo@coach.com', password: 'demo123', role: 'coach' as UserRole },
  admin: { email: 'demo@admin.com', password: 'demo123', role: 'admin' as UserRole }
};

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (mode === 'login') {
      // Check demo accounts
      const demoAccount = Object.values(DEMO_ACCOUNTS).find(
        acc => acc.email === formData.email && acc.password === formData.password
      );

      if (demoAccount) {
        onLogin(demoAccount.role, false);
      } else if (formData.email && formData.password) {
        // Mock: any valid email/password combo logs in as apprenant
        onLogin('apprenant', false);
      } else {
        setError('Identifiants invalides');
      }
    } else {
      // Registration - validate fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs obligatoires');
        setIsLoading(false);
        return;
      }
      // New user goes to Path Finder
      onLogin('apprenant', true);
    }

    setIsLoading(false);
  };

  const handleGoogleSSO = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    // New Google user goes to Path Finder
    onLogin('apprenant', true);
    setIsLoading(false);
  };

  const handleDemoLogin = (role: UserRole) => {
    const account = DEMO_ACCOUNTS[role];
    setFormData({ ...formData, email: account.email, password: account.password });
    // Direct login for demo accounts
    onLogin(role, role === 'apprenant');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Background effects */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full"></div>


      <div className="w-full max-w-lg p-6 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20">
            <Hexagon className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1">NeoAcademy <span className="text-blue-500">AI</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Formation Web3 Intelligente</p>
        </div>

        {/* Main Card */}
        <div className="border rounded-[32px] p-8 shadow-2xl transition-all duration-500" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', backdropFilter: 'blur(24px)' }}>

          {/* Mode Toggle */}
          <div className="flex rounded-xl p-1 mb-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-blue-600 text-white shadow-lg' : ''}`}
              style={{ color: mode !== 'login' ? 'var(--text-muted)' : undefined }}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'register' ? 'bg-blue-600 text-white shadow-lg' : ''}`}
              style={{ color: mode !== 'register' ? 'var(--text-muted)' : undefined }}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Registration Fields */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Prénom *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        placeholder="Jean"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Nom *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Adresse e-mail *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-colors"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Mot de passe *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded-xl py-3 pl-11 pr-12 text-sm outline-none focus:border-blue-500 transition-colors"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-xs font-medium text-center p-3 bg-red-500/10 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Se connecter' : "S'inscrire"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>ou</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          {/* Google SSO */}
          <button
            onClick={handleGoogleSSO}
            disabled={isLoading}
            className="w-full border py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 hover:border-blue-500/50"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuer avec Google
          </button>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-4" style={{ color: 'var(--text-muted)' }}>
              <Sparkles className="w-3 h-3 inline mr-1" /> Comptes Démo
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'apprenant' as UserRole, icon: UserCheck, label: 'Apprenant' },
                { role: 'coach' as UserRole, icon: Users, label: 'Coach' },
                { role: 'admin' as UserRole, icon: ShieldAlert, label: 'Admin' }
              ].map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleDemoLogin(demo.role)}
                  className="p-3 rounded-xl border text-center transition-all hover:border-blue-500/50 hover:bg-blue-500/5"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                >
                  <demo.icon className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{demo.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
          Protocol v4.5.0 • LLM Audit Engine
        </p>
      </div>
    </div>
  );
};

export default Auth;
