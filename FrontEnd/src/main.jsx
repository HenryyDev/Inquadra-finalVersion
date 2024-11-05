import * as React from "react";
import App from "./App"
import Login from "./pags/Login";
import CadAnuncio from "./pags/CadAnuncio";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path:"/cadastro-anuncio",
    element:<CadAnuncio/>

  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);