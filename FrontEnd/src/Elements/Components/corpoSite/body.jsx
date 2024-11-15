// Imports de bibliotecas externas
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// Imports de arquivos de estilo
import "../../Css/body.css";

// Imports de imagens/ativos
import Modalidades from "../Modalidades";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Body = () => {
  const [melhoresAvaliados, setMelhoresavaliados] = useState([]);
  const [maisReservas, setMaisreservas] = useState([]);
  const [menorCusto, setMenorcusto] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/quadras-destaque")
      .then((resposta) => {
       
        setMelhoresavaliados(resposta.data.melhoresAvaliacoes);
        setMaisreservas(resposta.data.maisReservas);
        setMenorcusto(resposta.data.menorCusto);
      })
      .catch((erro) => {
        console.log("erro ao buscar quadra:", erro);
      });
  }, []); // Executa apenas uma vez ao montar o componente
  return (
    <>
      <Modalidades />

      <h2 className="h2-melhores-avaliados">
        <b>Melhores Avaliados</b>
      </h2>
      <section className="melhores-avaliados">
        <ul>
          {melhoresAvaliados.map((quadra) => (
            <li key={quadra.id}>
              <Link to={`/anuncio/${quadra.id}`}>
                <img src={`http://localhost:3000${quadra.fotos[0]}`} alt="" />
                <h5 className="txt-anuncio">{quadra.titulo}</h5>
                <p className="txt-anuncio">
                  {quadra.descricao.length > 90
                    ? quadra.descricao.substring(0, 87) + "..."
                    : quadra.descricao}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="h2-mais-populares">
        <b>Mais Populares</b>
      </h2>
      <section className="mais-populares">
        <ul>
          {maisReservas.map((quadra) => (
            <li key={quadra.id}>
              <Link to={`/anuncio/${quadra.id}`}>
                <img src={`http://localhost:3000${quadra.fotos[0]}`} alt="" />
                <h5 className="txt-anuncio">{quadra.titulo}</h5>
                <p className="txt-anuncio">
                  {quadra.descricao.length > 90
                    ? quadra.descricao.substring(0, 87) + "..."
                    : quadra.descricao}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="h2-menor-custo">
        <b>Menor custo</b>
      </h2>
      <section className="menor-custo">
        <ul>
          {menorCusto.map((quadra) => (
            <li key={quadra.id}>
              <Link to={`/anuncio/${quadra.id}`}>
                <img src={`http://localhost:3000${quadra.fotos[0]}`} alt="" />
                <h5 className="txt-anuncio">{quadra.titulo}</h5>
                <p className="txt-anuncio">
                  {quadra.descricao.length > 90
                    ? quadra.descricao.substring(0, 87) + "..."
                    : quadra.descricao}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Body;
console