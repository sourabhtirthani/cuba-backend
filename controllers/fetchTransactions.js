import incomeTransactions from "../models/incomeTransactions.js"
export const transactions=async(req,res)=>{
 let result = await incomeTransactions.find({}).sort({ createdAt: "desc" });

 if(!result) return res.status(400).json({messgae:"No Data Found"});
 else return res.status(200).json({messgae:"Data Found",data:result});
}