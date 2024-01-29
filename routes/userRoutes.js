import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';
import { upload } from '../middlewares/multer.js';
import { createProfile, getProfile, updateProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/create' , [upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler] , createProfile);
router.patch('/update' ,[upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler], errorHandler, updateProfile )
router.get('/userdetails/:address' , errorHandler , getProfile)

export default router;