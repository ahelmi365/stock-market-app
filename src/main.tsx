import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
// css
// import "@styles/global.css";
import AppRouter from "@routes/AppRouter";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
