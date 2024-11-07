// Imports de bibliotecas externas
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "../NavBar.jsx";
import golfimg from "../../../assets/golf.jpg"
import Footer from "../Footer.jsx";
import "../../../Elements/Css/anuncio.css"
import 'bootstrap/dist/js/bootstrap.min.js'

const Anuncio=()=>{


    return (
        <>
        <NavBar/>
        <div class="imagem-anuncio">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src={golfimg} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={golfimg} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={golfimg} class="d-block w-100" alt="..."/>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
        
        <div  class="desc-checkin">
         
            <div class="desc">
                <h2 id="h2-desc">Descrição</h2>
                <span id="txt-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad voluptatem illo consequatur sit aut maxime earum magnam eius excepturi? Aspernatur libero sint molestiae vitae numquam deleniti cumque, id corporis. Beatae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi maxime voluptas. Aliquam, similique aperiam vitae aliquid impedit deserunt excepturi praesentium asperiores soluta rerum earum quidem? Vitae sint at illum.</span>
            </div>
            <div class="check-in"><h2>R$125 Hora</h2><span id="aval"><img src="../../assets/estrela.png" alt="" width="20px"/> 4,81</span>
                <button class="btn btn-primary" type="button">Reservar</button></div>
        </div>
        <Footer/>
       
        </>
    )
}

export default Anuncio;