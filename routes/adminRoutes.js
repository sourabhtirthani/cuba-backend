import express from 'express'
import { fetchAllUsers, fetchAllActivities,updateProfile,getProfile,fetchPackage,fetchslot, createProfile } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';
import errorHandler from '../middlewares/errorHandler.js';
const router = express.Router();

/// routes for users and profile starts here
// router.get('/allUsers' , fetchAllUsers);
router.post('/profile/create' , createProfile);
router.patch('/profile/update' ,[upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler], errorHandler, updateProfile );  //ok
router.get('/details/:address' , errorHandler , getProfile); // ok
router.get('/allUsers' , fetchAllUsers)    // Note : This route is using query of start and end date ok

/// routes forpackages and slots starts here 
router.post('/fetchPackages',errorHandler,fetchPackage);  //ok
router.post('/fetchSlots',errorHandler,fetchslot)   // ok

/// routes for activities starts here
router.get('/activities/all' , fetchAllActivities); // ok


export default router;