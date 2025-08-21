import type {Book} from "../models/Book.tsx";

export default function BookSuggestion(Book : {BookItem:Book}) {

    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
            <img src={Book.BookItem.smallThumbnail} alt={Book.BookItem.title} className=""/>
            <div className="">
                <div>
                    <h2 className="text-xl font-bold cardsTextColor mb-2">{Book.BookItem.title}</h2>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">Autor:</span> {Book.BookItem.author}</p>
                    <p className="cardsTextColor mb-1"><span className="font-semibold">ISBN:</span> {Book.BookItem.isbn}</p>
                    <p className="cardsTextColor mb-3"><span className="font-semibold">Veröffentlicht:</span> {Book.BookItem.publicationDate}</p>
                    <p className="cardsTextColor">{Book.BookItem.description}</p>
                </div>
            </div>
            </div>
        </div>
    );
}