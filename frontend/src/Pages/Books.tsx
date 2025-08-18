import { useEffect, useState } from "react";
import axios from "axios";
import type {Book} from "../models/Book.tsx";

import BookComponent from "../Components/BookComponent.tsx";

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);


    useEffect(() => {
        axios
            .get("/api/libraries")
            .then((response) => {
                setBooks(response.data);

            })
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (

                <BookComponent key={book.id}
                    item={book}
                />

            ))}
        </div>
    );
}