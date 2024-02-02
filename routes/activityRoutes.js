import express from 'express'
import { fetchAllActivities } from '../controllers/activityController.js';
// import { fetchAllActivities } from '../controllers/userController.js';

const router = express.Router();

router.get('/all' , fetchAllActivities);

export default router;
