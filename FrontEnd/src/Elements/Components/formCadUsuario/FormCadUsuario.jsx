import React, { useState } from 'react';
import "../../Css/CadUsuario.css";
import logo from "../../../assets/logo.png";
import ver from "../../../assets/ver.png"
import ocultar from "../../../assets/ocultar.png"
import { Link } from "react-router-dom";

const CadUsuario = () => {
  const [values, setValues] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    termos: false
  });

  const [errors, setErrors] = useState({});
  const [viewSenha, setViewSenha] = useState(true);

  const validateForm = () => {
    const newErrors = {};
    if (!values.nome) newErrors.nome = "Nome é obrigatório!";
    if (!values.cpf) newErrors.cpf = "Cpf é obrigatório!";
    if (!values.email) newErrors.email = "Email é obrigatório!";
    if (!values.senha) newErrors.senha = "Senha é obrigatório!";
    if (values.senha != values.confirmarSenha) newErrors.confirmarSenha = "Senha diferente ou nula!"
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values);
      alert("Usuário criado!");
    }
  };


  return (
    <div className="wrap-user">
      <div className="cad-user">
        <form onSubmit={handleSubmit}>
          <Link to={"/"}>
            <img src={logo} alt="Logo" width="180px" className="logo" />
          </Link>
          <h2 className="h2-txt">Crie sua conta. É grátis!</h2>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            {errors.nome && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.nome}</span>
              </div>
            )}
            <input
              type="text"
              className="form-control nome"
              id="nome"
              value={values.nome}
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
            />
            <label htmlFor="cpf" className="form-label">CPF</label>
            {errors.cpf && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.cpf}</span>
              </div>
            )}
            <input
              type="text"
              className="form-control nome"
              id="cpf"
              value={values.cpf}
              onChange={(e) => setValues({ ...values, cpf: e.target.value })}
            />
            <label htmlFor="email" className="form-label">Email</label>
            {errors.email && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.email}</span>
              </div>
            )}
            <input
              type="email"
              className="form-control"
              id="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <div id="emailHelp" className="form-text">
              Nunca compartilharemos seu e-mail com mais ninguém.
            </div>
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="senha" className="form-label" >Senha</label>
            {errors.senha && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.senha}</span>
              </div>
            )}
            <div className="senha">
              <input
                type={viewSenha ? "password" : "text"}
                style={{ width: "100%" }}
                className="form-control"
                id="senha"
                value={values.senha}
                onChange={(e) => setValues({ ...values, senha: e.target.value })}
              />
              <img
                src={viewSenha ? ver : ocultar}
                alt="Ícone de visibilidade"
                width="40px"
                height="40px"
                style={{
                  position: "absolute",
                  right: "10px",
                  cursor: "pointer"
                }}
                onClick={() => setViewSenha((estado) => !estado)}
              />
            </div>
          </div>
          <div className="mb-3" style={{ position: "relative" }}>

            <label htmlFor="senha" className="form-label" >Confirmar senha</label>
            {errors.confirmarSenha && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.confirmarSenha}</span>
              </div>
            )}


            <div className="senha">
              <input
                type={viewSenha ? "password" : "text"}
                style={{ width: "100%" }}
                className="form-control"
                id="senha"
                value={values.confirmarSenha}
                onChange={(e) => setValues({ ...values, confirmarSenha: e.target.value })}
              />

            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              required
              className="form-check-input"
              id="exampleCheck1"
              checked={values.termos}
              onChange={(e) => setValues({ ...values, termos: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Eu aceito os <a href="../Termos/index.html">termos e condições.</a>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default CadUsuario;
