import activities from "../models/activity.js";
import users from "../models/users.js";


export const fetchAllActivities = async(req, res)=>{
    try{
        const allActivities = await activities.find({}).sort({ createdAt: -1 });;
        if(!allActivities){
            return res.status(400).json({message : "No activities found"});
        }
        return res.status(200).json({allActivities});

    }catch(error){
        console.log(`error in fetching all activities in controller : ${error.message}`);
        return res.status(500).json({error : "Internal server error"})
    }
}


export const getDashboardInfo = async(req, res)=>{
    try{
        const {address} = req.params;
        if(!address){
            return res.status(400).json({error : "Please provide the address."})
        }
        const exists = await users.findOne({address : address});
        if(!exists){
            return res.status(400).json({error : "No such user exists."});
        }
        const totalMembers = await users.countDocuments();
        let data = {
         totalTeam: exists.referTo.length,
         totalIncome : exists.packageIncome + exists.slotIncome + exists.levelIncome + exists.refferalIncome,
         refferalIncome : exists.refferalIncome,
         packageIncome : exists.packageIncome,
         slotIncome : exists.slotIncome,
         levelIncome : exists.levelIncome,
         totalMembers : totalMembers 
        }
        return res.status(200).json({data});

    }catch(error){
        console.log(`error in fetching profile from user : ${error.message} `)
        return res.status(500).json({error : "Internal server error"})
    }
}