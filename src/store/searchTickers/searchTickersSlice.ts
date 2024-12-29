import { IHistorySearch, ITickersResponse } from "@customTypes/ticker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_NUMBER_OF_SEARCH_RESPONSES } from "utils/consts";

interface ITickerState {
  responses: { [key: string]: ITickersResponse }[];
  searchText: string;
  historySearch: IHistorySearch;
}
interface ISetSearchTickersPayload {
  searchText: string;
  response: ITickersResponse;
}
const initialState: ITickerState = {
  responses: [
    { "": { results: [], status: "", count: 0, next_url: "", request_id: "" } },
  ],
  searchText: "",
  historySearch: {},
};

const searchTickersSlice = createSlice({
  name: "searchTickers",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      const totalnumberOfResponses = state.responses.length;
      if (
        action.payload.length > 0 &&
        !state.historySearch[action.payload] &&
        totalnumberOfResponses <= MAX_NUMBER_OF_SEARCH_RESPONSES
      ) {
        state.historySearch[action.payload] = 0;
      }
    },

    setSearchTickersResult(
      state,
      action: PayloadAction<ISetSearchTickersPayload>
    ) {
      state.responses.push({
        [action.payload.searchText]: { ...action.payload.response },
      });
      state.historySearch[state.searchText] += 1;
    },
  },
});

export const { setSearchTickersResult, setSearchText } =
  searchTickersSlice.actions;
export default searchTickersSlice.reducer;
