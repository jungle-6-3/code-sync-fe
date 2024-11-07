const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;


export const timeDiff = (date1: Date, date2: Date) => {
  const diff = date1.getTime() - date2.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export const timeDiffString = (date1: Date, date2: Date) => {
  const diff = timeDiff(date1, date2);
  const { days, hours, minutes, seconds } = diff;
  let result = '';
  if (days > 0) {
    result += `${days}일 `;
  }
  if (hours > 0) {
    result += `${hours}시간 `;
  }
  if (minutes > 0) {
    result += `${minutes}분 `;
  }
  if (seconds > 0) {
    result += `${seconds}초 `;
  }
  return result;
}

export const unixtimeConvertorToKorean = (date: Date) => {
  const diff = new Date().getTime() - date.getTime();
  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH * 12) {
    return `${Math.floor(diff / MONTH)}달 전`;
  }
  return `${Math.floor(diff / (MONTH * 12))}년 전`;
}