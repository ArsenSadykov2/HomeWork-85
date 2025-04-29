import {Album, Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAllArtists, fetchArtistById} from "./AlbumThunks.ts";


interface ArtistState {
    items: Album[];
    item: Album | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ArtistState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
};

export const albumSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllArtists.fulfilled, (state, {payload: artists}) => {
                state.items = artists;
                state.fetchLoading = false;
            })

            .addCase(fetchArtistById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchArtistById.fulfilled, (state, {payload: artist}) => {
                state.item = artist;
                state.fetchLoading = false;
            })
    }
});

export const artistsReducer = albumSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectOneArtist = (state: RootState) => state.artists.item;
export const selectArtistsLoading = (state: RootState) => state.artists.fetchLoading;