import { useHireStore } from '../store/useHireStore';
import type { ApplicationStage, Candidate } from '../types';
import { useState } from 'react';

const STAGES: ApplicationStage[] = ['Applied', 'Reviewed', 'Interview Scheduled', 'Offer Sent'];

export const Admin = () => {
  const { candidates, updateCandidate } = useHireStore();
  const [selected, setSelected] = useState<Candidate | null>(null);

  return (
    <div className="flex gap-4 p-6 bg-slate-50 min-h-screen overflow-x-auto">
      {STAGES.map(stage => (
        <div key={stage} className="min-w-[280px] bg-slate-200/50 p-4 rounded-xl">
          <h3 className="font-bold text-slate-500 mb-4 px-2">{stage}</h3>
          <div className="space-y-3">
            {candidates.filter(candidate => candidate.stage === stage).map(candidate => (
              <button
                type="button"
                key={candidate.id}
                onClick={() => setSelected(candidate)}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer border-l-4 border-blue-500 hover:shadow-md transition-shadow text-left w-full"
              >
                <p className="font-bold">{candidate.fullName}</p>
                <p className="text-sm text-gray-500">{candidate.email}</p>
                {candidate.score && <span className="text-xs bg-yellow-100 px-2 py-1 rounded">Score: {candidate.score}/5</span>}
              </button>
            ))}
          </div>
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{selected.fullName}</h2>
            <div className="space-y-4">
              <input type="number" placeholder="Score (1-5)" className="w-full p-2 border rounded" onChange={e => updateCandidate(selected.id, { score: Number(e.target.value) })} />
              <textarea placeholder="Review Notes" className="w-full p-2 border rounded" onChange={e => updateCandidate(selected.id, { notes: e.target.value })} />
              
              {selected.stage === 'Reviewed' && (
                <input type="datetime-local" placeholder="Interview Date & Time" className="w-full p-2 border rounded" onChange={e => { updateCandidate(selected.id, { interviewDate: e.target.value, stage: 'Interview Scheduled' }); setSelected(null); }} />
              )}
              
              <div className="flex gap-2">
                <button onClick={() => setSelected(null)} className="flex-1 bg-gray-100 py-2 rounded-lg font-bold">Close</button>
                {selected.stage === 'Applied' && <button onClick={() => { updateCandidate(selected.id, { stage: 'Reviewed' }); setSelected(null); }} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold">Mark Reviewed</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};