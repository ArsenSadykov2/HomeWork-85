import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../../multer";
import Album from "../../models/Album";
import Artist from "../../models/Artist";


const albumAdminRouter = express.Router();

albumAdminRouter.patch('/:id', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({error: 'Album id must be in req params'});
            return;
        }

        const updateAlbum = {...req.body.isPublished};

        if (req.file) {
            updateAlbum.image = 'images/' + req.file.filename;
        }

        const album = await Album.findByIdAndUpdate(id, updateAlbum, {new: true, runValidators: true});

        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }

        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

albumAdminRouter.get('/', async (req, res, next) => {
    try{
        const album = await Album.find();
        res.send(album);
    } catch (error) {
        next(error);
    }
});

albumAdminRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artist = req.body.artist;
        const title = req.body.title;
        const date = req.body.date;

        const artistId = await Artist.findById(artist);
        if(!artistId) {
            res.status(404).send("There is no album in list");
            return;
        }

        const newAlbum = new Album({artist, title, date, image: req.file ? 'fixtures/' + req.file.filename : null});
        await newAlbum.save();
        res.send(newAlbum);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default albumAdminRouter;