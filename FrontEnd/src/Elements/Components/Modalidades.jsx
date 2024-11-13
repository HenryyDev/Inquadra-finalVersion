
import { Link } from "react-router-dom";
import outros from "../../assets/outros.png";
import basquete from "../../assets/basquetebol 1.svg"

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
            <li value={basquete}>
              <Link to={""}>
                <img src={basquete} alt="" width="40px" />
                <p>basquete</p>
              </Link>
            </li>
            <li value={futebol}>
              <Link to={""}
              ><img src={futebol} alt="" width="40px" />
                <p>Futebol</p>
              </Link>
            </li>



            <li value={golfe}>
              <Link to={""}
              ><img src={golfe} alt="" width="40px" />
                <p>golfe</p>
              </Link>
            </li>
            <li value={natacao}>
              <Link to={""}
              ><img src={natacao} alt="" width="40px" />
                <p>Natação</p></Link
              >
            </li>
            <li value={volei}>
              <Link to={""}
              ><img src={volei} alt="" width="40px" />
                <p>vôlei</p></Link
              >
            </li>
            <li>
              <Link to={""}>
                <img src={tenis} alt="" width="40px" />
                <p>tênis</p></Link
              >
            </li>
            <li>
              <Link to={""}
              ><img src={pong} alt="" width="40px" />
                <p>Pong</p></Link
              >
            </li>
            <li>
              <Link to={""}
              ><img src={skate} alt="" width="40px" />
                <p>Skate</p></Link
              >
            </li>
            <li>
              <Link to={""}
              ><img src={futsal} alt="" width="40px" />
                <p>Futsal</p>
              </Link>
            </li>
            <li value={outros}>
              <Link to={""}
              ><img src={outros} alt="" width="40px" />
                <p>outros</p></Link
              >
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
export default Modalidades