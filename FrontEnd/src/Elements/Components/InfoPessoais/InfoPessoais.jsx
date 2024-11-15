import React from "react";
import "../../Css/loginEseguranca.css";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";

function InfoPessoal() {
  return (
    <>
      <div className="wrap">
        <h2>
          <Link to={"/gerenciar-conta"}>
            <span style={{ color: "#0000FF" }}>Conta</span>
          </Link>{" "}
          &#62; Informações Pessoais
        </h2>
        <div>
          <h1 className="my-4">Informações Pessoais</h1>
        </div>
      </div>
      <div className="wrap02">
        <div className="input">
          <div className="mt-4">
            <label htmlFor="senha">Nome</label>
            <button
              className="btn btn-primary btn-seg"
              aria-label="Atualizar senha"
            >
              Atualizar
            </button>
          </div>

          <div className="my-2">
            <label htmlFor="email">Telefone</label>
            <button
              className="btn btn-primary btn-seg"
              aria-label="Atualizar email"
            >
              Atualizar
            </button>
          </div>
          <div className="my-2">
            <label htmlFor="email">Endereço</label>
            <button
              className="btn btn-primary btn-seg"
              aria-label="Atualizar email"
            >
              Atualizar
            </button>
          </div>
          <div className="my-2">
            <label htmlFor="email">Contato Emergencia</label>
            <button
              className="btn btn-primary btn-seg"
              aria-label="Atualizar email"
            >
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default InfoPessoal;
