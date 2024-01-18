export const getFormattedDate = (date: number) => {
  return new Date(date).toLocaleDateString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};
