import {useEffect, useState} from "react";
import type {Book} from "../models/Book.tsx";
import axios from "axios";
import BookSuggestion from "../Components/BookSuggestion.tsx";

export default function AddBookPage() {

    const [books, setBooks] = useState<Book[]>([]);
    const [query, setQuery] = useState("Hello");

    useEffect(() => {
        axios
            .get("/api/books/search?query="+query)
            .then((response) => {
                setBooks(response.data);
            })
    }, []);

    return (
        <>
            <input onChange={
                (event) =>
                    setQuery(event.target.value)
            } placeholder={"Enter description"}
                   value={query}/>
            <button>Suchen</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookSuggestion key={book.id} BookItem={book}/>
            ))}
            </div>
        </>
    );
}