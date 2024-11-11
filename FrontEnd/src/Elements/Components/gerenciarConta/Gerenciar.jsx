import "../../Css/GerenciarConta.css"
import IconInfoPessoal from "../../../assets/info-pessoal.svg"
import IconLogin from "../../../assets/escudo.png"
import IconAnuncios from "../../../assets/megafone.png"
import IconGerenciarReserva from "../../../assets/sino-do-hotel (1).png"
import { Link } from "react-router-dom"

const GerenciarConta = ()=>{

    return(
        <>
    <div class="conta ms-5 my-4">
          <h5>Conta</h5>
          <p>NomeUser, emailUser,<Link to={"/perfil"} className="acesso-perfil"> Acessar perfil</Link></p>
        </div>

       <div class="config">
        <ul>
          <li><Link to={"/gerenciar-conta/info-pessoal"}><img src={IconInfoPessoal} alt="" width="95px"/><h5><b>Informações Pessoais</b></h5><p>Forneça detalhes e informações de contato</p></Link></li>
          <li>
            <Link to={"/gerenciar-conta/login-seguranca"}><img src={IconLogin} alt="" width="70px" /><h5><b>Login e Segurança</b></h5>Atualize sua conta e mantenha ela segura</Link>
            </li>
        </ul>
       </div>
       <div class="config">
        <ul>
          <li><img src={IconAnuncios} alt="" width="95px"/><h5><b>Anúncios ativos</b></h5><p>edite ou exclua anúncios ativos</p></li>
          <li><img src={IconGerenciarReserva} alt="" width="95px"/><h5><b>Gerenciar reservas</b></h5><p>Verifique e gerencie suas reservas</p></li>
        </ul>
       </div>
       </>
       )
}

export default GerenciarConta;