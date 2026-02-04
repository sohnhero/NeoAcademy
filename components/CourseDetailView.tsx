
import React from 'react';
import { Course } from '../types';
import { ArrowLeft, Play, CheckCircle, Eye, Clock, BookOpen, Target, Lock, Unlock } from 'lucide-react';

interface CourseDetailViewProps {
    course: Course;
    onEnroll: () => void;
    onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onEnroll, onBack }) => {
    // Determine course status
    const isNotStarted = course.progress === 0 || !course.modules.some(m => m.status !== 'not-started');
    const isInProgress = course.progress > 0 && course.progress < 100;
    const isCompleted = course.progress === 100;

    const completedModules = course.modules.filter(m => m.status === 'completed').length;
    const totalModules = course.modules.length;
    const totalDuration = course.modules.reduce((acc, m) => {
        const duration = m.duration || '0 mins';
        const mins = parseInt(duration.match(/\d+/)?.[0] || '0');
        return acc + mins;
    }, 0);

    const getButtonConfig = () => {
        if (isCompleted) {
            return {
                label: 'Revoir le Cours',
                icon: Eye,
                className: 'bg-green-600 hover:bg-green-500'
            };
        }
        if (isInProgress) {
            return {
                label: 'Reprendre',
                icon: Play,
                className: 'bg-blue-600 hover:bg-blue-500'
            };
        }
        return {
            label: 'S\'inscrire',
            icon: Play,
            className: 'bg-blue-600 hover:bg-blue-500'
        };
    };

    const buttonConfig = getButtonConfig();
    const ButtonIcon = buttonConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header with Back Button */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Retour à la bibliothèque</span>
                    </button>
                </div>
            </div>

            {/* Hero Banner */}
            <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="max-w-3xl">
                            {/* Category Badge */}
                            <div className="inline-block mb-4">
                                <span className="px-4 py-1.5 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 text-xs font-black uppercase tracking-widest">
                                    {course.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
                                {course.title}
                            </h1>

                            {/* Progress Badge */}
                            {course.progress > 0 && (
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl">
                                        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-300">{course.progress}%</span>
                                    </div>
                                    {isCompleted && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-xl">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm font-bold text-green-300">Terminé</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-slate-400 mb-8">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="font-semibold">{totalModules} modules</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-semibold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
                                </div>
                                {course.progress > 0 && (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span className="font-semibold">{completedModules}/{totalModules} complétés</span>
                                    </div>
                                )}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={onEnroll}
                                className={`${buttonConfig.className} text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-2xl active:scale-95 transition-all group`}
                            >
                                <ButtonIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {buttonConfig.label}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <Target className="w-6 h-6 text-blue-500" />
                                À propos de ce cours
                            </h2>
                            <p className="text-slate-300 leading-relaxed">
                                {course.modules[0]?.content || 'Ce cours vous permettra de maîtriser les concepts fondamentaux et avancés de la blockchain et des technologies Web3.'}
                            </p>
                        </div>

                        {/* Modules List */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-blue-500" />
                                Contenu du cours
                            </h2>
                            <div className="space-y-3">
                                {course.modules.map((module, index) => {
                                    const isLocked = module.isLocked;
                                    const isCompleted = module.status === 'completed';
                                    const isInProgress = module.status === 'in-progress';

                                    return (
                                        <div
                                            key={module.id}
                                            className={`p-5 rounded-2xl border transition-all ${isCompleted
                                                ? 'bg-green-600/10 border-green-500/30'
                                                : isInProgress
                                                    ? 'bg-blue-600/10 border-blue-500/30'
                                                    : isLocked
                                                        ? 'bg-slate-900/50 border-slate-800 opacity-60'
                                                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Module Number/Status */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCompleted
                                                    ? 'bg-green-600 text-white'
                                                    : isInProgress
                                                        ? 'bg-blue-600 text-white'
                                                        : isLocked
                                                            ? 'bg-slate-800 text-slate-600'
                                                            : 'bg-slate-800 text-slate-400'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <CheckCircle className="w-5 h-5" />
                                                    ) : isLocked ? (
                                                        <Lock className="w-5 h-5" />
                                                    ) : (
                                                        <span className="font-black text-sm">{index + 1}</span>
                                                    )}
                                                </div>

                                                {/* Module Info */}
                                                <div className="flex-1">
                                                    <h3 className={`font-bold mb-1 ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                                                        {module.title}
                                                    </h3>
                                                    <p className={`text-sm mb-3 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                                                        {module.description}
                                                    </p>

                                                    {/* Module Meta */}
                                                    <div className="flex items-center gap-4 text-xs">
                                                        <div className="flex items-center gap-1.5 text-slate-500">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{module.duration}</span>
                                                        </div>
                                                        {module.objectives && (
                                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                                <Target className="w-3.5 h-3.5" />
                                                                <span>{module.objectives.length} objectifs</span>
                                                            </div>
                                                        )}
                                                        {isCompleted && module.score && (
                                                            <div className="flex items-center gap-1.5 text-green-400 font-bold">
                                                                <CheckCircle className="w-3.5 h-3.5" />
                                                                <span>Score: {module.score}%</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Lock/Unlock Icon */}
                                                {isLocked ? (
                                                    <Lock className="w-5 h-5 text-slate-600" />
                                                ) : (
                                                    <Unlock className="w-5 h-5 text-slate-600" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats Card */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sticky top-24">
                            <h3 className="font-black text-lg mb-4">Statistiques</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Modules totaux</span>
                                    <span className="font-bold text-white">{totalModules}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Modules complétés</span>
                                    <span className="font-bold text-green-400">{completedModules}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Durée totale</span>
                                    <span className="font-bold text-white">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Progression</span>
                                    <span className="font-bold text-blue-400">{course.progress}%</span>
                                </div>
                            </div>

                            {/* CTA Button (Sticky) */}
                            <button
                                onClick={onEnroll}
                                className={`${buttonConfig.className} text-white w-full mt-6 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all group`}
                            >
                                <ButtonIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                {buttonConfig.label}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailView;
