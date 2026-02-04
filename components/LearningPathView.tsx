
import React from 'react';
import {
  Shield,
  Cpu,
  Code,
  Zap,
  Lock,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Layers,
  Activity
} from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';

const MilestoneNode = ({ status, title, desc, icon: Icon, isLast, onNavigate }: {
  status: 'completed' | 'active' | 'locked',
  title: string,
  desc: string,
  icon: any,
  isLast?: boolean,
  onNavigate?: () => void
}) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  return (
    <div className="relative flex gap-8 group">
      {/* ... connector and Icon ... */}
      {!isLast && (
        <div className={`absolute left-8 top-16 bottom-0 w-0.5 -translate-x-1/2 ${isCompleted ? 'bg-blue-600' : 'bg-slate-800'}`}></div>
      )}

      {/* Node Icon */}
      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${isCompleted
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-blue-600'
          : isActive
            ? 'animate-pulse'
            : ''
          }`} style={{
            backgroundColor: !isCompleted ? 'var(--bg-primary)' : undefined,
            borderColor: !isCompleted ? (isActive ? 'var(--accent-primary)' : 'var(--border-color)') : undefined,
            color: !isCompleted ? (isActive ? 'var(--accent-primary)' : 'var(--text-muted)') : undefined
          }}>
          {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Icon className="w-7 h-7" />}
        </div>
      </div>

      {/* Content */}
      <div className="pb-16 pt-2 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-xl font-black tracking-tight" style={{ color: status === 'locked' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
            {title}
          </h4>
          {status === 'locked' && <Lock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />}
          {isActive && (
            <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-blue-500/20">
              Objectif Actif
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed max-w-md font-medium" style={{ color: status === 'locked' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
          {desc}
        </p>

        {isActive && (
          <button
            onClick={onNavigate}
            className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors group"
          >
            Aller au Nœud <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

const LearningPathView: React.FC<{ courses?: Course[], onNavigateToCourse?: (id: string) => void }> = ({ courses, onNavigateToCourse }) => {
  const currentCourse = courses && courses.length > 0 ? courses[0] : MOCK_COURSES[0];

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Header Summary */}
      <header className="mb-20">
        <div className="flex items-center gap-3 text-blue-500 text-[10px] font-mono font-black mb-4 uppercase tracking-[0.3em]">
          <Activity className="w-4 h-4" />
          <span>Visualisation du Parcours d'Objectifs</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>Trajectoire Actuelle</h2>
            <p className="max-w-xl font-medium text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Votre agent d'apprentissage autonome a cartographié les nœuds suivants en fonction de votre maîtrise des fondamentaux d'Ethereum.
            </p>
          </div>
          <div className="border p-6 rounded-3xl backdrop-blur-md min-w-[240px] transition-colors duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Sync Global</span>
              <span className="text-2xl font-black font-mono text-blue-500">65%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="h-full bg-blue-600 w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Roadmap Tracks */}
      <div className="space-y-24">
        {/* Track 1: Foundations */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] px-6" style={{ color: 'var(--text-muted)' }}>Phase 01 : Fondations du Protocole</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <div className="ml-4 md:ml-12">
            <MilestoneNode
              status="completed"
              title="Bases de la Machine à États"
              desc="Compréhension profonde de la logique déterministe et des fonctions de transition au sein des réseaux décentralisés."
              icon={Terminal}
            />
            <MilestoneNode
              status="completed"
              title="Cryptographie & Hachage"
              desc="Maîtrise de Keccak-256, des Arbres de Merkle et des protocoles de vérification de signature numérique."
              icon={Shield}
            />
            <MilestoneNode
              status="active"
              title="Architecture Interne de l'EVM"
              desc="Analyse de la manipulation de la pile, de l'expansion de la mémoire linéaire et de la mécanique de stockage persistant."
              icon={Cpu}
              onNavigate={() => onNavigateToCourse && currentCourse && onNavigateToCourse(currentCourse.id)}
            />
          </div>
        </section>

        {/* Track 2: Development */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] px-6" style={{ color: 'var(--text-muted)' }}>Phase 02 : Développement Architectural</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <div className="ml-4 md:ml-12">
            <MilestoneNode
              status="locked"
              title="Orchestration de Contrats Intelligents"
              desc="Construction de systèmes complexes à l'aide de modèles de proxy et de communication inter-contrats."
              icon={Layers}
            />
            <MilestoneNode
              status="locked"
              title="Audit de Sécurité Avancé"
              desc="Utilisation d'outils automatisés et identification manuelle des vulnérabilités de réentrance complexes."
              icon={Shield}
            />
            <MilestoneNode
              status="locked"
              title="Conception de Protocoles DeFi"
              desc="Implémentation de teneurs de marché automatisés (AMM) et de positions de dette collatéralisée."
              icon={Code}
              isLast
            />
          </div>
        </section>
      </div>

      {/* Path Recommendation Card */}
      <div className="mt-20 p-10 bg-blue-600 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-white backdrop-blur-md">
            <Zap className="w-10 h-10 fill-current" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight mb-2">Recommandation Neurale</h3>
            <p className="text-white/80 font-medium">
              Compte tenu de votre rapidité dans les modules de hachage, nous vous recommandons de passer directement aux <span className="text-white font-bold">Fondations des Preuves ZK</span> après la Phase 01.
            </p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95">
            Ajuster le Parcours
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPathView;
