export type BookDTO = {
    title: string;
    author: string;
    isbn: string;
    description: string;
    smallThumbnail : string;
    thumbnail: string;
    publicationDate: string;
    categories: string[];
    bookmark : boolean;
    favorite : boolean;
    rating: number|null;
}