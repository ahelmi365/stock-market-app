import { ITickersResponse } from "@customTypes/ticker";

// Custom debounce function
export function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const sliceLongText = (text: string) => {
  if (text.length > 40) {
    const slicedText = text.slice(0, 40);
    return slicedText + "...";
  }
  return text;
};

export const storeHasTicker = (
  requestId: string,
  tickerRespose: { [key: string]: ITickersResponse }[]
) => {
  const results = tickerRespose?.map((ticker) => {
    if (ticker[requestId]) {
      return true;
    }
  });
  return results.some((result) => result === true);
};
