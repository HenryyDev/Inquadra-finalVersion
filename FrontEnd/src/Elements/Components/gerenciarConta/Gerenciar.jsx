import "../../Css/GerenciarConta.css"
import IconInfoPessoal from "../../../assets/info-pessoal.svg"
import IconLogin from "../../../assets/escudo.png"
import IconAnuncios from "../../../assets/megafone.png"
import IconGerenciarReserva from "../../../assets/sino-do-hotel (1).png"
import { Link,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";




const GerenciarConta = () => {
  const [data,setData]=useState({
    nome:"",
    email:"",
    id:null
  }
  )
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      try {
        // Decodificando o token
        const tokenDecodificado = jwtDecode(token);
        const primeiroNome =tokenDecodificado.nome.split(" ")[0]
        const nomeFormatado = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
      
        setData((prevData) => ({
          ...prevData, 
          userId:tokenDecodificado.id_usuario, // userId
          nome:nomeFormatado, //  nome
          email:tokenDecodificado.email, // E-mail
        }));

        const currentTime = Date.now() / 1000; 
        if (tokenDecodificado.exp && tokenDecodificado.exp < currentTime) {
          console.log("Token expirado");
          navigate("/login"); 
        }

      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
       
      }
    }
  }, [navigate]);
  return (
    <>

      <div className="conta ms-3 my-4">
        <h5>Conta</h5>
        <p>{data.nome}, {data.email},<Link to={"/perfil"} className="acesso-perfil"> Acessar perfil</Link></p>
      </div>

      <div className="config">
        <ul>
          <li><Link to={"/gerenciar-conta/info-pessoal"}><img src={IconInfoPessoal} alt="" width="95px" /><h5><b>Informações Pessoais</b></h5><p>Forneça detalhes e informações de contato</p></Link></li>
          <li>
            <Link to={"/gerenciar-conta/login-seguranca"}><img src={IconLogin} alt="" width="70px" /><h5><b>Login e Segurança</b></h5>Atualize sua conta e mantenha ela segura</Link>
          </li>
        </ul>
      </div>
      <div className="config">
        <ul>
          <li><Link to={"/gerenciar-conta/anuncios-ativos"}><img src={IconAnuncios} alt="" width="95px" /><h5><b>Anúncios ativos</b></h5><p>edite ou exclua anúncios ativos</p></Link></li>
          <li><Link to={"/gerenciar-conta/gerenciar-reserva"}><img src={IconGerenciarReserva} alt="" width="95px" /><h5><b>Gerenciar reservas</b></h5><p>Verifique e gerencie suas reservas</p></Link></li>
        </ul>
      </div>
    </>
  )
}

export default GerenciarConta;