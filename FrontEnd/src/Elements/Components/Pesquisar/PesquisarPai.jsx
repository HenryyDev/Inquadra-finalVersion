import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para capturar os parâmetros de consulta
import axios from "axios";
import Pesquisar from "./Pesquisar";

const PesquisarPai = () => {
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const termo = searchParams.get("termo") || "";  // Obtém o termo de pesquisa
  const modalidade = searchParams.get("modalidade") || "";  // Obtém a modalidade
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);  // Estado para controle de carregamento
  const [erro, setErro] = useState(null);  // Estado para controle de erros

  useEffect(() => {
    const fetchResults = async () => {
      // Se não houver nenhum parâmetro de busca, não faz a requisição
      if (!termo.trim() && !modalidade.trim()) {
        setResultados([]); // Limpa os resultados caso não haja busca
        return;
      }
      
      setCarregando(true);  // Começa o carregamento
      setErro(null);  // Reseta o erro
      
      try {
        const response = await axios.get("http://localhost:3000/quadras/esporte", {
          params: { termo, modalidade }
        });

        // Se a resposta for um array, armazene os dados
        setResultados(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        setErro("Erro ao carregar os resultados");  // Define uma mensagem de erro
        setResultados([]); // Limpa os resultados em caso de erro
      } finally {
        setCarregando(false);  // Finaliza o carregamento
      }
    };

    fetchResults();
  }, [termo, modalidade]); // Recarrega os resultados sempre que mudar o termo ou a modalidade



  return (
    <div>
      <Pesquisar 
        termo={termo} 
        modalidade={modalidade} 
        resultados={resultados} 
        carregando={carregando}  // Passa o estado de carregamento
        erro={erro}  // Passa a mensagem de erro, se houver
      />
    </div>
  );
};

export default PesquisarPai;
