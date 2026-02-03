import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Candidate } from '../types/types';

interface HireState {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  updateStage: (id: string, stage: Candidate['stage']) => void;
}

export const useHireStore = create<HireState>()(
  persist(
    (set) => ({
      candidates: [],
      addCandidate: (candidate) => 
        set((state) => ({ candidates: [...state.candidates, candidate] })),
      updateStage: (id, stage) =>
        set((state) => ({
          candidates: state.candidates.map((c) => 
            c.id === id ? { ...c, stage } : c
          ),
        })),
    }),
    { name: 'hirelink-storage' } // Persistence requirement [cite: 54]
  )
);