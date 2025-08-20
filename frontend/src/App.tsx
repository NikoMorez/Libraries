import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BookDetailPage from "./Pages/BookDetailPage.tsx";
import BookEditPage from "./Pages/BookEditPage.tsx";

function App() {


  return (
      <>

          <Header></Header>
          <Routes>
              <Route path={""} element={<Books></Books>}/>
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/books/:id/edit" element={<BookEditPage/>} />
          </Routes>


      </>
)
}

export default App
