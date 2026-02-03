import type { Candidate } from '../../types';
import { Button } from '../shared/button';

interface Props {
  candidate: Candidate;
  onClose: () => void;
  onUpdate: (updates: Partial<Candidate>) => void;
}

export const ReviewModal = ({ candidate, onClose, onUpdate }: Props) => (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Candidate Review</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-400 font-bold uppercase text-[10px]">Full Name</p><p className="font-semibold">{candidate.fullName}</p></div>
          <div><p className="text-slate-400 font-bold uppercase text-[10px]">Email</p><p className="font-semibold">{candidate.email}</p></div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Evaluation Score (1-5)</label>
            <input 
              type="number" min="1" max="5" 
              placeholder="Enter score between 1-5"
              defaultValue={candidate.score}
              onChange={(e) => onUpdate({ score: Number(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Internal Decision Notes</label>
            <textarea 
              placeholder="Enter internal decision notes"
              defaultValue={candidate.notes}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
        {candidate.stage === 'Applied' && (
          <Button onClick={() => { onUpdate({ stage: 'Reviewed' }); onClose(); }} className="flex-1">Complete Review</Button>
        )}
      </div>
    </div>
  </div>
);