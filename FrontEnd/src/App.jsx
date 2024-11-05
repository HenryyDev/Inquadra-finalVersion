// Imports de bibliotecas externas
import 'bootstrap/dist/css/bootstrap.min.css';



// Imports de arquivos de estilo
import "./Elements/Css/app.css";

// Imports de componentes internos
import NavBar from "./Elements/NavBar";
import Footer from "./Elements/Footer";

// Imports de imagens/ativos
import bilhar from "./assets/de-bilhar.png";
import basquete from './assets/basquetebol 1.svg';
import futebol from "./assets/bola.png";
import golfe from "./assets/golfe.png";
import natacao from "./assets/oculos-de-natacao.png";
import volei from "./assets/voleibol.png";
import tenis from "./assets/tenis.png";
import pong from "./assets/pingue-pongue.png";
import skate from "./assets/patim.png";
import futsal from "./assets/objetivo.png";
import golfimg from "./assets/golf.jpg"

import React, { useState } from 'react';


const quadrasData = [
  { id: 1, nome: "Quadra 1", descricao: "Quadra de Futebol", imagem: "./assets/golf.jpg" },
  { id: 2, nome: "Quadra 2", descricao: "Quadra de Tênis", imagem:"./assets/golf.jpg"  },
  { id: 3, nome: "Quadra 3", descricao: "Quadra Poliesportiva", imagem: "./assets/golf.jpg"  },
  { id: 4, nome: "Quadra 4", descricao: "Quadra de Vôlei", imagem: "./assets/golf.jpg"  },
  { id: 5, nome: "Quadra 5", descricao: "Quadra de Basquete", imagem: "" },
  { id: 6, nome: "Quadra 6", descricao: "Quadra de Futebol", imagem: "" },
];
function App() {  
  

  const [quadras, setQuadras] = useState(quadrasData);
  return (
    <>
      <NavBar />

      <section className="modalidade"> 
        <div className="retangulo my-4"> 
          <ul className="links"> 
            <li>
              <a href="">
                <img src={basquete} alt="" width="40px" />
                <p>basquete</p>
              </a>
            </li>
            <li>
              <a href=""
                ><img src={futebol} alt="" width="40px" />
                <p>Futebol</p>
              </a>
            </li>
            <li>
              <a href=""
                ><img src={bilhar} alt="" width="40px" />
                <p>Bilhar</p></a
              >
            </li>
            <li>
              <a href=""
                ><img src={golfe} alt="" width="40px" />
                <p>golfe</p>
              </a>
            </li>
            <li>
              <a href=""
                ><img src={natacao} alt="" width="40px" />
                <p>Natação</p></a
              >
            </li>
            <li>
              <a href=""
                ><img src={volei}alt="" width="40px"/>
                <p>vôlei</p></a
              >
            </li>
            <li>
              <a href="">
                <img src={tenis} alt="" width="40px" />
                <p>tênis</p></a
              >
            </li>
            <li>
              <a href=""
                ><img src={pong} alt="" width="40px" />
                <p>Pong</p></a
              >
            </li>
            <li>
              <a href=""
                ><img src={skate} alt="" width="40px" />
                <p>Skate</p></a
              >
            </li>
            <li>
              <a href=""
                ><img src={futsal} alt="" width="40px" />
                <p>Futsal</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

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

      <Footer />
    </>
  );
}

export default App;
