import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";
import {Link} from "react-router-dom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function BookComponent( Book : {item:Book} ) {

    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
                <Link to={`/Books/${Book.item.id}`} className="cursor-pointer">
                    <h2 className="text-xl font-bold cardsTextColor mb-2">{Book.item.title}</h2>

                    <p className="cardsTextColor">
                        <span className="font-semibold">Autor:</span> {Book.item.author}
                    </p>

                    <p className="cardsTextColor">
                        <span className="font-semibold">ISBN:</span> {Book.item.isbn}
                    </p>

                    <p className="cardsTextColor">
                        <span className="font-semibold">Veröffentlicht:</span> {new Date(Book.item.publicationDate).toLocaleDateString("de-DE")}
                    </p>

                    <p className="cardsTextColor mt-3 text-sm">{Book.item.description}</p>
                </Link>
                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <Link to={`/Books/${Book.item.id}` } className="cursor-pointer">
                        <ManageSearchIcon />
                    </Link>
                    <Link to={""}  className="cursor-pointer">
                        <FavoriteIcon className="cursor-pointer"/>
                    </Link>
                </div>
            </div>
        </div>
    );

}