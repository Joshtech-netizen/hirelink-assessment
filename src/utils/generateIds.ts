export const generateApplicationId = (): string => {
  const year = new Date().getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HL-${year}-${randomStr}`;
};