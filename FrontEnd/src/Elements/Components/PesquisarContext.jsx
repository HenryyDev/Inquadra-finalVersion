import React, { createContext, useContext, useState } from "react";

// Cria o contexto
const SearchContext = createContext();

// Hook para acessar o contexto facilmente
export const useSearch = () => useContext(SearchContext);

// Provedor do contexto
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");  // Estado para o termo de pesquisa

  // Função para atualizar o termo de pesquisa
  const handleSearch = (termo) => {
    setQuery(termo);
  };

  return (
    // Provedor que compartilha o estado e a função
    <SearchContext.Provider value={{ query, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};