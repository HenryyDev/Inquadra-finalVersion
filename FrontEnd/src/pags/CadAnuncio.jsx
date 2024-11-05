import React, { useState } from 'react';
import "../Elements/Css/CadAnuncio.css"
import logo from "../assets/logo.png"
import {Link} from "react-router-dom"

const CadAnuncio = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    esportes: {
      basquete: false,
      futebol: false,
      bilhar: false,
      golfe: false,
      natacao: false,
      volei: false,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false,
    },
    preco: '',
    fotos: null,
    endereco: '',
    cep: '',
    telefone: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        esportes: {
          ...formData.esportes,
          [name]: checked
        }
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        fotos: e.target.files
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container-anuncio">
        <div className="login anuncio-form">
          <form onSubmit={handleSubmit}>
            <Link to={"/"} className='logo-anuncio'> <img src={logo} alt="" width={"200px"} /></Link>
            <h2 className="h2-txt">
              Compartilhe algumas informações sobre sua quadra
            </h2>
            <p>Os itens com (*) são obrigatórios</p>
           
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control mb-4"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Digite um título para o seu anúncio"
              />
              <label htmlFor="descricao" className="form-label">Descrição</label>
              <textarea
                className="form-control"
                id="descricao"
                name="descricao"
                rows="3"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Digite uma descrição para sua quadra"
              ></textarea>
           
            <div className="check-box my-4">
              <span>Esportes que podem ser feitos na quadra: </span>
              <div className="row">
                <div className="col">
                  {['basquete', 'futebol', 'bilhar', 'golfe', 'natacao'].map((esporte) => (
                    <div key={esporte}>
                      <label className="form-check-label d-block" htmlFor={esporte}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={esporte}
                          checked={formData.esportes[esporte]}
                          onChange={handleChange}
                        />
                        {esporte.charAt(0).toUpperCase() + esporte.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col">
                  {['volei', 'tenis', 'pong', 'skate', 'futsal'].map((esporte) => (
                    <div key={esporte}>
                      <label className="form-check-label d-block" htmlFor={esporte}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={esporte}
                          checked={formData.esportes[esporte]}
                          onChange={handleChange}
                        />
                        {esporte.charAt(0).toUpperCase() + esporte.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <label htmlFor="preco" className="form-label">Preço R$</label>
            <input
              type="number"
              className="form-control mb-4"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              placeholder="Digite o Preço que deseja cobrar"
            />
            <label htmlFor="fotos" className="form-label">Fotos</label>
            <input
              className="form-control mb-4"
              type="file"
              id="fotos"
              name="fotos"
              multiple
              onChange={handleChange}
            />
            <label htmlFor="endereco" className="form-label">Endereço</label>
            <input
              type="text"
              className="form-control mb-4"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Digite o Endereço da quadra"
            />
            <label htmlFor="cep" className="form-label">Cep</label>
            <input
              type="number"
              className="form-control mb-4"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="Digite o cep da quadra"
            />
            <label htmlFor="telefone" className="form-label">Número</label>
            <input
              type="tel"
              className="form-control mb-4"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite um número telefônico para contato"
            />
            <button type="submit" className="btn btn-primary">Criar anúncio</button>
          </form>
        </div>
    </div>
  );
};

export default CadAnuncio;
