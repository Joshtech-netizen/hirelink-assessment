import { MOCK_JOBS } from '../types';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="max-w-5xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-black mb-8">Current Openings</h1>
    <div className="grid md:grid-cols-2 gap-6">
      {MOCK_JOBS.map(job => (
        <div key={job.id} className="p-6 bg-white rounded-xl shadow-sm border hover:border-blue-500 transition-all">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-blue-600 font-medium mb-2">{job.location}</p>
          <p className="text-gray-600 mb-6">{job.description}</p>
          <Link to={`/apply/${job.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Apply Now</Link>
        </div>
      ))}
    </div>
  </div>
);