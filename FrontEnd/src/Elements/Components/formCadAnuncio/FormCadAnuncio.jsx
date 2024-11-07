import React, { useState } from 'react';
import "../../Css/CadAnuncio.css"
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

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
    fotos: [],
    endereco: '',
    cep: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({});
 

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        esportes: {
          ...formData.esportes,
          [name]: checked
        }
      });
    } else if (type === 'file') {
      const fileList = Array.from(files);
      setFormData({
        ...formData,
        fotos: fileList
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo) newErrors.titulo = "Título é obrigatório.";
    if (!formData.descricao) newErrors.descricao = "Descrição é obrigatória.";
    if (!formData.preco) newErrors.preco = "Preço é obrigatório.";
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório.";
    if (!formData.cep) newErrors.cep = "CEP é obrigatório.";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      alert('Anúncio criado com sucesso!');
    }
  };

  return (
    <div className="container-anuncio">
      <div className="anuncio-form">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <Link to={"/"} className='logo-anuncio'>
            <img src={logo} alt="logo" width={"200px"} />
          </Link>
          <h2 className="h2-txt">Compartilhe algumas informações sobre sua quadra</h2>
          <p>Os itens com (<span className='error-text'>*</span>) são obrigatórios</p>

          <label htmlFor="titulo" className="form-label">Título<span className='error-text'>*</span></label>
          {errors.titulo && <span className="error-text">{errors.titulo}</span>}
          <input 
            type="text"
            className="form-control mb-4"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Digite um título para o seu anúncio"
          />
         

          <label htmlFor="descricao" className="form-label">Descrição<span className='error-text'>*</span></label>
          {errors.descricao && <span className="error-text">{errors.descricao}</span>}
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
              <span>Esportes que podem ser feitos na quadra<span className='error-text'>*</span> </span>
              <div className="row">
                <div className="col">
                  {['outros','basquete', 'futebol', 'bilhar', 'golfe', 'natacao'].map((esporte) => (
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
            <label htmlFor="preco" className="form-label">Preço R$<span className='error-text'>*</span></label>
            {errors.preco && <span className="error-text">{errors.preco}</span>}
            <input
              type="number"
              className="form-control mb-4"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              placeholder="Digite o Preço que deseja cobrar"
            />
            
            <label htmlFor="endereco" className="form-label">Endereço<span className='error-text'>*</span></label>
            {errors.endereco && <span className="error-text">{errors.endereco}</span>}
            <input
              type="text"
              className="form-control mb-4"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Digite o Endereço da quadra"
            />
            <label htmlFor="cep" className="form-label">Cep<span className='error-text'>*</span></label>
            {errors.cep && <span className="error-text">{errors.cep}</span>}
            <input 
              type="number"
              className="form-control mb-4"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="Digite o cep da quadra"
            />
            <label htmlFor="telefone" className="form-label">Número<span className='error-text'>*</span></label>
            {errors.telefone && <span className="error-text">{errors.telefone}</span>}
            <input 
              type="tel"
              className="form-control mb-4"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite um número telefônico para contato"
            />
          
          <label htmlFor="fotos" className="form-label">Fotos<span className='error-text'>*</span></label>
          <input 
            className="form-control mb-4"
            type="file"
            id="fotos"
            name="fotos"
            multiple
            onChange={handleChange}
          />
          
          
          <button type="submit" className="btn btn-primary">Criar anúncio</button>
        </form>
      </div>
    </div>
  );
};

export default CadAnuncio;
