import React, { useState } from "react";
import "../Css/NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import lupa from "../../assets/lupa.png";
import menu from "../../assets/menu.svg";

const NavBar = () => {
 
  const [login, setlogin] = useState(false); 

  return (
    <>
      <header>
        <div className="header-container">
          <Link to={"/"}>
            <img src={logo} alt="" width="96" className="logo-img" />
          </Link>
          <div className="search">
            <label htmlFor="searchInput">
              <img className="lupa" src={lupa} alt="" width="24px" />
            </label>
            <input type="text" id="searchInput" placeholder="Pesquisar" />
          </div>

          {!login && (
            <>
              <button className="login-link login01">
                <Link to={"/login"}>Login</Link>
              </button>
              <button className="login-link login02">
                <Link to={"/cadastro-usuario"}>Criar conta</Link>
              </button>
            </>
          )}

          {login && (
            <>
              <button className="login-link login02">
                <Link to={"/cadastro-anuncio"}>Anuncie aqui</Link>
              </button>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={menu} alt="Menu" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link to={"/gerenciar-conta"} className="dropdown-item">
                      Gerenciar conta
                    </Link>
                  </li>
                  <li>
                    <Link to={"/cadastro-anuncio"} className="dropdown-item">
                      Anuncie-aqui
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setlogin(false)} // Simula o logout
                    >
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
