import PerfilUser from "../Elements/Components/PerfilUser/PerfilUser";
import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
export default function PagePerfilUser(){

    return (
        <>
        <SearchProvider>
            <NavBar/>
            <PerfilUser/>
            <Footer/>
        </SearchProvider>
        </>

    )
}