import HDWalletProvider from 'truffle-hdwallet-provider'
import activities from "../models/activity.js";
import slots from "../models/slots.js";
import users from "../models/users.js";
import slotTree from "../models/slotTracking.js";
import incomeTransactions from '../models/incomeTransactions.js'
import Web3 from "web3";
export const buySlot = async (req, res) => {
    try {
        const { userId, address, slotType } = req.body;
        if (!userId) return res.status(400).json({ message: "Invalid userId.userId must contain some value" });
        if (!address) return res.status(400).json({ message: "Invalid address.address must contain some value" });
        if (!slotType) return res.status(400).json({ message: "Invalid slotType.slotType must contain some value" });
        const exists = await users.findOne({ address });
        if (!exists) {
            return res.status(400).json({ message: "User Not Found" });
        }

        if (slotType == 20) {
            if (!(exists.packageBought.includes('20') && exists.packageBought.includes('30') && exists.packageBought.includes('80'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 20,30,80 USDT packages " });
            }
        } else if (slotType == 50) {
            if (!(exists.packageBought.includes('160'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 160 USDT packages " });
            }
        } else if (slotType == 100) {
            if (!(exists.packageBought.includes('320'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 320 USDT packages " });
            }
        } else if (slotType == 200) {
            if (!(exists.packageBought.includes('640'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 640 USDT packages " });
            }
        } else if (slotType == 500) {
            if (!(exists.packageBought.includes('1280'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 1280 USDT packages " });
            }
        } else if (slotType == 800) {
            if (!(exists.packageBought.includes('2560'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 2560 USDT packages " });
            }
        } else if (slotType == 1000) {
            if (!(exists.packageBought.includes('5120'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 5120 USDT packages " });
            }
        } else if (slotType == 1500) {
            if (!(exists.packageBought.includes('10240'))) {
                return res.status(400).json({ message: "You can not buy this slot you have to buy 10240 USDT packages " });
            }
        } else {
            return res.status(400).json({ message: "Invalid Slot" });
        }
        let uplinAddress = []

        await insertAddressBFS(process.env.admin_address, address, slotType)
        console.log(`address is s${address} , adnd slot ype is : ${slotType}`)
        uplinAddress = await FindUpline(address, slotType);
        console.log("uplinAddress", uplinAddress);
        console.log(` lenght is in line 58 is : ${uplinAddress.length}`)
        if (uplinAddress.length < 3) {
            let check = 3 - uplinAddress.length;
            for (let i = 0; i < check; i++) {
                if (!(uplinAddress[i])) uplinAddress.push(process.env.admin_address);
                uplinAddress.push(process.env.admin_address);
            }
        }
        return res.status(200).json({ message: "Data Validate SuccessFully", data: { "refferAddress": exists.referBy, "uplinAddress": uplinAddress, "amount": Number(slotType) } })

    } catch (error) {
        console.log("error", error.message)
        console.error(error)
        return res.status(400).json({ message: error.message })
    }
}

export const fetchslot = async (req, res) => {
    try {
        const { address, userId, startDate, endDate } = req.body;
        if (!userId) return res.status(400).json({ message: "Invalid userId.userId must contain some value" });
        const exists = await users.findOne({ address });
        if (!exists) {
            return res.status(400).json({ message: "User Not Found" });
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
        if (array) return res.status(200).json({ result: array });
        else res.status(404).json({ message: "Data Not found" });

    } catch (error) {
        console.log("error", error.message)
        console.error(error)
    }
}

export const updateSlot = async (req, res) => {
    try {
        const { address, refferAddress, transactionHash, uplineAddress, amount, userId } = req.body;
        const exists = await users.findOne({ address });
        const existsRefferAddress = await users.findOne({ address: refferAddress });
        if (!exists) {
            return res.status(200).json({ message: "User Not Exits" })
        }
        if (!existsRefferAddress) {
            return res.status(200).json({ message: "Reffer Address Not Exits" })
        }

        await users.updateOne({ address: refferAddress }, { $set: { refferalIncome: ((existsRefferAddress.refferalIncome) + (amount / 4)) } })
        await incomeTransactions.create({
            fromUserId: userId,
            toUserId: existsRefferAddress.userId,
            fromAddress: address,
            toAddress: refferAddress,
            incomeType: "Referral income",
            amount: amount / 4,
            transactionHash
        })

        let uplineAddressesData;
        for (let i in uplineAddress) {
            uplineAddressesData = await users.findOne({ address: uplineAddress[i] })
            await users.updateOne({ "address": uplineAddress[i] }, { $set: { "slotIncome": (uplineAddressesData.levelIncome + (amount / 4)) } });
            await incomeTransactions.create({
                fromUserId: userId,
                toUserId: uplineAddressesData.userId,
                fromAddress: address,
                toAddress: uplineAddress[i],
                incomeType: "Slot income",
                amount: amount / 4,
                transactionHash
            })
        }
        await activities.create({
            userId,               // creates teh activity 
            activiy: `ID ${userId} +${amount}USDT`,
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
            slot: amount.toString()
        });
        await boughtSlot.save();

        return res.status(200).json({ "message": `User Bought ${amount} USDT Slot successFully` })
    } catch (error) {
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

const FindUpline = async (address, slotType) => {
    console.log(`address : ${address} , and slottype : ${slotType} in the function`)
    const firstUserData = await slotTree.findOne({ address: address, slotType: slotType })
    console.log(`firstuser data is : ${firstUserData}`)
    let addresss = [];
    if (firstUserData && firstUserData.parantAddress != null) {
        console.log(` lenght value is : ${firstUserData.myTeam.length}`)
        if (11 < firstUserData.myTeam.length && firstUserData.myTeam.length < 14) {
            addresss.push(process.env.new_address);
            console.log("in the if")
        }
        else {
            addresss.push(firstUserData.parantAddress);
            console.log("in the else")
        }

        let secondUserData = await slotTree.findOne({ address: firstUserData.parantAddress, slotType: slotType })
        if (secondUserData && secondUserData.parantAddress != null) {
            if (11 < secondUserData.myTeam.length && secondUserData.myTeam.length < 14) addresss.push(process.env.new_address)
            else addresss.push(secondUserData.parantAddress);
            let thirdUserData = await slotTree.findOne({ address: secondUserData.parantAddress, slotType: slotType })
            if (thirdUserData && thirdUserData.parantAddress != null) {
                if (11 < thirdUserData.myTeam.length && thirdUserData.myTeam.length < 14) addresss.push(process.env.new_address)
                else  addresss.push(thirdUserData.parantAddress);
            return addresss;
            } else return addresss;
        } else {
            return addresss
        }
    } else return addresss
}



async function insertAddressBFS(adminAddress, newAddress,slotType) {
    // Find the admin node
    console.log(adminAddress, newAddress,slotType);
    const adminNode = await slotTree.findOne({ address: adminAddress,slotType:slotType});
    console.log("adminNode",adminNode);
    if (!adminNode) {
        console.error('Admin node not found!');
        return;
    }
    if(adminNode.myTeam.length<=14){

    }else {
        adminNode.myTeam=[]
        await adminNode.save(); 
       await  insertAddressBFS(adminAddress,adminAddress,slotType)
       await  sendMoney(adminAddress,slotType)
    }

    // Create the new node
    let newNode = new slotTree({ address: newAddress,slotType:slotType });
    if(!(adminNode.myTeam.includes(newAddress))) adminNode.myTeam.push(newAddress);
    await adminNode.save();
    // Check if the left child of the admin node is empty
    if (!adminNode.leftAddress) {
        adminNode.leftAddress = newAddress;
        await adminNode.save();
         newNode = new slotTree({ address: newAddress,slotType:slotType,parantAddress: adminNode.address});
         await newNode.save();
        return; // Node inserted as the left child of the admin node
    }

    // Check if the right child of the admin node is empty
    if (!adminNode.rightAddress) {
        adminNode.rightAddress = newAddress;
        await adminNode.save();
        newNode = new slotTree({ address: newAddress,slotType:slotType,parantAddress: adminNode.address});
         await newNode.save();
        return; // Node inserted as the right child of the admin node
    }

    // If both children of the admin node are occupied, use BFS to find an available position
    const queue = [adminNode];
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if(currentNode.myTeam.length<=14){}else{
            currentNode.myTeam=[]
            await currentNode.save(); 
            await insertAddressBFS(adminAddress,currentNode.address,slotType)
            await sendMoney(currentNode.address,slotType)
        }

            if(!(currentNode.myTeam.includes(newAddress))) currentNode.myTeam.push(newAddress);
        await currentNode.save();
        // Check if the left child of the current node is empty
        if (!currentNode.leftAddress) {
            currentNode.leftAddress = newAddress;
            await currentNode.save();
            newNode = new slotTree({ address: newAddress,slotType:slotType,parantAddress: currentNode.address});
            await newNode.save();
            return; // Node inserted as the left child of the current node
        }

        // Check if the right child of the current node is empty
        if (!currentNode.rightAddress) {
            currentNode.rightAddress = newAddress;
            await currentNode.save();
            newNode = new slotTree({ address: newAddress,slotType:slotType,parantAddress: currentNode.address});
            await newNode.save();
            return; // Node inserted as the right child of the current node
        }

        // Enqueue the left and right children for further exploration
        if (currentNode.leftAddress) {
            const leftChild = await slotTree.findOne({ address: currentNode.leftAddress,slotType:slotType });
            queue.push(leftChild);
        }
        if (currentNode.rightAddress) {
            const rightChild = await slotTree.findOne({ address: currentNode.rightAddress,slotType:slotType });
            queue.push(rightChild);
        }
    
    }

    console.error('No available space to insert the new node!');
    
}


export const sendMoney=async(address,slotType)=>{

const firstUserData= await users.findOne({address:address})
let uplinAddress=await FindUpline(address,slotType);
console.log("uplinAddress",uplinAddress);
if(uplinAddress.length<3){
    let check=3-uplinAddress.length;
    for(let i=0;i<check;i++){
        if(!(uplinAddress[i]))  uplinAddress.push(process.env.admin_address);
        uplinAddress.push(process.env.admin_address);
    }
}
const privateKey = process.env.new_private_key;
// Set up web3.js with your Ethereum node provider
let provider= new HDWalletProvider(process.env.new_private_key, "https://bsc-dataseed.binance.org/")
const web3 = new Web3(provider);

// Load the contract ABI and address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "refAffress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "upgradePackgeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyPackage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "refAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "levelAddresses",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buySlot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "refferAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "levelAddresses",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amount",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "refferIncome",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "adminIncome",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; // Replace [...] with your contract's ABI

const contractAddress = '0xc0fCfd986f93319c7464BE64E277B60Eef894cc0';

// Import or generate an Ethereum account using the private key

console.log("privateKey",privateKey);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call a contract function
const functionName = 'buySlot';
console.log(firstUserData,"firstUserData");
const functionArguments = [firstUserData.referBy,uplinAddress,(slotType*1e18).toString()]; // Replace [...] with function arguments if any
const options = {
  from: account.address, // Use the account address as the sender
  gas: 2000000, // Adjust gas according to the function being called
};

contract.methods[functionName](...functionArguments).send(options)
  .on('transactionHash',async function(hash){
    console.log('Transaction Hash:', hash);
    await updateSlotNew(address,firstUserData.referBy,hash,uplinAddress,slotType,firstUserData.userId)
  })
  .on('receipt', function(receipt){
    console.log('Receipt:', receipt);
  })
  .on('error', console.error);

}

const updateSlotNew=async(address , refferAddress, transactionHash ,uplineAddress,amount,userId)=>{
    try{
        
        const exists = await users.findOne({address});
        const existsRefferAddress = await users.findOne({address:refferAddress});
        if(!exists){
            return res.status(200).json({message : "User Not Exits"})
        }
        if(!existsRefferAddress){
            return res.status(200).json({message : "Reffer Address Not Exits"})
        }
        
        await users.updateOne({address:refferAddress},{$set:{ refferalIncome:((existsRefferAddress.refferalIncome)+(amount/4))}})
        await incomeTransactions.create({
            fromUserId:userId,
            toUserId:existsRefferAddress.userId,
            fromAddress:address,
            toAddress:refferAddress,
            incomeType:"Referral income",
            amount:amount/4,
            transactionHash
        })

        let uplineAddressesData;
        for(let i in uplineAddress){
            uplineAddressesData=await users.findOne({address:uplineAddress[i]})
            await users.updateOne({"address":uplineAddress[i]},{$set:{"slotIncome":(uplineAddressesData.levelIncome+(amount/4))}});
            await incomeTransactions.create({
                fromUserId:userId,
                toUserId:uplineAddressesData.userId,
                fromAddress:address,
                toAddress:uplineAddress[i],
                incomeType:"Slot income",
                amount:amount/4,
                transactionHash
            })
        }
        await activities.create({
            userId ,               // creates teh activity 
            activiy : `ID ${userId} +${amount}USDT`,
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

        return res.status(200).json({"message":`User Bought ${amount} USDT Slot successFully`})
    }catch(error){
        console.log(`there is error in data updating ${error}`)
    }
}