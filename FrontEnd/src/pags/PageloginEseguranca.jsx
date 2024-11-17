import LoginEseguranca from "../Elements/Components/LoginEsegunrança/LoginEseguranca"
import NavBar from "../Elements/Components/NavBar";
import Footer from "../Elements/Components/Footer";
import {SearchProvider } from "../Elements/Components/PesquisarContext"
const PageLoginEseguranca=()=>{

    return(
        <>
        <SearchProvider>
            <NavBar/>
                <LoginEseguranca/>
                <Footer/>
        </SearchProvider>
    </>
)
}

export default PageLoginEseguranca