import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para capturar os parâmetros de consulta
import axios from "axios";
import Pesquisar from "./Pesquisar";

const PesquisarPai = () => {
  const location = useLocation();
  console.log("location",location.search); 
  const searchParams = new URLSearchParams(location.search);
  const termo = searchParams.get("termo") || ""; // Parâmetro de pesquisa
  const modalidade = searchParams.get("modalidade") || ""; // Parâmetro de modalidade
  const [resultados, setResultados] = useState([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      console.log("Buscando resultados para:", termo, modalidade); // Verifique se o termo e a modalidade estão corretos

      // Chama a API apenas se o termo ou modalidade não estiverem vazios
      if (termo.trim() || modalidade.trim()) {
        try {
          const response = await axios.get(
            `http://localhost:3000/busca/?termo=${termo}&modalidade=${modalidade}`
          );
          console.log(response.data); // Verifique a resposta da API no console
          
          // Se a resposta for um array, armazene os dados
          setResultados(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Erro ao buscar resultados:", error);
          setResultados([]); // Limpa os resultados em caso de erro
        }
      } else {
        setResultados([]); // Limpa os resultados se não houver termo ou modalidade
      }
    };

    fetchResults();
  }, [termo, modalidade]); // Recarrega os resultados sempre que mudar o termo ou a modalidade

  return (
    <div>
      <Pesquisar termo={termo} modalidade={modalidade} resultados={resultados} />
    </div>
  );
};

export default PesquisarPai;
