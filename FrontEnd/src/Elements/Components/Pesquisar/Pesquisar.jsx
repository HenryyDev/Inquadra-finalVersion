import React from "react";
import "../../Css/pesquisar.css";
import { Link } from "react-router-dom";


const Pesquisar = ({ termo,modalidade, resultados }) => {
  const verificaPesquisa = () => {
    
    if (termo && modalidade) {
      return <p>Resultados para: "{termo}" e esporte: "{modalidade}"</p>;
    }
    if (termo) {
      return <p>Resultados para: "{termo}"</p>;
    }
    if (modalidade) {
      return <p>Resultados para o esporte: {modalidade}</p>;
    }
    return <p>Resultados</p>; 
  };
  console.log("termo:",termo);
  return (
    <div className="wrap-anuncio">
     
      <h3>{verificaPesquisa()}</h3>
      <div className="anun">
        <ul className="my-4 row">
          {resultados.length === 0 ? (
            <li className="mx-4" style={{minHeight:"400px"}}>Não há resultados para {termo || modalidade}</li>
          ) : (
            resultados.map((anuncio, index) => (
              <li key={index} className="col-md-6 col-12" {...(resultados.length < 3 ? { style: { minHeight: "400px" } } : {})}>

                <Link to={`/anuncio/${anuncio.id_quadra}`}>
                  <div className="anuncio">
                    <img
                      src={`http://localhost:3000${anuncio.imagem}`}
                      alt={anuncio.titulo}
                      className="img-fluid"
                      width="250px"
                    />
                    <div className="anuncio-left">
                      <h5>{anuncio.nome}</h5>
                    </div>
                    <div className="anuncio-right">
                      <h5>R$ {anuncio.preco_hora}</h5>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pesquisar;
