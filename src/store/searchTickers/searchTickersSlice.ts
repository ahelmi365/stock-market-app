import { ITickersResponse } from "@customTypes/ticker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITickerState {
  responses: { [key: string]: ITickersResponse }[];
  searchText: string;
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
};

const searchTickersSlice = createSlice({
  name: "searchTickers",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },

    setSearchTickersResult(
      state,
      action: PayloadAction<ISetSearchTickersPayload>
    ) {
      state.responses.push({
        [action.payload.searchText]: { ...action.payload.response },
      });
    },
  },
});

export const { setSearchTickersResult, setSearchText } =
  searchTickersSlice.actions;
export default searchTickersSlice.reducer;