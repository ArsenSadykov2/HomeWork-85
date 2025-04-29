import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/AlbumSlice.ts";
import {categoriesReducer} from "../features/Albums/ArtistsSlice.ts";
import {usersReducer} from "../features/Users/userSlice.ts";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {trackHistoryReducer} from "../features/TrackHistory/trackHistorySlice.ts";



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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;