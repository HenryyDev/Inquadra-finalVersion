import "../../Css/GerenciarConta.css";
import IconInfoPessoal from "../../../assets/info-pessoal.svg";
import IconLogin from "../../../assets/escudo.png";
import IconAnuncios from "../../../assets/megafone.png";
import IconGerenciarReserva from "../../../assets/sino-do-hotel (1).png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const GerenciarConta = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    id: null,
  });
  
  const navigate = useNavigate();
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
          id: userId,
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

  useEffect(() => {
    if (data.id) {
      // Fazendo a requisição para pegar as informações do usuário usando o id
      axios
        .get(`http://localhost:3000/users/${data.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resposta) => {
          const primeiroNome = resposta.data.nome.split(" ")[0];
          const nomeFormatado =
            primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
          // Atualizando o estado com as informações do usuário (nome, email)
          setData((prevData) => ({
            ...prevData,
            nome: nomeFormatado,
            email: resposta.data.email,
          }));
        })
        .catch((erro) => {
          console.error("Erro ao buscar dados do usuário:", erro);
        });
    }
  }, [data.id]); 

  return (
    <>
      <div className="conta ms-3 my-4">
        <h5>Conta</h5>
        <p>
          {data.nome}, {data.email},
          {data.id ? (
            <Link to={`/perfil/${data.id}`} className="acesso-perfil"> Acessar perfil</Link>
          ) : (
            <span>Carregando perfil...</span>
          )}
        </p>
      </div>

      <div className="config">
        <ul>
          <li>
            <Link to={"/gerenciar-conta/info-pessoal"}>
              <img src={IconInfoPessoal} alt="" width="95px" />
              <h5><b>Informações Pessoais</b></h5>
              <p>Forneça detalhes e informações de contato</p>
            </Link>
          </li>
          <li>
            <Link to={"/gerenciar-conta/login-seguranca"}>
              <img src={IconLogin} alt="" width="70px" />
              <h5><b>Login e Segurança</b></h5>
              Atualize sua conta e mantenha ela segura
            </Link>
          </li>
        </ul>
      </div>

      <div className="config">
        <ul>
          <li>
            <Link to={"/gerenciar-conta/anuncios-ativos"}>
              <img src={IconAnuncios} alt="" width="95px" />
              <h5><b>Anúncios ativos</b></h5>
              <p>Edite ou exclua anúncios ativos</p>
            </Link>
          </li>
          <li>
            <Link to={"/gerenciar-conta/gerenciar-reserva"}>
              <img src={IconGerenciarReserva} alt="" width="95px" />
              <h5><b>Gerenciar reservas</b></h5>
              <p>Verifique e gerencie suas reservas</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GerenciarConta;
