
import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ShieldCheck,
  User,
  Settings,
  Search,
  Bell,
  Menu,
  Hexagon,
  LogOut,
  ChevronRight,
  Users,
  ShieldAlert,
  Zap,
  Award,
  Shield,
  CreditCard,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole } from '../types';
import { MOCK_RECENT_ACTIVITY } from '../constants';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${active
      ? 'bg-blue-600 text-white glow-blue'
      : 'hover:bg-blue-600/10'
      } ${!label ? 'justify-center' : 'space-x-3'}`}
    style={{ color: active ? 'white' : 'var(--text-secondary)' }}
    title={!label ? "Navigation" : ""}
  >
    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'group-hover:text-blue-500'}`} style={{ color: !active ? 'var(--text-secondary)' : undefined }} />
    {label && <span className="font-semibold text-sm tracking-tight truncate animate-in fade-in duration-300">{label}</span>}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  role: UserRole;
  isCollapsed?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, role, isCollapsed: forcedCollapse }) => {
  const [isManualCollapsed, setIsManualCollapsed] = React.useState(false);
  const isCollapsed = forcedCollapse || isManualCollapsed;

  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-primary transition-colors duration-500 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <aside className={`border-r border-slate-900/10 flex flex-col p-6 hidden lg:flex transition-all duration-500 ease-in-out z-30 ${isCollapsed ? 'w-24' : 'w-72'}`} style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
        <div className={`flex items-center space-x-3 mb-16 px-2 overflow-hidden transition-all duration-500 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center glow-blue shrink-0">
            <Hexagon className="text-white w-6 h-6" />
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold tracking-tighter truncate animate-in fade-in slide-in-from-left-2 duration-500">
              NeoAcademy <span className="text-blue-500 font-mono">_AI</span>
            </h1>
          )}
        </div>

        <nav className="flex-1 space-y-3 overflow-hidden">
          <SidebarItem
            icon={LayoutDashboard}
            label={isCollapsed ? "" : "Tableau de bord"}
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />

          {role === 'apprenant' && (
            <>
              <SidebarItem
                icon={BookOpen}
                label={isCollapsed ? "" : "Bibliothèque"}
                active={activeTab === 'courses'}
                onClick={() => setActiveTab('courses')}
              />
              <SidebarItem
                icon={ShieldCheck}
                label={isCollapsed ? "" : "Vérifications"}
                active={activeTab === 'portfolio'}
                onClick={() => setActiveTab('portfolio')}
              />
              <SidebarItem
                icon={User}
                label={isCollapsed ? "" : "Mon Parcours"}
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
            </>
          )}

          {role === 'coach' && (
            <>
              <SidebarItem
                icon={Users}
                label={isCollapsed ? "" : "Ma Cohorte"}
                active={activeTab === 'cohort'}
                onClick={() => setActiveTab('cohort')}
              />
              <SidebarItem
                icon={Zap}
                label={isCollapsed ? "" : "IA Insights"}
                active={activeTab === 'insights'}
                onClick={() => setActiveTab('insights')}
              />
            </>
          )}

          {role === 'admin' && (
            <>
              <SidebarItem
                icon={Settings}
                label={isCollapsed ? "" : "Config IA"}
                active={activeTab === 'admin-config'}
                onClick={() => setActiveTab('admin-config')}
              />
              <SidebarItem
                icon={BookOpen}
                label={isCollapsed ? "" : "Gestion Contenu"}
                active={activeTab === 'admin-content'}
                onClick={() => setActiveTab('admin-content')}
              />
            </>
          )}
        </nav>

        <div className="pt-8 border-t border-slate-900/10 space-y-3">
          <button
            onClick={() => setIsManualCollapsed(!isManualCollapsed)}
            className="flex items-center justify-center w-full px-4 py-3 text-slate-500 hover:text-white transition-colors text-sm font-semibold group"
          >
            <Menu className={`w-5 h-5 transition-transform duration-500 ${isCollapsed ? 'rotate-180 text-blue-500' : ''}`} />
            {!isCollapsed && <span className="ml-3 truncate animate-in fade-in duration-500">Réduire Sidebar</span>}
          </button>

          <button
            onClick={onLogout}
            className={`flex items-center w-full px-4 py-3 text-slate-500 hover:text-white transition-colors text-sm font-semibold ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
            title="Terminer la Session"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="truncate animate-in fade-in duration-500">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 border-b flex items-center justify-between px-10 z-50 transition-colors duration-500" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border-color)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center lg:hidden">
            <Menu className="w-6 h-6 text-slate-400" />
          </div>

          <div className="relative w-full max-w-xl hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher des modules, actifs ou nœuds..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all font-semibold"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            />
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden xl:flex items-center space-x-2 text-[10px] font-mono font-bold text-blue-500 bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span>SESSION : {role.toUpperCase()}</span>
            </div>


            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative p-2 transition-colors ${isNotificationOpen ? 'text-blue-400 bg-blue-500/10 rounded-xl' : 'text-slate-400 hover:text-white'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-[24px] shadow-2xl p-4 animate-in fade-in zoom-in duration-200 z-50 overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h4 className="text-sm font-bold tracking-tight">Notifications</h4>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest cursor-pointer hover:text-blue-400">Marquer tout lu</span>
                  </div>
                  <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                    {MOCK_RECENT_ACTIVITY.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-900/50 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:scale-110 transition-all">
                          {(activity.type === 'module' || activity.type === 'tutor') ? <Zap className="w-4 h-4 text-blue-500" /> : <Award className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate" style={{ color: 'var(--text-primary)' }}>{activity.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    Voir tout <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-4 pl-8 border-l border-slate-900/10 cursor-pointer group transition-all ${isProfileOpen ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">Alex Cipher</p>
                  <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 overflow-hidden group-hover:border-blue-500 transition-all shadow-lg shadow-blue-500/10">
                  <img src={`https://picsum.photos/seed/${role}/100`} alt="Avatar" />
                </div>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-[24px] shadow-2xl p-2 animate-in fade-in zoom-in duration-200 z-50 overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border-color)' }}>
                  <div className="p-4 border-b border-slate-900/10 mb-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Connecté en tant que</p>
                    <p className="text-sm font-bold">alex.cipher@neo.ai</p>
                  </div>

                  <div className="space-y-1">
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group">
                      <Settings className="w-4 h-4 group-hover:text-blue-400" />
                      <span className="text-xs font-bold">Paramètres du Compte</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group">
                      <Shield className="w-4 h-4 group-hover:text-blue-400" />
                      <span className="text-xs font-bold">Sécurité & Privacité</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group">
                      <CreditCard className="w-4 h-4 group-hover:text-blue-400" />
                      <span className="text-xs font-bold">Abonnement Pro</span>
                    </button>
                    <div className="h-px bg-slate-900/10 my-2 mx-4"></div>
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all group"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-xs font-bold font-mono uppercase tracking-widest">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
