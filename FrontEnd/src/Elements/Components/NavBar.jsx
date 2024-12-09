import React, { useState, useEffect } from "react"; // Adicionando o useEffect
import logo from "../../assets/logo.png";
import lupa from "../../assets/lupa.png";
import menu from "../../assets/menu.svg";
import "../Css/NavBar.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom"; // Importando useNavigate do react-router-dom
import { useSearch } from "./PesquisarContext";
import axios from "axios"; // Acessando o contexto

import { ToastContainer, toast } from "react-toastify";

const NavBar = () => {
  const [login, setLogin] = useState(false); // Inicializando como false
  const [token, setToken] = useState(null); // Adicionando estado para o token
  const { handleSearch } = useSearch(); // Acessando a função handleSearch do contexto
  const [query, setQuery] = useState(""); // Estado para o termo de busca
  const navigate = useNavigate();
  const [nomeUser,setNomeUser]=useState("") // Hook para navegação programática

  // Atualiza o estado do login com base na presença do token
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      setLogin(true); // Se o token existir, usuário está logado
      setToken(storedToken); // Armazena o token no estado
    } else {
      setLogin(false); // Se não, usuário não está logado
    }
  }, []);

  // Esse efeito só será executado quando o token mudar
  useEffect(() => {
    if (token) { // Verifica se o token existe
      const tokenDecodificado = jwtDecode(token);
      const userId = tokenDecodificado.id_usuario;

      if (userId) {
        axios.get(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Envia o token no cabeçalho
          }
        })
        .then(response => {
          setNomeUser(response.data.nome.split(' ')[0]); 
        })
        .catch(error => {
          console.error('Erro ao buscar usuário:', error);
        });
      }
    }
  }, [token]); // Dependência de token, a requisição é feita quando ele muda

  const onChangeHandler = (evento) => {
    setQuery(evento.target.value); // Atualiza o valor do campo de busca
  };

  const onSubmitHandler = (evento) => {
    evento.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    handleSearch(query); // Atualiza o termo de pesquisa no contexto
    if (!query) {
      toast.error("Por favor, insira um termo para busca");
    } else {
      navigate(`/busca?termo=${query}`); // Redireciona para a página de resultados de busca com o termo
    }
  };

  const handleLogout = () => {
    // Limpa o token do armazenamento e atualiza o estado
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLogin(false); // Atualiza o estado para 'false' após o logout
    setToken(null); // Limpa o token no estado
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <>
      <ToastContainer />
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
                <img
                  className="lupa"
                  src={lupa}
                  alt="Ícone de pesquisa"
                  width="24px"
                />
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
              <p  className ='nome-user' style={{margin:"0",marginRight:"10px"}}>Bem vindo {nomeUser.length>15 ? nomeUser.substring(0, 15) + '...' : nomeUser }</p>
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
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
    </>
  );
};

export default NavBar;
