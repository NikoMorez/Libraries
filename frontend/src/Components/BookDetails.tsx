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

           <h2 className="cardsTextColor mb-4 text-2xl font-bold text-center">
               {bookItem.title}
           </h2>
           <div className="flex flex-col md:flex-row gap-6">
               <img
                   src={bookItem.thumbnail}
                   alt={bookItem.title}
                   className="mx-auto my-auto w-[400px] h-[400px] object-contain"
               />
               <div>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">Verfassende:</span> {bookItem.author}</p>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">Kategorien:</span> {bookItem.categories}</p>
                    <p className="cardsTextColor text-left mb-1"><span className="font-bold">ISBN:</span> {bookItem.isbn}</p>
                    <p className="cardsTextColor text-left mb-3"><span className="font-bold">Veröffentlicht:</span> {new Date(bookItem.publicationDate).toLocaleDateString("de-DE")}</p>
                    <p className="cardsTextColor text-left">{bookItem.description}</p>
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
           </div>
       </>
    );
}