import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAllAlbums} from "./ArtistThunks.ts";

interface AlbumsState {
    items: Album[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: AlbumsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const artistsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAlbums.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllAlbums.fulfilled, (state, {payload: albums}) => {
                state.items = albums;
                state.fetchLoading = false;
            })
    }
});

export const categoriesReducer = artistsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchLoading;