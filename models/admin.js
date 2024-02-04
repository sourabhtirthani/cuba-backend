import {Schema , model} from 'mongoose'

const adminSchema = new Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String,
    },
    name : {
        type : String,
        default : ""
    },
    password : {
        type : String,
    },
    email : {
        type : String,
    },
    address : {
        type : String,
    },
    userId : {
        type : Number
    },
    referBy : {
        type : String,
    },
    referByName : {
        type : String,
        default : null

    },
    profilePicture : {
        type : String,
        default : null
    },
    mobileNumber : {
        type : Number
    },
    referById : {
        type : Number
    },
    referTo : [{
        type : String
    }
    ],
});

const admin = model("admin" , adminSchema);
export default admin;