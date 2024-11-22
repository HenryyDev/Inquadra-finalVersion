import React, { createContext, useState, useContext } from "react";

// Criando o contexto
const SessionContext = createContext();

// Provedor de Sessão
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });

  const login = (email, senha, lembrar) => {
    setSession({ email, senha, lembrar });
  };

  const logout = () => {
    setSession({ email: "", senha: "", lembrar: false });
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook para consumir o contexto
export const useSession = () => useContext(SessionContext);
