import express from 'express';
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import path from "path";
import "dotenv/config.js";
import Handlebars from 'handlebars';
import argvsHelper from "./helpers/argvs.helper.js";
import morgan from "morgan";
import indexRouter from './routes/index.router.js';
import pathHandler from './middlewares/pathHandler.mid.js';
import errorHandler from './middlewares/errorHandler.mid.js';

const app = express();
const PORT = process.env.PORT || 8080;
const ready = async () => {
    if (proceess.env.PERSISTENCE === "mongo") {
        await dbConnect(process.env.LINK_MONGODB);
        console.log(`Server ready on port ${PORT} in mode: ${argvsHelper.mode}`);
    }
    else if (process.env.PERSISTENCE === "fs") { console.log("Métodos pendientes para fs!"); }
    else { console.log("Métodos pendientes para memory!"); }
};

app.listen(PORT, ready);

/* Engine Settings */

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views"); 

/* Middlewares Settings */

app.use(cookieParser(process.env.SECRET));
app.use(express.json());
app.use(compression());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("public"));
app.use(morgan("dev"));


/* Router Settings */

app.use("/", indexRouter);
app.use(pathHandler);
app.use(errorHandler);
