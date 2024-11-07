import "../Css/NavBar.css"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.min.js'
import lupa from "../../assets/lupa.png"
import menu from "../../assets/menu.svg"
const NavBar=()=>{


    return(
        <>
<header>
      <div class="header-container">
        
        <Link to={"/"}><img src={logo} alt="" width="96" class="logo-img" /></Link>
        <div class="search">
          <label for="searchInput"
            ><img class="lupa" src={lupa} alt="" width="24px"
          /></label>
          <input type="text" id="searchInput" placeholder="Pesquisar" /> 
        </div>
       
        
        
        <button class="login-link login01">
          <Link to={"/login"}>Login</Link>
          </button>
        <button class="login-link login02">
          <Link to={"/cadastro-anuncio"}>Anuncie-aqui</Link>
        </button>
        <div class="foto-user"><img src="assets/foto-padrao.png" alt="" /></div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={menu} alt="" />
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link to={"/gerenciar-conta"}className="dropdown-item">Gerenciar conta</Link>
              </li>
            <li>
            <Link to={"/cadastro-anuncio"}className="dropdown-item">Anuncie-aqui</Link>
            </li>
            <li>
              <Link to={"/login"}className="dropdown-item">Login</Link>
            </li>
            <li>
              <Link to={"/cadastro-usuario"} className="dropdown-item">Criar conta</Link>
            </li>
            <li><a class="dropdown-item" href="#">Sair</a></li> 
          </ul>
        </div>
      </div>
    </header>
    </>
    )
}

export default NavBar;