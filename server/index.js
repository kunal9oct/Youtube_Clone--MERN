import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import videoRoutes from './routes/video.js';
import commentsRoutes from './routes/comments.js';
import questionRoutes from './routes/question.js';
import postRoutes from './routes/createPost.js';
import updateRoutes from './routes/editProfile.js';
import { getAll } from './controllers/getAll.js';

import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use('/uploads', express.static(path.join('uploads')));
app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/videos', express.static('uploads/videos'));

app.get('/', (req, res) => {
    res.send('hello');
});
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentsRoutes);
app.use('/question', questionRoutes);
app.use('/editProfile', updateRoutes);
app.use('/createPost', postRoutes);
app.get('/getAll', getAll);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        status,
        message,
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on the http://localhost:${PORT}`);
})

const DB_URL = process.env.CONNECTION_URL;
mongoose.connect(DB_URL, {}).then(() => {
    console.log("MongoDB database connected");
}).catch((error) => {
    console.log(error);
})
