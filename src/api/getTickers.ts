import { ITickersResponse } from "@customTypes/ticker";

const getTickers = async (url: string): Promise<ITickersResponse> => {
  let delay = 10000; // 10 seconds
  let response = null;
  for (let i = 0; i < 5; i++) {
    console.log("call api for number:", i + 1);
    response = await fetch(url);

    if (response.status === 429) {
      console.log("Excced rate limits");
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
