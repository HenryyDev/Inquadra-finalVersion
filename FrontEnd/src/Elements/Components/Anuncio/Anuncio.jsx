import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../NavBar.jsx";
import golfimg from "../../../assets/golf.jpg";
import Footer from "../Footer.jsx";
import "../../../Elements/Css/anuncio.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState } from "react";

function Anuncio() {
  const [data, setData] = useState(new Date());
  const [checkinTime, setCheckinTime] = useState(null);
  const [checkoutTime, setCheckoutTime] = useState(null);

  // Horário atual
  const horario = new Date();
  horario.setHours(horario.getHours() + 2); // Adiciona 2 horas ao horário atual
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

  return (
    <>
      <NavBar />
      <div className="imagem-anuncio">
        <div
          id="carouselExampleControlsNoTouching"
          className="carousel slide"
          data-bs-touch="false"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={golfimg} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={golfimg} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={golfimg} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="desc-checkin">
        <div className="desc">
          <h2 id="h2-desc">Descrição</h2>
          <span id="txt-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
            voluptatem illo consequatur sit aut maxime earum magnam eius
            excepturi? Aspernatur libero sint molestiae vitae numquam deleniti
            cumque, id corporis. Beatae! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aperiam modi maxime voluptas. Aliquam, similique
            aperiam vitae aliquid impedit deserunt excepturi praesentium
            asperiores soluta rerum earum quidem? Vitae sint at illum.
          </span>
        </div>
        <div className="check-in">
          <h2>R$125 Hora</h2>
          <span id="aval">
            <img src="../../assets/estrela.png" alt="" width="20px" /> 4,81
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
              console.log(horario);
            }}
          >
            Reservar
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Anuncio;
