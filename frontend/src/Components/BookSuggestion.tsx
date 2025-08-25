import type {Book} from "../models/Book.tsx";
import type {BookDTO} from "../models/BookDTO.tsx"
import axios from "axios";

export default function BookSuggestion(Book : {BookItem:Book}) {

    function truncateText(text:string, maxLength:number) {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    function addBookToDB() {
        const bookToPost:BookDTO = {title:Book.BookItem.title, author:Book.BookItem.author, isbn:Book.BookItem.isbn,
            categories:Book.BookItem.categories, publicationDate:Book.BookItem.publicationDate,
            description:Book.BookItem.description, smallThumbnail:Book.BookItem.smallThumbnail,
            thumbnail:Book.BookItem.thumbnail}
        axios.post("/api/books", bookToPost).then((res) => {console.log(res.data);})
            .catch(e => {console.log(e);});
    }

    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
            <div className="">
                <div>
                    <img src={Book.BookItem.smallThumbnail} alt={Book.BookItem.title} className="smallImg mx-auto"/>
                    <h2 className="text-xl font-bold cardsTextColor mb-2">{Book.BookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Verfassende:</span> {Book.BookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Kategorien:</span> {Book.BookItem.categories}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {Book.BookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {Book.BookItem.publicationDate}</p>
                    <p className="cardsTextColor">{truncateText(Book.BookItem.description, 200)}</p>
                    <button onClick={addBookToDB}>Zur Bibliothek hinzufügen</button>
                </div>
            </div>
            </div>
        </div>
    );
}