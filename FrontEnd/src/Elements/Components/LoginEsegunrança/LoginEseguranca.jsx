import React, { useState, useEffect, useRef } from "react";
import "../../Css/loginEseguranca.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginEseguranca() {
  const [showModal, setShowModal] = useState(false);
  const [senha, setSenha] = useState(""); 
  const [erro, setErro] = useState("");
  const [data, setData] = useState({
    nome: "",
    email: "",
    userId: null
  });

  const modalRef = useRef(null);  // Usando useRef para a referência do modal
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSenha("");
    setErro("");
  };

  useEffect(() => {
    if (showModal && modalRef.current) {
      const firstInput = modalRef.current.querySelector("input");
      if (firstInput) firstInput.focus();  // Coloca o foco no campo de senha
    }
  }, [showModal]);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        // Decodificando o token
        const tokenDecodificado = jwtDecode(token);
        const primeiroNome = tokenDecodificado.nome.split(" ")[0];
        const nomeFormatado = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

        setData((prevData) => ({
          ...prevData, 
          userId: tokenDecodificado.id_usuario,
          nome: nomeFormatado,
          email: tokenDecodificado.email,
        }));

        const currentTime = Date.now() / 1000; 
        if (tokenDecodificado.exp && tokenDecodificado.exp < currentTime) {
          console.log("Token expirado");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [navigate]);

  const handleConfirm = async () => {
    try {
      const response = await axios.post("http://localhost:3000/usuario/deletar", {
        senha,
        id: data.userId,
      });
      localStorage.removeItem("token");
    sessionStorage.removeItem("token");
      navigate("/login");  // Navega para a página inicial após deletar a conta
    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message || "Erro desconhecido.");
      } else {
        console.error("Erro ao excluir conta:", error);
        setErro("Erro ao processar sua solicitação.");
      }
    }
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
        <div>
          <h1 className="my-4">Login e segurança</h1>
        </div>
      </div>

      <div className="wrap02">
        <div className="input">
          <div className="my-2">
            Senha
            <button className="btn btn-primary btn-seg">Atualizar</button>
          </div>
          <div className="my-4">
            Desativar Conta
            <button
              className="btn btn-primary btn-seg"
              onClick={handleOpenModal}
            >
              Desativar
            </button>
          </div>
          <div className="my-4">
            Email
            <button className="btn btn-primary btn-seg">Atualizar</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="exampleModalLabel"
          role="dialog"
          inert={showModal}  // Atribuindo um valor booleano ao inert
          ref={modalRef}  // Usando a referência para o modal
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Tem certeza que deseja desativar a conta?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                Ao desativar sua conta, você perderá acesso aos nossos serviços.
                <div className="mt-2">
                  Digite sua senha para continuar:{" "}
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              {erro && <p style={{ color: "red" }}>{erro}</p>}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginEseguranca;
