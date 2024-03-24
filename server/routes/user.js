import express from "express";
import { login, signUp, signIn } from '../controllers/auth.js';
import { updateChannelData, getAllChannels } from '../controllers/channel.js';

const routes = express.Router();

routes.post('/login', login);
routes.post('/signIn', signIn);
routes.post('/signUp', signUp);
routes.patch('/update/:id', updateChannelData);
routes.get('/getAllChannels', getAllChannels);

export default routes;