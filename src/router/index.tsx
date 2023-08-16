import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages";
import TypePage from "../pages/type/type.tsx";
import { MainLayout } from "../components/layout.tsx";
import MachinePage from "../pages/type/_id.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/type",
        element: <TypePage />,
      },

      { path: "type/:id", element: <MachinePage /> },
    ],
  },
]);
