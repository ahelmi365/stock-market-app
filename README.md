# Stock Market App

## Overview

This is a stock market application built using React (for web) that displays stocks listed on the Nasdaq exchange. Users can explore stocks, search for specific stocks, and view their details. The app integrates with the Polygon.io Stocks API to fetch real-time stock data.

## Features

- **Splash Screen**: Displays the Nasdaq logo and developer's name.
- **Explore Screen**:
  - Lists all stocks with their ticker and full name.
  - Infinite scrolling to load more stocks.
  - Search functionality that triggers while typing to find specific stocks.

## Technologies Used

- React
- TypeScript
- State Management (e.g., Redux, Redux-Toolkit, and redux-persist)
- Tanstack/react-query
- Bootstrap
- Unit Testing (e.g., Vitest, Jest, React Testing Library)
- Vite
- Responsive Design
- Polygon.io Stocks API

## Getting Started

### Prerequisites

- Node.js (v22.12.0)
- npm or yarn
- API Key from [Polygon.io](https://polygon.io/) (To be added in the `.env` file)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahelmi365/stock-market-app.git
   cd stock-market-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Polygon.io API key:

   ```bash
   VITE_API_KEY=your_api_key_here
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

## Usage

- Upon launching the app, the splash screen will be displayed.
- After the splash screen, the Explore screen will show a list of stocks.
- Scroll down to load more stocks or use the search bar to find a specific stock.

## Testing

- To run the unit tests, use the following command

```bash
npm run test
```

## Caching:

The app implements caching of API responses to reduce redundant requests and enhance performance as follows:

1. Caching Responses on the Home Page While Scrolling:

   - A maximum of 10 responses from the API will be cached.
   - Each of these cached responses will contain up to 10 tickers.
   - This results in a total of 100 tickers being cached.

2. Caching Responses Based on Search Text:

   - We will cache responses for a maximum of 500 tickers to ensure broad coverage of various search terms.
   - A maximum of 5 API responses will be cached for each unique search term.
   - If the user scrolls more than 5 times on the same page for the same search term, no additional caching will occur.
   - The total number of cached API requests across all search terms is limited to 50.
   - Each request can return a maximum of 10 tickers.
   - Therefore, the maximum number of tickers that can be cached is 50 (requests) \* 10 (tickers) = 500 tickers.

3. Flexibility in Caching Strategies:

   - These caching strategies can be adjusted based on specific requirements.

4. Resetting Cache on User Actions:

   - The cache should be reset in response to user actions, such as logging out or logging in.

## Error Handling

- The application includes error handling for various scenarios, including rate limiting from the API.

## Live Demo

[Link to Live Demo](https://ahelmi365.github.io/stock-market-app/)
