import "../Css/footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container ">
          <ul className="my-4">
            <h3>INquadra&reg;</h3>
            <h5>Seu espaço para o esporte e a diversão!</h5>
            Oferecemos quadras de alta qualidade para você praticar seu esporte
            favorito com conforto e praticidade. Seja para treino, lazer ou
            competição, nosso objetivo é proporcionar momentos inesquecíveis e
            cheios de energia positiva. Alugue sua quadra de forma rápida e
            fácil e venha viver a paixão pelo esporte!
          </ul>
          <ul className="link my-4">
            <h3>Link</h3>
            <li>
              <a href="pags/Termos/index.html" target="_self">
                Termos e condições
              </a>
            </li>
            <li>
              <a href="#section02">O que somos</a>
            </li>
            <li>
              <a href="#section03">Nossa história</a>
            </li>
            
          </ul>

          <ul className="my-4">
            <h3>Contatos</h3>
            <li>+55 41 99999-99999</li>
            <li>henry4i20@gmail.com</li>
            <li>Brasil</li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
