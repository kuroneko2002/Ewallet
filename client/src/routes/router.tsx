import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "@/components/layouts/HomeLayout";

import Home from "@/pages/Home";
import Player from "@/pages/Player";
import Owner from "@/pages/Owner";

import { MY_ROUTE } from "./router.constant";
import RouterProvider from "@/providers/RouterProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.HOME,
        element: (
          <RouterProvider>
            <Home />
          </RouterProvider>
        ),
      },
    ],
  },
  {
    path: "/player",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.PLAYER,
        element: (
          <RouterProvider>
            <Player />
          </RouterProvider>
        ),
      },
    ],
  },
  {
    path: "/owner",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.OWNER,
        element: (
          <RouterProvider>
            <Owner />
          </RouterProvider>
        ),
      },
    ],
  },
]);
