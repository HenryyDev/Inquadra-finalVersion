import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para requisições HTTP
import logo from "../../../assets/logo.png";
import "../../../Elements/Css/login.css";
import ocultar from "../../../assets/ocultar.png";
import ver from "../../../assets/ver.png";

const Login = () => {
  const [viewSenha, setViewSenha] = useState(true);
  const [values, setValues] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate(); // Para redirecionar após o login bem-sucedido

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: values.email, 
        senha: values.senha,
      });

      const { token } = response.data;

      // Armazena o token no localStorage ou sessionStorage
      if (values.lembrar) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Redireciona para a página principal ou dashboard
      navigate("/");
      console.log(token)
    } catch (error) {
      setError(
        error.response?.data?.message || "Erro ao fazer login. Tente novamente."
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <Link to={"/"}>
              <img src={logo} alt="Logo" width="180px" className="logo" />
            </Link>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <div id="emailHelp" className="form-text">
                Nunca compartilharemos seu e-mail com mais ninguém.
              </div>
            </div>

            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="senha" className="form-label">
                Senha
              </label>

              <div className="senha">
                <input
                  type={viewSenha ? "password" : "text"}
                  style={{ width: "100%" }}
                  className="form-control"
                  id="senha"
                  value={values.senha}
                  onChange={(e) =>
                    setValues({ ...values, senha: e.target.value })
                  }
                />
                <img
                  src={viewSenha ? ver : ocultar}
                  alt="Ícone de visibilidade"
                  width="40px"
                  height="40px"
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setViewSenha((estado) => !estado)}
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={values.lembrar}
                onChange={(e) =>
                  setValues({ ...values, lembrar: e.target.checked })
                }
              />
              <label className="salvar-senha" htmlFor="rememberMe">
                Lembrar de mim
              </label>
              <p className="txt">
                Não possui conta?
                <Link to={"/Cadastro-usuario"}>
                  <span style={{ color: " #0000FF" }}> Criar conta</span>
                </Link>
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-login">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
