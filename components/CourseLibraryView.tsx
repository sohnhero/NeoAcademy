import React, { useState } from 'react';
import { Course } from '../types';

interface CourseLibraryViewProps {
    courses: Course[];
    onSelectCourse: (id: string) => void;
}

const CourseLibraryView: React.FC<CourseLibraryViewProps> = ({ courses, onSelectCourse }) => {
    const [filter, setFilter] = useState<'all' | 'blockchain' | 'security'>('all');
    const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-4xl font-black tracking-tighter">Registre Éducatif</h2>
                <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
                    {(['all', 'blockchain', 'security'] as const).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            {cat === 'all' ? 'Tous' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-slate-800 border-dashed">
                    <p className="text-slate-500 font-medium">Aucun module trouvé pour ce filtre.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div key={course.id} onClick={() => onSelectCourse(course.id)} className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden hover:border-blue-500 transition-all cursor-pointer group shadow-xl">
                            <div className="h-48 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Sync: {course.progress}%</span>
                                    <button className="text-xs font-black uppercase text-blue-500">Explorer →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseLibraryView;
