import activities from "../models/activity.js";


export const fetchAllActivities = async(req, res)=>{
    try{
        const allActivities = await activities.find({}).sort({ createdAt: -1 });;
        if(!allActivities){
            res.status(400).json({message : "No activities found"});
        }
        return res.status(200).json({allActivities});

    }catch(error){
        console.log(`error in fetching all activities in controller : ${error.message}`);
        return res.status(500).json({error : "Internal server error"})
    }
}