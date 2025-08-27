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
import * as React from "react";

type bookloadProp = {
    bookItem : Book
    onChange: () => void
}

export default function BookComponent({bookItem, onChange } : bookloadProp ) {

    const [smallCoverError, setSmallCoverError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [checked, setChecked] = useState(bookItem.bookmark ?? false);
    const [favorite, setFavorite] = useState(bookItem.favorite ?? false);
    const [rating, setRating] = React.useState<number | null>(bookItem.rating);

    const updateBook = async (changes: Partial<Book>) => {
        await axios.put(`/api/books/${bookItem.id}`, { ...bookItem, ...changes });
    };

    const toggle = async (key: 'bookmark' | 'favorite') => {
        const newValue = key === 'bookmark' ? !checked : !favorite;

        if (key === 'bookmark') setChecked(newValue);
        else setFavorite(newValue);

        setSaving(true);
        try {
            await updateBook({ [key]: newValue } as Partial<Book>);
        } finally {
            setSaving(false);
            onChange();
        }
    };

    const saveRating = async (newValue: number | null) => {
        setRating(newValue);
        setSaving(true);
        try {
            await updateBook({ rating: newValue } as Partial<Book>);
        } finally {
            setSaving(false);
            onChange();
        }
    };


    return (
        <div className="max-w-sm mx-auto my-4">

            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
                <button
                    onClick={() => toggle('bookmark')}
                    disabled={saving}
                    className="absolute mx-35 -my-10 p-1 cursor-pointer "
                >
                    {checked ? (
                        <BookmarkIcon className="w-6 h-6 text-yellow-400 " />
                    ) : (
                        <BookmarkIcon className="w-6 h-6 dark:text-gray-400 text-gray-600 hover:text-yellow-500" />
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
                <Link to={`/books/${bookItem.id}`} className="cursor-pointer">
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
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        precision={0.5}
                        disabled={saving}
                        onChange={(_, newValue) => { void saveRating(newValue); }}
                    />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <Link to={`/books/${bookItem.id}` } className="cursor-pointer">
                        <ManageSearchIcon />
                    </Link>
                    <Link to={`books/${bookItem.id}/edit`} className="cursor-pointer">
                        <EditIcon className="cursor-pointer"/>
                    </Link>
                    <button
                        type="button"
                        onClick={() => toggle('favorite')}
                        disabled={saving}
                        className="cursor-pointer"
                        aria-label={favorite ? 'Nicht mehr als Favorit markieren' : 'Als Favorit markieren'}
                    >
                        {favorite ? <FavoriteIcon /> : <FavoriteBorder />}
                    </button>
                </div>
            </div>
        </div>
    );

}