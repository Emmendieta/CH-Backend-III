import express from 'express';
import { engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import path from 'path';
import __dirname from './utils/utils.js';
import "dotenv/config.js";
import argvsHelper from "./helpers/argvs.helper.js";
import morgan from "morgan";
import indexRouter from './routes/index.router.js';
import pathHandler from './middlewares/pathHandler.mid.js';
import errorHandler from './middlewares/errorHandler.mid.js';
import compression from 'compression';
import dbConnect from './helpers/dbConnect.helper.js';
import moment from 'moment';
import { setupSwaager } from './swagger.js';
import logger from './config/logger.js';

const app = express();
const PORT = process.env.PORT || 8000;

const ready = async () => {
    if (process.env.PERSISTENCE === "mongo") {
        await dbConnect(process.env.LINK_MONGODB);
        logger.info(`Server ready on port ${PORT} in mode: ${argvsHelper.mode}`);
    }
    else if (process.env.PERSISTENCE === "fs") { logger.info("Métodos pendientes para fs!"); }
    else { logger.info("Métodos pendientes para memory!"); }
};

/* Engine Settings */

app.engine("handlebars", engine({
    helpers: {
        formatDate: (date) => moment(date).format("YYYY-MM-DD")
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

/* Middlewares Settings */

app.use(compression());
app.use(cookieParser(process.env.SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.listen(PORT, ready);

/* Router Settings */

setupSwaager(app);
app.use("/", indexRouter);
app.use(pathHandler);
app.use(errorHandler);

export default app;

