import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Biblioteca para requisições HTTP
import logo from "../../../assets/logo.png";
import "../../../Elements/Css/login.css";

const SolicitarRecuperacaoSenha = () => {
  const [email, setEmail] = useState(""); // Estado para o e-mail
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
  const navigate = useNavigate(); // Para redirecionar após o envio do e-mail

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/reset/esqueceu-senha", {
        email,
      });

      setSuccessMessage("Instruções de recuperação de senha foram enviadas para seu e-mail.");
      setError(""); // Limpa qualquer erro anterior
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao solicitar recuperação de senha. Tente novamente.");
      setSuccessMessage(""); // Limpa qualquer sucesso anterior
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                Insira o e-mail cadastrado para receber as instruções.
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-login">
              Enviar Solicitação
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SolicitarRecuperacaoSenha;
