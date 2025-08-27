import type {Book} from "../models/Book.tsx";
import type {BookDTO} from "../models/BookDTO.tsx"
import axios from "axios";
import {useState} from "react";

type bookSuggestionsProps = {
    Book : {BookItem: Book};
    onAdd: () => void;
}

export default function BookSuggestion(props: Readonly<bookSuggestionsProps>) {

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    function truncateText(text:string, maxLength:number) {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    async function addBookToDB() {
        try {
            const bookToPost: BookDTO = {
                title: props.Book.BookItem.title, author: props.Book.BookItem.author, isbn: props.Book.BookItem.isbn,
                categories: props.Book.BookItem.categories, publicationDate: props.Book.BookItem.publicationDate,
                description: props.Book.BookItem.description, smallThumbnail: props.Book.BookItem.smallThumbnail,
                thumbnail: props.Book.BookItem.thumbnail,
                bookmark: false,
                favorite: false,
                rating: null
            };
            await axios.post("/api/books", bookToPost);
            props.onAdd();
            setButtonDisabled(true)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
            <div className="">
                <div>
                    <img src={props.Book.BookItem.smallThumbnail} alt={props.Book.BookItem.title} className="smallImg mx-auto"/>
                    <h2 className="text-xl font-bold cardsTextColor mb-2">{props.Book.BookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Verfassende:</span> {props.Book.BookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Kategorien:</span> {props.Book.BookItem.categories}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {props.Book.BookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {props.Book.BookItem.publicationDate}</p>
                    <p className="cardsTextColor">{truncateText(props.Book.BookItem.description, 200)}</p>
                    <button onClick={addBookToDB} disabled={buttonDisabled}>{buttonDisabled ? "Bereits in Bibliothek" : "Zur Bibliothek hinzufügen"}</button>
                </div>
            </div>
            </div>
        </div>
    );
}