
import React, { useState } from 'react';
import { Sparkles, List, BookOpen, ChevronRight, ArrowRight, Target, Zap, CheckCircle2, Code, Shield, TrendingUp, Layers, Hexagon } from 'lucide-react';
import { LearningPath, ExitProfile } from '../types';
import { EXIT_PROFILES, PREDEFINED_PATHS_CATALOG, MOCK_LEARNING_PATHS } from '../constants';

interface PathSelectionViewProps {
    onPathSelected: (path: LearningPath) => void;
    onBack?: () => void;
}

type TabType = 'ai-profile' | 'custom' | 'predefined';

const IconMap: Record<string, React.ElementType> = {
    Code, Shield, TrendingUp, Layers, Hexagon
};

const PathSelectionView: React.FC<PathSelectionViewProps> = ({ onPathSelected, onBack }) => {
    const [activeTab, setActiveTab] = useState<TabType>('ai-profile');
    const [selectedProfile, setSelectedProfile] = useState<ExitProfile | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(null);

    const handleGeneratePath = async () => {
        if (!selectedProfile) return;

        setIsGenerating(true);
        // Simulate AI generation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For demo, use mock data
        const mockPath = { ...MOCK_LEARNING_PATHS[0], type: 'ai-generated' as const, exitProfile: selectedProfile };
        setGeneratedPath(mockPath);
        setIsGenerating(false);
    };

    const handleSelectPredefinedPath = (pathId: string) => {
        const fullPath = MOCK_LEARNING_PATHS.find(p => p.id === pathId) || {
            ...MOCK_LEARNING_PATHS[0],
            id: pathId,
            type: 'predefined' as const,
            status: 'not-started' as const,
            progress: 0
        };
        onPathSelected(fullPath as LearningPath);
    };

    const tabs = [
        { id: 'ai-profile' as TabType, label: 'Profil de Sortie IA', icon: Sparkles, desc: 'L\'IA génère votre parcours' },
        { id: 'custom' as TabType, label: 'Parcours Personnalisé', icon: List, desc: 'Choisissez vos modules' },
        { id: 'predefined' as TabType, label: 'Parcours Prédéfinis', icon: BookOpen, desc: 'Catalogue de formations' }
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <header className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
                    <Target className="w-4 h-4" />
                    <span>Démarrer votre Apprentissage</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
                    Choisissez votre Parcours
                </h1>
                <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Sélectionnez un mode d'entrée pour commencer votre voyage d'apprentissage personnalisé.
                </p>
            </header>

            {/* Tab Navigation */}
            <div className="flex flex-col md:flex-row gap-4 mb-16">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setGeneratedPath(null);
                                setSelectedProfile(null);
                            }}
                            className={`flex-1 p-6 rounded-3xl border-2 transition-all text-left group ${isActive
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'hover:border-blue-500/30'
                                }`}
                            style={{
                                backgroundColor: !isActive ? 'var(--bg-secondary)' : undefined,
                                borderColor: !isActive ? 'var(--border-color)' : undefined
                            }}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isActive ? 'bg-blue-600 text-white' : 'transition-colors'
                                }`}
                                style={{ backgroundColor: !isActive ? 'var(--bg-primary)' : undefined, color: !isActive ? 'var(--text-muted)' : undefined }}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-blue-500' : ''}`} style={{ color: !isActive ? 'var(--text-primary)' : undefined }}>
                                {tab.label}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{tab.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="border rounded-[40px] p-10 transition-colors" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>

                {/* AI Profile Tab */}
                {activeTab === 'ai-profile' && (
                    <div className="space-y-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                                Sélectionnez votre Profil de Sortie
                            </h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                L'IA générera un parcours optimisé pour atteindre ce profil.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {EXIT_PROFILES.map((profile) => {
                                const Icon = IconMap[profile.icon] || Code;
                                const isSelected = selectedProfile === profile.id;
                                return (
                                    <button
                                        key={profile.id}
                                        onClick={() => setSelectedProfile(profile.id)}
                                        className={`p-6 rounded-3xl border-2 text-left transition-all group ${isSelected
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'hover:border-blue-500/30'
                                            }`}
                                        style={{
                                            backgroundColor: !isSelected ? 'var(--bg-primary)' : undefined,
                                            borderColor: !isSelected ? 'var(--border-color)' : undefined
                                        }}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${isSelected ? 'bg-blue-600 text-white' : ''
                                            }`}
                                            style={{ backgroundColor: !isSelected ? 'var(--bg-secondary)' : undefined, color: !isSelected ? 'var(--text-muted)' : undefined }}
                                        >
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h4 className={`font-bold text-lg mb-2 ${isSelected ? 'text-blue-500' : ''}`} style={{ color: !isSelected ? 'var(--text-primary)' : undefined }}>
                                            {profile.label}
                                        </h4>
                                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                            {profile.description}
                                        </p>
                                        {isSelected && (
                                            <div className="mt-4 flex items-center gap-2 text-blue-500 text-sm font-bold">
                                                <CheckCircle2 className="w-4 h-4" /> Sélectionné
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedProfile && !generatedPath && (
                            <div className="flex justify-center pt-6">
                                <button
                                    onClick={handleGeneratePath}
                                    disabled={isGenerating}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span>Génération du Parcours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            <span>Générer mon Parcours IA</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {generatedPath && (
                            <div className="mt-10 p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-3xl border border-blue-500/30">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
                                            {generatedPath.title}
                                        </h3>
                                        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                            {generatedPath.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {generatedPath.skills.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                                            <span>{generatedPath.modules.length} Modules</span>
                                            <span>•</span>
                                            <span>{generatedPath.estimatedDuration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => onPathSelected(generatedPath)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl"
                                    >
                                        Démarrer ce Parcours <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Custom Path Tab */}
                {activeTab === 'custom' && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <List className="w-10 h-10 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                            Parcours Personnalisé
                        </h2>
                        <p className="max-w-md mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Sélectionnez les modules que vous souhaitez suivre et l'IA déterminera votre profil de sortie correspondant.
                        </p>
                        <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
                            Fonctionnalité en cours de développement...
                        </p>
                    </div>
                )}

                {/* Predefined Paths Tab */}
                {activeTab === 'predefined' && (
                    <div className="space-y-8">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
                                Parcours Prédéfinis
                            </h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Formations conçues par nos experts et validées par l'industrie.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {PREDEFINED_PATHS_CATALOG.map((path) => (
                                <div
                                    key={path.id}
                                    className="group border rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all"
                                    style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                                >
                                    <div
                                        className="h-40 bg-cover bg-center relative"
                                        style={{ backgroundImage: `url(${path.image})` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute bottom-4 left-6 right-6">
                                            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                                                {path.exitProfileLabel}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
                                            {path.title}
                                        </h3>
                                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                            {path.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {path.skills?.slice(0, 4).map((skill, i) => (
                                                <span key={i} className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {path.estimatedDuration}
                                            </span>
                                            <button
                                                onClick={() => handleSelectPredefinedPath(path.id!)}
                                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                                            >
                                                S'inscrire <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PathSelectionView;
