import React, { useState, useEffect } from "react";  // Adicionando o useEffect
import logo from "../../assets/logo.png";
import lupa from "../../assets/lupa.png";
import menu from "../../assets/menu.svg";
import "../Css/NavBar.css";
import { useNavigate, Link } from "react-router-dom"; // Importando useNavigate do react-router-dom
import { useSearch } from "./PesquisarContext"; // Acessando o contexto

const NavBar = () => {
  const [login, setLogin] = useState(false);  // Inicializando como false
  const { handleSearch } = useSearch(); // Acessando a função handleSearch do contexto
  const [query, setQuery] = useState(""); // Estado para o termo de busca
  const navigate = useNavigate(); // Hook para navegação programática

  // Atualiza o estado do login com base na presença do token
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setLogin(true); // Se o token existir, usuário está logado
    } else {
      setLogin(false); // Se não, usuário não está logado
    }
  }, []); // Esse efeito só será executado uma vez quando o componente for montado
  
  const onChangeHandler = (evento) => {
    setQuery(evento.target.value); // Atualiza o valor do campo de busca
  };

  const onSubmitHandler = (evento) => {
    evento.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    handleSearch(query); // Atualiza o termo de pesquisa no contexto
    navigate(`/busca?termo=${query}`); // Redireciona para a página de resultados de busca com o termo
  };

  const handleLogout = () => {
    // Limpa o token do armazenamento e atualiza o estado
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/")
    setLogin(false); // Atualiza o estado para 'false' após o logout
  };

  return (
    <header>
      <div className="header-container">
        <Link to={"/"}>
          <img src={logo} alt="" width="96" className="logo-img" />
        </Link>
        <div className="search">
          <form onSubmit={onSubmitHandler}>
            <input 
              type="text" 
              id="searchInput" 
              value={query} 
              onChange={onChangeHandler} 
              placeholder="Pesquisar"
            />
            <button type="submit" className="btn">
              <img className="lupa" src={lupa} alt="Ícone de pesquisa" width="24px" />
            </button>
          </form>
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
                    onClick={handleLogout} // Função de logout
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
  );
};

export default NavBar;
