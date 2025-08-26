import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";
import {Link} from "react-router-dom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import axios from "axios";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";



type bookloadProp = {
    bookItem : Book
    onChange: () => void
}


export default function BookComponent({bookItem, onChange } : bookloadProp ) {

    const [smallCoverError, setSmallCoverError] = useState(false);



    const [saving, setSaving] = useState(false);
    const [checked, setChecked] = useState(bookItem.bookmark ?? false);
    const [favorite, setFavorite] = useState(bookItem.favorite ?? false);

    const handleToggle = async () => {
        const newValue = !checked;
        setChecked(newValue);
        setSaving(true);

        console.log(newValue);


        try {
            await axios.put(`/api/books/${bookItem.id}`, {
                author : bookItem.author,
                isbn: bookItem.isbn,
                description: bookItem.description,
                smallThumbnail: bookItem.smallThumbnail,
                thumbnail: bookItem.thumbnail,
                publicationDate : bookItem.publicationDate,
                categories: bookItem.categories,
                bookmark: newValue,
                favorite: bookItem.favorite,
            });
        } finally {
            setSaving(false);
            onChange();
        }
    };

    const handldeFavoriteToggle = async () => {
        const newValue = !favorite;
        setFavorite(newValue);
        setSaving(true);

        console.log(newValue);


        try {
            await axios.put(`/api/books/${bookItem.id}`, {
                author : bookItem.author,
                isbn: bookItem.isbn,
                description: bookItem.description,
                smallThumbnail: bookItem.smallThumbnail,
                thumbnail: bookItem.thumbnail,
                publicationDate : bookItem.publicationDate,
                categories: bookItem.categories,
                bookmark: bookItem.bookmark,
                favorite: newValue,
            });
        } finally {
            setSaving(false);
            onChange();
        }
    };





    return (
        <div className="max-w-sm mx-auto my-4">

            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
                <button
                    onClick={() => handleToggle()}
                    disabled={saving}
                    className="absolute mx-35 -my-10 p-1 cursor-pointer "
                >
                    {checked ? (
                        <BookmarkIcon className="w-6 h-6 text-yellow-400 " />
                    ) : (
                        <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-yellow-400" />
                    )}
                </button>


                {bookItem.smallThumbnail && !smallCoverError ?(
                             <img
                                 src={bookItem.smallThumbnail}
                                 className={"mx-auto mb-5"}
                                 alt="Vorschau kleines Cover"
                                 height={125}
                                 width={125}
                                 loading="lazy"
                                 referrerPolicy="no-referrer"
                                 onError={() => setSmallCoverError(true)}
                             />
                ) : <div></div>
                }
                <Link to={`/Books/${bookItem.id}`} className="cursor-pointer">
                    <h2 className="text-xl font-bold cardsTextColor mb-2">{bookItem.title}</h2>
                    <p className="cardsTextColor">
                        <span className="font-semibold">Verfassende:</span> {bookItem.author}
                    </p>

                    <p className="cardsTextColor">
                        <span className="font-semibold">Kategorien:</span> {bookItem.categories}
                    </p>

                    <p className="cardsTextColor">
                        <span className="font-semibold">ISBN:</span> {bookItem.isbn}
                    </p>

                    <p className="cardsTextColor">
                        <span className="font-semibold">Veröffentlicht:</span> {new Date(bookItem.publicationDate).toLocaleDateString("de-DE")}
                    </p>

                    <p className="cardsTextColor mt-3 text-sm">
                        {bookItem.description.length > 160 ?
                            bookItem.description.substring(0,160) +"... " :
                            bookItem.description }
                    </p>

                </Link>

                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <Link to={`/books/${bookItem.id}` } className="cursor-pointer">
                        <ManageSearchIcon />
                    </Link>
                    <Link to={`books/${bookItem.id}/edit`} className="cursor-pointer">
                        <EditIcon className="cursor-pointer"/>
                    </Link>
                    <Link to={""}  className="cursor-pointer" onClick={handldeFavoriteToggle}>
                        {bookItem.favorite ? (
                            <FavoriteIcon className="cursor-pointer" />
                        ) : (
                            <FavoriteBorder className="cursor-pointer" />
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );

}