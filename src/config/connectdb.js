import {connect} from "mongoose";
import { URI_DB } from "./config.js";

export const connectDB = async() => {
    try {
        await connect(URI_DB)
        console.log('Connect DB Successfully')
    } catch (e) {
        console.log({error: e.message})
    }
}