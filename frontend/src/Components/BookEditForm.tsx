import type {Book} from "../models/Book.tsx";

export default function BookEditForm(book : {BookItem:Book}){
    return (
        <>
            {book.BookItem.title}
        </>
    );
}