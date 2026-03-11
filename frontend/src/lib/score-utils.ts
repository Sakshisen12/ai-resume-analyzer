export const getScoreColor = (score: number) => {
  if (score >= 75) return '#C6FF00'
  if (score >= 50) return '#FFFFFF'
  return '#444444'
};

export const getScoreLabel = (score: number) => {
  if (score >= 75) return 'STRONG'
  if (score >= 50) return 'GOOD'
  return 'NEEDS WORK'
};
