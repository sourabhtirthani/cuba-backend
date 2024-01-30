import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';
import { upload } from '../middlewares/multer.js';
import { createProfile, getProfile, updateProfile } from '../controllers/userController.js';
import { buyPackage,fetchPackage } from '../controllers/packageController.js';
import { buySlot, fetchslot } from '../controllers/slotController.js';
const router = express.Router();

router.post('/create' , [upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler] , createProfile);
router.patch('/update' ,[upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler], errorHandler, updateProfile )
router.get('/userdetails/:address' , errorHandler , getProfile)

// package Router 
router.post('/buyPackage',errorHandler,buyPackage);
router.get('/fetchPackages',errorHandler,fetchPackage);

//slot Routers
router.post('/buySlots',errorHandler,buySlot);
router.get('/fetchSlots',errorHandler,fetchslot)


export default router;