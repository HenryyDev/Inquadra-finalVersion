import NavBar from "../Elements/Components/NavBar"
import {SearchProvider } from "../Elements/Components/PesquisarContext"
import PesquisarPai from "../Elements/Components/Pesquisar/PesquisarPai"
import Footer from "../Elements/Components/Footer"

export default function PagePesquisa(){

    return(
        <>
        <SearchProvider>
      <NavBar />
      <PesquisarPai />
      <Footer />
    </SearchProvider>
        </>
    )
}
