import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



type BookDetailProps = {
    bookItem: Book;
    handleDelete: () => void;
};

export default function BookDetail({bookItem,handleDelete} : Readonly<BookDetailProps>) {

    return (
       <>
            <img src={bookItem.thumbnail} alt={bookItem.title} className="" />

            <div className="">
                <div>
                    <h2 className="cardsTextColor mb-2 text-2xl font-bold ">{bookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Verfassende:</span> {bookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Kategorien:</span> {bookItem.categories}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {bookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {bookItem.publicationDate}</p>
                    <p className="cardsTextColor">{bookItem.description}</p>
                </div>
                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <div>
                        <button type="button" className="transparentButton text-gray-200" onClick={handleDelete}>
                            <DeleteIcon/>
                        </button>
                    </div>
                </div>
            </div>
       </>
    );
}