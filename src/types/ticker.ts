export interface ITicker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  active: boolean;
  currency_symbol: string;
  currency_name: string;
  base_currency_symbol: string;
  base_currency_name: string;
  last_updated_utc: string;
}

export interface ITickersResponse {
  results: ITicker[];
  status: string;
  count: number;
  next_url: string;
  request_id: string;
}

export interface IQueryParams {
  pageParam: string;
  tickersFromTheStore: { [key: string]: ITickersResponse }[];
  setTickersInTheStore: (response: ITickersResponse, pageParam: string) => void;
}


export interface IHistorySearch {
  [key: string]: number;
}