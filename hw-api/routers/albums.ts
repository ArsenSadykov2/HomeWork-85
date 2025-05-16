import express from "express";
import Album from "../models/Album";


const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
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