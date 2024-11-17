

import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
import GerenciarConta from "../Elements/Components/gerenciarConta/Gerenciar";


function PageGerenciarConta() {
  return (
    <>
    <SearchProvider>
      <NavBar/>
      <GerenciarConta />
      <Footer/>
    </SearchProvider>
    </>
  );
  
}


export default PageGerenciarConta;
