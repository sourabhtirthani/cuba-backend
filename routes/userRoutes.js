import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';
import { upload } from '../middlewares/multer.js';
import { checkUser, createProfile, fetchAllUsers, fetchMyReferral, getProfile, updateData, updateProfile } from '../controllers/userController.js';
import { buyPackage,fetchPackage } from '../controllers/packageController.js';
import { buySlot, fetchslot } from '../controllers/slotController.js';
const router = express.Router();

router.post('/create' , [upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler] , createProfile);
router.patch('/update' ,[upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler], errorHandler, updateProfile )
router.get('/userdetails/:address' , errorHandler , getProfile)
router.patch('/updateData',errorHandler,updateData)
router.get('/checkUser',errorHandler,checkUser)
// package Router 
router.post('/buyPackage',errorHandler,buyPackage);
router.post('/fetchPackages',errorHandler,fetchPackage);

//slot Routers
router.post('/buySlots',errorHandler,buySlot);
router.post('/fetchSlots',errorHandler,fetchslot)


// user Section from frontend routes
// router.get('/allusers/:startDate?/:endData?' , fetchAllUsers)
router.get('/allUsers' , fetchAllUsers)      // Note : This route is using query of start and end date

// router.get('/referrals/:address/:startDate?/:endDate?' , fetchMyReferral)
router.get('/referrals/:address' , fetchMyReferral)  // Note : This route is using query of start and end date


export default router;