import React from "react";
import "../../Css/Pesquisar.css";
import loc from "../../../assets/pin.png"
import { Link } from "react-router-dom";
import erro from "../../../assets/nao-encontrado.png"

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
  
  return (
    <div className="wrap-anuncio">
  <h3 className="mt-4">{verificaPesquisa()}</h3>
  <div className="anun">
    <ul className="row">
      {resultados.length === 0 ? (
        <li className="no-result" style={{ minHeight: "400px" }}>
          <div className="d-flex  align-items-center h-100 text-center">
           
            <p style={{ fontWeight: "bold", marginTop: 0 ,fontSize:"25px",marginLeft:"20px"}}>Resultado não encontrado</p>
          </div>
        </li>



          ) : (
            resultados.map((anuncio, index) => (
              <li key={index} className="col-md-6 col-12" {...(resultados.length < 3 ? { style: { minHeight: "400px" } } : {})}>

                <Link to={`/anuncio/${anuncio.id_quadra}`}>
                  <div className="anuncio">
                    <img
                      src={`http://localhost:3000${anuncio.Imagem}`}
                      alt={anuncio.titulo}
                      className=" img-res img-fluid"
                      width="250px"
                    />
                    <div className="anuncio-left">
                      <h5>{anuncio.nome.length > 20
                 ? anuncio.nome.substring(0, 17) + "..."
                 : anuncio.nome}</h5>
                      <p className="mt-5"><img src={loc} className="img-loc"  />{anuncio.municipio},{anuncio.bairro}</p>
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
