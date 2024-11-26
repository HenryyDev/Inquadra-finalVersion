import React, { useState, useEffect } from "react";
import "../../Css/loginEseguranca.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// ModalGenérico para confirmar ações
function ModalConfirmacao({ show, onClose, onConfirm, titulo, mensagem, erro, setErro, tipo }) {
  const [senha, setSenha] = useState("");
  const [novoEmail, setNovoEmail] = useState("");  // Estado para novo e-mail

  const handleConfirm = async () => {
    try {
      if (tipo === "deletar") {
        await onConfirm(senha);  // Para desativar a conta, enviamos a senha
      } else if (tipo === "alterar-email") {
        await onConfirm(senha, novoEmail);  // Para alterar e-mail, passamos senha e novo e-mail
      }
      onClose();  // Fecha o modal após confirmação
    } catch (error) {
      setErro(error.response?.data?.message || "Erro ao processar sua solicitação.");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="exampleModalLabel"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {mensagem}
            <div className="mt-2">
              <label>Digite sua senha para continuar:</label>
              <input
                required
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-control"
              />
            </div>

            {tipo === "alterar-email" && (
              <div className="mt-2">
                <label>Novo Email:</label>
                <input
                  required
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  className="form-control"
                />
              </div>
            )}
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginEseguranca() {
  const [showModalDesativar, setShowModalDesativar] = useState(false); // Modal para desativar a conta
  const [showModalAlterarEmail, setShowModalAlterarEmail] = useState(false); // Modal para alterar e-mail
  const [erro, setErro] = useState("");
  const [data, setData] = useState({
    nome: "",
    email: "",
    userId: null,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    

    if (!token) {
      navigate("/login");
    } else {
      try {
        const tokenDecodificado = jwtDecode(token);
        setData({
          nome: tokenDecodificado.nome.split(" ")[0],
          email: tokenDecodificado.email,
          userId: tokenDecodificado.id_usuario,
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [navigate]);

  // Função para desativar a conta
  const handleDesativarConta = async (senha) => {
    const response = await axios.post("http://localhost:3000/usuario/deletar", {
      senha,
      id: data.userId,
    });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login"); // Navega para a página inicial após deletar a conta
  };

  // Função para alterar o e-mail
  const handleAlterarEmail = async (senha, novoEmail) => {
    const response = await axios.put(
      `http://localhost:3000/usuario/${data.userId}/email`,
      {
        senha,
        email: novoEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Passando o token na requisição
        }
      }
    );
    
    setData((prevData) => ({ ...prevData, email: novoEmail }));  // Atualiza o estado com o novo e-mail
    alert("E-mail alterado com sucesso!");
  };

  return (
    <>
      <div className="wrap">
        <h2>
          <Link to={"/gerenciar-conta"}>
            <span style={{ color: "#0000FF" }}>Conta</span>
          </Link>{" "}
          &#62; Login e segurança
        </h2>
        <h1 className="my-4">Login e segurança</h1>
      </div>

      <div className="wrap02">
        <div className="input">
          <div className="my-2">
            Senha
            <button className="btn btn-primary btn-seg">Atualizar</button>
          </div>
          <div className="my-4">
            Desativar Conta
            <button className="btn btn-primary btn-seg" onClick={() => setShowModalDesativar(true)}>
              Desativar
            </button>
          </div>
          <div className="my-4">
            Email
            <button className="btn btn-primary btn-seg" onClick={() => setShowModalAlterarEmail(true)}>
              Alterar E-mail
            </button>
          </div>
        </div>
      </div>

      <ModalConfirmacao
        show={showModalDesativar}
        onClose={() => setShowModalDesativar(false)}
        onConfirm={handleDesativarConta}
        titulo="Tem certeza que deseja desativar a conta?"
        mensagem="Ao desativar sua conta, você perderá acesso aos nossos serviços."
        erro={erro}
        setErro={setErro}
        tipo="deletar" // Passa o tipo para identificar a ação (deletar conta)
      />

      <ModalConfirmacao
        show={showModalAlterarEmail}
        onClose={() => setShowModalAlterarEmail(false)}
        onConfirm={handleAlterarEmail}
        titulo="Alterar Email"
        mensagem="Digite sua senha e o novo email para continuar."
        erro={erro}
        setErro={setErro}
        tipo="alterar-email" // Passa o tipo para identificar a ação (alterar e-mail)
      />
    </>
  );
}

export default LoginEseguranca;
