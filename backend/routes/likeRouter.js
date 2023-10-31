import express from "express";
import likeController from "../controllers/likeController.js";
import authUser from "../middleware/authUser.js";
const likeRouter = express.Router();

likeRouter.post("/", authUser.tokenVerification, likeController.createLike);
likeRouter.get("/", likeController.getAllike);
likeRouter.delete(
  "/:id",
  authUser.tokenVerification,
  likeController.deleteLike
);

export default likeRouter;
