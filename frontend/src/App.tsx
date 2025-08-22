import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BookDetailPage from "./Pages/BookDetailPage.tsx";
import AddBookPage from "./Pages/AddBookPage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import type {Book} from "./models/Book.tsx";

function App() {

    const [books, setBooks] = useState<Book[]>([]);

    const loadBooks = async () =>  {

        try {
            const respone = await axios.get("/api/books");
            setBooks(respone.data);
            console.log(respone.data)
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        }
    }

    useEffect(() => {
        loadBooks()
    }, []);


    return (
      <>


          <Header></Header>
          <Routes>
              <Route path={""} element={<Books books={books}></Books>}/>
              <Route path="/books/:id" element={<BookDetailPage onDelete={loadBooks} />} />
              <Route path="/books/add" element={<AddBookPage/>}/>
          </Routes>


      </>
)
}

export default App
