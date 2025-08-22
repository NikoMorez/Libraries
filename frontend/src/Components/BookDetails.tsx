import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



type BookDetailProps = {
    BookItem: Book;
    handleDelete: () => void;
};

export default function BookDetail({BookItem,handleDelete} : BookDetailProps) {

    return (
       <>
            <img src={BookItem.thumbnail} alt={BookItem.title} className="" />

            <div className="">
                <div>
                    <h2 className="cardsTextColor mb-2 text-2xl font-bold ">{BookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Autor:</span> {BookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {BookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {BookItem.publicationDate}</p>
                    <p className="cardsTextColor">{BookItem.description}</p>
                </div>
                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <div>
                        <button type="button" className="transparentButton text-red-600" onClick={handleDelete}>
                            <DeleteIcon/>
                        </button>
                    </div>
                </div>
            </div>
       </>
    );
}