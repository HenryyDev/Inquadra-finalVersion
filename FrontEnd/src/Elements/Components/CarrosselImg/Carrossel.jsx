import "../../Css/carrousel.css";
import React, { useState } from "react";

const Carrossel = ({ imagens }) => {
  const imagensValidas = Array.isArray(imagens) ? imagens : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para navegar para a próxima imagem
  const handleNext = () => {
    if (currentIndex < imagensValidas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Função para navegar para a imagem anterior
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Função para navegar diretamente para a imagem clicada no indicador
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        {imagensValidas.map((_, index) => (
          <li
            key={index}
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner">
        {imagensValidas.length > 0 ? (
          imagensValidas.map((img, index) => (
            <div
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              <img
                src={`http://localhost:3000${img}`}
                className="imagem-car"
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

      {/* Botões de navegação */}
      <a
        className={`carousel-control-prev ${currentIndex === 0 ? 'disabled' : ''}`}
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className={`carousel-control-next ${currentIndex === imagensValidas.length - 1 ? 'disabled' : ''}`}
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};

export default Carrossel;
