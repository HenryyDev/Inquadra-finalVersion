import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para acessar os parâmetros da URL
import axios from "axios";
import Pesquisar from "./Pesquisar";

const PesquisarPai = () => {
  const { termo } = useParams(); // Acessando o termo de pesquisa a partir da URL
  const [resultados, setResultados] = useState([]); // Garantindo que resultados seja um array vazio inicialmente

  useEffect(() => {
    const fetchResults = async () => {
      console.log("Buscando resultados para o termo:", termo)
      if (termo.trim()) {
        try {
          const response = await axios.get(`http://localhost:3000/busca/${termo}`);
          setResultados(Array.isArray(response.data) ? response.data : []); // Garantindo que é um array
        } catch (error) {
          console.error("Erro ao buscar resultados:", error);
          setResultados([]); // Limpa os resultados em caso de erro
        }
      } else {
        setResultados([]); // Limpa os resultados se o termo estiver vazio
      }
    };

    fetchResults();
  }, [termo]); // Chama a função sempre que o termo mudar

  return (
    <div>
      <Pesquisar termo={termo} resultados={resultados} />
    </div>
  );
};

export default PesquisarPai;
