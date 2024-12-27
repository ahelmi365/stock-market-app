// https://api.polygon.io/v3/reference/tickers?search=United States dollar&active=true&limit=100&apiKey=xxx


import { ITickersResponse } from "@customTypes/ticker";

const searchTickers = async (url: string): Promise<ITickersResponse> => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.error ||
        `HTTP Error: ${response.status} - ${response.statusText}`
    );
    // throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }
};

export default searchTickers;
