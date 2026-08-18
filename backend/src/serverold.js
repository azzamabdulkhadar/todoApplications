import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import route from './routes/todoRoutes.js'
import {connectDB} from './configs/db.js'
import {errorMiddleware} from './middlewares/errorMiddleware.js';


const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', route);

// Error middlewares
app.use(errorMiddleware);

const serverConnection = async() => {
    try{
        await connectDB();
        console.log("DataBase is connected successfully")
        app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port : ${process.env.PORT}`)
        })
    }catch(e){
        console.error(e.message);
        console.log("Database connection is failed.")
    }
}

serverConnection();

