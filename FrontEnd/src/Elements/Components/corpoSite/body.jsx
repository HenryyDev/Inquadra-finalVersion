// Imports de bibliotecas externas
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"


// Imports de arquivos de estilo
import "../../Css/body.css"




// Imports de imagens/ativos
import Modalidades from '../Modalidades';
import golfimg from "../../../assets/golf.jpg"


import React, { useState } from 'react';


const quadrasData = [
  {
    id: 1,
    titulo: "Quadra de Futebol Society",
    descricao: "Quadra de futebol society, gramado sintético, com iluminação.",
    esportes: {
      basquete: false,
      futebol: true,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: true,
      tenis: false,
      pong: false,
      skate: false,
      futsal: true
    },
    preco: 150,
    fotos: [golfimg, golfimg],
    endereco: "Rua dos Esportes, 123",
    cep: "12345000",
    telefone: "(11) 98765-4321"
  },
  {
    id: 2,
    titulo: "Quadra de Tênis",
    descricao: "Quadra de tênis em saibro, com rede e iluminação noturna.",
    esportes: {
      basquete: false,
      futebol: false,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: false,
      tenis: true,
      pong: false,
      skate: false,
      futsal: false
    },
    preco: 100,
    fotos: [golfimg, golfimg],
    endereco: "Avenida das Raquetes, 456",
    cep: "54321000",
    telefone: "(11) 91234-5678"
  },
  {
    id: 3,
    titulo: "Quadra de Vôlei de Praia",
    descricao: "Quadra de vôlei de praia com rede e areia fofa.",
    esportes: {
      basquete: false,
      futebol: false,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: true,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false
    },
    preco: 120,
    fotos: [golfimg, golfimg],
    endereco: "Praia dos Esportes, 789",
    cep: "98765432",
    telefone: "(11) 92345-6789"
  },
  {
    id: 4,
    titulo: "Quadra de Basquete",
    descricao: "Quadra de basquete com pintura profissional e aro de alta qualidade.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    esportes: {
      basquete: true,
      futebol: false,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: false,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false
    },
    preco: 80,
    fotos: [golfimg, golfimg],
    endereco: "Avenida do Basquete, 321",
    cep: "45678900",
    telefone: "(11) 93456-7890"
  },
  {
    id: 5,
    titulo: "Quadra de Futebol de Areia",
    descricao: "Quadra de futebol de areia com iluminação e cercado.",
    esportes: {
      basquete: false,
      futebol: true,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: false,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false
    },
    preco: 130,
    fotos: [golfimg, golfimg],
    endereco: "Rua da Praia, 654",
    cep: "11223344",
    telefone: "(11) 94567-8901"
  },
  {
    id: 6,
    titulo: "Quadra de Golfe",
    descricao: "Quadra de golfe com grama sintética e buracos de diferentes distâncias.",
    esportes: {
      basquete: false,
      futebol: false,
      bilhar: false,
      golfe: true,
      natacao: false,
      volei: false,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false
    },
    preco: 200,
    fotos: [golfimg, golfimg],
    endereco: "Rua do Golfe, 890",
    cep: "33221100",
    telefone: "(11) 95678-9012"
  }
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
            
            <Link to={`/anuncio/${quadra.id}`}>
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.titulo}</h5>
              <p className="txt-anuncio" >{ quadra.descricao.length> 90 ? quadra.descricao.substring(0, 87) + "..." : quadra.descricao}</p>
            </Link>
            </li>
             ))}
          </ul>
    
        
  
      </section>

      <h2 className="h2-mais-populares"><b>Mais Populares</b></h2> 
      <section className="mais-populares"> 
      <ul>
        {quadras.slice(0,4).map((quadra)=>(
          <li key={quadra.id}>
            
            <Link to={`/anuncio/${quadra.id}`}>
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.titulo}</h5>
              <p className="txt-anuncio" >{ quadra.descricao.length> 90 ? quadra.descricao.substring(0, 87) + "..." : quadra.descricao}</p>
            </Link>
            </li>
             ))}
          </ul>
      </section>

      <h2 className="h2-menor-custo"><b>Menor custo</b></h2>
      <section className="menor-custo"> 
      <ul>
        {quadras.slice(0,4).map((quadra)=>(
          <li key={quadra.id}>
            
            <Link to={`/anuncio/${quadra.id}`}>
              <img src={golfimg} alt="" />
              <h5 className="txt-anuncio">{quadra.titulo}</h5>
              <p className="txt-anuncio" >{ quadra.descricao.length> 90 ? quadra.descricao.substring(0, 87) + "..." : quadra.descricao}</p>
            </Link>
            </li>
             ))}
          </ul>
      </section>
      </>
      )}
      export default Body;