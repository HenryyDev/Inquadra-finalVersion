// Imports de bibliotecas externas
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import {Link} from "react-router-dom"
import logo from "../../../assets/logo.png"
import "../../../Elements/Css/login.css"

const Login=()=>{
    const [values, setValues]=useState({
        email: "",
        senha:"",
        lembrar:false,
    })
    const handleSubmit = (event) => {
        console.log(values.lembrar)
        event.preventDefault(); 
       
        
      };
    return(
        <>
    <div className='login-container'>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
        
            
                
              
              <Link to={"/"}>
                  <img
                    src={logo}
                    alt="Logo"
                    width="180px"
                    className="logo"
                    />
                    </Link>
              
            
        
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})
                }
              />
              <div id="emailHelp" className="form-text">
                Nunca compartilharemos seu e-mail com mais ninguém.
              </div>
            </div>
        
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={values.senha} // Estado da senha
                onChange={(e) => setValues({...values, senha: e.target.value})
                }
              />
            </div>
        
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={values.lembrar} // Estado do checkbox
                onChange={(e) => setValues({...values, lembrar: e.target.checked}
                    )      
             }
              />
              <label className="salvar-senha" htmlFor="rememberMe">
                Lembrar de mim
              </label>
              <p className="txt">
                Não possui conta?
                <Link to={"/Cadastro-usuario"}><span style={{color:" #0000FF"}}> Criar conta</span></Link>
                  
                
              </p>
            </div>
        
            <button type="submit" className="btn btn-primary btn-login">
              Entrar
            </button>
          </form>
        </div>
    </div>
    </>
  );
}


export default Login;