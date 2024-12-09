import "../../Css/perfilUser.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import loc from "../../../assets/pin.png"
const fetchQuadrasData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/perfil/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as quadras:", error);
    return null;
  }
};

export default function PerfilUser() {
  const { id } = useParams();
  const [quadras, setQuadras] = useState([]);

  useEffect(() => {
    const carregarQuadras = async () => {
      const quadrasData = await fetchQuadrasData(id);

      if (quadrasData) {
        // Remove os itens duplicados com base em 'id_quadra' e 'quadra_nome'
        const quadrasUnicas = quadrasData.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.id_quadra === value.id_quadra && t.quadra_nome === value.quadra_nome
          ))
        );
        setQuadras(quadrasUnicas);
      }
    };

    if (id) {
      carregarQuadras();
    }
  }, [id]);

  return (
    <>
      {quadras.length > 0 && (
        <>
          <h1 className="nome-user" style={{ marginLeft: "40px", marginTop: "40px" }}>
            {quadras[0].usuario_nome}
          </h1>
          <p style={{ margin: "40px" }}>Anúncios do perfil</p>
          <div className="anun-perfil">
            <ul className="grid">
              {quadras.map((quadra) => (
                <li key={quadra.id_quadra} className="quadra-item">
                  <div className="quadra-perfil">
                    <Link to={`/anuncio/${quadra.id_quadra}`}>
                      <img
                        src={`http://localhost:3000${quadra.imagem_caminho}`}
                        alt={quadra.nome}
                        className="img-res img-fluid"
                        width="100%"
                        style={{ borderRadius: "25px" }}
                      />
                      <div className="quadra-left">
                        <h5>{quadra.quadra_nome.length > 15 ? `${quadra.quadra_nome.slice(0, 15)}...` : quadra.quadra_nome}</h5>
                        <p><img src={loc} alt="" width={"20px"} />{quadra.municipio}, {quadra.bairro}</p>
                      </div>
                      <div className="quadra-right">
                        <h5>R$ {quadra.preco_por_hora}/h</h5>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {quadras.length === 0 && <h1 style={{ margin: "20px" }}>Não há anúncios disponíveis.</h1>}
    </>
  );
}
