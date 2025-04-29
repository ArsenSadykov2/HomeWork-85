import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi";
import { TrackHistory } from "../../types";

export const fetchAllTracksHistory = createAsyncThunk<TrackHistory[]>(
    'trackHistory/fetchAllTracksHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosAPI.get<TrackHistory[]>('/trackHistories');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);