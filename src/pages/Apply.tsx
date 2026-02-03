import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useHireStore } from '../store/useHireStore';
import { generateApplicationId } from '../utils/generateId';

// 1.3 Validation Schema [cite: 18]
const schema = z.object({
  fullName: z.string().min(3, "Name is required"), // [cite: 16]
  email: z.string().email("Invalid email"), // [cite: 20]
  phone: z.string().min(10, "Phone number too short"), // [cite: 16]
  experience: z.number().min(0, "Required"), // 
  skills: z.string().min(5, "Skills required"), // 
  portfolio: z.string().url("Invalid URL").or(z.literal("")), // 
  resume: z.any().refine((files) => files?.length > 0, "PDF/DOC required") // 
});

type FormData = z.infer<typeof schema>;

export const Apply = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const addCandidate = useHireStore(s => s.addCandidate);
  
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(schema) 
  });

  // 1.2 Multi-Step Logic [cite: 14]
  const next = async () => {
    const fields = step === 1 
      ? ['fullName', 'email', 'phone'] as const 
      : ['experience', 'skills', 'portfolio'] as const;
    
    // 1.3 Step-by-step validation 
    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = (data: FormData) => {
    const id = generateApplicationId(); // 1.4 Unique ID [cite: 25]
    addCandidate({ 
      ...data, 
      id, 
      resumeName: data.resume[0].name, 
      stage: 'Applied', 
      createdAt: new Date().toISOString() 
    });
    navigate('/thank-you', { state: { id } }); // 1.4 Submission Feedback [cite: 24]
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-2 flex-1 rounded ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Personal Information [cite: 16] */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Personal Info</h2>
            <div>
              <input {...register('fullName')} placeholder="Full Name" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <input {...register('email')} placeholder="Email" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('phone')} placeholder="Phone Number" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <button type="button" onClick={next} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Next</button>
          </div>
        )}

        {/* Step 2: Experience & Skills  */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Professional Details</h2>
            <div>
              <input type="number" {...register('experience', { valueAsNumber: true })} placeholder="Years of Experience" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
            </div>
            <div>
              <textarea {...register('skills')} placeholder="Key Skills (e.g. React, PHP, CSS)" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
              {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
            </div>
            <div>
              <input {...register('portfolio')} placeholder="Portfolio Link (Optional)" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 py-3 rounded-lg font-bold">Back</button>
              <button type="button" onClick={next} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold">Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Resume Upload  */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Resume Upload</h2>
            <div className="border-2 border-dashed border-slate-200 p-8 rounded-xl text-center hover:border-blue-400 transition-colors">
              <input type="file" {...register('resume')} accept=".pdf,.doc,.docx" className="w-full cursor-pointer" />
              <p className="text-xs text-slate-500 mt-2 italic">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            {errors.resume && <p className="text-red-500 text-xs font-bold text-center">{errors.resume.message as string}</p>}
            
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 bg-slate-100 py-3 rounded-lg font-bold">Back</button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Finish Application</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};