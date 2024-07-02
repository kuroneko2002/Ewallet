import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "@/components/layouts/HomeLayout";

import Home from "@/pages/Home";
import Player from "@/pages/Player";
import Owner from "@/pages/Owner";

import { MY_ROUTE } from "./router.constant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: "/player",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.PLAYER,
        element: <Player />,
      },
    ],
  },
  {
    path: "/owner",
    element: <HomeLayout />,
    children: [
      {
        path: MY_ROUTE.OWNER,
        element: <Owner />,
      },
    ],
  },
]);
