import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        default : ""
    },
    address : {
        type : String,
        required : true
    },
    referBy : {
        type : String,
        required : true
    },
    transactionHash : {
        type : String,
        required : true
    },
    referTo : [{
        type : String
    }
    ],
    profilePicture : {
        type : String,
        default : null
    },
    mobileNumber : {
        type : Number
    },
    userId : {
        type : Number
    },
    join_time : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

const users = model("users" , userSchema);
export default users;