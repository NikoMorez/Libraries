import type {Book} from "../models/Book.tsx";
import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Stack, TextField, Button} from "@mui/material";
import axios from "axios";
import { textFieldSx, imgBoxSx } from "./BookEditForm.styles";

type Props = {
    book: Book;
    onEdit: () => void;
};

export default function BookEditForm({ book, onEdit }: Readonly<Props>) {

    const navigate = useNavigate();
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [categoriesText, setCategoriesText] = useState<string>(
        (book.categories ?? []).join(", ")
    )
    const [isbn, setIsbn] = useState(book.isbn);
    const [description, setDescription] = useState(book.description);
    const [smallCover, setSmallCover] = useState(book.smallThumbnail);
    const [largeCover, setLargeCover] = useState(book.thumbnail);
    const [publicationDate, setPublicationDate] = useState(book.publicationDate);
    const [saving, setSaving] = useState(false);
    const [smallCoverError, setSmallCoverError] = useState(false);
    const [largeCoverError, setLargeCoverError] = useState(false);

    function parseCategories(input: string): string[] {
        return input
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        try {
            await axios.put(`/api/books/${book.id}`, {
                title,
                author,
                isbn,
                description,
                smallThumbnail: smallCover,
                thumbnail: largeCover,
                publicationDate,
                categories: parseCategories(categoriesText),
            });
            navigate(`/books/${book.id}`);
        } finally {
            setSaving(false);
            onEdit();
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
                    label="Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={4}
                    fullWidth
                    sx={textFieldSx}
                />
                <TextField
                    label="Kategorien"
                    value={categoriesText}
                    onChange={(e) => setCategoriesText(e.target.value)}
                    fullWidth
                    placeholder="Fantasy, Sci-Fi, Klassiker"
                    sx={textFieldSx}
                    helperText="Mehrere Kategorien mit Komma trennen"
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
                    onChange={(e) => {
                        setSmallCover(e.target.value);
                        setSmallCoverError(false);
                    }}
                    fullWidth
                    placeholder="https://…"
                    sx={textFieldSx}
                />

                <Box
                    sx={imgBoxSx}
                >
                    {smallCover && !smallCoverError ?(
                        <img
                            src={smallCover}
                            alt="Vorschau kleines Cover"
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "contain",
                                display: "block",
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() => setSmallCoverError(true)}
                        />
                    ) : smallCoverError ? (
                        <Box sx={imgBoxSx}>
                            <span className="text-sm opacity-70">Bild konnte nicht geladen werden</span>
                        </Box>
                    ) : null}
                </Box>
                <TextField
                    label="Großes Cover (URL)"
                    type="url"
                    value={largeCover}
                    onChange={(e) => {
                        setLargeCover(e.target.value);
                        setLargeCoverError(false);
                    }}
                    fullWidth
                    placeholder="https://…"
                    sx={textFieldSx}
                />

                <Box
                    sx={imgBoxSx}
                >
                    {largeCover && !largeCoverError ?(
                        <img
                            src={largeCover}
                            alt="Vorschau großes Cover"
                            style={{
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "contain",
                                display: "block",
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() => setLargeCoverError(true)}
                        />
                    ) : largeCoverError ? (
                        <Box sx={imgBoxSx}>
                            <span className="text-sm opacity-70">Bild konnte nicht geladen werden</span>
                        </Box>
                    ) : null}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button type="button" variant="text" onClick={() => navigate(-1)} disabled={saving} className={"stdButton stdColor"}>
                        Abbrechen
                    </Button>
                    <Button type="submit" variant="contained" disabled={saving} className={"stdButton stdColor"}>
                        {saving ? "Speichern…" : "Speichern"}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}