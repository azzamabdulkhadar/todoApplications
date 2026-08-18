import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB =  async() => {

        await mongoose.connect(process.env.MONGO_URI);
        // console.log("Database connected successfully")
    // }catch(e){
    //     console.log("Database connection Failed!");
    //     console.error(e.message);
    //     process.exit(1);
    // }
}

