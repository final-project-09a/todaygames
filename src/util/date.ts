export const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatRelativeTime = (time: number) => {
  const currentTime = new Date().getTime();
  const milliSeconds: number = currentTime - time;
  const seconds = Math.floor(milliSeconds / 1000);
  if (seconds < 60) return `방금 전`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
};
