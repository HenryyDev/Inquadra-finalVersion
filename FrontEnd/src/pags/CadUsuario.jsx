import React, { useState } from 'react';
import "../Elements/Css/CadUsuario.css"
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const CadUsuario = ()=>{


    return (
        <div className="body-user">
            <div class="login">
            <form>
                <Link to={"/"}><img src={logo} alt="" width="180px" class="logo"/></Link>
                <h2 class="h2-txt">Crie sua conta. É grátis!</h2>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nome</label>
                    <input type="text" class="form-control nome"/>
                  <label for="exampleInputEmail1" class="form-label">CPF</label>
                  <input type="text" class="form-control nome"/>
                  <label for="exampleInputEmail1" class="form-label">Email</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <div id="emailHelp" class="form-text">Nunca compartilharemos seu e-mail com mais ninguém.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Senha</label>
                  <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label" for="exampleCheck1">Eu aceito os <a href="../Termos/index.html" >termos e condições.</a></label>
                </div>
                <button type="submit" class="btn btn-primary">Criar conta</button>
              </form>
                </div>
        </div>
    )
}
export default CadUsuario