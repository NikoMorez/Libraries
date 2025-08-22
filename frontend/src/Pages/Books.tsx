import BookComponent from "../Components/BookComponent.tsx";
import type {Book} from "../models/Book.tsx";

type bookloadProp = {
    books : Book[]
}

export default function Books({books} : bookloadProp) {


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (

                <BookComponent key={book.id}
                    item={book}
                />

            ))}
        </div>
    );
}