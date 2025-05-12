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
    date: string;
    image?: string;
    isPublished: boolean;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    date: string;
    image?: File | null;
    isPublished?: boolean;
}

export interface TrackHistory {
    _id: string;
    user: string;
    track: string;
    date: number;
}
export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
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

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}