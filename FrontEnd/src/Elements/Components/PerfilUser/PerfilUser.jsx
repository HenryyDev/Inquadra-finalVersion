import "../../Css/perfilUser.css";
import React, { useState } from "react";
import golfimg from "../../../assets/golf.jpg";
const quadrasData = [
  {
    id: 1,
    nome: "Quadra 1",
    descricao: "Quadra de Futebol",
    imagem: "./assets/golf.jpg",
    preco: 29.25,
  },
  {
    id: 2,
    nome: "Quadra 2",
    descricao: "Quadra de Tênis",
    imagem: "./assets/golf.jpg",
    preco: 20,
  },
  {
    id: 3,
    nome: "Quadra 3",
    descricao: "Quadra Poliesportiva",
    imagem: "./assets/golf.jpg",
    preco: 14.25,
  },
  {
    id: 4,
    nome: "Quadra 4",
    descricao: "Quadra de Vôlei",
    imagem: "./assets/golf.jpg",
    preco: 50.25,
  },
  { id: 5, nome: "Quadra 5", descricao: "Quadra de Basquete", imagem: "" },
  { id: 6, nome: "Quadra 6", descricao: "Quadra de Futebol", imagem: "" },
];
export default function PerfilUser() {
  const [quadras, setQuadras] = useState(quadrasData);
  return (
    <>
      <h1
        className="nome-user"
        style={{ marginLeft: "40px", marginTop: "40px" }}
      >
        nomeuser
      </h1>
      <h5 style={{ marginLeft: "40px" }}>cidade</h5>
      <p style={{ margin: "40px" }}>Anuncios do perfil</p>

      <ul className="wrap-anuncio">
        {quadras.slice(0, 4).map((quadra) => (
          <li key={quadra.id} style={{ paddingBottom: "40px" }}>
            <div className="card">
              <a href="pags/anuncio/index.html">
                <img src={golfimg} alt="" width={"300px"} />
                <h1 className="txt-anuncio">R$ {quadra.preco}/H</h1>
                <h5 className="txt-anuncio">{quadra.nome}</h5>
                <p className="txt-anuncio">{quadra.descricao}</p>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
