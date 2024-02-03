import activities from "../models/activity.js";
import users from "../models/users.js";
import dotenv from 'dotenv'
import packages from "../models/package.js";
import slots from "../models/slots.js";
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
            return res.status(200).json({message : "User already exists" , userId : exists.userId})
        }
        // Add childs in tree and check reffeal Address

        const checkReffalDeatils=await users.findOne({referBy});
        console.log("referBy",referBy);
        let sendHalfAmountForReffal=referBy;
        
        let treeResult =await traverseTree(referBy);
        treeResult=await treeResult;
        if(treeResult.position=="LEFT"){
            await users.updateOne({address:treeResult.parentAddress},{$set:{ leftAddress:address}})
        }else{
            await users.updateOne({address:treeResult.parentAddress},{$set:{ rightAddress:address}})
        }
        const totalUsers = await users.countDocuments({});   //finds the total number of documents 
        const newUserId = totalUsers + 501;    //adds 500 to the total doument to get the new id..id starting from 501
        
        const newUser = await users.create({
            address,
            email,
            name,
            referBy,
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
            let {uplineAddresses,currentLevel}=await getUplineAddresses(referBy);
            
            return res.status(200).json({message : "All Good!",data:{"refferAddress":sendHalfAmountForReffal,"uplineAddress":uplineAddresses}})
    }catch(error){
        console.log(`error in create profile : ${error}`);
        return res.status(500).json({error : "Internal Server error"})
    }
}


export const updateProfile = async(req, res)=>{ 
    try{
        const { address, transactionHash, email, name, mobileNumber } = req.body;
        
        if (!address ) {         // || !transactionHash transaction hash removed from update  profile 
            return res.status(400).json({ message: "Please provide address and transactionHash" });
        }
        const existingUser = await users.findOne({address : address});
        if(!existingUser){
            return res.status(400).json({error : "No such user found"})
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
        const exists = await users.findOne({ address: address });
        if (!exists) {
            return res.status(400).json({ message: "No such user found" });
        } else {
            return res.status(200).json({ userData: exists })
        }

    }catch(error){
        console.log(`error in get profille : ${error.message}`)
        return res.status(500).json({error : "Internal Server error"})
    }
}



export const fetchAllUsers = async(req, res)=>{
    try{
        const {startDate , endDate} = req.query;
       
        if ((startDate && isNaN(Date.parse(startDate))) || (endDate && isNaN(Date.parse(endDate)))) {
            return res.status(400).json({ error: "Invalid date format" });  // YYYY-MM-DD
          }
        let allUsers;
        if(startDate && endDate){
            allUsers = await filterDataForUsers(startDate , endDate);
        }else{
            allUsers = await users.find({});
        }

        return res.status(200).json({allUsers});

    }catch(error){
        console.log(`error in fetch all users in controllers : ${error.message}`);
        return res.status(500).json({error : "Internal server error"})
    }
}

const filterDataForUsers = async ( startDate, endDate ) => {            // this function is used in fetch all users
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

//////////////////////////////////////////////////////////////// -- package controller for admin starts here

export const fetchPackage=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({message:"User Not Found"});
        }
        let result = await filterDataForPackage(userId, startDate, endDate);
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
        else return res.status(404).json({message:"Data Not found"});

    }catch (error){
        console.log(error.message,"error")
    }
}

// function to filter the data according to date 
const filterDataForPackage = async (userId, startDate, endDate) => {
    let query;
  if (startDate && endDate) {
    const sdate = new Date(startDate);

    const edate = new Date(endDate);
    query = {
        createdAt: { $gte: sdate, $lte: edate },
      };
  }
  let res = await packages.find(query);
  return res;
};




//////////////////////////////////////////////////////////////// -- slot controller for admin starts here

export const fetchslot=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({message:"User Not Found"});
        }
        let result = await filterDataForSlot(userId, startDate, endDate);
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
        else return res.status(404).json({message:"Data Not found"});

    }catch (error){
        console.log("error",error.message)
    }
}

const filterDataForSlot = async (userId, startDate, endDate) => {
    let query;
  if (startDate && endDate) {
    const sdate = new Date(startDate);

    const edate = new Date(endDate);
    query = {
        createdAt: { $gte: sdate, $lte: edate },
      };
  }
  let res = await slots.find(query);
  return res;
};




//////////////////////////////////////////////////////////////// -- activity controller for admin starts here

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









