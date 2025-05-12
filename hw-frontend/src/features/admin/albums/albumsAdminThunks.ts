import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosApi.ts";
import {Album, AlbumMutation} from "../../../types";


export const fetchAdminAllAlbums = createAsyncThunk<Album[], void>(
    'admin/fetchAdminAllAlbums',
    async () => {
        const response = await axiosAPI.get<Album[]>('/admin/albums', {withCredentials: true});
        return response.data;
    }
);

export const createAdminAlbum = createAsyncThunk<void, AlbumMutation>(
    'admin/createAdminAlbum',
    async (albumToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(albumToAdd) as (keyof AlbumMutation)[];

        keys.forEach(key => {
            const value = albumToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/admin/albums', formData, {withCredentials: true});
    }
);
