import { useEffect, useState } from "react";
import axios from "axios";
import type {Book} from "../models/Book.tsx";

import BookComponent from "../Components/BookComponent.tsx";

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);


    useEffect(() => {
        axios
            .get("/api/books")
            .then((response) => {
                setBooks(response.data);

            })
    }, []);

    return (
        <div className="">
            {books.map((book) => (

                <BookComponent key={book.id}
                    item={book}
                />

            ))}
        </div>
    );
}