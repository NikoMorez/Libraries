import {useState} from "react";
import type {Book} from "../models/Book.tsx";
import axios from "axios";
import BookSuggestion from "../Components/BookSuggestion.tsx";

type loadBooks = {
    onAddBook: () => void;
};

export default function AddBookPage({onAddBook} : Readonly<loadBooks>) {

    const [books, setBooks] = useState<Book[]>([]);
    const [query, setQuery] = useState("");

    const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === "Enter") {
           searchBooks();

        }
    }

    const searchBooks = () => {
        axios
            .get("/api/books/search?query="+query)
            .then((response) => {
                setBooks(response.data);
            });
    };

    return (
        <>
            <input className={"border-2 rounded px-4 py-1.5"} onChange={
                (event) =>
                    setQuery(event.target.value)
            } placeholder={"Suchbegriffe eingeben"}
                   value={query} onKeyDown={keyDownHandle}/>
            <button className={"stdButton bg-gray-700 dark:text-gray-200 text-white dark mx-3"} onClick={searchBooks}>Suchen</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookSuggestion key={book.id} Book={{BookItem: book}} onAdd={onAddBook} />
            ))}
            </div>
        </>
    );
}