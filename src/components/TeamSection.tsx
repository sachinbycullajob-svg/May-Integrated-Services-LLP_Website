import React, { useState } from 'react';
import { ThemeMode, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { 
  Users, 
  Search, 
  Sparkles, 
  Mail, 
  Code2, 
  ShieldCheck, 
  X, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface TeamSectionProps {
  themeMode: ThemeMode;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ themeMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const departments = ['All', 'Leadership', 'Executive', 'Tech & Data', 'Support', 'Design & Content', 'Finance'];

  const filteredTeam = TEAM_MEMBERS.filter((member) => {
    const matchesDept = selectedDept === 'All' || member.department === selectedDept;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <section id="team" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Operational Talent & Vibe Coders</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Meet Our <span className="text-sky-400">Specialist Team</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            14 dedicated professionals driving marketplace growth, customer care, IT support, financial compliance, and AI vibe-code innovation for May Integrated Services LLP.
          </p>
        </div>

        {/* Search & Department Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Department Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  selectedDept === dept
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                    : themeMode === 'dark'
                      ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{dept}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team member..."
              className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs transition-all ${
                themeMode === 'dark'
                  ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500'
                  : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-sm'
              }`}
            />
          </div>

        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeam.map((member) => (
            <Card3DTilt key={member.id}>
              <div 
                onClick={() => setSelectedMember(member)}
                className={`h-full p-6 rounded-3xl border flex flex-col justify-between cursor-pointer group transition-all duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/40 hover:bg-slate-900'
                    : 'bg-white border-slate-200 shadow-lg hover:border-sky-400'
                }`}
              >
                <div>
                  {/* Avatar & Badges */}
                  <div className="relative mb-4 flex items-center justify-between">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-sky-500/30 group-hover:border-sky-400 transition-colors shadow-md">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {member.isVibeCoder ? (
                      <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center space-x-1 animate-pulse">
                        <Code2 className="w-3 h-3 text-amber-400" />
                        <span>Vibe Coder</span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold">
                        {member.department}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-extrabold group-hover:text-sky-400 transition-colors ${
                    themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-sky-400 mb-2 leading-snug">
                    {member.role}
                  </p>

                  <p className="text-[11px] text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {member.bio}
                  </p>
                </div>

                <div>
                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-[10px] text-sky-400 font-bold">+{member.skills.length - 3}</span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center text-sky-400 font-medium">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified Team Member
                    </span>
                    <span className="font-semibold text-slate-300">May Integrated</span>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>

      {/* Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
            themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-500/40 shadow-lg"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-extrabold">{selectedMember.name}</h3>
                  {selectedMember.isVibeCoder && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                      Vibe Coder AI
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-sky-400 mt-0.5">{selectedMember.role}</p>
                <p className="text-xs text-slate-400">{selectedMember.department} Department</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {selectedMember.bio}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Competencies</h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedMember.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl text-xs bg-slate-800 text-sky-300 border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-300">Department:</span>
              <span className="font-semibold text-sky-400">{selectedMember.department}</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
