export const getScoreColor = (score) => {
  if (score >= 75) return '#C6FF00';
  if (score >= 50) return '#FFFFFF';
  return '#444444';
};

export const getScoreLabel = (score) => {
  if (score === 0) return 'ANALYSIS PENDING';
  if (score >= 75) return 'STRONG';
  if (score >= 50) return 'GOOD';
  return 'NEEDS WORK';
};
