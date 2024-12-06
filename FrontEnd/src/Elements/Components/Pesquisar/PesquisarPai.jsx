import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para capturar os parâmetros de consulta
import axios from "axios";
import Pesquisar from "./Pesquisar";

const PesquisarPai = () => {
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const termo = searchParams.get("termo") || ""; 
  const modalidade = searchParams.get("modalidade") || ""; 
  const [resultados, setResultados] = useState([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      

      // Chama a API apenas se o termo ou modalidade não estiverem vazios
      if (termo.trim() || modalidade.trim()) {
        try {
          const response = await axios.get(
            `http://localhost:3000/quadras/esporte`, {
              params: { termo, modalidade } 
            }
          );
        
          
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
console.log("resultado",resultados)
  return (
    <div>
      <Pesquisar termo={termo} modalidade={modalidade} resultados={resultados} />
    </div>
  );
};

export default PesquisarPai;
//