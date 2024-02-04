import { Schema , model } from "mongoose";

const slotSchema = new Schema({
    address : {
        type : String,
        required : true
    },
    slotType : {
        type : String,
        required : true
    },
    leftAddress:{
        type : String,
        default : null
    },
    rightAddress:{
        type : String,
        default : null
    },
    myTeam:[{
        type:String
    }],
    isRoot:{
        type:Boolean
    }
}, {timestamps : true})

const slotTree = model("slotTree"  , slotSchema);
export default slotTree;