import "../../Css/anuncio.css"
import React, { useState, useEffect } from 'react';


const Carrossel = () => {
  // Estado para armazenar as imagens
  const [images, setImages] = useState([]);
 

  // Efeito para buscar as imagens da API (ou banco de dados)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Substitua a linha abaixo pela sua requisição real, se necessário
        // const response = await axios.get('/api/get-images');
        
        // Simulação de imagens retornando de uma API
        const golfimg = [
          { url: 'https://via.placeholder.com/800x400?text=Imagem+1' },
          { url: 'https://via.placeholder.com/800x400?text=Imagem+2' },
          { url: 'https://via.placeholder.com/800x400?text=Imagem+3' }
        ];

        setImages(golfimg); // Supondo que a resposta seja um array de URLs de imagens
      } catch (error) {
        console.error('Erro ao carregar as imagens:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      id="carouselExampleControlsNoTouching"
      className="carousel slide"
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className="carousel-inner">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img src={image.url} className="d-block w-100" alt="Imagem do carrossel" />
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img src="loading.gif" className="d-block w-100" alt="Carregando..." />
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
