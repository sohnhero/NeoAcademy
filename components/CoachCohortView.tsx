
import React, { useState } from 'react';
import { Users, Search, Filter, Mail, MoreHorizontal, TrendingUp, UserCheck, UserMinus } from 'lucide-react';
import { MOCK_STUDENTS } from '../constants';

interface CoachCohortViewProps {
  onStudentSelect?: (studentId: string) => void;
}

const CoachCohortView: React.FC<CoachCohortViewProps> = ({ onStudentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">Gestion de la Cohorte</h2>
          <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Suivi individuel et Engagement</p>
        </div>
      </header>

      <div className="bg-slate-900/20 border border-slate-800 rounded-[40px] overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-900/40">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher un apprenant par nom ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <button className="bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 text-xs font-bold flex items-center gap-2 hover:bg-slate-900 transition-all">
              <Filter className="w-4 h-4" /> Filtres Avancés
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-slate-800/50">
              <th className="px-10 py-6">Apprenant</th>
              <th className="px-6 py-6">Progression</th>
              <th className="px-6 py-6">Score Moyen</th>
              <th className="px-6 py-6">Dernière Activité</th>
              <th className="px-6 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-blue-600/5 transition-colors group cursor-pointer"
                onClick={() => onStudentSelect && onStudentSelect(student.id)}
              >
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                      <img src={`https://picsum.photos/seed/${student.name}/100`} alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{student.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">ID: {student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="w-32 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-blue-500" style={{ width: `${student.progress}%` }}></div>
                  </div>
                </td>
                <td className="px-6 py-6 font-mono text-sm font-bold text-blue-400">{student.score}%</td>
                <td className="px-6 py-6 text-xs text-slate-500">{student.lastActive}</td>
                <td className="px-6 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:text-blue-500 transition-colors" title="Message"><Mail className="w-4 h-4" /></button>
                    <button className="p-2 hover:text-blue-500 transition-colors" title="Stats"><TrendingUp className="w-4 h-4" /></button>
                    <button className="p-2 hover:text-blue-500 transition-colors" title="Plus"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachCohortView;
