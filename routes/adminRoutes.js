import express from 'express'
import { fetchAllUsers, fetchAllActivities,updateProfile,getProfile,fetchPackage,fetchslot, createProfile, login, updateAnnouncement, fetchAllIncomes } from '../controllers/adminController.js';
import { upload } from '../middlewares/multer.js';
import errorHandler from '../middlewares/errorHandler.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

/// routes for users and profile starts here
// router.get('/allUsers' , fetchAllUsers);
router.post('/profile/login' , login);
router.post('/profile/create' , createProfile);
router.patch('/profile/update' ,[upload.fields([{ name: 'profilePicture', maxCount: 1 }]),errorHandler, authenticateToken], errorHandler, updateProfile );  //ok
router.get('/details/:address' , [errorHandler, authenticateToken] , getProfile); // ok
router.get('/allUsers' ,[errorHandler, authenticateToken], fetchAllUsers)    // Note : This route is using query of start and end date ok

/// routes forpackages and slots starts here 
router.post('/fetchPackages',[errorHandler, authenticateToken],errorHandler,fetchPackage);  //ok
router.post('/fetchSlots', [errorHandler, authenticateToken] ,errorHandler,fetchslot)   // ok

/// routes for activities starts here
router.get('/activities/all', [errorHandler, authenticateToken] , fetchAllActivities); // ok


//annoouncements
router.post('/announcements', [errorHandler, authenticateToken] , updateAnnouncement);

//income table route
router.get('/incomes' , fetchAllIncomes);  // add authmiddleware here 

export default router;