import express from "express";
import {Error} from 'mongoose';
import User, {createAccessToken, createRefreshToken, JWT_SECRET_REFRESH_TOKEN} from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import jwt from "jsonwebtoken";

const usersRouter = express.Router();

interface TokenPayload {
    _id: string;
    iat: number;
    exp: number;
}

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        const accessToken = createAccessToken(String(user._id));
        const refreshToken = createRefreshToken(String(user._id));

        user.token = refreshToken;

        user.generateToken();
        await user.save();
        res.send({user, message: 'User registered successfully.', accessToken, refreshToken});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({error: 'Fill in your login and password'});
        return;
    }

    const user = await User.findOne({username: req.body.username});

    if (!user) {
        res.status(404).send({error: "Username not found"});
        return;
    }

    const isMath = await user.checkPassword(req.body.password);

    if (!isMath) {
        res.status(400).send({error: 'Password is incorrect'});
        return;
    }

    const accessToken = createAccessToken(String(user._id));
    const refreshToken = createRefreshToken(String(user._id));

    user.token = refreshToken;
    await user.save();

    res.send({message: 'Username and password is correct', user, accessToken, refreshToken});
});

usersRouter.delete('/sessions', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.send({message: 'Success logout'});
        return;
    }

    try {
        const user = await User.findOne({token});

        if (user) {
            const refreshToken = createRefreshToken(String(user._id));

            user.token = refreshToken;
            await user.save();
        }

        res.send({message: 'Success logout'});
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/refresh-token', async (req, res, next) => {
    const {refreshToken} = req.body;

    if(!refreshToken) {
        res.status(401).send({error: 'Refresh token is required'});
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN) as TokenPayload;
        const user = await User.findOne({_id: decoded._id, token: refreshToken});

        if(!user) {
            res.status(401).send({error: 'Refresh token is invalid'});
            return;
        }

        const  accessToken = createAccessToken(String(user._id));
        res.send({message: 'Refresh token is valid', user, accessToken});
    }catch (e) {
        res.status(401).send({error: 'Refresh token is expired. Please log in'});
    }
});

usersRouter.post('/secret', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    res.send({
        message: 'Secret message',
        user: user,
    });
});


export default usersRouter;