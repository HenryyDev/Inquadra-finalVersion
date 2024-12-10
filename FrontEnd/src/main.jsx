import * as React from "react";
import App from "./App"
import Login from "./pags/PageLogin";
import CadUsuario from "./pags/PageCadUsuario";
import PageGerenciarConta from "./pags/PageGerenciarConta";
import PageAnuncio from "./pags/PageAnuncio";
import PageLoginEseguranca from "./pags/PageloginEseguranca";
import PageInfoPessoal from "./pags/PageInfoPessoal";
import PageCadAnuncio from "./pags/PageCadAnuncio";
import PageGerenciarReserva from "./pags/PageGerenciarReserva";
import PageAnunciosAtivos from "./pags/PageAnunciosAtivos";
import PagePerfilUser from "./pags/PagePerfilUser";
import PagePesquisa from "./pags/PagePesquisa";
import PageSolicitaRec from "./pags/PageSolicitaRec";
import PageRedefinirSenha from "./pags/PageRedefinirSenha";
import TermosCondicoes from "./Elements/Components/TermosEcondicoes";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Elements/Css/main.css"
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
    path:"/gerenciar-conta/info-pessoal",
    element:<PageInfoPessoal/>
  },
  {
    path:"/gerenciar-conta/anuncios-ativos",
    element:<PageAnunciosAtivos/>
  },
  {
    path:"/gerenciar-conta/gerenciar-reserva",
    element:<PageGerenciarReserva/>
  },
  
  {
    path:"/perfil/:id",
    element:<PagePerfilUser/>
  },
  {
    path:"/busca",
    element:<PagePesquisa/>
  },
  {
    path:"/recuperar-senha",
    element:<PageSolicitaRec/>
  },
  {
    path:"/redefinir-senha/:token",
    element:<PageRedefinirSenha/>
  },
  {
    path:"/termosEcondicoes",
    element:<TermosCondicoes/>
  },
  
  {
    path:"/anuncio/:id",
    element:<PageAnuncio/>

  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);