import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";


const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const testArtist = await Artist.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
        });
        const artists = await Artist.find({testArtist});
        res.send({
            artists
        });
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const name = req.body.name;
        const description = req.body.description;

        const newArtist = new Artist({name, description, image: req.file ? 'images/' + req.file.filename : null });

        await newArtist.save();
        res.send(newArtist);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});



export default artistRouter;