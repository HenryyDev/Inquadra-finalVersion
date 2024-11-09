import * as React from "react";
import App from "./App"
import Login from "./pags/PageLogin";
import CadUsuario from "./pags/PageCadUsuario";
import PageGerenciarConta from "./pags/PageGerenciarConta";
import PageAnuncio from "./pags/PageAnuncio";
import PageLoginEseguranca from "./pags/PageloginEseguranca";
import PageCadAnuncio from "./pags/PageCadAnuncio";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  },
  {
    path:"/gerenciar-conta",
    element:<PageGerenciarConta/>
  },
  {
    path:"/gerenciar-conta/login-seguranca",
    element:<PageLoginEseguranca/>
  },
  {
    path:"/anuncio",
    element:<PageAnuncio/>

  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);