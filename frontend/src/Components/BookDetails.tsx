import type {Book} from "../models/Book.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import {Link} from "react-router-dom";



type BookDetailProps = {
    bookItem: Book;
    handleDelete: () => void;
};

export default function BookDetail({bookItem,handleDelete} : Readonly<BookDetailProps>) {

    return (
       <>
            <img src={bookItem.thumbnail} alt={bookItem.title} className="mx-auto" width={300} height={300} />

            <div className="">
                <div>
                    <h2 className="cardsTextColor mb-2 text-2xl font-bold ">{bookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Verfassende:</span> {bookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Kategorien:</span> {bookItem.categories}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {bookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {bookItem.publicationDate}</p>
                    <p className="cardsTextColor">{bookItem.description}</p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <div>
                        <Link to={`../../books/${bookItem.id}/edit`} className="cursor-pointer">
                            <EditIcon className="cursor-pointer"/>
                        </Link>
                        <button type="button" className="transparentButton " onClick={handleDelete}>
                            <DeleteIcon/>
                        </button>
                    </div>
                </div>
            </div>
       </>
    );
}