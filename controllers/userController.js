import activities from "../models/activity.js";
import users from "../models/users.js";


export const createProfile = async (req, res)=>{
    try{
        const {address , referBy, transactionHash, email , name, mobileNumber} = req.body;
        // console.log(`addres is : ${address} , ,, referby : ${referBy} , transaction has his : ${transactionHash}`)
        const profilePicture =  req.files?.profilePicture ? req.files.profilePicture[0].filename : undefined;
        if(!address  || !transactionHash){
            return res.status(400).json({message : "Please provide all the details"});
        }
        const exists = await users.findOne({address});
        if(exists){
            return res.status(200).json({message : "User already exists" , userId : exists.userId})
        }
        // Add childs in tree 

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
            transactionHash,
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

        await activities.create({
            userId : newUserId,               // creates teh activity 
            activiy : "New user joined",
            transactionHash : transactionHash,
        });

        return res.status(200).json({message : "Profile created successfully"})
    }catch(error){
        console.log(`error in create profile : ${error.message}`);
        return res.status(500).json({error : "Internal Server error"})
    }
}


export const updateProfile = async(req, res)=>{
    try{
        const { address, transactionHash, email, name, mobileNumber } = req.body;
        
        if (!address || !transactionHash) {
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


const traverseTree=async(address)=>{
    console.log("address",address)
    const userData = await users.findOne({address});
    if(!userData.leftAddress)  return {"parentAddress":address,"position":"LEFT"}
    if(!userData.rightAddress) return {"parentAddress":address,"position":"RIGHT"}

    if(userData.leftAddress) {
       let leftAddressRes=await traverseTree(userData.leftAddress)
       return leftAddressRes;
    };
    if(userData.rightAddress) {
        let rightAddressRes= await  traverseTree(userData.rightAddress);
        return rightAddressRes;
    }
}

