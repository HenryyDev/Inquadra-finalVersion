import React, { useState, useEffect } from "react";
import "../../Css/loginEseguranca.css";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ModalConfirmacao from "../Modal";



function LoginEseguranca() {
  const [showModalDesativar, setShowModalDesativar] = useState(false); // Modal para desativar a conta
  const [showModalAlterarEmail, setShowModalAlterarEmail] = useState(false); // Modal para alterar e-mail
  const [showModalAlterarSenha, setShowModalAlterarSenha] = useState(false);

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
  };
  const handleAlterarSenha = async (senha, novaSenha) => {
    const response = await axios.put(
      `http://localhost:3000/usuario/${data.userId}/senha`,
      { senhaAtual:senha,
        novaSenha:novaSenha
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Passando o token na requisição
        }
      }
    );
    toast.success("senha alterada com sucesso")
  };

  return (
    <>
    <ToastContainer/>
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
            <button className="btn btn-primary btn-seg" onClick={() => setShowModalAlterarSenha(true)}>Atualizar</button>
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
      <ModalConfirmacao
        show={showModalAlterarSenha}
        onClose={() => setShowModalAlterarSenha(false)}
        onConfirm={handleAlterarSenha}
        titulo="Alterar Senha"
        mensagem="Digite sua senha atual e a nova senha para continuar."
        erro={erro}
        setErro={setErro}
        tipo="alterar-senha" 
      />
    </>
  );
}

export default LoginEseguranca;
