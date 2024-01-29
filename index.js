import express from 'express'
import userRoutes from './routes/userRoutes.js'
import { connectToDB } from './database/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();
const PORT = 5000;

connectToDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public', 'temp')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/api/users' , userRoutes);

app.listen(PORT, ()=>{
    console.log(`server started on port : ${PORT}`)
});

