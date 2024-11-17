import { Link } from "react-router-dom";
import outros from "../../assets/outros.png";
import basquete from "../../assets/basquetebol 1.svg";
import futebol from "../../assets/bola.png";
import golfe from "../../assets/golfe.png";
import natacao from "../../assets/oculos-de-natacao.png";
import volei from "../../assets/voleibol.png";
import tenis from "../../assets/tenis.png";
import pong from "../../assets/pingue-pongue.png";
import skate from "../../assets/patim.png";
import futsal from "../../assets/objetivo.png";

const Modalidades = () => {
  return (
    <>
      <section className="modalidade">
        <div className="retangulo my-4">
          <ul className="links">
            <li>
              <Link to={`/busca/?modalidade=basquete`}>
                <img src={basquete} alt="Basquete" width="40px" />
                <p>Basquete</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=futebol`}>
                <img src={futebol} alt="Futebol" width="40px" />
                <p>Futebol</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=golfe`}>
                <img src={golfe} alt="Golfe" width="40px" />
                <p>Golfe</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=natacao`}>
                <img src={natacao} alt="Natação" width="40px" />
                <p>Natação</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=volei`}>
                <img src={volei} alt="Vôlei" width="40px" />
                <p>Vôlei</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=tenis`}>
                <img src={tenis} alt="Tênis" width="40px" />
                <p>Tênis</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=pong`}>
                <img src={pong} alt="Pingue Pongue" width="40px" />
                <p>Pong</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=skate`}>
                <img src={skate} alt="Skate" width="40px" />
                <p>Skate</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=futsal`}>
                <img src={futsal} alt="Futsal" width="40px" />
                <p>Futsal</p>
              </Link>
            </li>
            <li>
              <Link to={`/busca/?modalidade=outros`}>
                <img src={outros} alt="Outros" width="40px" />
                <p>Outros</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Modalidades;
