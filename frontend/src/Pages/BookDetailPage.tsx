import {useEffect, useState} from "react";
import type {Book} from "../models/Book.tsx";
import axios from "axios";

import {useParams} from "react-router-dom";
import BookDetail from "../Components/BookDetails.tsx";

export default function BookDetailPage() {
    const {id} = useParams<{ id: string }>();
    const [Book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/books/${id}`)
                .then((response) => {
                    setBook(response.data);

                })
        }else{
            console.log(id)
        }
    }, [id]);

    if (!Book) {
        return (
            <div className="">

            </div>
        );
    }


    return (
        <div className="cardsBackGroundColor cardsShadowBorder max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <BookDetail key={Book.id} BookItem={Book}/>
        </div>
    );
}