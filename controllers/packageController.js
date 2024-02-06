import users from "../models/users.js";
import { getAddress } from "../helperss/getPackageAddress.js";
import activities from "../models/activity.js";
import packages from "../models/package.js";
// import getAddress from '../helpers/getPackageAddress.js'


// function for insert data in package model 
export const buyPackage=async(req,res)=>{
    try{
        const {userId , address, packageType } = req.body;
        let Packages=['20','30','80','160','320','640','1280','2560','5120','10240'];
        // Check all the values coming from req.body
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        if(!address) return res.status(400).json({message:"Invalid address.address must contain some value"});
        if(!packageType) return res.status(400).json({message:"Invalid packageType.packageType must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({message:"User Not Found"});
        }
        if(exists.packageBought.includes(packageType)){
            return res.status(400).json({message:"package Already Bought"});
        }
        if(packageType=='30'){
            if(!(exists.packageBought.includes('20'))) return res.status(400).json({message:"Please Buy 20$ package First"})
        }
        if(packageType=='80'){
            console.log("(exists.packageBought.includes(['20','30'])",exists.packageBought.includes('20'));
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30'))) return res.status(400).json({message:"Please Buy 20$,30$ package First"})
        }
        if(packageType=='160'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80'))) return res.status(400).json({message:"Please Buy 20$,30$,80$ package First"})
        }
        if(packageType=='320'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160 package First"})        
        }
        if(packageType=='640'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160') && exists.packageBought.includes('320'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160,$320 package First"})        
        }
        if(packageType=='1280'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160') && exists.packageBought.includes('320') && exists.packageBought.includes('640'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160,$320,$640 package First"})        
        }
        if(packageType=='2560'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160') && exists.packageBought.includes('320') && exists.packageBought.includes('640')&& exists.packageBought.includes('1280'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160,$320,$640,$1280 package First"})        
        }
        if(packageType=='5120'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160') && exists.packageBought.includes('320') && exists.packageBought.includes('640')&& exists.packageBought.includes('1280')&&  exists.packageBought.includes('2560'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160,$320,$640,$1280,$2560 package First"})        
        }
        if(packageType=='10240'){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80')&& exists.packageBought.includes('160') && exists.packageBought.includes('320') && exists.packageBought.includes('640')&& exists.packageBought.includes('1280')&&  exists.packageBought.includes('2560') &&  exists.packageBought.includes('5120'))) return res.status(400).json({message:"Please Buy 20$,30$,80$,$160,$320,$640,$1280,$2560,$5120 package First"})        
        }
        //==================================================//
        // check if user is present in our systwm or not 
        
        let  refferAddressOfUser=exists.referBy;
        //==================================================//
        let packageAddress=await getAddress(packageType,address);
        console.log("packageAddress",packageAddress);
        if(!packageAddress) packageAddress=process.env.admin_address;
        
        return res.status(200).json({message : "Data Validate successfully",data:{"refferAddress":refferAddressOfUser,"packageUpdatAddress":packageAddress,"amount":Number(packageType),"userId":exists.userId}})

    }catch (error){
        console.log("error",error.message);
    }
}

export const updateDataForPackage=async(req,res)=>{
    try{
        const {address , refferAddress, transactionHash ,packageAddress,amount,userId} = req.body;
        const exists = await users.findOne({address});
        const existsRefferAddress = await users.findOne({address:refferAddress});
        const existsPackageAddress = await users.findOne({address:packageAddress});
        if(!exists){
            return res.status(200).json({message : "User Not Exits"})
        }
        if(!existsRefferAddress){
            return res.status(200).json({message : "Reffer Address Not Exits"})
        }
        if(!existsPackageAddress){
            return res.status(200).json({message : "Package Address Not Exits"})
        }

        await users.updateOne({address:refferAddress},{$set:{ refferalIncome:((existsRefferAddress.refferalIncome)+(amount/2))}})
        await users.updateOne({address:packageAddress},{$set:{ packageIncome:((existsPackageAddress.refferalIncome)+(amount/2))}})
        await activities.create({
            userId ,               // creates teh activity 
            activiy : `ID ${userId} +${amount}BUSD`,
            transactionHash 
        });
        await users.findOneAndUpdate(
            { address: address },
            { $push: { packageBought: amount.toString() } },        //updates the referto array and adds the new user that he referred to his array
            { new: true }
            ); 
        const boughtPackage = await packages.create({
            userId,
            address,
            transactionHash,
            package:amount.toString()
        });
        await boughtPackage.save();
        return res.status(200).json({"message":`User Bought ${amount} BUSD Package successFully`})
    }catch(error){
        console.log(`there is error in data updating ${error}`)
    }
}

//function to fetch data of a perticular user from model
export const fetchPackage=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({message:"User Not Found"});
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
        if(array) return res.status(200).json({ result: array });
        else return res.status(404).json({message:"Data Not found"});

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

