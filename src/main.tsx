import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
// css
// import "@styles/global.css";
import AppRouter from "@routes/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
