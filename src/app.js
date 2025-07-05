import express from 'express';
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import path from "path";
import "dotenv/config.js";
import Handlebars from 'handlebars';
/* import usersRouter from './routes/api/users.router.js';
import petsRouter from './routes/api/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'; */
import compression from 'compression';
import dbConnect from './helpers/dbConnect.helper.js';
import appRouter from './routes/app.router.js';
import __dirname from './utils/index.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

const app = express();
const PORT = process.env.PORT || 8080;
const ready = async() => {
    await dbConnect(process.env.LINK_MONGODB);
    console.log(`Listening on ${PORT}`);
};


/* Engine Settings */

app.engine("handlebars", engine({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

/* Middlewares Settings */

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", appRouter);


/* app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter); */

app.listen(PORT, ready);
