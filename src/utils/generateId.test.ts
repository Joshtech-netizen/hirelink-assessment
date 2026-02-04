import { expect, test } from 'vitest';
import { generateApplicationId } from './generateId';

test('generates ID with correct prefix and length', () => {
  const id = generateApplicationId();
  
  // Checks for HL-2026- prefix
  expect(id).toMatch(/^HL-2026-[A-Z0-9]{4}$/);
});

test('generates unique IDs on consecutive calls', () => {
  const id1 = generateApplicationId();
  const id2 = generateApplicationId();
  expect(id1).not.toBe(id2);
});