import "../../Css/AnuncioAtivos.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import golfimg from "../../../assets/golf.jpg"
const quadrasData = [
  { id: 1, nome: "Quadra 1", descricao: "Quadra de Futebol", imagem: "./assets/golf.jpg", preco: 29.25, pagamento: true },
  { id: 2, nome: "Quadra 2", descricao: "Quadra de Tênis", imagem: "./assets/golf.jpg", preco: 20, pagamento: true },
  { id: 3, nome: "Quadra 3", descricao: "Quadra Poliesportiva", imagem: "./assets/golf.jpg", preco: 14.25, pagamento: true },
  { id: 4, nome: "Quadra 4", descricao: "Quadra de Vôlei", imagem: "./assets/golf.jpg", preco: 50.25, pagamento: true },
  { id: 5, nome: "Quadra 5", descricao: "Quadra de Basquete", imagem: "", pagamento: false },
  { id: 6, nome: "Quadra 6", descricao: "Quadra de Futebol", imagem: "", pagamento: true },
];
export default function GerenciarReserva() {
  const [quadras, setQuadras] = useState(quadrasData);
  return (
    <>
    
      <h2 style={{ marginLeft: "40px", marginTop: "40px" }}>
        <Link to={"/gerenciar-conta"} ><span style={{ color: "#0000FF", marginTop: "40px" }}>Conta</span></Link> &#62; Gerenciar Reservas
      </h2>
      <h1 style={{ marginLeft: "40px", marginTop: "10px" }}>
        Gerenciar Reservas
      </h1>
      

      <div className="wrap-anuncio-ativo">
        <ul className="anuncio-ativo">
          {quadras.map((quadra) => (
            <li key={quadra.id}>


              <div className="card-anuncio">
                <img src={golfimg} alt="" width={"200px"} style={{ borderRadius: "25px" }} />

                <h5 className="txt-card">{quadra.nome}</h5>
                <p className="txt-card">{quadra.descricao}</p>
                <div className="wrap-btn">

                  <button className=" btn btn-primary btn-card">{quadra.pagamento ? "checkout" : "Aguardando Pagamento"}</button>
                </div>
              </div>



            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
