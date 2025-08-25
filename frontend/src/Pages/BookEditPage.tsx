import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import type {Book} from "../models/Book.tsx";
import BookEditForm from "../Components/BookEditForm.tsx";

type loadBooks = {
    onEdit: () => void;
};

export default function BookEditPage({onEdit} : Readonly<loadBooks>) {

    const {id} = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);

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

    if (!book) {
        return (
            <div className="">

            </div>
        );
    }

    return (
        <div className="cardsBackGroundColor cardsShadowBorder max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <BookEditForm key={book.id} book={book} onEdit={onEdit}/>
        </div>
    );
}