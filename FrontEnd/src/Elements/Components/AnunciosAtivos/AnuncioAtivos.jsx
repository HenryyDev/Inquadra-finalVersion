import "../../Css/anuncioAtivos.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalConfirmacao from "../Modal";
export default function AnunciosAtivos() {
  const [quadras, setQuadras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [erro, setErro] = useState("");
  const [idAnuncioParaExcluir, setIdAnuncioParaExcluir] = useState(null);
  
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  // Função para buscar os dados das quadras
  const fetchQuadras = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/quadras/anuncio-ativo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuadras(response.data);
    } catch (error) {
      console.error("Erro ao carregar as quadras:", error);
    }
  };

  useEffect(() => {
    fetchQuadras();
  }, []);
  const handleAbrirModalExcluir = (id) => {
    setIdAnuncioParaExcluir(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIdAnuncioParaExcluir(null);
  };
  const handleExcluirAnuncio = async (senha) => {
    try {
      await axios.delete(
        `http://localhost:3000/quadras/${idAnuncioParaExcluir}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { senha },
        }
      );
      window.location.reload(); // Recarrega a lista de quadras após a exclusão
      handleCloseModal();
    } catch (error) {
      setErro("Erro ao excluir o anúncio. Tente novamente.");
    }
  };
  return (
    <>
      <h2 className="page-title">
        <Link to="/gerenciar-conta">
          <span className="account-link">Conta</span>
        </Link>{" "}
        &#62; Anúncios ativos
      </h2>
      <h1 className="main-title">Anúncios ativos</h1>

      <div className="wrap-anuncio-ativo">
        <div className="grid-anuncio">
          {quadras.length > 0 ? (
            quadras.map((quadra) => (
              <div key={quadra.id_quadra} className="card-anuncio mb-4">
                <Link to={`/anuncio/${quadra.id_quadra}`}>
                  <img
                    src={`http://localhost:3000${quadra.imagem}`}
                    alt={`Imagem da quadra ${quadra.nome}`}
                    className="card-image"
                  />
                </Link>

                <h5 className="txt-card">
                  {quadra.quadra_nome.length > 15
                    ? `${quadra.quadra_nome.slice(0, 15)}...`
                    : quadra.quadra_nome}
                </h5>
                <p className="txt-card">
                  {quadra.descricao.length > 15
                    ? `${quadra.descricao.slice(0, 15)}...`
                    : quadra.descricao}
                </p>
                <h5 className="txt-card">R$ {quadra.preco_hora}/H</h5>

                <div className="wrap-btn">
                  <button
                    className="  card-button btn-card"
                    onClick={() => handleAbrirModalExcluir(quadra.id_quadra)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum anunico ativo</p>
          )}
        </div>
      </div>
      <ModalConfirmacao
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleExcluirAnuncio}
        titulo="Excluir Anúncio"
        mensagem="Tem certeza de que deseja excluir este anúncio?"
        erro={erro}
        setErro={setErro}
        tipo="excluir-anuncio"
      />
    </>
  );
}
