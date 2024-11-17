import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
import Anuncio from "../Elements/Components/Anuncio/Anuncio";



function PageAnuncio() {
  return (
    <>
    <SearchProvider>
      <NavBar/>
      <Anuncio />
      <Footer/>
    </SearchProvider>
    </>
  );

}

export default PageAnuncio;
