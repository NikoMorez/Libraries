import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function BookComponent( Book : {item:Book} ) {
    const navigate = useNavigate();

    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="cardsBackGroundColor cardsShadowBorder cardsHover p-6 transform transition">
                <div className={"cursor-pointer"} onClick={() => navigate(`/Books/${Book.item.id}`)}>
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
                </div>
                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <ManageSearchIcon className="cursor-pointer" onClick={() => navigate(`/Books/${Book.item.id}`)}/>
                    <FavoriteIcon className="cursor-pointer"/>
                </div>
            </div>
        </div>
    );

}