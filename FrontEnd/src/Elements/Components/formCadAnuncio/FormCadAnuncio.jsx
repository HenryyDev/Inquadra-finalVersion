import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaskInput from "react-maskinput";
import "../../Css/CadAnuncio.css";
import logo from "../../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CheckCEP from "../CheckCep";

const CadAnuncio = () => {
  // Criação do estado do formulário (formData) com todos os campos necessários
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco_hora: "",
    esporte: {
      basquete: false,
      futebol: false,
      outros: false,
      golfe: false,
      natacao: false,
      volei: false,
      tenis: false,
      pong: false,
      skate: false,
      futsal: false,
    },
    imagens: [],
    cep: "",
    bairro: "",
    municipio: "",
    uf: "",
    logradouro: "",
    numero_e: "",

  });
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.error("Você precisa estar logado para criar um anúncio.");
      navigate("/login"); // Redireciona para a página de login
    }
    console.log(token)
  }, [token, navigate]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        esporte: {
          ...formData.esporte,
          [name]: checked, // Atualiza para true ou false dependendo do estado do checkbox
        },
      });
    } else if (type === "file") {
      const fileList = Array.from(files);
      const validImages = fileList.filter((file) =>
        file.type.startsWith("image/")
      );
      setFormData({
        ...formData,
        imagens: validImages,
      });
    } else {
      // Remover a formatação do telefone se o campo alterado for "numero_t"
      if (name === "numero_t") {
        const numero_tFormatado = value.replace(/\D/g, "");
        setFormData({
          ...formData,
          [name]: numero_tFormatado,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }

  };
  const validateForm = () => {
    const newErrors = {}; // Objeto para armazenar os erros de validação
    if (!formData.nome) newErrors.nome = "Título é obrigatório."; // Verifica se o título está vazio
    if (!formData.descricao) newErrors.descricao = "Descrição é obrigatória."; // Verifica se a descrição está vazia
    if (formData.descricao.length > 1999) newErrors.descricao = "Descrição superior a 2000 caracteres"
    if (!formData.preco_hora) newErrors.preco_hora = "Preço é obrigatório."; // Verifica se o preço está vazio
    if (!formData.logradouro) newErrors.logradouro = "Endereço é obrigatório."; // Verifica se o endereço está vazio
    if (!formData.cep) newErrors.cep = "CEP é obrigatório."; // Verifica se o CEP está vazio


    // Verifica se pelo menos um esporte foi selecionado
    const esporteSelecionado = Object.values(formData.esporte).some(
      (selecionado) => selecionado
    );
    if (!esporteSelecionado)
      newErrors.esporte = "Selecione pelo menos um esporte."; // Se não, adiciona erro
    if (formData.imagens.length === 0)
      newErrors.imagens = "Carregue pelo menos uma imagem.";

    setErrors(newErrors); // Atualiza o estado de erros com os erros encontrados
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros, caso contrário, false
  };

  const handleBlurCEP = (e) => {
    CheckCEP(e, setFormData, setErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida o formulário antes de enviar os dados
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros antes de enviar.");
      return;
    }

    // Criação do objeto FormData e envio dos dados para o backend
    const formDataToSend = new FormData();
    formDataToSend.append("nome", formData.nome);
    formDataToSend.append("descricao", formData.descricao);
    formDataToSend.append("preco_hora", formData.preco_hora);
    formDataToSend.append("cep", formData.cep);
    formDataToSend.append("bairro", formData.bairro);
    formDataToSend.append("municipio", formData.municipio);
    formDataToSend.append("uf", formData.uf);
    formDataToSend.append("logradouro", formData.logradouro);
    formDataToSend.append("numero_e", formData.numero_e);
    console.log("Dados enviados para o servidor:", formDataToSend);
    // Adiciona os dados do esporte
    formDataToSend.append("esporte", JSON.stringify(formData.esporte));

    // Adiciona as imagens
    formData.imagens.forEach((image) => {
      formDataToSend.append("imagens", image);
    });


    axios
      .post("http://localhost:3000/quadras", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resposta) => {
        console.log("Resposta da requisição:", resposta);
        navigate("/");
      })
      .catch((erro) => {
        console.log("Erro na requisição:", erro.response?.data || erro);
        toast.error("Erro ao criar anúncio");
      });

  };

  return (
    <>
      <ToastContainer />
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

            <label htmlFor="nome" className="form-label">
              Título<span className="error-text">*</span>
            </label>
            {errors.nome && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.nome}</span>
              </div>
            )}
            <input
              type="text"
              className="form-control mb-4"
              name="nome"
              maxLength={2000}
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite um título para o seu anúncio "
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
              placeholder="Digite uma descrição para sua quadra (maximo 2000 caracteres)"
            ></textarea>

            <div className="check-box my-4">
              <span>
                Esportes que podem ser feitos na quadra
                <span className="error-text">*</span>
              </span>
              {errors.esporte && (
                <div className="alert alert-danger" role="alert">
                  <span className="error-text">{errors.esporte}</span>
                </div>
              )}
              <div className="row">
                {Object.keys(formData.esporte).map((esporte, index) => (
                  <div key={esporte} className="col-6 col-md-4">
                    {" "}
                    {/* Cada coluna ocupa 6 em telas pequenas e 4 em telas maiores */}
                    <label className="form-check-label d-block" htmlFor={esporte}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={esporte}
                        checked={formData.esporte[esporte]}
                        onChange={handleChange}
                      />
                      {esporte.charAt(0).toUpperCase() + esporte.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <label htmlFor="preco_hora" className="form-label">
              Preço por hora R$<span className="error-text">*</span>
            </label>
            {errors.preco_hora && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.preco_hora}</span>
              </div>
            )}
            <input
              type="number"
              className="form-control mb-4"
              name="preco_hora"
              value={formData.preco_hora}
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
            <MaskInput
              alwaysShowMask
              maskChar="_"
              mask="00000-000"
              type="text"
              className="form-control mb-4"
              name="cep"
              value={formData.cep}
              onBlur={handleBlurCEP}
              onChange={handleChange}
              onFocus={(e) => {
                // Usando setTimeout para garantir que o foco seja processado
                setTimeout(() => {
                  e.target.setSelectionRange(0, 0); // Força o cursor para o início
                }, 0);
              }}
              placeholder="Digite o cep da quadra"
            />

            <label htmlFor="logradouro" className="form-label">
              Logradouro<span className="error-text">*</span>
            </label>
            {errors.logradouro && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.logradouro}</span>
              </div>
            )}
            <input
              type="text"
              className="form-control mb-4"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              placeholder="Digite o logradouro da quadra"
            />

            <label htmlFor="numero_e" className="form-label">
              Número<span className="error-text">*</span>
            </label>
            <input
              type="text"
              className="form-control mb-4"
              name="numero_e"
              value={formData.numero_e}
              onChange={handleChange}
              placeholder="Digite o número do endereço"
              
            />




            <label htmlFor="imagens" className="form-label">
              Imagens<span className="error-text">*</span>

            </label>
            <div id="emailHelp" className="form-text">
              formatos suportados:jpeg, png e jpg
            </div>
            {errors.imagens && (
              <div className="alert alert-danger" role="alert">
                <span className="error-text">{errors.imagens}</span>
              </div>
            )}
            <input
              className="form-control mb-4"
              type="file"
              id="imagens"
              name="imagens"
              multiple
              onChange={handleChange}
            />


            <button type="submit" className="btn btn-primary">
              Criar anúncio
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
console;
export default CadAnuncio;
