import { ITickersResponse } from "@customTypes/ticker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITickerState {
  responses: { [key: string]: ITickersResponse }[];
  requestUrl: string;
}
interface SetTickersPayload {
  response: ITickersResponse;
  requestUrl: string;
}
const initialState: ITickerState = {
  responses: [
    { "": { results: [], status: "", count: 0, next_url: "", request_id: "" } },
  ],
  requestUrl: "",
};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickers(state, action: PayloadAction<SetTickersPayload>) {
      const { results, status, count, next_url, request_id } =
        action.payload.response;
      state.responses.push({
        [action.payload.requestUrl]: {
          results,
          status,
          count,
          next_url,
          request_id,
        },
      });
    },
  },
});

export const { setTickers } = tickersSlice.actions;
export default tickersSlice.reducer;
