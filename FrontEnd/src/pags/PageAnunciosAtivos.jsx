import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
import AnunciosAtivos from "../Elements/Components/AnunciosAtivos/AnuncioAtivos";


export default function PageAnunciosAtivos(){

    return(
        <>
        <SearchProvider>
            <NavBar/>
            <AnunciosAtivos/>
            <Footer/>
        </SearchProvider>
        </>
    )
}