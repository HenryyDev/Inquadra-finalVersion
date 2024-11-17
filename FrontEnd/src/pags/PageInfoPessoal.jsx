import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"

import InfoPessoal from "../Elements/Components/InfoPessoais/InfoPessoais";


export default function  PageInfoPessoal(){

    return(
        <>
       <SearchProvider>
           <NavBar/>
            <InfoPessoal/>
            <Footer/>
       </SearchProvider>
        </>
    )
}
