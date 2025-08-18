import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";



export default function BookComponent( Book : {item:Book} ) {
    return (
        <div className="">
                <div className="">
                    <h2>
                        {Book.item.title}
                    </h2>
                    <p className="">
                        <span className="">Autor:</span> {Book.item.author}
                    </p>
                    <p className="">
                        <span className="">ISBN:</span> {Book.item.isbn}
                    </p>
                    <p className="">
                        <span className="">Veröffentlicht:</span>{" "}
                        {Book.item.publicationDate}
                    </p>
                    <p className="">{Book.item.description}</p>
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>

        </div>
    );

}