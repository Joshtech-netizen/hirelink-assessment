import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: Props) => (
  <div className="space-y-1">
    <label className="block text-xs font-black text-slate-500 uppercase tracking-tighter">{label}</label>
    <input 
      {...props} 
      className={`w-full p-3 bg-slate-50 border-2 rounded-xl outline-none transition-all ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-blue-500'}`}
    />
    {error && <p className="text-[10px] text-red-500 font-bold pl-1 uppercase italic">{error}</p>}
  </div>
);