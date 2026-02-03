import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { ThankYou } from './pages/ThankYou';
import { Admin } from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-2xl font-black tracking-tighter">HIRELINK</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-400">Careers</Link>
          <Link to="/admin" className="bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-700">Recruiter Login</Link>
        </div>
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
export default App;