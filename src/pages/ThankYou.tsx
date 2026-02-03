import { useLocation, Link } from 'react-router-dom';

export const ThankYou = () => {
  const { state } = useLocation();
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-black text-green-600 mb-4">Success!</h1>
      <p className="text-xl text-gray-600 mb-8">Your application has been received.</p>
      <div className="inline-block bg-slate-100 p-6 rounded-xl border-2 border-dashed border-slate-300">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Application ID</p>
        <p className="text-4xl font-mono font-bold text-blue-700">{state?.id || 'ERROR'}</p>
      </div>
      <Link to="/" className="block mt-10 text-blue-600 underline">Back to Jobs</Link>
    </div>
  );
};