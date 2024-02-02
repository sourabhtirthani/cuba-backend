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
    leftAddress:{
        type:String,
        default:null
    },
    rightAddress:{
        type:String,
        default:null
    },
    packageBought:[{
        type:String,
    }],
    slotBought:[{
        type:String,
    }],
    transactionHash : {
        type : String,
        default:null
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
    refferalIncome:{
        type: Number
    },
    levelIncome:{
        type:Number
    },
    packageIncome:{
        type:Number
    },
    slotIncome:{
        type:Number
    },
    reffalIncomeCounter:{
        type:Number
    },
    join_time : {
        type : Date,
        default : Date.now
    },
    isActive:{
        type:Boolean,
        default:false
    }
}, {timestamps : true})

const users = model("users" , userSchema);
export default users;