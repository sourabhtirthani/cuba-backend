import { Schema , model } from "mongoose";

const packagesSchema = new Schema({
    userId : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    package : {
        type  : String,
        required:true
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

const packages = model("packages"  , packagesSchema);
export default packages;