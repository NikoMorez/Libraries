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
    const [smallCover, setSmallCover] = useState(book.smallCover);
    const [largeCover, setLargeCover] = useState(book.largeCover);
    const [publicationDate, setPublicationDate] = useState(book.publicationDate);
    const [saving, setSaving] = useState(false);

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
                />
                <TextField
                    label="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Veröffentlichungsdatum"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Kleines Cover (URL)"
                    type="url"
                    value={smallCover}
                    onChange={(e) => setSmallCover(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Großes Cover (URL)"
                    type="url"
                    value={largeCover}
                    onChange={(e) => setLargeCover(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={4}
                    fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button type="button" variant="text" onClick={() => navigate(-1)} disabled={saving}>
                        Abbrechen
                    </Button>
                    <Button type="submit" variant="contained" disabled={saving}>
                        {saving ? "Speichern…" : "Speichern"}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}