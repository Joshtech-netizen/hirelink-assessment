import type { Job } from '../../types';
import { Link } from 'react-router-dom';

export const JobCard = ({ job }: { job: Job }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-black text-slate-800">{job.title}</h3>
        <p className="text-blue-600 font-bold text-sm tracking-wide">{job.location}</p>
      </div>
      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Full Time</span>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed mb-6">{job.description}</p>
    <Link 
      to={`/apply/${job.id}`} 
      className="inline-block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
    >
      Apply for this position
    </Link>
  </div>
);