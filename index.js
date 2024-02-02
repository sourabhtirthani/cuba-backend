import express from 'express'
import activityRoutes from './routes/activityRoutes.js'
import userRoutes from './routes/userRoutes.js'
import packages from './models/packageInfo.js'
import { connectToDB } from './database/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors'
const app = express();
const PORT = 5000;

connectToDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public', 'temp')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use('/api/users' , userRoutes);
app.use('/api/activities' , activityRoutes);

app.listen(PORT, ()=>{
    console.log(`server started on port : ${PORT}`)
});