
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


import "../../Css/body.css";
import estrela from "../../../assets/estrela.png"
import loc from "../../../assets/pin.png"
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
        console.log(resposta)
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
                <img src={`http://localhost:3000${quadra.fotos[0]}`} alt=""  style={{height:"150px"}}/>
                <div className="txt-anuncio">
                  <h5 className="txt-anuncio" >
                  {quadra.titulo.length > 20
                 ? quadra.titulo.substring(0, 17) + "..."
                 : quadra.titulo}
                </h5>
                  <h5 className="txt-anuncio" >R${quadra.preco}/H</h5>
                  
                </div>
                <h5  style={{fontSize:"14px",display:"flex",marginTop:"10px",justifyContent:"space-between"}}><div><img src={loc} style={{height:"20px", width:"20px"}} alt=""  />{quadra.municipio},{quadra.bairro} </div> <img src={estrela} style={{height:"15px", width:"15px"}} alt="" />{quadra.media_avaliacao!=null ? quadra.media_avaliacao :"0.00"}</h5>
              
                
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
             <img src={`http://localhost:3000${quadra.fotos[0]}`} alt=""  style={{height:"150px"}}/>
             <div className="txt-anuncio">
               <h5 className="txt-anuncio" >
               {quadra.titulo.length > 20
                 ? quadra.titulo.substring(0, 17) + "..."
                 : quadra.titulo}
             </h5>
               <h5 className="txt-anuncio" >R${quadra.preco}/H</h5>
               
             </div>
             <h5  style={{fontSize:"14px",display:"flex",marginTop:"10px",justifyContent:"space-between"}}><div><img src={loc} style={{height:"20px", width:"20px"}} alt=""  />{quadra.municipio},{quadra.bairro} </div> <img src={estrela} style={{height:"15px", width:"15px"}} alt="" />{quadra.media_avaliacao!=null ? quadra.media_avaliacao :"0.00"}</h5>
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
             <img src={`http://localhost:3000${quadra.fotos[0]}`} alt=""  style={{height:"150px"}}/>
             <div className="txt-anuncio">
               <h5 className="txt-anuncio" >
               {quadra.titulo.length > 20
                 ? quadra.titulo.substring(0, 17) + "..."
                 : quadra.titulo}
             </h5>
               <h5 className="txt-anuncio" >R${quadra.preco}/H</h5>
               
             </div>
             <h5  style={{fontSize:"14px",display:"flex",marginTop:"10px",justifyContent:"space-between"}}><div><img src={loc} style={{height:"20px", width:"20px"}} alt=""  />{quadra.municipio},{quadra.bairro} </div> <img src={estrela} style={{height:"15px", width:"15px"}} alt="" />{quadra.media_avaliacao===null ? "0.00"  :quadra.media_avaliacao}</h5>
           </Link>
         </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Body;
console;
