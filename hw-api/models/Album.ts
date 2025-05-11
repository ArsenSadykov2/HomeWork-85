import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;