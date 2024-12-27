import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// redux and redux persist
import { Provider } from "react-redux";
import { store, presistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
// css
// import "@styles/global.css";
import AppRouter from "@routes/AppRouter";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={presistor}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
