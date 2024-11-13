import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../NavBar.jsx";
import golfimg from "../../../assets/golf.jpg";
import Footer from "../Footer.jsx";
import "../../../Elements/Css/anuncio.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState } from "react";
import Carrossel from "../CarrosselImg/Carrossel.jsx";
import { useParams, Link } from "react-router-dom";

function Anuncio() {

  const quadrasData = [
    {
      id: 1,
      titulo: "Quadra de Futebol Society",
      descricao: "Quadra de futebol society, gramado sintético, com iluminação.",
      esportes: {
        basquete: false,
        futebol: true,
        bilhar: false,
        golfe: false,
        natacao: false,
        volei: true,
        tenis: false,
        pong: false,
        skate: false,
        futsal: true
      },
      preco: 150,
      fotos: [golfimg, golfimg],
      endereco: "Rua dos Esportes, 123",
      cep: "12345000",
      telefone: "(11) 98765-4321"
    },
    {
      id: 2,
      titulo: "Quadra de Tênis",
      descricao: "Quadra de tênis em saibro, com rede e iluminação noturna.",
      esportes: {
        basquete: false,
        futebol: false,
        bilhar: false,
        golfe: false,
        natacao: false,
        volei: false,
        tenis: true,
        pong: false,
        skate: false,
        futsal: false
      },
      preco: 100,
      fotos: [golfimg, golfimg],
      endereco: "Avenida das Raquetes, 456",
      cep: "54321000",
      telefone: "(11) 91234-5678"
    },
    {
      id: 3,
      titulo: "Quadra de Vôlei de Praia",
      descricao: "Quadra de vôlei de praia com rede e areia fofa.",
      esportes: {
        basquete: false,
        futebol: false,
        bilhar: false,
        golfe: false,
        natacao: false,
        volei: true,
        tenis: false,
        pong: false,
        skate: false,
        futsal: false
      },
      preco: 120,
      fotos: [golfimg, golfimg],
      endereco: "Praia dos Esportes, 789",
      cep: "98765432",
      telefone: "(11) 92345-6789"
    },
    {
      id: 4,
      titulo: "Quadra de Basquete",
      descricao: "Quadra de basquete com pintura profissional e aro de alta qualidade.aaaaaaaaaaaaaaaaaaaaaa",
      esportes: {
        basquete: true,
        futebol: false,
        bilhar: false,
        golfe: false,
        natacao: false,
        volei: false,
        tenis: false,
        pong: false,
        skate: false,
        futsal: false
      },
      preco: 80,
      fotos: [golfimg, golfimg],
      endereco: "Avenida do Basquete, 321",
      cep: "45678900",
      telefone: "(11) 93456-7890"
    },
    {
      id: 5,
      titulo: "Quadra de Futebol de Areia",
      descricao: "Quadra de futebol de areia com iluminação e cercado.",
      esportes: {
        basquete: false,
        futebol: true,
        bilhar: false,
        golfe: false,
        natacao: false,
        volei: false,
        tenis: false,
        pong: false,
        skate: false,
        futsal: false
      },
      preco: 130,
      fotos: [golfimg, golfimg],
      endereco: "Rua da Praia, 654",
      cep: "11223344",
      telefone: "(11) 94567-8901"
    },
    {
      id: 6,
      titulo: "Quadra de Golfe",
      descricao: "Quadra de golfe com grama sintética e buracos de diferentes distâncias.",
      esportes: {
        basquete: false,
        futebol: false,
        bilhar: false,
        golfe: true,
        natacao: false,
        volei: false,
        tenis: false,
        pong: false,
        skate: false,
        futsal: false
      },
      preco: 200,
      fotos: [golfimg, golfimg],
      endereco: "Rua do Golfe, 890",
      cep: "33221100",
      telefone: "(11) 95678-9012"
    }
  ];
  const { id } = useParams(); // Captura o ID da URL
  const quadra = quadrasData.find((quadra) => quadra.id === parseInt(id)); // Busca a quadra no array

  const getEsportesAtivos = (esportes) => {
    return Object.keys(esportes)
      .filter((esporte) => esportes[esporte]) // Filtra apenas os esportes com valor true
      .map((esporte) => esporte.charAt(0).toUpperCase() + esporte.slice(1)); // Capitaliza a primeira letra do nome do esporte
  };

  const [data, setData] = useState(new Date());
  const [checkinTime, setCheckinTime] = useState(null);
  const [checkoutTime, setCheckoutTime] = useState(null);

  // Horário atual
  const horario = new Date();
  horario.setHours(horario.getHours() + 1); // Adiciona 2 horas ao horário atual
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
        <Carrossel imagens={quadra.fotos} />

      </div>


      <div className="desc-checkin">
        <div className="desc">

          <h2 id="h2-desc">Descrição</h2>
          <span id="txt-desc">
            {quadra.descricao}
          </span>
          <h3>Esportes que podem ser feitos na quadra:</h3>
          <ul style={{ listStyleType: "none", display: "flex", textAlign: "center", justifyContent: "center" }}>
            {getEsportesAtivos(quadra.esportes).map((esporte, index) => {
              return <li key={index} style={{ margin: "0 10px" }}> {esporte} </li>
            })}
          </ul>
          <h3>Localização</h3>
          <p>{quadra.endereco} | Cep: {quadra.cep}</p>
        </div>
        <div className="check-in">
          <h2>R${quadra.preco}/hora</h2>
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

    </>
  );
}

export default Anuncio;
