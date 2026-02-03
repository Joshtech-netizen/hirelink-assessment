import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Candidate } from '../types/index';

interface HireState {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
}

export const useHireStore = create<HireState>()(
  persist(
    (set) => ({
      candidates: [],
      addCandidate: (candidate) =>
        set((state) => ({ candidates: [candidate, ...state.candidates] })),
      updateCandidate: (id, updates) =>
        set((state) => ({
          candidates: state.candidates.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
    }),
    { name: 'hirelink-storage' }
  )
);