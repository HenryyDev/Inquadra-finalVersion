import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
import GerenciarReserva from "../Elements/Components/gerenciarReserva/GerenciarReserva";


export default function PageGerenciarReserva(){

    return(
        <>
        <SearchProvider>
            <NavBar/>
            <GerenciarReserva/>
            <Footer/>
        </SearchProvider>
        </>
    )
}