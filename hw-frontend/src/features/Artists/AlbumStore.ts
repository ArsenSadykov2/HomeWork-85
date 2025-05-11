import {Album} from "../../types";
import {create} from "zustand";
import axiosAPI from "../../axiosApi.ts";

interface AlbumsState {
    items: Album[];
    item: Album | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllAlbums: (search?: string) => Promise<void>;
    fetchAlbumById: (album_id: string) => Promise<void>;
}


export const useALbumsStore = create<AlbumsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    fetchAllAlbums: async (search) => {
        set({fetchLoading: true});
        try {
            console.log("Search param:", search);
            const url = search ? `/albums?${search}` : '/albums';
            console.log("Fetching from URL:", url);
            const response = await axiosAPI.get<Album[]>(url);
            console.log("Response data:", response.data);
            set({items: response.data || []});
        } catch (error) {
            console.error("Fetch albums error:", error);
        } finally {
            set({fetchLoading: false});
        }
    },
    fetchAlbumById: async (album_id) => {
        set({fetchLoading: true});
        try {
            const response = await axiosAPI.get<Album>(`/albums/${album_id}`);
            set({item: response.data});
        } catch (error) {
            console.error("Fetch album error:", error);
        } finally {
            set({fetchLoading: false});
        }
    },
}));