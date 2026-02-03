import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { ThankYou } from './pages/ThankYou';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-slate-900 text-white flex justify-between items-center">
        <Link to="/" className="text-xl font-black">HIRELINK</Link>
        <Link to="/admin" className="text-sm font-bold opacity-70 hover:opacity-100">Recruiter Portal</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}