import "./Css/NavBar.css"
import logo from "../assets/logo.png"
import lupa from "../assets/lupa.png"
const NavBar=()=>{


    return(
        <>
<header>
      <div class="header-container">
        
        <img src={logo} alt="" width="96" class="logo-img" />
        <div class="search">
          <label for="searchInput"
            ><img class="lupa" src={lupa} alt="" width="24px"
          /></label>
          <input type="text" id="searchInput" placeholder="Pesquisar" /> 
        </div>
       
        
        
        <button class="login login01">
          <a href="pags/login/index.html" target="_self">Login</a> 
          </button>
        <button class="login login02">
          <a href="pags/cadastro-anuncio/index.html">Anuncie-aqui</a>
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
            <img src="assets/menu.svg" alt="" />
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="pags/conta/index.html">Configurações</a></li>
            <li>
              <a class="dropdown-item" href="pags/cadastro-anuncio/index.html"
                >Anuncie-aqui</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="pags/login/index.html"
                target="_self"
                >Login</a>
            </li>
            <li>
              <a class="dropdown-item" href="pags/cadastro/index.html"
                >Criar conta</a>
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