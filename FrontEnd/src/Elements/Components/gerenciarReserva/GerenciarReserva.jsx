import "../../Css/gerenciarReserva.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ModalConfirmacao from "../Modal";

export default function GerenciarReserva() {
  const [quadras, setQuadras] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [quadraSelecionada, setQuadraSelecionada] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchReservas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reservas/id", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setQuadras(response.data);
        } else {
          setQuadras([]);
        }
      } catch (err) {
        setError("Erro ao buscar reservas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [navigate]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const removeDuplicateReservations = (reservas) => {
    const seen = new Set();
    return reservas.filter((quadra) => {
      if (seen.has(quadra.id_reserva)) return false;
      seen.add(quadra.id_reserva);
      return true;
    });
  };

  const uniqueQuadras = removeDuplicateReservations(quadras);

  const handleDelete = (quadra) => {
    setQuadraSelecionada(quadra); // Define a reserva a ser avaliada
    setShowModal(true); // Exibe o modal
  };

  const handleConfirm = async (nota) => {
    // Aqui você avalia a quadra antes de excluir
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Envia a avaliação
      await axios.post(
        `http://localhost:3000/reservas/avaliacao`,
        { fk_quadra: quadraSelecionada.fk_quadra, nota },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Após avaliar, exclui a reserva
      const response = await axios.delete(
        `http://localhost:3000/reservas/${quadraSelecionada.id_reserva}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setQuadras((prevQuadras) =>
          prevQuadras.filter((quadra) => quadra.id_reserva !== quadraSelecionada.id_reserva)
        );
        toast.success("Reserva excluída e quadra avaliada com sucesso.");
      } else {
        toast.error("Falha ao excluir a reserva.");
      }
    } catch (err) {
      console.error("Erro ao avaliar e excluir reserva:", err);
      alert("Erro ao processar sua solicitação. Tente novamente mais tarde.");
    } finally {
      setShowModal(false); // Fecha o modal
    }
  };

  return (
    <>
    <ToastContainer/>
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
                onClick={() => handleDelete(quadra)} // Exibe o modal para avaliar e excluir
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>

      
      {showModal && (
        <ModalConfirmacao
          show={showModal}
          onClose={() => setShowModal(false)} 
          onConfirm={handleConfirm} 
          titulo="Avaliar Quadra"
          mensagem="Por favor, avalie a quadra antes de excluir a reserva."
          tipo="avaliar"
        />
      )}
    </>
  );
}
