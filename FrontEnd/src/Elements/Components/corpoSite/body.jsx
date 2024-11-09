// Imports de bibliotecas externas
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"


// Imports de arquivos de estilo
import "../../Css/app.css"




// Imports de imagens/ativos
import Modalidades from '../Modalidades';
import golfimg from "../../../assets/golf.jpg"


import React, { useState } from 'react';


const quadrasData = [
  { id: 1, nome: "Quadra 1", descricao: "Quadra de Futebol", imagem: "./assets/golf.jpg" },
  { id: 2, nome: "Quadra 2", descricao: "Quadra de Tênis", imagem:"./assets/golf.jpg"  },
  { id: 3, nome: "Quadra 3", descricao: "Quadra Poliesportiva", imagem: "./assets/golf.jpg"  },
  { id: 4, nome: "Quadra 4", descricao: "Quadra de Vôlei", imagem: "./assets/golf.jpg"  },
  { id: 5, nome: "Quadra 5", descricao: "Quadra de Basquete", imagem: "" },
  { id: 6, nome: "Quadra 6", descricao: "Quadra de Futebol", imagem: "" },
];
const Body=()=>{

    const [quadras, setQuadras] = useState(quadrasData);
return(
<>
     
     <Modalidades/>

      <h2 className="h2-melhores-avaliados"><b>Melhores Avaliados</b></h2> 
      <section className="melhores-avaliados"> 
        <ul>
        {quadras.slice(0,4).map((quadra)=>(
          <li key={quadra.id}>
            
            <a href="pags/anuncio/index.html">
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.nome}</h5>
              <p className="txt-anuncio">{quadra.descricao}</p>
            </a>
            </li>
             ))}
          </ul>
    
        
  
      </section>

      <h2 className="h2-mais-populares"><b>Mais Populares</b></h2> 
      <section className="mais-populares"> 
      <ul>
        {quadras.slice(0,4).map((quadra)=>(
          <li key={quadra.id}>
            
            <a href="pags/anuncio/index.html">
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.nome}</h5>
              <p className="txt-anuncio">{quadra.descricao}</p>
            </a>
            </li>
             ))}
          </ul>
      </section>

      <h2 className="h2-menor-custo"><b>Menor custo</b></h2>
      <section className="menor-custo"> 
      <ul>
        {quadras.slice(0,4).map((quadra)=>(
          <li key={quadra.id}>
            
            <a href="pags/anuncio/index.html">
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.nome}</h5>
              <p className="txt-anuncio">{quadra.descricao}</p>
            </a>
            </li>
             ))}
          </ul>
      </section>
      </>
      )}
      export default Body;