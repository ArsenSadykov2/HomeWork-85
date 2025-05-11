import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import albumAdminRouter from "./albums";



const adminRouter = express.Router();

// localhost/admin/albums

adminRouter.use(auth, permit('admin'))
adminRouter.use('/albums', albumAdminRouter);

export default adminRouter;