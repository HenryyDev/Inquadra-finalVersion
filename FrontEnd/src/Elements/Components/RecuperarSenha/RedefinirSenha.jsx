import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../assets/logo.png"; // Ajuste o caminho conforme necessário
import "../../../Elements/Css/login.css"; // Certifique-se de incluir seu CSS customizado

const RedefinirSenha = () => {
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // useNavigate deve ser chamado dentro do componente

  // Função para validar a senha
  const validatePassword = (senha) => {
    // A nova expressão regular inclui os caracteres especiais #/-+*_-\|
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\/\-+*_\\|@$!%*?&])[A-Za-z\d#\/\-+*_\\|@$!%*?&]{8,}$/;
    return passwordRegex.test(senha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem");
      setMessage("");
      return;
    }

    // Verifica se a nova senha não está vazia
    if (!novaSenha) {
      setError("A senha não pode ser vazia");
      setMessage("");
      return;
    }

    // Verifica se a senha atende aos critérios de segurança
    if (!validatePassword(novaSenha)) {
      setError("A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
      setMessage("");
      return;
    }

    try {
      // Envia o token no cabeçalho da requisição (Authorization: Bearer <token>)
      await axios.post(
        "http://localhost:3000/reset/reset-senha",
        { newPassword: novaSenha },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token no cabeçalho Authorization
          },
        }
      );
      setMessage("Senha redefinida com sucesso.");
      setError(""); // Limpa qualquer erro anterior
      navigate("/login"); // Redireciona para a tela de login após redefinir a senha
    } catch (err) {
      setError("Erro ao redefinir a senha.");
      setMessage(""); // Limpa qualquer sucesso anterior
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <Link to={"/"}>
            <img src={logo} alt="Logo" width="180px" className="logo" />
          </Link>

          <h2>Redefinir Senha</h2>

          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label">
              Nova Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="novaSenha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Nova senha"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarSenha" className="form-label">
              Confirmar Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirmar nova senha"
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-login">
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedefinirSenha;
