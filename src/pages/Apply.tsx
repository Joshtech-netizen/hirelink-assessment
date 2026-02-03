import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useHireStore } from '../store/useHireStore';
import { generateApplicationId } from '../utils/generateId';

const schema = z.object({
  fullName: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number too short"),
  experience: z.number().min(0, "Required"),
  skills: z.string().min(5, "Skills required"),
  resume: z.any().refine((files) => files?.length > 0, "PDF/DOC required")
});

export const Apply = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const addCandidate = useHireStore(s => s.addCandidate);
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const next = async () => {
    const fields = step === 1 ? ['fullName', 'email', 'phone'] as const : ['experience', 'skills'] as const;
    if (await trigger(fields)) setStep(step + 1);
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    const id = generateApplicationId();
    addCandidate({ ...data, id, resumeName: data.resume[0].name, stage: 'Applied', createdAt: new Date().toISOString() });
    navigate('/thank-you', { state: { id } });
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => <div key={i} className={`h-2 flex-1 rounded ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`} />)}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold">Personal Info</h2>
            <input {...register('fullName')} placeholder="Full Name" className="w-full p-3 border rounded" />
            <input {...register('email')} placeholder="Email" className="w-full p-3 border rounded" />
            <input {...register('phone')} placeholder="Phone" className="w-full p-3 border rounded" />
            <button type="button" onClick={next} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold">Experience</h2>
            <input type="number" {...register('experience', { valueAsNumber: true })} placeholder="Years" className="w-full p-3 border rounded" />
            <textarea {...register('skills')} placeholder="Skills" className="w-full p-3 border rounded" />
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 py-3 rounded-lg">Back</button>
              <button type="button" onClick={next} className="flex-1 bg-blue-600 text-white py-3 rounded-lg">Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold">Upload Resume</h2>
            <input type="file" {...register('resume')} accept=".pdf,.doc,.docx" className="w-full p-3 border rounded" />
            <p className="text-xs text-gray-500">{errors.resume?.message as string}</p>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Finish Application</button>
          </>
        )}
      </form>
    </div>
  );
};