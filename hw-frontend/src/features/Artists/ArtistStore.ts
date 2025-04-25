import {Artist} from "../../types";
import {create} from "zustand/react";
import axiosAPI from "../../axiosApi.ts";

interface ArtistsState {
    items: Artist[];
    item: Artist | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllArtists: (album_id?: string) => Promise<void>;
    fetchArtistById: (artist_id: string) => Promise<void>;
}


export const useArtistStore = create<ArtistsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    fetchAllArtists: async (album_id) => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Artist[]>(album_id ? '/artists' + album_id : '/artists');
            set({items: response.data || []});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    },
    fetchArtistById: async (artist_id: string) => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Artist | null>('/artists/' + artist_id);
            set({item: response.data || null});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    }
}))