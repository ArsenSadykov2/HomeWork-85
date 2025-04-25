export interface Artist {
    id: string;
    name: string;
    image?: string | null;
    description: string;
}

export interface Album {
    artist: string;
    title: string;
    date: number;
    image?: string;
}

export interface ProductMutation {
    title: string;
    description: string;
    price: number | string;
    image: File | null;
}


export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}