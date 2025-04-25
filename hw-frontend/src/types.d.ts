export interface Artist {
    _id: string;
    name: string;
    image?: string | null;
    description: string;
}

export interface Album {
    _id: string;
    artist: string;
    title: string;
    date: number;
    image?: string;
}