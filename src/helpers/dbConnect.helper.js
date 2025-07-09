import { connect } from "mongoose";
import logger from "../config/logger.js";

const dbConnect = async (link) => {
    try {
        await connect(link);
        logger.info("Connected To MongoDB!");
    } catch (error) {
        logger.fatal(error);
    }
};

export default dbConnect;