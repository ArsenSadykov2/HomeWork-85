import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import Artist from "../models/Artist";
import auth from "../middleware/auth";


const albumRouter = express.Router();

albumRouter.get('/', auth, async (req, res, next) => {
    try{
        const album = await Album.find();
        res.send(album);
    } catch (error) {
        next(error);
    }
});


albumRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        if(!id) {
            res.status(404).send("There is no id in params");
            return;
        }

        const album = await Album.findById(id).populate('artist');
        if(!album) {
            res.status(404).send("There is no album in list");
            return;
        }
        res.send(album);
    } catch (error) {
        next(error);
    }
});



export default albumRouter;