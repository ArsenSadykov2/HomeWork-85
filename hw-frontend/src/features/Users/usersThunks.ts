import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export interface RegisterResponse {
    user: User;
    message: string;
}

export const register = createAsyncThunk<
    RegisterResponse,
    RegisterMutation,
    { rejectValue: ValidationError}
>(
    'users/register',
    async (registerForm, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registerForm);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }

    }
);