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
    userId: null,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        // Decodificando o token
        const tokenDecodificado = jwtDecode(token);
        const userId = tokenDecodificado.id_usuario;

        // Atualizando apenas o id no estado
        setData((prevData) => ({
          ...prevData,
          userId: userId,
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

  // Função para desativar a conta
  const handleDesativarConta = async (senha) => {
    if (!senha) {
        console.error("A senha não foi fornecida.");
        return;
    }

    try {
        const response = await axios.delete(
            `http://localhost:3000/users/${data.userId}`,  // A URL da requisição
            {
                data: { senha }, // Passando a senha no corpo da requisição
                headers: {
                    Authorization: `Bearer ${token}`,  // Passando o token na requisição
                }
            }
        );

        // Se a resposta for bem-sucedida
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");  // Navega para a página de login após desativar a conta
    } catch (error) {
        console.error("Erro ao desativar conta:", error);
        // Lidar com erros aqui
    }
};

  

 
  const handleAlterarSenha = async (senha, novaSenha) => {
    const response = await axios.put(
      `http://localhost:3000/users/senha/${data.userId}`,
      { senha:senha,
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
