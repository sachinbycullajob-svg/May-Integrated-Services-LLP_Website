import React, { useState } from 'react';
import { ThemeMode, JobOpening } from '../../types';
import { JOB_OPENINGS, COMPANY_INFO } from '../../data/companyData';
import { Briefcase, MapPin, CheckCircle2, ArrowRight, Send, X } from 'lucide-react';

interface CareersPageProps {
  themeMode: ThemeMode;
}

export const CareersPage: React.FC<CareersPageProps> = ({ themeMode }) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverNote, setCoverNote] = useState('');

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/job-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName,
          applicantEmail,
          applicantPhone,
          jobTitle: selectedJob?.title,
          department: selectedJob?.department,
          message: coverNote
        })
      });
    } catch (err) {
      console.error('Error posting job application:', err);
    } finally {
      setIsSubmitting(false);
      setIsApplied(true);
      setTimeout(() => {
        setIsApplied(false);
        setSelectedJob(null);
        setApplicantName('');
        setApplicantEmail('');
        setApplicantPhone('');
        setCoverNote('');
      }, 4000);
    }
  };

  return (
    <section id="careers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Join May Integrated Services LLP</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          themeMode === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Build the Future of <span className="text-sky-400">Global E-Commerce</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Join our team of e-commerce specialists, data analysts, and vibe coders at our Mumbai command center. Applications are delivered directly to <span className="text-sky-400 font-semibold">{COMPANY_INFO.email}</span>.
        </p>
      </div>

      {/* Openings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {JOB_OPENINGS.map((job) => (
          <div
            key={job.id}
            className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
              themeMode === 'dark'
                ? 'bg-slate-900/90 border-slate-800 hover:border-sky-500/40'
                : 'bg-white border-slate-200 shadow-xl hover:border-sky-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  {job.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-sky-400" /> {job.location}
                </span>
              </div>

              <h3 className={`text-xl font-extrabold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {job.title}
              </h3>
              <p className="text-xs font-semibold text-sky-400 mb-3">{job.department}</p>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {job.description}
              </p>
            </div>

            <div>
              <button
                onClick={() => setSelectedJob(job)}
                className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>View Requirements & Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
            themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-extrabold mb-1">{selectedJob.title}</h3>
            <p className="text-xs font-bold text-sky-400 mb-4">{selectedJob.department} • {selectedJob.location}</p>

            {isApplied ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you {applicantName}. Your application has been sent to <strong>{COMPANY_INFO.email}</strong> and saved to our Google Sheet tab "Job Applications". Our HR team will reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requirements</h4>
                <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                  {selectedJob.requirements.map((r, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+91 9819568545"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Cover Note / Experience</label>
                  <textarea
                    rows={3}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Brief summary of your relevant experience..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Candidate Application'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
