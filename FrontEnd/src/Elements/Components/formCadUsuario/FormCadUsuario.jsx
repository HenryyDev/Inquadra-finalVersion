import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "../../Css/CadUsuario.css";
import logo from "../../../assets/logo.png";
import ver from "../../../assets/ver.png";
import ocultar from "../../../assets/ocultar.png";
import { Link, useNavigate } from "react-router-dom";
import MaskInput from "react-maskinput";
import axios from "axios";

const CadUsuario = () => {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    senha: "",
    numero_t:"",
    ddd:"",
    confirmarSenha: "",
    termos: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [viewSenha, setViewSenha] = useState(true);

  const validateForm = () => {
    const newErrors = {};
    if (!values.nome) newErrors.nome = "Nome é obrigatório!";

    if (!values.email) newErrors.email = "Email é obrigatório!";
    if (!values.senha) newErrors.senha = "Senha é obrigatório!";
    if (values.senha != values.confirmarSenha)
      newErrors.confirmarSenha = "Senha diferente ou nula!";
      if (!values.numero_t)
      newErrors.numero_t = "Número telefônico é obrigatório."; // Verifica se o numero_t está vazio
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Corrija os erros!");
      return;
    }
  
    // Processar o número telefônico
    const numeroCompleto = values.numero_t.replace(/\D/g, ""); 
    const ddd = numeroCompleto.slice(0, 2); 
    const numero = numeroCompleto.slice(2); 
  
    // Atualizar o estado com os valores processados
    setValues((prevValues) => {
      const updatedValues = { ...prevValues, ddd: ddd, numero_t: numero };
      console.log(updatedValues)
      // Enviar os valores atualizados para o backend
      axios
        .post("http://localhost:3000/users", updatedValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resposta) => {
          console.log("Resposta da requisição:", resposta);
          navigate("/login");
        })
        .catch((erro) => {
          console.log(
            "Erro na requisição:",
            erro.response ? erro.response.data : erro.message
          );
          toast.error("Erro ao criar conta");
        });
  
      return updatedValues; 
    });
  };

  return (
    <>
    <ToastContainer />
    <div className="wrap-user">
      <div className="cad-user">
        <form onSubmit={handleSubmit}>
          <Link to={"/"}>
            <img src={logo} alt="Logo" width="180px" className="logo" />
          </Link>
          <h2 className="h2-txt">Crie sua conta. É grátis!</h2>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome Completo
            </label>
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
            

            <label htmlFor="email" className="form-label">
              Email
            </label>
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
          <div className="mb-3">
            <label htmlFor="numero_t" className="form-label">
                Número Telefônico<span className="error-text">*</span>
              </label>
              {errors.numero_t && (
                <div className="alert alert-danger" role="alert">
                  <span className="error-text">{errors.numero_t}</span>
                </div>
              )}
            <MaskInput
                alwaysShowMask
                maskChar="_"
                mask={"(00) 00000-0000"}
                className="form-control"
                name="numero_t"
                value={values.numero_t}
                onChange={(e) =>
                  setValues({ ...values, numero_t: e.target.value })
                }
                placeholder="Digite um número telefônico para contato"
              />
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
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
                
                value={values.senha}
                onChange={(e) =>
                  setValues({ ...values, senha: e.target.value })
                }
              />
              <img
                src={viewSenha ? ver : ocultar}
                alt="Ícone de visibilidade"
                width="40px"
                height="40px"
                style={{
                  position: "absolute",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setViewSenha((estado) => !estado)}
              />
            </div>
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="senha" className="form-label">
              Confirmar senha
            </label>
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
                
                value={values.confirmarSenha}
                onChange={(e) =>
                  setValues({ ...values, confirmarSenha: e.target.value })
                }
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
              onChange={(e) =>
                setValues({ ...values, termos: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Eu aceito os{" "}
              <a href="../Termos/index.html">termos e condições.</a>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Criar conta
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CadUsuario;
