import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config({ 
    path: './env' 
});

const port = process.env.PORT;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

app.use(express.urlencoded({ limit: "1kb", extended: true }));
app.use(express.json({ limit: "1kb" }));
app.use(cookieParser());
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send("Welcome to the server made by express");
});

import userRoutes from './routes/userRoutes.js';
app.use('/user', userRoutes);
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB}`, { 
        dbName:'SAND',
        useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Server is connected with the database successfully");
        app.on('error', (error) => {
            console.log(`Server error:`, error);
        });

        app.listen(port, () => {
            console.log(`Your server is running on port: ${port}`);
        });

    } catch (error) {
        console.log(`Something went wrong during the connection to the database`);
        console.error(error);
    }
})();
