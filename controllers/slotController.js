import activities from "../models/activity.js";
import slots from "../models/slots.js";
import users from "../models/users.js";

export const buySlot=async(req,res)=>{
    try{
        const {userId , address, transactionHash, slotType } = req.body;
        if(!userId) res.status(400).json({message:"Invalid userId.userId must contain some value"});
        if(!address) res.status(400).json({message:"Invalid address.address must contain some value"});
        if(!transactionHash) res.status(400).json({message:"Invalid transactionHash.transactionHash must contain some value"});
        if(!slotType) res.status(400).json({message:"Invalid slotType.slotType must contain some value"});
        const exists = await users.findOne({address});
        console.log("exists",exists);
        if(!exists){
            res.status(400).json({message:"User Not Found"});
        }
        const boughtSlot = await slots.create({
            userId,
            address,
            transactionHash,
            slot:slotType
        });
        await boughtSlot.save();

        await activities.create({
            userId ,               // creates teh activity 
            activiy : `ID ${userId} +${slotType}BUSD`,
            transactionHash 
        });

        return res.status(200).json({message : "Slot Bought successfully"})

    }catch (error){
        console.log("error",error.message)
    }
}

export const fetchslot=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            res.status(400).json({message:"User Not Found"});
        }
        let result = await filterData(userId, startDate, endDate);
        if (!result) {
            result = await packages
            .find({ userId })
            .sort({ createdAt: "desc" });
        }
        let array = Array();
        let j = 1;
        for (let i = 0; i < result.length; i++) {
            array.push({ id: j + i, ...result[i]._doc });
        }
        if(array) res.status(200).json({ result: array });
        else res.status(404).json({message:"Data Not found"});

    }catch (error){
        console.log("error",error.message)
    }
}

const filterData = async (userId, startDate, endDate) => {
    let query;
  if (startDate && endDate) {
    const sdate = new Date(startDate);

    const edate = new Date(endDate);
    query = {
      $and: [
        { createdAt: { $gte: sdate, $lte: edate } },
        { userId: userId }
      ],
    };
  }
  let res = await slots.find(query);
  return res;
};