import activities from "../models/activity.js";
import announcement from "../models/announcement.js";
import incomeTransactions from "../models/incomeTransactions.js";
import users from "../models/users.js";
import dotenv from 'dotenv'
dotenv.config();
export const createProfile = async (req, res)=>{
    try{
        const {address , referBy, email , name, mobileNumber} = req.body;
        // console.log(`addres is : ${address} , ,, referby : ${referBy} , transaction has his : ${transactionHash}`)
        const profilePicture =  req.files?.profilePicture ? req.files.profilePicture[0].filename : undefined;
        if(!address  || !referBy){
            return res.status(400).json({message : "Please provide all the details"});
        }
        const exists = await users.findOne({address});
        const isReferExits =await users.findOne({address:referBy});
        if(!isReferExits){
            return res.status(400).json({message : "Reffer Address Not found"})
        }
        console.log("exists");
        if(exists){
            return res.status(200).json({message : "User already exists" , userId : exists})
        }
        console.log("referBy",referBy);
        let sendHalfAmountForReffal=referBy;

        let treeResult =await traverseTree(referBy);
        console.log("treeResult",treeResult);
        if(treeResult.position=="LEFT"){
            await users.updateOne({address:treeResult.parentAddress},{$set:{ leftAddress:address}})
        }else{
            await users.updateOne({address:treeResult.parentAddress},{$set:{ rightAddress:address}})
        }
        
        const totalUsers = await users.find({}).limit(1).sort({createdAt:-1});   //finds the total number of documents 
        if(!totalUsers) return res.status(500).json({error:"Internel Server Error"});        
        const newUserId = Number(totalUsers[0].userId) + 1; 
        const newUser = await users.create({
            address,
            email,
            name,
            referBy,
            parentAddress:treeResult.parentAddress,
            profilePicture,
            userId : newUserId,
            mobileNumber
        });
        await newUser.save();
        
        await users.findOneAndUpdate(
            { address: referBy },
            { $push: { referTo: address } },        //updates the referto array and adds the new user that he referred to his array
            { new: true }
            );
            let {uplineAddresses,currentLevel}=await getUplineAddresses(address);
            return res.status(200).json({message : "All Good!",data:{"refferAddress":sendHalfAmountForReffal,"uplineAddress":uplineAddresses}})
    }catch(error){
        console.log(`error in create profile : ${error}`);
        return res.status(500).json({error : "Internal Server error"})
    }
}

export const checkUser=async(req,res)=>{
    try{const {address} = req.params;
    // console.log(`addres is : ${address} , ,, referby : ${referBy} , transaction has his : ${transactionHash}`)
    if(!address){
        return res.status(400).json({message : "Please provide all the details"});
    }
    const exists = await users.findOne({address});
    if(exists){
        return res.status(200).json({message:"User Found",data:exists});
    }else{
        return res.status(200).json({message:"User not Found",data:null});

    }
}catch(error){
    return res.status(400).json({error:error.message})
}
}

export const updateData=async(req,res)=>{
    try{
        const {address , referBy, transactionHash ,uplineAddresses,amount,levelDistribution,adminIncome} = req.body;
        const exists = await users.findOne({address});
        const existsRefer = await users.findOne({address:referBy});
        
        if(!exists){
            return res.status(200).json({message : "User Not Exits"})
        }
        if(!existsRefer){
            return res.status(200).json({message : "Refer Address Not Exits"})
        }
        await users.updateOne({address:referBy},{$set:{ refferalIncome:((existsRefer.refferalIncome)+(amount/2))}})
        await users.updateOne({address:process.env.admin_address},{$set:{ "levelIncome":adminIncome}})
        const updateDataForUser={
            transactionHash,
            isActive:true
        }
        await users.updateOne({address},{$set:updateDataForUser});
        let uplineAddressesData;
        for(let i in uplineAddresses){
            uplineAddressesData=await users.findOne({address:uplineAddresses[i]})
            await users.updateOne({"address":uplineAddresses[i]},{$set:{"levelIncome":(uplineAddressesData.levelIncome+levelDistribution[i])}});
        }

        await activities.create({
            userId : exists.userId,            // creates teh activity 
            activiy : "New user joined",
            transactionHash : transactionHash,
        });

        return res.status(200).json({"message":"User Joined successFully"})
    }catch(error){
        console.log(`there is error in data updating ${error}`)
    }
}

export const updateProfile = async(req, res)=>{
    try{
        const { address, transactionHash, email, name, mobileNumber } = req.body;
        
        if (!address) {
            return res.status(400).json({ message: "Please provide address and transactionHash" });
        }
        const existingUser = await users.findOne({address : address});
        if(!existingUser){
            return res.status(400).json({message : "No such user found"})
        }
        // const profilePicture =  req.files?.profilePicture ? req.files.profilePicture[0].filename : existingUser.profilePicture;
        const updateObject = {};
        if (email) updateObject.email = email;       // pushes the details inside the updated object if it exists in the body
        if (name) updateObject.name = name;
        if (mobileNumber) updateObject.mobileNumber = mobileNumber;
        if (req.files && req.files.profilePicture) {
            updateObject.profilePicture = req.files.profilePicture[0].filename;        // adds the profile picture in the object
        }

        const updatedUser = await users.findOneAndUpdate(
            { address: address},          //updates the user with the provided address
            { $set: updateObject },
            { new: true }
        ); 
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found or invalid transactionHash" });
        }
        return res.status(200).json({ message: "Profile updated successfully"});

    }catch(error){
        console.log(`error in updat profile function : ${error.message}`)
        return res.status(500).json({error : "Internal Server error"})
    }
}

export const getProfile = async(req, res)=>{
    try{
        const {address} = req.params;
        if(!address){
            return res.status(400).json({error : "Please specify the address of the user."})
        }
        const exists = await users .findOne({ address: address });
        if (!exists) {
            return res.status(400).json({ message: "No such user found" });
        } else {
            const userRefferData=users.findOne({ address: exists.referBy });
            return res.status(200).json({ userData: exists,data:userRefferData.userId})
        }

    }catch(error){
        console.log(`error in get profille : ${error.message}`)
        return res.status(500).json({error : "Internal Server error"})
    }
}


const traverseTree=async(address)=>{
    console.log("address",address)
    const userData = await users.findOne({address});
    let addressforTree;
    if(userData){
        if(!userData.leftAddress) { 
            addressforTree={"parentAddress":address,"position":"LEFT"}
            return addressforTree;
    }
    if(!userData.rightAddress) {
        addressforTree={"parentAddress":address,"position":"RIGHT"}
            return addressforTree;
    }

    if(userData.leftAddress) {
    addressforTree=await traverseTree(userData.leftAddress)
       return addressforTree;
    };
    if(userData.rightAddress) {
        addressforTree= await  traverseTree(userData.rightAddress);
        return addressforTree;
    }
    }else return addressforTree;
    
}


// Function to traverse up the tree and retrieve upline addresses
async function getUplineAddresses (address, uplineAddresses = [], currentLevel = 0, maxLevel = 11) {
    const userData = await users.findOne({address});
    if (!userData.parentAddress) {
        return {uplineAddresses,currentLevel};
    }

    uplineAddresses.push(userData.parentAddress);

    // Check if the maximum level is reached
    if (currentLevel === maxLevel) {
        return {uplineAddresses,currentLevel};
    }
    // Recursively traverse up to the parent node
    return getUplineAddresses(userData.parentAddress, uplineAddresses, currentLevel + 1, maxLevel);
}


export const fetchAllUsers = async(req, res)=>{
    try{
        const {startDate , endDate} = req.query;
       
        if ((startDate && isNaN(Date.parse(startDate))) || (endDate && isNaN(Date.parse(endDate)))) {
            return res.status(400).json({ error: "Invalid date format" });  // YYYY-MM-DD
          }
        let allUsers;
        if(startDate && endDate){
            allUsers = await filterData(startDate , endDate);
        }else{
            allUsers = await users.find({});
        }

        return res.status(200).json({allUsers});

    }catch(error){
        console.log(`error in fetch all users in controllers : ${error.message}`);
        return res.status(500).json({error : "Internal server error"})
    }
}

const filterData = async ( startDate, endDate ) => {            // this function is used in fetch all users
    let query;
  if (startDate && endDate) {
    const sdate = new Date(startDate);
    const edate = new Date(endDate);
    query = {
        createdAt: { $gte: sdate, $lte: edate },
      };
  let res = await users.find(query);
  return res;
};
}


export const fetchMyReferral = async(req, res)=>{
    try{
        const {address} = req.params;
        const {startDate , endDate} = req.query;
        // console.log(`the address is : ${address} and the start date is : ${startDate} and the enddatae is : ${endDate}`)
        if(!address){
            return res.status(400).json({error : "Please provide address"});
        }
        const userDetails = await users.findOne({address : address});
        if(!userDetails){
            return res.status(400).json({error : "No such user found with that address"});
        }
        if ((startDate && isNaN(Date.parse(startDate))) || (endDate && isNaN(Date.parse(endDate)))) {
            return res.status(400).json({ error: "Invalid date format" });   // YYYY-MM-DD
          }
        let referToUsers;
        if(startDate && endDate){
            referToUsers = await users.find({ address : {$in : userDetails.referTo || []} , createdAt : {$gte : new Date(startDate), $lte : new Date(endDate)}});
        }else{
            referToUsers = await users.find({ address: { $in: userDetails.referTo || [] } });
        }
        return res.status(200).json({referToUsers});

    }catch(error){
        console.log(`error in fetch my referral in controllers : ${error.message}`)
        return res.status(500).json({error : "Internal server error"});
    }
}


export const fetchIncomeTransaction = async(req, res)=>{
    try{
        const { address} = req.params;
        if(!address){
            return res.status(400).json({error : "No address provided"})
        }
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({error : "No such user found"})
        }
        // const allTeam = await users.find({address : exists.referTo});
        const teamAddresses = exists.referTo;

        const teamTransactions = await incomeTransactions.find({
            $or : [
                {fromAddress : {$in : teamAddresses}},
                {toAddress : {$in : teamAddresses}}
            ]
        });

        return res.status(200).json({teamTransactions});


    }catch(error){
        return res.status(500).json({error : "Internal server error"});
    }
}


export const showAnnouncement = async(req, res)=>{
    try{
        const latestAnnouncement = await announcement.findOne().sort({ createdAt: -1 }).exec();
        if(!latestAnnouncement){
            return res.status(404).json({error : "No announcement found"})
        }
        return res.status(200).json({ statement: latestAnnouncement.statement });

    }catch(error){
        console.log(`error in showing announcement`);
        return res.status(500).json({error : "Internal server error"})
    }
}