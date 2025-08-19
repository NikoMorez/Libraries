import type {Book} from "../models/Book.tsx";
import {Rating} from "@mui/material";



export default function BookComponent( Book : {item:Book} ) {
    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="dark:bg-stone-700 bg-gray-400 shadow-lg rounded-2xl border dark:border-stone-900 p-6 transform transition hover:scale-105 hover:shadow-2xl shadow-stone-900">
                <h2 className="text-xl font-bold dark:text-stone-300 text-zinc-800 mb-2">{Book.item.title}</h2>

                <p className="dark:text-stone-300 text-zinc-800  ">
                    <span className="font-semibold">Autor:</span> {Book.item.author}
                </p>

                <p className="dark:text-stone-300 text-zinc-800">
                    <span className="font-semibold">ISBN:</span> {Book.item.isbn}
                </p>

                <p className="dark:text-stone-300 text-zinc-800">
                    <span className="font-semibold">Veröffentlicht:</span> {new Date(Book.item.publicationDate).toLocaleDateString("de-DE")}
                </p>

                <p className="dark:text-stone-300 text-zinc-800 mt-3 text-sm">{Book.item.description}</p>

                <div className="mt-4">
                    <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
                </div>
            </div>
        </div>
    );

}