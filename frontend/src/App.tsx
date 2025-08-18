import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";

function App() {


  return (
      <>

          <Header></Header>
          <Routes>
              <Route path={""} element={<Books></Books>}/>
          </Routes>


      </>
)
}

export default App
