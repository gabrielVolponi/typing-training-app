'use client'

interface TestResult {
  language: string;
  wpm: number;
  accuracy: number;
  errors: number;
  timestamp: number;
}

export const saveResult = (result: TestResult) => {
  if (typeof window === 'undefined') return;
  const results = getResults();
  results.push(result);
  window.sessionStorage.setItem('typingResults', JSON.stringify(results));
};

export const getResults = (): TestResult[] => {
  if (typeof window === 'undefined') return [];
  const results = window.sessionStorage.getItem('typingResults');
  return results ? JSON.parse(results) : [];
};

export const getAverageStats = () => {
  if (typeof window === 'undefined') return null;
  const results = getResults();
  if (results.length === 0) return null;

  const total = results.reduce(
    (acc, curr) => ({
      wpm: acc.wpm + curr.wpm,
      accuracy: acc.accuracy + curr.accuracy,
    }),
    { wpm: 0, accuracy: 0 }
  );

  return {
    averageWpm: Math.round(total.wpm / results.length),
    averageAccuracy: Math.round(total.accuracy / results.length),
    totalTests: results.length,
  };
};