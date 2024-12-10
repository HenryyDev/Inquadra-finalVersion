import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/termosCondicoes.css'; 
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
const TermosCondicoes = () => {
  return (
    <div className="termos-container">
      <div className="termos">
       
          <Link to={"/"}>
              <img
                src={logo}
                alt="Logo"
                width="300px"
                className="logo"
              />
          </Link>
        
        <h1>Termos e Condições de Uso</h1>
        <p>
          1. Ao acessar e utilizar o site InQuadra, você concorda em cumprir e
          estar vinculado aos seguintes Termos e Condições de Uso. Caso não
          concorde com qualquer parte destes termos, você não deve utilizar este
          site.
        </p>
        <p>
          2. O InQuadra oferece um serviço de intermediação para a reserva e
          aluguel de quadras esportivas. As quadras disponíveis, horários e
          valores são determinados pelos proprietários das quadras e podem ser
          alterados a qualquer momento.
        </p>
        <p>
          3. Para realizar reservas, é necessário criar uma conta no site. Você
          é responsável por fornecer informações precisas e atualizadas durante o
          registro. A responsabilidade pela segurança e confidencialidade de suas
          credenciais de login é exclusivamente sua.
        </p>
        <p>
          4. Reservas e Pagamentos
          <br />
          <strong>4.1.</strong> As reservas devem ser feitas diretamente através
          do site, sujeitas à disponibilidade da quadra.
          <br />
          <strong>4.2.</strong> O pagamento deve ser efetuado no momento da
          reserva, por meio das formas de pagamento disponibilizadas no site.
          <br />
          <strong>4.3.</strong> Em caso de cancelamento, será aplicada a
          política de cancelamento descrita na seção 5 abaixo.
        </p>
        <p>
          5. Cancelamento e Reembolsos
          <br />
          <strong>5.1.</strong> Cancelamentos com mais de [X] horas de
          antecedência terão reembolso integral.
          <br />
          <strong>5.2.</strong> Cancelamentos com menos de [X] horas de
          antecedência não serão reembolsados.
          <br />
          <strong>5.3.</strong> Em caso de não comparecimento ("no-show"), o
          valor pago não será reembolsado.
        </p>
        <p>
          6. Limitação de Responsabilidade
          <br />
          <strong>6.1.</strong> O InQuadra não se responsabiliza por acidentes,
          lesões ou qualquer dano ocorrido durante o uso das quadras.
          <br />
          <strong>6.2.</strong> O site atua apenas como intermediário e não é
          responsável pela qualidade ou condições das quadras alugadas.
        </p>
        <p>
          7. O InQuadra se reserva o direito de modificar estes Termos e
          Condições a qualquer momento. As alterações entrarão em vigor
          imediatamente após sua publicação no site.
        </p>
        <p>
          8. O InQuadra compromete-se a proteger a privacidade dos usuários. O
          uso de dados pessoais é regido por nossa Política de Privacidade.
        </p>
        <p>
          9. Em caso de dúvidas ou solicitações, entre em contato conosco
          através do e-mail inquadra2024@gmail.com ou telefone 41 4002-8922.
        </p>
      </div>
    </div>
  );
};

export default TermosCondicoes;
