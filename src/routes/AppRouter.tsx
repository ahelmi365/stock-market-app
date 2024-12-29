import MainLayout from "@layouts/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error/Error";
import Home from "@pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/stock-market-app",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
