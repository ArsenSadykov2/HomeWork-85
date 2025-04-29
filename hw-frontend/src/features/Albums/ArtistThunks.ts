import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Album} from "../../types";

export const fetchAllAlbums = createAsyncThunk<Album [], void>(
    'albums/fetchAllAlbums',
    async () => {
        const response = await axiosAPI.get<Album[]>('/albums');
        return response.data;
    }
);