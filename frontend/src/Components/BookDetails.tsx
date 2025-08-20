import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";


export default function BookDetail(Book : {BookItem:Book}) {

    return (
       <>
            <img src={Book.BookItem.thumbnail} alt={Book.BookItem.title} className="" />

            <div className="">
                <div>
                    <h2 className="cardsTextColor mb-2 text-2xl font-bold ">{Book.BookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Autor:</span> {Book.BookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {Book.BookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {Book.BookItem.publicationDate}</p>
                    <p className="cardsTextColor">{Book.BookItem.description}</p>
                </div>

                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
            </div>
       </>
    );
}