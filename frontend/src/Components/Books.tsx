import { useEffect, useState } from "react";
import axios from "axios";
import type {Book} from "../models/Book";
import {Rating} from "@mui/material";

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
        <div className="">
            {books.map((book) => (
                <div key={book.id} className="">
                    <h2>
                        {book.title}
                    </h2>
                    <p className="">
                        <span className="">Autor:</span> {book.author}
                    </p>
                    <p className="">
                        <span className="">ISBN:</span> {book.isbn}
                    </p>
                    <p className="">
                        <span className="">Veröffentlicht:</span>{" "}
                        {book.publicationDate}
                    </p>
                    <p className="">{book.description}</p>
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
            ))}
        </div>
    );
}