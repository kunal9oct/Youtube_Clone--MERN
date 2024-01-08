import express from "express";
import { postComment, getComment, deleteComment, editComment } from '../controllers/comments.js';
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post('/post', auth, postComment);
routes.get('/get', auth, getComment);
routes.delete('/delete/:id', auth, deleteComment);
routes.patch('/edit/:id', auth, editComment);

export default routes;
