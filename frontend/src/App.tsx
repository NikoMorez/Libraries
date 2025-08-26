import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BookDetailPage from "./Pages/BookDetailPage.tsx";
import BookEditPage from "./Pages/BookEditPage.tsx";
import AddBookPage from "./Pages/AddBookPage.tsx";
import type {Book} from "./models/Book.tsx";
import {useEffect, useState} from "react";
import ProtectedRoute from "./ProtectedRoute.tsx";
import axios from "axios";

function App() {

    const [books, setBooks] = useState<Book[]>([]);

    const loadBooks = async () =>  {

        try {
            const response = await axios.get("/api/books");
            setBooks(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        }
    }

    useEffect(() => {
        loadBooks()
    }, []);

    const [user, setUser] = useState<string | undefined | null>(undefined);

    function login() {
        const host:string = window.location.host === "localhost:5173"
            ? "http://localhost:8080"
            : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "self")
    }

    function logout() {
        const host:string = window.location.host === "localhost:5173"
            ? "http://localhost:8080"
            : window.location.origin;
        window.open(host + "/logout", "self")
    }

    const loadUser = () => {
        axios.get("/api/auth/me")
            .then((response) => setUser(response.data))
            .catch(() => setUser(null));
    }

    useEffect(() => {
        loadUser()
    }, []);

    return (
      <>

          <Header user={user} onLogin={login} onLogout={logout} />
          <Routes>
              <Route path={""} element={<Books books={books}></Books>}/>
              <Route path="/books/:id" element={<BookDetailPage onDelete={loadBooks} />} />
              <Route path="/books/add" element={<AddBookPage onAddBook={loadBooks}/>}/>
              <Route element={<ProtectedRoute user={user} />} >
                  <Route path="/books/:id/edit" element={<BookEditPage onEdit={loadBooks} />} />
              </Route>
          </Routes>


      </>
)
}

export default App
