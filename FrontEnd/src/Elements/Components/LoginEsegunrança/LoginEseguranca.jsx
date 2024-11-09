import React, { useState } from "react";
import "../../Css/loginEseguranca.css";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

function LoginEseguranca () {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="wrap">
        <h2>
          <Link to={"/gerenciar-conta"} ><span style={{color:"#0000FF"}}>conta</span></Link> &#62; Login e segurança
        </h2>
        <div>
          <h1>Login e segurança</h1>
        </div>
      </div>
      <div className="wrap02">
        <div className="input">
          <div className="my-2">
            Senha
            <button className="btn btn-primary btn-seg">atualizar</button>
          </div>
          <div className="my-4">
            Desativar Conta
            <button className="btn btn-primary btn-seg" onClick={handleOpenModal}>
              Desativar
            </button>
          </div>
          <div className="my-4">
            Email
            <button className="btn btn-primary btn-seg">Atualizar</button>
          </div>
        </div>
      </div>

      {/* Modal do Bootstrap */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Tem certeza que deseja desativar a conta?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                Ao desativar sua conta, você perderá acesso aos nossos serviços. Tem certeza que deseja continuar?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default LoginEseguranca;
