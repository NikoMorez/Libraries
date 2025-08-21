import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BookDetailPage from "./Pages/BookDetailPage.tsx";
import AddBookPage from "./Pages/AddBookPage.tsx";

function App() {


  return (
      <>

          <Header></Header>
          <Routes>
              <Route path={""} element={<Books></Books>}/>
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/books/add" element={<AddBookPage/>}/>
          </Routes>


      </>
)
}

export default App
