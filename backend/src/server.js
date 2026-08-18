import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './configs/databaseConfig.js';
import { errorM } from './middlewares/errorM.js';
import route from './routes/router.js'

dotenv.config();
const app = express();

//middelwares
app.use(express.json());
app.use(cors());

app.use('/api/todos', route); //Router
app.use(errorM);  //error middleware


const runServer = async() => {
    try{
       await connectDB();
       console.log("Database connected successfuly");
        app.listen(process.env.PORT, () => {
            console.log(`Serve is running on http://loacalhose: ${process.env.PORT}`);
        });
        
    }catch(error){
        console.log("DB connection failed please check DB configs");
    }
}
runServer();