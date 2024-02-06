import activities from "../models/activity.js";
import slots from "../models/slots.js";
import users from "../models/users.js";
import slotTree from "../models/slotTracking.js";
import incomeTransactions from '../models/incomeTransactions.js'
export const buySlot=async(req,res)=>{
    try{
        const {userId , address, slotType } = req.body;
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        if(!address) return res.status(400).json({message:"Invalid address.address must contain some value"});
        if(!slotType) return res.status(400).json({message:"Invalid slotType.slotType must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
            return res.status(400).json({message:"User Not Found"});
        }

        if(slotType==20){
            if(!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 20,30,80 BUSD packages "});
            }
        }else if(slotType==50){
            if(!(exists.packageBought.includes('160'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 160 BUSD packages "});
            }
        }else if(slotType==100){
            if(!(exists.packageBought.includes('320'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 320 BUSD packages "});
            }
        }else if(slotType==200){
            if(!(exists.packageBought.includes('640'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 640 BUSD packages "});
            }
        }else if(slotType==500){
            if(!(exists.packageBought.includes('1280'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 1280 BUSD packages "});
            }
        }else if(slotType==800){
            if(!(exists.packageBought.includes('2560'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 2560 BUSD packages "});
            }
        }else if(slotType==1000){
            if(!(exists.packageBought.includes('5120'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 5120 BUSD packages "});
            }
        }else if(slotType==1500){
            if(!(exists.packageBought.includes('10240'))){
                return res.status(400).json({message:"You can not buy this slot you have to buy 10240 BUSD packages "});
            }
        }else {
            return res.status(400).json({message:"Invalid Slot"});
        }
        let uplinAddress=[]
        const result = await slotTree.find({
            isRoot: true,
            slotType: slotType
          })
          console.log("result",result);
          if(result){
            const lastEntry = await slotTree
            .find({ slottype: 20 })
            .sort({ timestamp: -1 }) // Assuming you have a field called 'timestamp'
            .limit(1)

            uplinAddress=await FindUpline(lastEntry.address);
            if(uplinAddress.length<3){
                let check=3-uplinAddress.length;
                for(let i=0;i<check;i++){
                    uplinAddress.push(process.env.admin_address);
                }
            }
          }else{
            uplinAddress=[process.env.admin_address,process.env.admin_address,process.env.admin_address];
          }
        // const boughtSlot = await slots.create({
        //     userId,
        //     address,
        //     transactionHash,
        //     slot:slotType
        // });
        // await boughtSlot.save();

        // await activities.create({
        //     userId ,               // creates teh activity 
        //     activiy : `ID ${userId} +${slotType}BUSD`,
        //     transactionHash 
        // });

        return res.status(200).json({message : "Data Validate SuccessFully",data:{"refferAddress":exists.referBy,"uplinAddress":uplinAddress,"amount":Number(slotType)}})

    }catch (error){
        console.log("error",error.message)
        return res.status(400).json({message:error.message})
    }
}

export const fetchslot=async(req,res)=>{
    try{
        const {address,userId,startDate, endDate} = req.body;
        if(!userId) return res.status(400).json({message:"Invalid userId.userId must contain some value"});
        const exists = await users.findOne({address});
        if(!exists){
           return res.status(400).json({message:"User Not Found"});
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
        if(array) return res.status(200).json({ result: array });
        else res.status(404).json({message:"Data Not found"});

    }catch (error){
        console.log("error",error.message)
    }
}

export const updateSlot=async(req,res)=>{
    try{
        const {address , refferAddress, transactionHash ,uplineAddress,amount,userId} = req.body;
        const exists = await users.findOne({address});
        const existsRefferAddress = await users.findOne({address:refferAddress});
        if(!exists){
            return res.status(200).json({message : "User Not Exits"})
        }
        if(!existsRefferAddress){
            return res.status(200).json({message : "Reffer Address Not Exits"})
        }
        
        await users.updateOne({address:refferAddress},{$set:{ refferalIncome:((existsRefferAddress.refferalIncome)+(amount/4))}})
        let uplineAddressesData;
        for(let i in uplineAddress){
            uplineAddressesData=await users.findOne({address:uplineAddress[i]})
            await users.updateOne({"address":uplineAddress[i]},{$set:{"slotIncome":(uplineAddressesData.levelIncome+(amount/4))}});
        }
        await activities.create({
            userId ,               // creates teh activity 
            activiy : `ID ${userId} +${amount}BUSD`,
            transactionHash 
        });
        await users.findOneAndUpdate(
            { address: address },
            { $push: { slotBought: amount.toString() } },        //updates the referto array and adds the new user that he referred to his array
            { new: true }
            ); 
        const boughtSlot = await slots.create({
            userId,
            address,
            transactionHash,
            slot:amount.toString()
        });
        await boughtSlot.save();

        return res.status(200).json({"message":`User Bought ${amount} BUSD Package successFully`})
    }catch(error){
        console.log(`there is error in data updating ${error}`)
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

const FindUpline=async(address)=>{
    const firstUserData= await slotTree.findOne({address})
    let addresss=[];
    
    if(firstUserData && firstUserData.parantAddress!=null){
        if(11<firstUserData.myTeam.length<14) addresss.push (process.env.admin_address)
        else addresss.push(firstUserData.parantAddress);
        let secondUserData=await slotTree.findOne({address:firstUserData.parantAddress})
        if(secondUserData && secondUserData.parantAddress){
            if(11<secondUserData.myTeam.length<14) addresss.push (process.env.admin_address)
            else addresss.push(secondUserData.parantAddress);
            let thirdUserData=await slotTree.findOne({address:secondUserData.parantAddress})
            if(thirdUserData && thirdUserData.parantAddress){
                if(11<thirdUserData.myTeam.length<14) addresss.push (process.env.admin_address)
                else addresss.push(thirdUserData.parantAddress);
        }else return addresss;
        } else return addresss
    }else return addresss
}



const  addMember=async()=>{

}