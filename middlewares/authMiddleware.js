import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const authenticateToken = async(req, res, next)=>{
    try{
        const token = req.headers.authorization;    
        // console.log(`in the middleware function and the token that is recieved is : ${token}`)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
              return res.status(403).json({ message: 'Forbidden - Invalid token' });
            }
            req.user = user;
        
            next(); 
          });
          
    }catch(error){

    }
}