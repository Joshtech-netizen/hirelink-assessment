import type { Candidate } from '../../types';
import { Button } from '../shared/button';

interface Props {
  candidate: Candidate;
  onClose: () => void;
  onUpdate: (updates: Partial<Candidate>) => void;
}

export const ReviewModal = ({ candidate, onClose, onUpdate }: Props) => {
  // Mock offer letter logic for Section 2.4
  const handleSendOffer = () => {
    const offerBody = `
      OFFER LETTER
      --------------------------
      Candidate: ${candidate.fullName}
      Position: Fellowship Candidate
      Status: Draft Sent
      
      We are pleased to offer you a position at The Digicoast...
    `;
    alert(offerBody); // Fulfills "Mock offer letter" requirement
    onUpdate({ stage: 'Offer Sent' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Full Application</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Candidate Info (2.2) */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-400 font-bold uppercase text-[10px]">Name</p><p className="font-semibold">{candidate.fullName}</p></div>
            <div><p className="text-slate-400 font-bold uppercase text-[10px]">Years of Exp</p><p className="font-semibold">{candidate.experience}</p></div>
            <div className="col-span-2">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Portfolio Link</p>
              {candidate.portfolio ? (
                <a href={candidate.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline break-all">
                  {candidate.portfolio}
                </a>
              ) : (
                <p className="text-slate-400 italic">Not provided</p>
              )}
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Skills</p>
              <p className="font-semibold">{candidate.skills}</p>
            </div>
          </div>

          {/* Scoring & Notes (2.2) */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Score (1-5)</label>
              <input 
                type="number" min="1" max="5" 
                defaultValue={candidate.score}
                onChange={(e) => onUpdate({ score: Number(e.target.value) })}
                className="w-full p-2 border-2 rounded-lg outline-none focus:border-blue-500" 
                placeholder="Enter score (1-5)"
                title="Score (1-5)"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Notes</label>
              <textarea 
                defaultValue={candidate.notes}
                onChange={(e) => onUpdate({ notes: e.target.value })}
                className="w-full p-2 border-2 rounded-lg h-24 outline-none focus:border-blue-500" 
                placeholder="Enter notes here"
                title="Notes"
              />
            </div>
          </div>

          {/* Interview Scheduler (2.3) */}
          {candidate.stage === 'Reviewed' && (
            <div className="pt-4 border-t">
              <label className="block text-xs font-bold text-blue-600 mb-1 uppercase">Schedule Interview</label>
              <input 
                type="datetime-local" 
                className="w-full p-2 border-2 border-blue-100 rounded-lg outline-none focus:border-blue-500"
                title="Schedule Interview"
                onChange={(e) => {
                  onUpdate({ 
                    interviewDate: e.target.value, 
                    stage: 'Interview Scheduled' 
                  });
                  onClose();
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-slate-50 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          
          {candidate.stage === 'Applied' && (
            <Button onClick={() => { onUpdate({ stage: 'Reviewed' }); onClose(); }} className="flex-1">Mark Reviewed</Button>
          )}

          {/* Offer Stage (2.4) */}
          {candidate.stage === 'Interview Scheduled' && (
            <Button onClick={handleSendOffer} className="flex-1" variant="primary">Draft Offer</Button>
          )}
        </div>
      </div>
    </div>
  );
};