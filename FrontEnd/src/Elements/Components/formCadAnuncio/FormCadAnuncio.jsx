import React, { useState } from "react";
import InputMask from 'react-input-mask';
import "../../Css/CadAnuncio.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import CheckCEP from "../CheckCep";

const CadAnuncio = () => {
  // Criação do estado do formulário (formData) com todos os campos necessários
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
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
    preco: "",
    fotos: [],
    rua: "",
    cep: "",
    telefone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(formData.cep)
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {

      setFormData({
        ...formData,
        esportes: {
          ...formData.esportes,
          [name]: checked,
        },
      });
    } else if (type === "file") {

      const fileList = Array.from(files);
      setFormData({
        ...formData,
        fotos: fileList, // Atualiza as fotos
      });
    } else {

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const validateForm = () => {
    const newErrors = {}; // Objeto para armazenar os erros de validação
    if (!formData.titulo) newErrors.titulo = "Título é obrigatório."; // Verifica se o título está vazio
    if (!formData.descricao) newErrors.descricao = "Descrição é obrigatória."; // Verifica se a descrição está vazia
    if (!formData.preco) newErrors.preco = "Preço é obrigatório."; // Verifica se o preço está vazio
    if (!formData.rua) newErrors.rua = "Endereço é obrigatório."; // Verifica se o endereço está vazio
    if (!formData.cep) newErrors.cep = "CEP é obrigatório."; // Verifica se o CEP está vazio
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório."; // Verifica se o telefone está vazio

    // Verifica se pelo menos um esporte foi selecionado
    const esporteSelecionado = Object.values(formData.esportes).some(
      (selecionado) => selecionado
    );
    if (!esporteSelecionado)
      newErrors.esportes = "Selecione pelo menos um esporte."; // Se não, adiciona erro

    if (formData.fotos.length === 0)
      newErrors.fotos = "Carregue pelo menos uma imagem.";

    setErrors(newErrors); // Atualiza o estado de erros com os erros encontrados
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros, caso contrário, false
  };

  const handleBLurCEP = (e) => {
    CheckCEP(e, setFormData, setErrors);
  }
  var removerFormatacao = (telefone) => formData.telefone.replace(/\D/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const telefoneFormatado = removerFormatacao(formData.telefone);
    setFormData({
      ...formData,
      telefone: telefoneFormatado,
    });

    if (validateForm()) {
      // Se o formulário for válido
      console.log(formData);
      alert("Anúncio criado com sucesso!");
    }
  };

  return (
    <div className="container-anuncio">
      <div className="anuncio-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Link to={"/"} className="logo-anuncio">
            <img src={logo} alt="logo" width={"200px"} />
          </Link>
          <h2 className="h2-txt">
            Compartilhe algumas informações sobre sua quadra
          </h2>
          <p>
            Os itens com (<span className="error-text">*</span>) são
            obrigatórios
          </p>

          <label htmlFor="titulo" className="form-label">
            Título<span className="error-text">*</span>
          </label>
          {errors.titulo && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.titulo}</span>
            </div>
          )}

          <input
            type="text"
            className="form-control mb-4"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Digite um título para o seu anúncio"
          />

          <label htmlFor="descricao" className="form-label">
            Descrição<span className="error-text">*</span>
          </label>
          {errors.descricao && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.descricao}</span>
            </div>
          )}
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
            <span>
              Esportes que podem ser feitos na quadra
              <span className="error-text">*</span>
              <br />
            </span>
            {errors.esportes && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.esportes}</span>
              </div>
            )}
            <div className="row">
              <div className="col">
                {["outros", "basquete", "futebol", "golfe", "natacao"].map(
                  (esporte) => (
                    <div key={esporte}>
                      <label
                        className="form-check-label d-block"
                        htmlFor={esporte}
                      >
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
                  )
                )}
              </div>
              <div className="col">
                {["volei", "tenis", "pong", "skate", "futsal"].map(
                  (esporte) => (
                    <div key={esporte}>
                      <label
                        className="form-check-label d-block"
                        htmlFor={esporte}
                      >
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
                  )
                )}
              </div>
            </div>
          </div>
          <label htmlFor="preco" className="form-label">
            Preço R$<span className="error-text">*</span>
          </label>
          {errors.preco && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.preco}</span>
            </div>
          )}
          <input
            type="number"
            className="form-control mb-4"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Digite o Preço que deseja cobrar"
          />
          <label htmlFor="cep" className="form-label">
            Cep<span className="error-text">*</span>
          </label>
          {errors.cep && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.cep}</span>
            </div>
          )}
          <InputMask
            mask="99999-999"
            type="text"
            className="form-control mb-4"
            name="cep"
            value={formData.cep}
            onBlur={handleBLurCEP}
            onChange={handleChange}
            placeholder="Digite o cep da quadra"
          >
            {(inputProps) => <input{...inputProps} />}
          </InputMask>
          <label htmlFor="rua" className="form-label">
            Logradouro<span className="error-text">*</span>
          </label>
          {errors.rua && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.rua}</span>
            </div>
          )}
          <input
            type="text"
            className="form-control mb-4"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            placeholder="Digite o Endereço da quadra"
          />
          <label htmlFor="numero" className="form-label">
            Número<span className="error-text">*</span>
          </label>
          <input
            type="text"
            className="form-control mb-4"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Digite o número da quadra"
          />
          <label htmlFor="telefone" className="form-label">
            Telefone<span className="error-text">*</span>
          </label>
          {errors.telefone && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.telefone}</span>
            </div>
          )}
          <InputMask
            mask={"(99) 99999-9999"}
            className="form-control mb-4"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Digite um número telefônico para contato"
          >
            {(inputProps) => <input{...inputProps} />}
          </InputMask>

          <label htmlFor="fotos" className="form-label">
            Fotos<span className="error-text">*</span>
          </label>
          {errors.fotos && (
            <div className="alert alert-danger" role="alert">
              <span className="error-text">{errors.fotos}</span>
            </div>
          )}
          <input
            className="form-control mb-4"
            type="file"
            id="fotos"
            name="fotos"
            multiple
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Criar anúncio
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadAnuncio;
