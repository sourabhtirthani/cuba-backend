import { Schema , model } from "mongoose";

const packagesSchema = new Schema({
    packageId : {
        type : String,
        required : true
    },
    packageAmount : {
        type : String,
        required : true
    }
}, {timestamps : true})

const packages = model("packageInfo"  , packagesSchema);
export default packages;