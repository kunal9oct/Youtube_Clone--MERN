import express from 'express';
import multer from 'multer';
import { question } from '../controllers/question.js';
import { verifyToken } from '../verifyToken.js';

const routes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

const videoUpload = multer({ storage: storage });

routes.post('/askQuestion/:id', verifyToken, videoUpload.single('video'), question);

export default routes;
