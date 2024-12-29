import { ITickersResponse, IQueryParams } from "@customTypes/ticker";
import getTickers from "api/getTickers";

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

export const fetchTickers = async ({
  pageParam,
  tickersFromTheStore,
  setTickersInTheStore,
}: IQueryParams) => {
  // check if there is a response in the store with this url or not
  if (storeHasTicker(pageParam, tickersFromTheStore)) {
    console.log("Store already has this response");
    const targetResponse = tickersFromTheStore.filter(
      (response) => response[pageParam] != undefined
    );
    return targetResponse[0][pageParam];
  } else {
    // call api to get new response
    console.log("Get new ticker and add it to the store");
    const response = await getTickers(pageParam);
    setTickersInTheStore(response, pageParam);
    return response;
  }
};
