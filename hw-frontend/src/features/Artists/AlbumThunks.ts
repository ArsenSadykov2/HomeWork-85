import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Artist} from "../../types";

export const fetchAllArtists = createAsyncThunk<Artist[], void>(
    'artists/fetchAllArtists',
    async () => {
        const response = await axiosAPI.get<Artist[]>('/artists');
        return response.data;
    }
);

export const fetchArtistById = createAsyncThunk<Artist, string>(
    'artists/fetchArtistById',
    async (artist_id) => {
        const response = await axiosAPI.get<Artist>('/artists/' + artist_id);
        return response.data || null;
    }
);
