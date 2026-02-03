import { useHireStore } from '../store/useHireStore';
import type { ApplicationStage, Candidate } from '../types';
import { useState } from 'react';

const STAGES: ApplicationStage[] = ['Applied', 'Reviewed', 'Interview Scheduled', 'Offer Sent'];

export const Admin = () => {
  const { candidates, updateCandidate } = useHireStore();
  const [selected, setSelected] = useState<Candidate | null>(null);

  // 2.4 Offer Stage Logic
  const handleSendOffer = (candidate: Candidate) => {
    const mockOffer = `
      OFFER LETTER
      --------------------------
      Candidate: ${candidate.fullName}
      ID: ${candidate.id}
      Status: Fellowship Offer Sent
      
      We are pleased to extend an offer for the Fellowship program...
    `;
    alert(mockOffer); // Section 2.4: Mock offer letter requirement
    updateCandidate(candidate.id, { stage: 'Offer Sent' });
    setSelected(null);
  };

  return (
    <div className="flex gap-4 p-6 bg-slate-50 min-h-screen overflow-x-auto">
      {/* 2.1 Pipeline Board */}
      {STAGES.map(stage => (
        <div key={stage} className="min-w-70 bg-slate-200/50 p-4 rounded-xl">
          <h3 className="font-bold text-slate-500 mb-4 px-2 uppercase text-xs tracking-wider">{stage}</h3>
          <div className="space-y-3">
            {candidates.filter(candidate => candidate.stage === stage).map(candidate => (
              <button
                type="button"
                key={candidate.id}
                onClick={() => setSelected(candidate)}
                className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow text-left w-full group"
              >
                <p className="font-bold group-hover:text-blue-600 transition-colors">{candidate.fullName}</p>
                <p className="text-xs text-gray-400 font-mono mb-2">{candidate.id}</p>
                {candidate.score && (
                  <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                    Score: {candidate.score}/5
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 2.2 Candidate Review Panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-black text-slate-800">{selected.fullName}</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="space-y-6">
              {/* Full Application Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Email</p>
                  <p className="font-medium truncate">{selected.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Phone</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Portfolio Link</p>
                  {selected.portfolio ? (
                    <a href={selected.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium truncate block">
                      {selected.portfolio}
                    </a>
                  ) : (
                    <p className="text-slate-400 italic">No portfolio provided</p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Skills</p>
                  <p className="font-medium">{selected.skills}</p>
                </div>
              </div>

              {/* 2.2 Score & Notes */}
              <div className="pt-4 border-t space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Score (1-5)</label>
                  <input 
                    type="number" min="1" max="5"
                    placeholder="Enter score between 1-5"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                    defaultValue={selected.score}
                    onChange={e => updateCandidate(selected.id, { score: Number(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Internal Notes</label>
                  <textarea 
                    placeholder="Add your review notes here..."
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    defaultValue={selected.notes}
                    onChange={e => updateCandidate(selected.id, { notes: e.target.value })} 
                  />
                </div>
              </div>
              
              {/* 2.3 Interview Scheduler */}
              {selected.stage === 'Reviewed' && (
                <div className="pt-4 border-t">
                  <label className="block text-xs font-bold text-blue-600 mb-1 uppercase">Schedule Interview</label>
                  <input 
                    type="datetime-local" 
                    placeholder="Select interview date and time"
                    className="w-full p-2 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                    onChange={e => { 
                      updateCandidate(selected.id, { interviewDate: e.target.value, stage: 'Interview Scheduled' }); 
                      setSelected(null); 
                    }} 
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Selecting a date will move candidate to Interview stage.</p>
                </div>
              )}

              {/* 2.4 Offer Stage */}
              {selected.stage === 'Interview Scheduled' && (
                <div className="pt-4 border-t">
                  <button 
                    onClick={() => handleSendOffer(selected)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    Draft & Send Offer Letter
                  </button>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <button onClick={() => setSelected(null)} className="flex-1 bg-slate-100 py-2 rounded-lg font-bold">Close</button>
                {selected.stage === 'Applied' && (
                  <button 
                    onClick={() => { updateCandidate(selected.id, { stage: 'Reviewed' }); setSelected(null); }} 
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold"
                  >
                    Mark Reviewed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};