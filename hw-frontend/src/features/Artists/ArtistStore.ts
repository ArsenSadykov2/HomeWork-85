import {Artist} from "../../types";
import {create} from "zustand/react";
import axiosAPI from "../../axiosApi.ts";

interface ArtistsState {
    items: Artist[];
    item: Artist | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllArtists: (artists?: string) => Promise<void>;
    fetchArtistById: (artist_id: string) => Promise<void>;
}


export const useArtistStore = create<ArtistsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    fetchAllArtists: async (search) => {
        set({fetchLoading: true});
        try {
            const url = search ? `/artists${search}` : '/artists';
            console.log("Fetching from URL:", url);
            const response = await axiosAPI.get<Artist[]>(url);
            console.log("Response data:", response.data);
            set({items: response.data || []});
        } catch (e) {
            console.error("Fetch artists error:", e);
        } finally {
            set({fetchLoading: false});
        }
    },
    fetchArtistById: async (artist_id) => {
        set({fetchLoading: true});
        try {
            const response = await axiosAPI.get<Artist>(`/artists/${artist_id}`);
            set({item: response.data});
        } catch (e) {
            console.error("Fetch artist error:", e);
        } finally {
            set({fetchLoading: false});
        }
    },
}));