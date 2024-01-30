import { Schema , model } from "mongoose";

const slotSchema = new Schema({
    userId : {
        type : Number,
        required : true
    },
    slot : {
        type  : String,
        required  : true
    },
    transactionHash : {
        type : String,
        required : true
    },
    time : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

const slots = model("slots"  , slotSchema);
export default slots;