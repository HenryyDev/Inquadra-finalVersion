import "../../Css/gerenciarReserva.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import axios from "axios";
import golfimg from "../../../assets/golf.jpg";

export default function GerenciarReserva() {
  const [quadras, setQuadras] = useState([]); // Estado inicial vazio
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redireciona para a página de login se o token não estiver presente
      return;
    }

    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reservas/id", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });
        setQuadras(response.data); // Atualiza o estado com os dados da API
        console.log(response.data); // Exibe os dados no console para depuração
      } catch (err) {
        setError("Erro ao buscar reservas. Tente novamente mais tarde.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchReservas();
  }, [navigate]); // Inclui `navigate` nas dependências para evitar warnings

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2 className="page-title">
        <Link to="/gerenciar-conta">
          <span className="account-link">Conta</span>
        </Link>{" "}
        &#62; Gerenciar reservas
      </h2>
      <h1 className="main-title">Gerenciar reservas</h1>

      <div className="grid-container">
        {quadras.length === 0 ? ( 
          <p className="no-reservations">Nenhuma reserva encontrada.</p>
        ) : (
          quadras.map((quadra) => (
            <div key={quadra.id_reserva} className="grid-card">
              <Link to={`/anuncio/${quadra.fk_quadra}`}>
                <img
                  src={`http://localhost:3000${quadra.caminho_imagem}`}
                  alt={quadra.nome}
                  className="card-image"
                />
              </Link>
              <h5 className="card-title">{quadra.nome}</h5>
              <p className="card-description">{quadra.descricao_quadra}</p>
              <h5>R$ {quadra.preco}</h5>
              <button className="card-button">
                {quadra.pagamento ? "Checkout" : "Aguardando Pagamento"}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
