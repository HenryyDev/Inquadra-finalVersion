import "../../Css/anuncio.css";
import React from "react";

const Carrossel = ({ imagens }) => {
  // Garante que imagens seja um array válido, mesmo que seja undefined ou null
  const imagensValidas = Array.isArray(imagens) ? imagens : [];

  return (
    <div
      id="carouselExampleControlsNoTouching"
      className="carousel slide"
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className="carousel-inner">
        {imagensValidas.length > 0 ? (
          imagensValidas.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={`http://localhost:3000${img}`}
                className="d-block w-100"
                alt={`Imagem ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/800x400?text=Carregando..."
              className="d-block w-100"
              alt="Carregando..."
            />
          </div>
        )}
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
  );
};

export default Carrossel;
