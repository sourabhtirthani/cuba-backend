import activities from "../models/activity.js";
import packages from "../models/package.js";
import users from "../models/users.js";

// function for insert data in package model 
export const buyPackage=async(req,res)=>{
    try{
        const {userId , address, transactionHash, packageType } = req.body;
        if(!userId) res.status(400).json({message:"Invalid userId.userId must contain some value"});
        if(!address) res.status(400).json({message:"Invalid address.address must contain some value"});
        if(!transactionHash) res.status(400).json({message:"Invalid transactionHash.transactionHash must contain some value"});
        if(!packageType) res.status(400).json({message:"Invalid packageType.packageType must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            res.status(400).json({message:"User Not Found"});
        }
        const boughtPackage = await packages.create({
            userId,
            address,
            transactionHash,
            package:packageType
        });
        await boughtPackage.save();

        await activities.create({
            userId ,               // creates teh activity 
            activiy : `ID ${userId} +${packageType}BUSD`,
            transactionHash 
        });

        return res.status(200).json({message : "Package Bought successfully"})

    }catch (error){
        console.log("error",error.message);
    }
}

//function to fetch data of a perticular user from model
export const fetchPackage=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            res.status(400).json({message:"User Not Found"});
        }
        let result = await filterData(userId, startDate, endDate);
        console.log("result",result);

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
        console.log(error.message,"error")
    }
}

// function to filter the data according to date 
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
  let res = await packages.find(query);
  return res;
};