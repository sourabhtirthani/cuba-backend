import activities from "../models/activity.js";
import users from "../models/users.js";
import dotenv from 'dotenv'
import packages from "../models/package.js";
import slots from "../models/slots.js";
import admin from "../models/admin.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import announcement from "../models/announcement.js";
import incomeTransactions from "../models/incomeTransactions.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const createProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, password, address, referBy, referById, referByName } = req.body;
        if (!address || !password || !email) {
            return res.status(400).json({ error: "Please provide all details" });
        }
        const exists = await admin.findOne({ address: address });
        if (exists) {
            return res.status(400).json({ error: "User already exists. Please login" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const totalAdmins = await admin.countDocuments({});
        const newAdminId = totalAdmins + 501;
        const newAdmin = await admin.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            address: address,
            referBy: referBy,
            referById: referById,
            referByName: referByName,
            userId: newAdminId
        });

        await admin.findOneAndUpdate(
            { address: referBy },
            { $push: { referTo: address } },
            { new: true }
        );

        const token = jwt.sign({ userId: newAdminId, email: email }, JWT_SECRET);
        return res.status(201).json({token ,  userId : newAdminId , address : address , name : `${firstName} ${lastName}`});

    } catch (error) {
        console.log(`error in create profile : ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const {email , password} = req.body;
        console.log("in the function")
        if(!email || !password){
            return res.status(400).json({error : "Please provide all details"});
        }
        const exists = await admin.findOne({email : email});
        if(!exists){
            console.log("in here")
            return res.status(400).json({error : "No such user exists"});
        }
        const comparePassword = await bcrypt.compare(password , exists.password);
        if(!comparePassword){
            console.log("in here")
            return res.status(404).json({error : "Invalid credentials."})
        }
        const token = jwt.sign({ userId: exists.userId , email: email }, JWT_SECRET);
        const nameOfAdmin = `${exists.firstName} ${exists.lastName}`
        return res.status(200).json({token, userId : exists.userId , address : exists.address , name : nameOfAdmin});

    } catch (error) {
        console.log(`error in login function : ${error.message}`);

    }
}




export const updateProfile = async (req, res) => {
    try {
        const { address, transactionHash, email, name, mobileNumber } = req.body;

        if (!address) {         // || !transactionHash transaction hash removed from update  profile 
            return res.status(400).json({ message: "Please provide address and transactionHash" });
        }
        const existingUser = await admin.findOne({ address: address });
        if (!existingUser) {
            return res.status(400).json({ error: "No such user found" })
        }
        // const profilePicture =  req.files?.profilePicture ? req.files.profilePicture[0].filename : existingUser.profilePicture;
        const updateObject = {};
        if (email) updateObject.email = email;       // pushes the details inside the updated object if it exists in the body
        if (name) updateObject.name = name;
        if (mobileNumber) updateObject.mobileNumber = mobileNumber;
        if (req.files && req.files.profilePicture) {
            updateObject.profilePicture = req.files.profilePicture[0].filename;        // adds the profile picture in the object
        }

        const updatedUser = await admin.findOneAndUpdate(     // changing from user to admin
            { address: address },          //updates the user with the provided address
            { $set: updateObject },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found or invalid transactionHash" });
        }
        return res.status(200).json({ message: "Profile updated successfully" });

    } catch (error) {
        console.log(`error in updat profile function : ${error.message}`)
        return res.status(500).json({ error: "Internal Server error" })
    }
}



export const getProfile = async (req, res) => {
    try {
        const { address } = req.params;
        if (!address) {
            return res.status(400).json({ error: "Please specify the address of the user." })
        }
        const exists = await admin.findOne({ address: address });   // changing from user model to admin model
        if (!exists) {
            return res.status(400).json({ message: "No such user found" });
        } else {
            return res.status(200).json({ userData: exists })
        }

    } catch (error) {
        console.log(`error in get profille : ${error.message}`)
        return res.status(500).json({ error: "Internal Server error" })
    }
}



export const fetchAllUsers = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if ((startDate && isNaN(Date.parse(startDate))) || (endDate && isNaN(Date.parse(endDate)))) {
            return res.status(400).json({ error: "Invalid date format" });  // YYYY-MM-DD
        }
        let allUsers;
        if (startDate && endDate) {
            allUsers = await filterDataForUsers(startDate, endDate);
        } else {
            allUsers = await users.find({});
        }

        return res.status(200).json({ allUsers });

    } catch (error) {
        console.log(`error in fetch all users in controllers : ${error.message}`);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const filterDataForUsers = async (startDate, endDate) => {            // this function is used in fetch all users
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

export const fetchPackage = async (req, res) => {
    try {
        const { address, userId, startDate, endDate } = req.body;
        if (!userId) return res.status(400).json({ message: "Invalid userId.userId must contain some value" });
        const exists = await admin.findOne({ address });
        if (!exists) {
            return res.status(400).json({ message: "User Not Found" });
        }
        let result = await filterDataForPackage( startDate, endDate);
        console.log("result", result);

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
        if (array) res.status(200).json({ result: array });
        else return res.status(404).json({ message: "Data Not found" });

    } catch (error) {
        console.log(error.message, "error")
    }
}

// function to filter the data according to date 
const filterDataForPackage = async (startDate, endDate) => {  //removed userId before startdate
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

export const fetchslot = async (req, res) => {
    try {
        const { address, userId, startDate, endDate } = req.body;
        if (!userId) return res.status(400).json({ message: "Invalid userId.userId must contain some value" });
        const exists = await admin.findOne({ address });
        if (!exists) {
            return res.status(400).json({ message: "User Not Found" });
        }
        let result = await filterDataForSlot( startDate, endDate);
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
        if (array) res.status(200).json({ result: array });
        else return res.status(404).json({ message: "Data Not found" });

    } catch (error) {
        console.log("error", error.message)
    }
}

const filterDataForSlot = async ( startDate, endDate) => {
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

export const fetchAllActivities = async (req, res) => {
    try {
        const allActivities = await activities.find({}).sort({ createdAt: -1 });;
        if (!allActivities) {
            res.status(400).json({ message: "No activities found" });
        }
        return res.status(200).json({ allActivities });

    } catch (error) {
        console.log(`error in fetching all activities in controller : ${error.message}`);
        return res.status(500).json({ error: "Internal server error" })
    }
}



export const updateAnnouncement = async(req, res)=>{
    try{
        const {announcementFromAdmin} = req.body;
        const announce = await announcement.create({
            statement : announcementFromAdmin
        });
        return res.status(200).json({message : "Updated successfully"});
    }catch(error){
        console.log(`error in updating announcement : ${error.message}`);
        return res.status(500).json({error : "Internal server error"});
    }
}


export const fetchAllIncomes = async(req, res)=>{
    try{
        const allIncomes = await incomeTransactions.find({});
        return res.status(200).json({allIncomes});

    }catch(error){
        console.log(`error in feth all incomes : ${error.message}`)
        return res.status(500).json({error : "Internal server error"});
    }
}