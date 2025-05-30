import mongoose, {HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};


export const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN || 'default_fallback_refresh_secret_refresh_token';

export const createAccessToken = (user_id: string) => {
   return jwt.sign({_id: user_id}, JWT_SECRET, {expiresIn: '365d'});
}

export const createRefreshToken = (user_id: string) => {
    return jwt.sign({_id: user_id}, JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'});
}

type UserModel = Model<UserFields, {}, UserMethods>;


const UserSchema = new mongoose.Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods,
    {}
>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value: string): Promise<boolean> {
                if(!this.isModified('username')) return true;
                const user: HydratedDocument<UserFields> | null = await User.findOne({username: value});
                return !user;
            },
            message: "This is username is already taken"
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    googleID: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
});

UserSchema.methods.checkPassword = async function (password: string){
    return await argon2.verify(this.password, password);
}


UserSchema.pre('save', async function (next){
    if (!this.isModified("password")) return next();

    this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
    next();
});

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;