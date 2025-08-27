import {useEffect, useState} from "react";
import type {Book} from "../models/Book.tsx";
import axios from "axios";

import {useNavigate, useParams} from "react-router-dom";
import BookDetail from "../Components/BookDetails.tsx";
import ModalQuestion from "../Components/ModalQuestion.tsx";


type loadBooks = {
    onDelete: () => void;
};

export default function BookDetailPage({onDelete} : Readonly<loadBooks>) {
    const {id} = useParams<{ id: string }>();
    const [Book, setBook] = useState<Book | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/books/${id}`);
            onDelete();
            navigate("/");
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
        }
    };



    return (
        <div className="cardsBackGroundColor cardsShadowBorder max-w-3xl mx-auto p-6 flex flex-col gap-6">
            <BookDetail key={Book.id} bookItem={Book} handleDelete={() => setModalOpen(true)}  />

            <ModalQuestion isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleDelete}
                           modalTitle={"Buch löschen"}
                           modalDescription={"Willst du dieses Buch wirklich löschen?"}
                           bgColor={"dark:bg-gray-600 bg-stone-700"}
                           buttonTrueColor={"deleteColor"}
                           buttonTrueText={"Löschen"}
            ></ModalQuestion>

        </div>
    );
}