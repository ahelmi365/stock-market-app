import { ITicker } from "@customTypes/ticker";

interface ITickersResponse {
  results: ITicker[];
  status: string;
  count: number;
  next_url: string;
}

const getTickers = async (url: string): Promise<ITickersResponse> => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("HTTP Error: ", response.status, response.statusText);
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }
};

export default getTickers;
