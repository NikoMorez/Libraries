import type {Book} from "../models/Book.tsx";
import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Stack, TextField, Button} from "@mui/material";
import axios from "axios";

export default function BookEditForm({book}: {book: Book}) {

    const navigate = useNavigate();
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [isbn, setIsbn] = useState(book.isbn);
    const [description, setDescription] = useState(book.description);
    const [smallCover, setSmallCover] = useState(book.smallThumbnail);
    const [largeCover, setLargeCover] = useState(book.thumbnail);
    const [publicationDate, setPublicationDate] = useState(book.publicationDate);
    const [saving, setSaving] = useState(false);
    const textFieldSx = {
        "& .MuiInputBase-root": {
            borderRadius: "0.75rem",
        },
        "& .MuiInputLabel-root": {
            transition: "color 120ms ease, transform 120ms ease",
        },

        "@media (prefers-color-scheme: dark)": {
            "& .MuiInputLabel-root": {
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "rgb(214 211 209)", // stone-300
            },
            "& .MuiInputLabel-root.Mui-focused": {
                color: "rgb(250 250 249)", // stone-50
            },

            "& .MuiInputBase-root": {
                color: "rgb(214 211 209)",
                backgroundColor: "rgb(68 64 60)",// bg-stone-700
            },

            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(168 162 158)", // stone-400
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(243 244 246)", // stone-100
                borderWidth: "2px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250 250 249)", // stone-50
                borderWidth: "2.5px",
            },

            "& .MuiOutlinedInput-root.Mui-focused": {
                boxShadow: "none",
            },
        },
    };

    const buttonSx = {
        borderRadius: "8px",
        border: "1px solid transparent",
        padding: "0.6em 1.2em",
        fontSize: "1em",
        fontWeight: 500,
        fontFamily: "inherit",
        cursor: "pointer",
        textTransform: "none",
        transition: "border-color 0.25s, background-color 0.25s",

        backgroundColor: "rgb(30 41 59)",   // slate-800
        color: "rgb(250 250 249)",          // stone-50
        "&:hover": {
            borderColor: "rgb(51 65 85)",     // slate-700
            backgroundColor: "rgb(51 65 85)", // slate-700
        },
        "&.Mui-focused": {
            borderColor: "rgb(250 250 249)",  // stone-50
        },

        "@media (prefers-color-scheme: dark)": {
            backgroundColor: "rgb(38 38 38)",   // neutral-800
            color: "rgb(245 245 244)",          // zinc-100
            "&:hover": {
                borderColor: "rgb(250 250 249)",  // stone-50
                backgroundColor: "rgb(64 64 64)", // neutral-700
            },
        },
    };


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        try {
            await axios.put(`/api/books/${book.id}`, {
                title,
                author,
                isbn,
                description,
                smallCover,
                largeCover,
                publicationDate,
            });
            navigate(`/books/${book.id}`);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                flex: 1,
                minHeight: 0,
            }}
        >
            <Stack spacing={2}>
                <TextField
                    label="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Veröffentlichungsdatum"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Kleines Cover (URL)"
                    type="url"
                    value={smallCover}
                    onChange={(e) => setSmallCover(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Großes Cover (URL)"
                    type="url"
                    value={largeCover}
                    onChange={(e) => setLargeCover(e.target.value)}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={4}
                    fullWidth
                    sx={textFieldSx}
                />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button type="button" variant="text" onClick={() => navigate(-1)} disabled={saving} sx={buttonSx}>
                        Abbrechen
                    </Button>
                    <Button type="submit" variant="contained" disabled={saving} sx={buttonSx}>
                        {saving ? "Speichern…" : "Speichern"}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}