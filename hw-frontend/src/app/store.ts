import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/ArtistSlice.ts";
import {categoriesReducer} from "../features/Albums/AlbumsSlice.ts";
import {usersReducer} from "../features/Users/userSlice.ts";


export const store = configureStore({
    reducer:{
        artists: artistsReducer,
        albums: categoriesReducer,
        users: usersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;