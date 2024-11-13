function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
}

export default debounce;
