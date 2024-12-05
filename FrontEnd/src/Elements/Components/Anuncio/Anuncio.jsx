import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import estrela from "../../../assets/estrela.png"
import "../../../Elements/Css/anuncio.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState, useEffect } from "react";
import Carrossel from "../CarrosselImg/Carrossel.jsx";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Anuncio() {
  const { id } = useParams(); // Captura o ID da URL

  const [quadra, setQuadra] = useState(null);

  const [data, setData] = useState(new Date());
  const [checkinTime, setCheckinTime] = useState(null);
  const [checkoutTime, setCheckoutTime] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/quadras/id/${id}`)
      .then((resposta) => {
        console.log("Resposta da API:", resposta); // Verifique a resposta aqui

        setQuadra(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro ao buscar quadra:", erro);
        setQuadra(null); // Se ocorrer um erro, defina quadra como null
      });
  }, [id]);

  // Horário atual
  const horario = new Date();
  horario.setHours(horario.getHours() + 1); 
  horario.setSeconds(0);
  horario.setMilliseconds(0);

  // Função para verificar se a data selecionada é o dia de hoje
  const Diahoje = (date) => {
    const dia = new Date();
    return (
      date.getDate() === dia.getDate() &&
      date.getMonth() === dia.getMonth() &&
      date.getFullYear() === dia.getFullYear()
    );
  };

  // Função para determinar o minTime do check-in
  const getMinTimeForCheckin = (date) => {
    if (Diahoje(date)) {
      // Se for o dia de hoje, limita ao horário atual
      return new Date(date.setHours(horario.getHours(), horario.getMinutes()));
    }
    // Se for outro dia, define o início do dia (00:00)
    return new Date(date.setHours(0, 0, 0, 0));
  };

  // Função para determinar o minTime do check-out
  const getMinTimeForCheckout = () => {
    if (checkinTime) {
      return new Date(checkinTime.getTime() + 60 * 60000);
    }
    return horario;
  };

  if (!quadra) {
    return <p>Quadra não encontrada</p>; // Mensagem se o ID da quadra não existir
  }

  return (
    <>
      <h1 className="title-quadra">{quadra.titulo}</h1>
      <div className="imagem-anuncio">
        <Carrossel imagens={quadra.fotos}  />
      </div>

      <div className="desc-checkin">
        <div className="desc">
          <h2 id="h2-desc">Descrição</h2>
          <span id="txt-desc">{quadra.descricao}</span>
          <h3>Esportes que podem ser feitos na quadra</h3>
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {quadra.esportes && quadra.esportes.length > 0 ? (
              quadra.esportes.map((esporte, index) => (
                <div key={esporte} style={{backgroundColor:"#94B0B3", borderRadius:"25px", marginLeft:"10px"}}>
                  <li key={index} style={{ margin: "0 10px" }}>
                  
                    {esporte}
                  </li>
                </div>
              ))
            ) : (
              <li>Nenhum esporte disponível</li>
            )}
          </ul>

          <h3>Localização</h3>
          <p>
            Cep:{quadra.cep} | Município: {quadra.municipio} | Bairro:{" "}
            {quadra.bairro}
          </p>
          <Link><p style={{color:"#0000FF"}}>Ver perfil anunciante</p></Link>
        </div>
        <div className="check-in">
          <h2>R${quadra.preco_por_hora}/hora</h2>

          <span id="aval">
            <img src={estrela} alt="" width="20px" />{" "}
            {quadra.media_avaliacao}
          </span>

          <div className="calendario">
            <label>Data</label>
            <DatePicker
              selected={data}
              onChange={(date) => setData(date)}
              minDate={new Date()} // Somente datas futuras ou a data de hoje
              dateFormat={"dd/MM/yyyy"}
              className="input-horario"
            />
          </div>

          <div className="calendario">
            <label>Check-in</label>
            <DatePicker
              selected={checkinTime}
              onChange={(time) => setCheckinTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              minTime={getMinTimeForCheckin(data)} // Limita o horário de check-in
              maxTime={new Date().setHours(23, 59)} // Limite para o final do dia
              placeholderText="Selecione o horário"
              className="input-horario"
            />
          </div>

          <div className="calendario">
            <label>Check-out</label>
            <DatePicker
              selected={checkoutTime}
              onChange={(time) => setCheckoutTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              placeholderText="Selecione o horário"
              className="input-horario"
              minTime={getMinTimeForCheckout()} // Limita o horário de check-out
              maxTime={new Date().setHours(23, 59)} // Limite para o final do dia
              disabled={checkinTime === null}
            />
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              console.log(quadra);
            }}
          >
            Reservar
          </button>
        </div>
      </div>
    </>
  );
}

export default Anuncio;
