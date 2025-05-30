import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export interface RegisterandLoginResponse {
    user: User;
    message: string;
    accessToken: string;
    refreshToken: string;
}

export const register = createAsyncThunk<
    RegisterandLoginResponse,
    RegisterMutation,
    { rejectValue: ValidationError}
>(
    'users/register',
    async (registerForm, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterandLoginResponse>('/users', registerForm);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
);

export const login = createAsyncThunk<
    User,
    LoginMutation,
    { rejectValue: GlobalError}
>(
    'users/login',
    async (loginForm, {rejectWithValue}) => {
        try{
            const response = await axiosApi.post<RegisterandLoginResponse>('/users/sessions', loginForm);
            return response.data.user;
        }catch (error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data as GlobalError);
            }

            throw error;
        }
    }
)

export const googleLogin = createAsyncThunk<
    User,
    {},
    { rejectValue: GlobalError}
>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try{
            const response = await axiosApi.post<RegisterandLoginResponse>('/users/google', {credential});
            return response.data.user;
        }catch (error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data as GlobalError);
            }

            throw error;
        }
    }
);

export const logout = createAsyncThunk<
    void,
    void
>(
    'users/logout',
    async () => {
        await axiosApi.delete('users/sessions');
    }
)