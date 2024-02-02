import activities from "../models/activity.js";
import packages from "../models/package.js";
import users from "../models/users.js";

// function for insert data in package model 
export const buyPackage=async(req,res)=>{
    try{
        const {userId , address, transactionHash, packageType } = req.body;
        // Check all the values coming from req.body
        if(!userId) res.status(400).json({message:"Invalid userId.userId must contain some value"});
        if(!address) res.status(400).json({message:"Invalid address.address must contain some value"});
        //if(!transactionHash) res.status(400).json({message:"Invalid transactionHash.transactionHash must contain some value"});
        if(!packageType) res.status(400).json({message:"Invalid packageType.packageType must contain some value"});
        //==================================================//
        // check if user is present in our systwm or not 
        const exists = await users.findOne({address});
        if(!exists){
            res.status(400).json({message:"User Not Found"});
        }
        if(exists.packageBought.includes(packageType)){
            res.status(400).json({message:"package Already Bought"});
        }
        let  refferAddressOfUser=exists.referBy;
        //==================================================//
        // If reffer have same package then we will give 50% to reffer address otherwise we will give this to admin 
        const isRefferHaveSamePackage=await users.findOne({refferAddressOfUser})
        if(!(isRefferHaveSamePackage.packageBought.includes(packageType))){
            refferAddressOfUser="0xEC588fcb15A6338c568A15b8c4aC2f735900886f";
        }

        let {uplineAddresses,currentLevel}=await getUplineAddresses(address);
        console.log("uplineAddress",uplineAddresses);
        console.log("levels",currentLevel);
        let amountToDistribute = Number(packageType); // 123
        
        // const boughtPackage = await packages.create({
        //     userId,
        //     address,
        //     transactionHash,
        //     package:packageType
        // });
        // await boughtPackage.save();

        // await activities.create({
        //     userId ,               // creates teh activity 
        //     activiy : `ID ${userId} +${packageType}BUSD`,
        //     transactionHash 
        // });

        return res.status(200).json({message : "Data Validate successfully",data:{"refferAddress":refferAddressOfUser,"uplineAddress":uplineAddresses,"amountForReffeal":(amountToDistribute/2)}})

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

// Function to traverse up the tree and retrieve upline addresses
async function getUplineAddresses (address, uplineAddresses = [], currentLevel = 0, maxLevel = 11) {
    const userData = await users.findOne({address});
    if (!userData.referBy) {
        return {uplineAddresses,currentLevel};
    }

    uplineAddresses.push(userData.referBy);

    // Check if the maximum level is reached
    if (currentLevel === maxLevel) {
        return {uplineAddresses,currentLevel};
    }
    // Recursively traverse up to the parent node
    return getUplineAddresses(userData.referBy, uplineAddresses, currentLevel + 1, maxLevel);
}