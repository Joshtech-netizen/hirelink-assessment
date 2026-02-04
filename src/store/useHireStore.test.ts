import { expect, test, beforeEach } from 'vitest';
import { useHireStore } from './useHireStore';

beforeEach(() => {
  // Clear the store before each test
  useHireStore.getState().candidates = [];
});

test('should add a new candidate to the store', () => {
  const { addCandidate } = useHireStore.getState();
  
  const mockCandidate: any = { id: 'HL-1', fullName: 'Joshua', stage: 'Applied' };
  addCandidate(mockCandidate);
  
  const state = useHireStore.getState();
  expect(state.candidates.length).toBe(1);
  expect(state.candidates[0].fullName).toBe('Joshua');
});