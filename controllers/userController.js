import activities from "../models/activity.js";
import announcement from "../models/announcement.js";
import incomeTransactions from "../models/incomeTransactions.js";
import users from "../models/users.js";
import dotenv from 'dotenv'
dotenv.config();
export const createProfile = async (req, res)=>{
    try{
        const {address , referBy} = req.body;
        // console.log(`addres is : ${address} , ,, referby : ${referBy} , transaction has his : ${transactionHash}`)
        if(!address  || !referBy){
            return res.status(400).json({message : "Please provide all the details"});
        }
        const exists = await users.findOne({address});
        const isReferExits =await users.findOne({address:referBy});
        if(!isReferExits){
            return res.status(400).json({message : "Reffer Address Not found"})
        }
        if(exists){
            return res.status(200).json({message : "User already exists"})
        }
        let sendHalfAmountForReffal=referBy;
        let treeResult =await traverseTree(referBy);
        console.log("treeResult",treeResult);
        if(!treeResult){
            return res.status(400).json({message : "No tree result"})
        }
        const newUser = await users.create({
            address,
            referBy : referBy,
            parentAddress:treeResult.parentAddress,
        });
        if(treeResult.position=="LEFT"){
            await users.updateOne({address:treeResult.parentAddress},{$set:{ leftAddress:address}})
        }else{
            await users.updateOne({address:treeResult.parentAddress},{$set:{ rightAddress:address}})
        }
        let {uplineAddresses,currentLevel}=await getUplineAddresses(address);

        const result = await users.findOneAndDelete({ address });
        if(treeResult.position=="LEFT"){
            await users.updateOne({address:treeResult.parentAddress},{$set:{ leftAddress:""}})
        }else{
            await users.updateOne({address:treeResult.parentAddress},{$set:{ rightAddress:""}})
        }

        return res.status(200).json({message : "All Good!",data:{"refferAddress":sendHalfAmountForReffal,"uplineAddress":uplineAddresses}})
    
    }catch(error){
        console.log(`error in create profile : ${error}`);
        return res.status(500).json({error : "Internal Server error"})
    }
}

export const fetchTeamUsers=async(req,res)=>{
    const {address}=req.params;
    const isExits= await users.findOne({address});
    if(!isExits) return res.status(400).json({messgae:"User Not Found"});
    let downline = await traverseTreeForDownline(address , 0 , []);
    console.log(downline);
    const nonLevel0Users = downline.filter(user => user.level !== 0);
    // return res.status(200).json({downline});
    const usersDetails = await Promise.all(nonLevel0Users.map(async user => {
        const userDetails = await users.findOne({ address: user.address });
        return { user: userDetails, level: user.level };
    }));

    return res.status(200).json({ usersDetails });

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
        const existsRefer = await users.findOne({address:referBy});
        
        // if(!exists){
        //     return res.status(200).json({message : "User Not Exits"})
        // }
        if(!existsRefer){
            return res.status(200).json({message : "Refer Address Not Exits"})
        }
        // const exists = await users.findOne({address});
        const totalUsers = await users.find({}).limit(1).sort({createdAt:-1});   //finds the total number of documents 
        if(!totalUsers) return res.status(500).json({error:"Internel Server Error"});        
        const userId = Number(totalUsers[0].userId) + 1; 
        
        let treeResult =await traverseTree(referBy);
        const newUser = await users.create({
            address,
            referBy : referBy,
            parentAddress:treeResult.parentAddress,
            userId ,
            isActive:true
        });
        await newUser.save();
        if(!treeResult){
            return res.status(400).json({message : "No tree result"})
        }
        if(treeResult.position=="LEFT"){
            await users.updateOne({address:treeResult.parentAddress},{$set:{ leftAddress:address}})
        }else{
            await users.updateOne({address:treeResult.parentAddress},{$set:{ rightAddress:address}})
        }

        await users.findOneAndUpdate(
            { address: referBy },
            { $push: { referTo: address } },        //updates the referto array and adds the new user that he referred to his array
            { new: true }
            );

        await users.updateOne({address:referBy},{$set:{ refferalIncome:((existsRefer.refferalIncome)+(amount/2))}})

        await incomeTransactions.create({
            fromUserId:userId,
            toUserId:existsRefer.userId,
            fromAddress:address,
            toAddress:referBy,
            incomeType:"Referral income",
            amount:amount/2,
            transactionHash:transactionHash
        })
        const updateDataForUser={
            transactionHash,
            isActive:true
        
        }
        await users.updateOne({address},{$set:updateDataForUser});
        const existsAdmin = await users.findOne({address:process.env.admin_address});

        await incomeTransactions.create({
            fromUserId: userId,
            toUserId:existsAdmin.userId,
            fromAddress:address,
            toAddress:process.env.admin_address,
            incomeType:"Level income",
            amount:adminIncome,
            transactionHash:transactionHash
        })
        await users.updateOne({"address":process.env.admin_address},{$set:{"levelIncome":(existsAdmin.levelIncome+adminIncome)}});
        console.log("userId",userId);
        let uplineAddressesData;
        for(let i in uplineAddresses){
            uplineAddressesData=await users.findOne({address:uplineAddresses[i]})
            await incomeTransactions.create({
                fromUserId:userId,
                toUserId:uplineAddressesData.userId,
                fromAddress:address,
                toAddress:uplineAddresses[i],
                incomeType:"Level income",
                amount:levelDistribution[i],
                transactionHash:transactionHash
            })
            await users.updateOne({"address":uplineAddresses[i]},{$set:{"levelIncome":(uplineAddressesData.levelIncome+levelDistribution[i])}});
        }

        await activities.create({
            userId : userId,            // creates teh activity 
            activiy : "New user joined",
            transactionHash : transactionHash,
        });

        return res.status(200).json({"message":"User Joined successFully"})
    }catch(error){
        console.error(error)
        console.log(`there is error in data updating ${error}`)
        return res.status(500).json({error : "Internal server error"})
    }
}

export const updateProfile = async(req, res)=>{
    try{
        const { address, email, name, mobileNumber } = req.body;
        
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


// const traverseTreeForDownline=async(address,currentLevel=1)=>{
//     console.log("address",address)
//     const userData = await users.findOne({address});
//     let addressforTree;
//     let levels = {};
//     let userDatawithLevel={};
//     if(userData){
//         if(userData.leftAddress) { 
//             levels.level=currentLevel;
//             userDatawithLevel = { ...userData, ...levels };
//             addressforTree.push(userDatawithLevel)
//     }
//     if(userData.rightAddress) {
//         levels.level=currentLevel;
//             userDatawithLevel = { ...userData, ...levels };
//             addressforTree.push(userDatawithLevel);
//     }

//     if(userData.leftAddress) {
//     addressforTree=await traverseTreeForDownline(userData.leftAddress)
//        return addressforTree;
//     };
//     if(userData.rightAddress) {
//         addressforTree= await  traverseTreeForDownline(userData.rightAddress);
//         return addressforTree;
//     }
//     }else return addressforTree;
    
// }

const traverseTreeForDownline = async (address, currentLevel = 0, result = []) => {
    const user = await users.findOne({ address });

    if (!user) return result;

    result.push({ address, level: currentLevel });

    if (user.leftAddress) {
        console.log('in left: ' + user.leftAddress)
        await traverseTreeForDownline(user.leftAddress, currentLevel + 1, result); 
    }

    if (user.rightAddress) {
        console.log('in right: ' + user.rightAddress)
        await traverseTreeForDownline(user.rightAddress, currentLevel + 1, result); 
    }
    
    return result;
};

const traverseTree = async (address) => {
    console.log("address", address);
    const userData = await users.findOne({ address });

    if (!userData) {
        console.log("User not found");
        return null;
    }

    console.log("Checking address", address);

    if (!userData.leftAddress) {
        console.log("Found available space at left of", address);
        return { "parentAddress": address, "position": "LEFT" };
    }

    if (!userData.rightAddress) {
        console.log("Found available space at right of", address);
        return { "parentAddress": address, "position": "RIGHT" };
    }

    // Check level 1
    console.log("Checking level 1 bottom from left to right");
    let currentLevel = [userData.leftAddress, userData.rightAddress];
    let nextLevel = [];

    for (const childAddress of currentLevel) {
        const childData = await users.findOne({ address: childAddress });

        // Check if there's space in the child subtree
        if (!childData.leftAddress || !childData.rightAddress) {
            console.log("Found available space in the child subtree of", childAddress);
            return await traverseTree(childAddress);
        }

        // Add children of the current node to the next level
        if (childData.leftAddress) {
            nextLevel.push(childData.leftAddress);
        }
        if (childData.rightAddress) {
            nextLevel.push(childData.rightAddress);
        }
    }

    // Move to the next level if no space is found in level 1
    while (nextLevel.length > 0) {
        currentLevel = nextLevel;
        nextLevel = [];

        console.log("Checking next level bottom from left to right");

        for (const childAddress of currentLevel) {
            const childData = await users.findOne({ address: childAddress });

            // Check if there's space in the child subtree
            if (!childData.leftAddress || !childData.rightAddress) {
                console.log("Found available space in the child subtree of", childAddress);
                return await traverseTree(childAddress);
            }

            // Add children of the current node to the next level
            if (childData.leftAddress) {
                nextLevel.push(childData.leftAddress);
            }
            if (childData.rightAddress) {
                nextLevel.push(childData.rightAddress);
            }
        }
    }

    console.log("No available space found at any level");
    return null;
}

// Function to traverse up the tree and retrieve upline addresses
async function getUplineAddresses (address, uplineAddresses = [], currentLevel = 0, maxLevel = 11) {
    console.log('address',address);
    const userData = await users.findOne({address});
    console.log("userData",userData);
    if(userData){
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
}else return  {uplineAddresses,currentLevel};
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


// export const deleteUser = async(req, res)=>{
// //address deelte basis of address from user 

// }

export const fetchUserData  = async(req, res)=>{
    try{
        const {address , userId} = req.body;
        let exists;
        if(!address && !userId){
            return res.status(400).json({message : "No userID or address provided"});
        }
        if(!address){
            // console.log("no address")
            exists = await users.findOne({userId : userId});
        }
        if(!userId){
            // console.log("no userid")
            exists = await users.findOne({address : address})
        }

        if(!exists){
            return res.status(500).json({message : "No user found"});
        }

        return res.status(200).json({user : exists});
    }catch(error){
        return res.status(500).josn({error : "Internal server error "})
    }
}

export const fetchUserTodayIncome=async(req,res)=>{
    const {address}= req.params;
    const income=await incomeTransactions.aggregate([
        {
          $match: {
            toAddress: `${address}`,
            createdAt: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(23, 59, 59, 999))
            }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount"
            }
          }
        }
      ])
      if(income[0].totalAmount) return res.status(200).json({message:"Amount Found",amount:income[0].totalAmount});
      else return res.status(400).json({message:"Amount Not Found",amount:0});
}