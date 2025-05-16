import {NextFunction, Request, Response} from "express";
import {HydratedDocument} from "mongoose";
import {UserFields} from "../types";
import User, {JWT_SECRET} from "../models/User";
import jwt from "jsonwebtoken";
import {TokenExpiredError} from "jsonwebtoken";

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>;
}

const auth = async (
    expressReq: Request, res: Response, next: NextFunction
) => {
    try{
        const req = expressReq as RequestWithUser;

        const accessToken = req.get('Authorization')?.replace('Bearer ', '');

        if (!accessToken) {
            res.status(401).send({error: 'No token provided.'});
            return;
        }

        const decoded = jwt.verify(accessToken, JWT_SECRET) as { _id: string };

        const user = await User.findOne({_id: decoded._id});

        if (!user) {
            res.status(401).send({error: 'User nor found or wrong token'});
            return;
        }

        req.user = user;
        next();
    }catch (e) {
        if (e instanceof TokenExpiredError) {
            res.status(401).send({error: 'Your token expired '});
        } else {
            res.status(401).send({error: 'U need to log in'});
        }

    }
};

export default auth;