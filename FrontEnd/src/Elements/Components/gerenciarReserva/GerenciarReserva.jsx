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

        // Garantir que response.data seja um array válido
        if (Array.isArray(response.data)) {
          setQuadras(response.data); // Atualiza o estado com os dados da API
        } else {
          setQuadras([]); // Se não for um array, inicializa como um array vazio
        }

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

  // Função para remover reservas duplicadas com base no id_reserva
  const removeDuplicateReservations = (reservas) => {
    const seen = new Set();
    return reservas.filter((quadra) => {
      if (seen.has(quadra.id_reserva)) {
        return false; // Ignora reservas com id_reserva duplicados
      }
      seen.add(quadra.id_reserva);
      return true; // Mantém reservas com id_reserva únicos
    });
  };

  // Filtra as reservas duplicadas
  const uniqueQuadras = removeDuplicateReservations(quadras);

  // Função para excluir uma reserva
  const handleDelete = async (id_reserva) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redireciona para login caso o token não esteja presente
      return;
    }

    // Confirmação antes de excluir
    const confirmation = window.confirm("Tem certeza que deseja excluir esta reserva?");
    if (!confirmation) return; // Se o usuário cancelar, não faz nada

    try {
      const response = await axios.delete(`http://localhost:3000/reservas/${id_reserva}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Atualiza o estado para remover a reserva excluída da lista
        setQuadras((prevQuadras) =>
          prevQuadras.filter((quadra) => quadra.id_reserva !== id_reserva)
        );
        alert("Reserva excluída com sucesso");
      } else {
        alert("Falha ao excluir a reserva");
      }
    } catch (err) {
      console.error("Erro ao excluir reserva", err);
      alert("Erro ao excluir a reserva. Tente novamente mais tarde.");
    }
  };

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
        {uniqueQuadras.length === 0 ? (
          <p className="no-reservations">Nenhuma reserva encontrada.</p>
        ) : (
          uniqueQuadras.map((quadra) => (
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
              <button
                className="card-button"
                onClick={() => handleDelete(quadra.id_reserva)} // Chama a função de exclusão
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
