import NavBar from "./Elements/Components/NavBar.jsx";
import Body from "./Elements/Components/corpoSite/Body.jsx";
import Footer from "./Elements/Components/Footer.jsx";
import { SearchProvider } from "./Elements/Components/PesquisarContext.jsx"
function App() {  
  

  
  return (
    <>
     <SearchProvider>
        <NavBar />
        <Body/>
        <Footer/>
      </SearchProvider>
    </>
  );
}

export default App;
