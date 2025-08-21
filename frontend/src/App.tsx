import './assets/css/App.css'
import Books from "./Pages/Books.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BookDetailPage from "./Pages/BookDetailPage.tsx";
import AddBookPage from "./Pages/AddBookPage.tsx";
import {useEffect, useState} from "react";
import ProtectedRoute from "./ProtectedRoute.tsx";
import axios from "axios";

function App() {

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
              <Route path={""} element={<Books></Books>}/>
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/books/add" element={<AddBookPage/>}/>

              <Route element={<ProtectedRoute user={user} />}>

              </Route>
          </Routes>


      </>
)
}

export default App
