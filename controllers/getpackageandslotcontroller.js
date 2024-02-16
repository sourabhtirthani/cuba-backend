import packages from "../models/package.js";
import slots from "../models/slots.js";



export const fetchPackageForuser = async(req, res)=>{
    try{
        const {address} = req.params;
        if(!address){
            return res.status(400).json({error : "no address found!"})
        }
        // console.log(userId)
        const allPackages = await packages.find({address})
        if(!allPackages){
            return res.status(400).json({message : "No package exists for user"})
        }
        let packageExists = new Array(10).fill(false);
        let allPackagesOfUser = new Array();
        for(let i = 0; i< allPackages.length ; i++){
            allPackagesOfUser.push(allPackages[i].package)
        }
        // const allPackages =await allPackagesOfUsr.package;
        return res.status(200).json({allPackagesOfUser})

    }catch(error){
        console.log(`error in fetch package : ${error.message}`);
        return res.status(500).json({error : "Internal server error"});
    }
}



export const fetchSlotsForUser = async(req, res)=>{
    try{
       
        const { userId} = req.params;
        if(!userId){
            return res.status(400).json({error : "No user id provided"})
        }
        const allSlots =  await slots.find({userId});
        if(!allSlots){
            
            return res.status(400).json({message : "No slots found."})
        }
        let slotsOfUser = new Array();
        for(let i =0 ; i< allSlots.length ; i ++){
            slotsOfUser.push(allSlots[i].slot);
        }
        console.log('all checks passed')
        return res.status(200).json({slotsOfUser});
    }catch(error){
        console.log(`error in fetch slot for user : ${error.message}`);
        return res.status(500).json({error : "Internal server error"});
    }
}