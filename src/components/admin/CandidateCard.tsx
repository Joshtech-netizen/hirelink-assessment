import type { Candidate } from '../../types';

interface Props {
  candidate: Candidate;
  onClick: () => void;
}

export const CandidateCard = ({ candidate, onClick }: Props) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-start">
      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
        {candidate.fullName}
      </h4>
      {candidate.score && (
        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
          ★ {candidate.score}
        </span>
      )}
    </div>
    <p className="text-xs text-slate-500 mt-1">{candidate.id}</p>
    <div className="mt-3 flex items-center text-[11px] text-slate-400 font-medium">
      <span>Exp: {candidate.experience} yrs</span>
      <span className="mx-2">•</span>
      <span className="truncate">{candidate.resumeName}</span>
    </div>
  </div>
);