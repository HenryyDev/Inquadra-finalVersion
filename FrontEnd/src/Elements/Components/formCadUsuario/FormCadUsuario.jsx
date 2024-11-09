import React, { useState } from 'react';
import "../../Css/CadUsuario.css"
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const CadUsuario = ()=>{
  const [values,setValues]=useState({
    nome:"",
    cpf:"",
    email:"",
    senha:"",
    termos:false
  })
  const [errors,setErrors]=useState({})

  const validateForm=()=>{
    const newErros={}
  if (!values.nome) newErros.nome="Nome é obrigatorio"
  if (!values.cpf) newErros.cpf="Cpf é obrigatorio"
  if (!values.email) newErros.email="Email é obrigatorio"
  if (!values.senha) newErros.senha="Senha é obrigatorio"
  
  setErrors(newErros);
  return Object.keys(newErros).length===0
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(validateForm()){
      console.log(values)
      alert("usuario criado")
    }
  }

    return (
        <div className="body-user">
            <div class="cad-user">
            <form onSubmit={handleSubmit}>
                <Link to={"/"}><img src={logo} alt="" width="180px" class="logo"/></Link>
                <h2 class="h2-txt">Crie sua conta. É grátis!</h2>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nome Completo</label>
                    {errors.nome && <span className='error-text'> {errors.nome}</span>}
                    <input type="text" class="form-control nome"
                    value={values.nome}
                    onChange={(e)=>{
                      setValues({...values,nome:e.target.value})
                    }}/>
                  <label for="exampleInputEmail1" class="form-label">CPF</label>
                  {errors.cpf && <span className='error-text'> {errors.cpf}</span>}
                  <input type="text" class="form-control nome"
                  value={values.cpf}
                  onChange={(e)=>{
                    setValues({...values,cpf:e.target.value})
                  }}
                  />
                  <label for="exampleInputEmail1" class="form-label">Email</label>
                  {errors.email && <span className='error-text'> {errors.email}</span>}
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={values.email}
                  onChange={(e)=>{
                    setValues({...values,email:e.target.value})
                  }}/>
                  <div id="emailHelp" class="form-text">Nunca compartilharemos seu e-mail com mais ninguém.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Senha</label>
                  {errors.senha && <span className='error-text'> {errors.senha}</span>}
                  <input type="password" class="form-control" id="exampleInputPassword1"
                  value={values.senha}
                  onChange={(e)=>{
                    setValues({...values,senha:e.target.value})
                  }}/>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" 
                  required
                  class="form-check-input" id="exampleCheck1"
                  value={values.termos}
                  onChange={(e)=>{
                    setValues({...values,termos:e.target.checked})
                  }}/>
                  
                  <label class="form-check-label" for="exampleCheck1">Eu aceito os <a href="../Termos/index.html" >termos e condições.</a></label>
                  
                </div>
                <button type="submit" class="btn btn-primary">Criar conta</button>
              </form>
                </div>
        </div>
    )
}
export default CadUsuario