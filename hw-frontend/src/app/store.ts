import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/AlbumSlice.ts";
import {categoriesReducer} from "../features/Albums/ArtistsSlice.ts";
import {usersReducer} from "../features/Users/userSlice.ts";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {trackHistoryReducer} from "../features/TrackHistory/trackHistorySlice.ts";
import {AxiosHeaders, InternalAxiosRequestConfig} from "axios";
import axiosAPI from "../axiosApi.ts";



const usersPersistConfig = {
    key: 'store.users',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: categoriesReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
    trackHistory: trackHistoryReducer
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    if(!token) return config;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', 'Bearer ' + token);
    return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;