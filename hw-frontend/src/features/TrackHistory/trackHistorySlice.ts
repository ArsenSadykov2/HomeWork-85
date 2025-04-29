import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TrackHistory } from "../../types";
import { fetchAllTracksHistory } from "./trackHistoryThunks";

interface TrackHistoryState {
    items: TrackHistory[];
    fetchLoading: boolean;
    error: string | null;
}

const initialState: TrackHistoryState = {
    items: [],
    fetchLoading: false,
    error: null,
};

export const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTracksHistory.pending, (state) => {
                state.fetchLoading = true;
                state.error = null;
            })
            .addCase(fetchAllTracksHistory.fulfilled, (state, { payload }) => {
                state.items = payload;
                state.fetchLoading = false;
            })
            .addCase(fetchAllTracksHistory.rejected, (state, { error }) => {
                state.fetchLoading = false;
                state.error = error.message || 'Failed to load track history';
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;
export const selectTrackHistoryError = (state: RootState) => state.trackHistory.error;