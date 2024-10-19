import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({
    path:'./env'
})
const port = process.env.PORT || 3000
const app = express();
app.use(cors({
    options:process.env.CORS_POLICY,
    credentials:true
}))
app.use(cookieParser())
app.use((express.json({
    limit:"16Kb"
})))
app.use(express.urlencoded({
    limit:"16Kb",
    extended:true
}))
app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.send("Welcome to the server made by express")
});

(async()=>{
    try {
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB}/SAND`);
        console.log("Server is connected with the database Successfully")

        app.on('error', (error) => {
            console.log(`Server error:`, error);
        });
        
        app.listen(port, () => {
            console.log(`Your server is running on port: ${port}`);
        });
    } catch (error) {
        console.log(`Something went wrong during the connection to the database`);
        console.log(`Check::`, error);
    }
})();

import userRoutes from './routes/userRoutes.js'
app.use('/user',userRoutes);
app.use((err,res)=>{
    console.error(err.stack);
    res.status(500).json({ message :'Internal server error'})
});