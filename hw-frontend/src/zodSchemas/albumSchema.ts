import {z} from "zod";

export const albumSchema = z.object({
    artist: z.string().min(1, "Artist is required"),
    title: z.string().min(1, "Title is required"),
    date: z.string().min(4, "Year must be at least 4 characters"),
    image: z.instanceof(File).optional(),
    isPublished: z.boolean().default(false)
});