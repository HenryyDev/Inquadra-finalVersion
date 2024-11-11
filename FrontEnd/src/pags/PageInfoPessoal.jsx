import { Link } from "react-router-dom";
import NavBar from "../Elements/Components/NavBar";
import InfoPessoal from "../Elements/Components/InfoPessoais/InfoPessoais";
import Footer from "../Elements/Components/Footer";

export default function  PageInfoPessoal(){

    return(
        <>
        <NavBar/>
        <InfoPessoal/>
        <Footer/>
        </>
    )
}
