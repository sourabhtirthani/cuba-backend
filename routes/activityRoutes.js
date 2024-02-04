import express from 'express'
import { fetchAllActivities, getDashboardInfo } from '../controllers/activityController.js';
// import { getDashboardInfo } from '../controllers/dashboardController.js';
// import { fetchAllActivities } from '../controllers/userController.js';

const router = express.Router();

router.get('/all' , fetchAllActivities);
router.get('/dashboard/:address' ,getDashboardInfo)

export default router;
