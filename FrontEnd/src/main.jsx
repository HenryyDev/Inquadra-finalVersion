import * as React from "react";
import App from "./App"
import Login from "./pags/Login";
import CadUsuario from "./pags/CadUsuario";
import PageCadAnuncio from "./pags/CadAnuncio";
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
    element:<PageCadAnuncio/>

  },
  {
    path:"/cadastro-usuario",
    element:<CadUsuario/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);