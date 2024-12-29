import { ITickersResponse } from "@customTypes/ticker";

const getTickers = async (url: string): Promise<ITickersResponse> => {
  let delay = 10000; // 10 seconds
  let response = null;
  for (let i = 0; i <= 5; i++) {
    response = await fetch(url);
    
    if (response.status === 429) {
      console.log("Exceeded rate limits");
      console.log("retry calling api number:", i + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } else {
      return response.json(); // Successful response
    }
  }
  const errorData = await response?.json();
  throw new Error(
    errorData.error ||
      `HTTP Error: ${response?.status} - ${response?.statusText}`
  );
};

export default getTickers;
