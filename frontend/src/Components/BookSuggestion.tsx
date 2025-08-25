import type {Book} from "../models/Book.tsx";

export default function BookSuggestion(Book : {BookItem:Book}) {

    function truncateText(text:string, maxLength:number) {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
                </div>
            </div>
            </div>
        </div>
    );
}