import React, { useState } from 'react';  
import "../../Css/CadAnuncio.css" 
import logo from "../../../assets/logo.png";  
import { Link } from "react-router-dom";  

const CadAnuncio = () => {
  // Criação do estado do formulário (formData) com todos os campos necessários
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
    if (type === 'checkbox') {  // Se o campo for checkbox (para selecionar esportes)
      setFormData({
        ...formData,
        esportes: {
          ...formData.esportes,
          [name]: checked  // Atualiza o valor do esporte específico
        }
      });
    } else if (type === 'file') {  // Se o campo for de arquivo (para carregar fotos)
      const fileList = Array.from(files);  // Converte a lista de arquivos em array
      setFormData({
        ...formData,
        fotos: fileList  // Atualiza as fotos
      });
    } else {  // Para outros tipos de input (como texto ou número)
      setFormData({
        ...formData,
        [name]: value  // Atualiza o campo correspondente no estado
      });
    }
  };

  // Função para validar os dados do formulário antes de enviar
  const validateForm = () => {
    const newErrors = {};  // Objeto para armazenar os erros de validação
    if (!formData.titulo) newErrors.titulo = "Título é obrigatório.";  // Verifica se o título está vazio
    if (!formData.descricao) newErrors.descricao = "Descrição é obrigatória.";  // Verifica se a descrição está vazia
    if (!formData.preco) newErrors.preco = "Preço é obrigatório.";  // Verifica se o preço está vazio
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório.";  // Verifica se o endereço está vazio
    if (!formData.cep) newErrors.cep = "CEP é obrigatório.";  // Verifica se o CEP está vazio
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório.";  // Verifica se o telefone está vazio
    
    // Verifica se pelo menos um esporte foi selecionado
    const esporteSelecionado = Object.values(formData.esportes).some(selecionado => selecionado);
    if (!esporteSelecionado) newErrors.esportes = "Selecione pelo menos um esporte.";  // Se não, adiciona erro

    if (formData.fotos.length === 0) newErrors.fotos = "Carregue pelo menos uma imagem.";  // Verifica se há fotos carregadas

    setErrors(newErrors);  // Atualiza o estado de erros com os erros encontrados
    return Object.keys(newErrors).length === 0;  // Retorna true se não houver erros, caso contrário, false
  };

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = (e) => {
    e.preventDefault();  // Previne o comportamento padrão de envio do formulário
    if (validateForm()) {  // Se o formulário for válido
      console.log(formData);  // Mostra os dados no console (para fins de depuração)
      alert('Anúncio criado com sucesso!');  // Exibe uma mensagem de sucesso
    }
  };

  return (
    <div className="container-anuncio">  {/* Contêiner do formulário */}
      <div className="anuncio-form">  {/* Formulário de criação do anúncio */}
        <form onSubmit={handleSubmit} encType='multipart/form-data'>  {/* Formulário com tratamento de submit */}
          <Link to={"/"} className='logo-anuncio'>  {/* Link para a página inicial */}
            <img src={logo} alt="logo" width={"200px"} />  {/* Exibe o logo */}
          </Link>
          <h2 className="h2-txt">Compartilhe algumas informações sobre sua quadra</h2>
          <p>Os itens com (<span className='error-text'>*</span>) são obrigatórios</p>  {/* Texto explicativo sobre campos obrigatórios */}

          {/* Campos do formulário */}
          <label htmlFor="titulo" className="form-label">Título<span className='error-text'>*</span></label>
          {errors.titulo && <span className="error-text">{errors.titulo}</span>}  {/* Exibe mensagem de erro, se houver */}
          <input 
            type="text"
            className="form-control mb-4"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Digite um título para o seu anúncio"
          />

          {/* Campo de descrição */}
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

          {/* Seção de esportes */}
          <div className="check-box my-4">
            <span>Esportes que podem ser feitos na quadra<span className='error-text'>*</span><br /></span>
            {errors.esportes && <span className='error-text'>{errors.esportes}</span>}
            <div className="row">
              {/* Mapeia os esportes e cria os checkboxes */}
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

          {/* Outros campos como preço, endereço, CEP, telefone */}
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

          {/* Outros campos */}
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

          {/* Campo de fotos */}
          <label htmlFor="fotos" className="form-label">Fotos<span className='error-text'>*</span></label>
          {errors.fotos && <span className='error-text'>{errors.fotos}</span> }
          <input 
            className="form-control mb-4"
            type="file"
            id="fotos"
            name="fotos"
            multiple
            onChange={handleChange}
          />
          
          {/* Botão para criar o anúncio */}
          <button type="submit" className="btn btn-primary">Criar anúncio</button>
        </form>
      </div>
    </div>
  );
};

export default CadAnuncio;  // Exporta o componente CadAnuncio para ser utilizado em outras partes do aplicativo
