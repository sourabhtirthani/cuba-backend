import { Schema, model } from "mongoose";

const announcementSchmea = new Schema({
    statement : {
        type : String
    }
}, {timestamps : true});

const announcement = model("announcement" , announcementSchmea);
export default announcement;