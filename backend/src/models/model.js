import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, "Tile is required so please kindly add title"],
        trim: true,
    },
    description:{
        type: String,
        default:"",
     },
     isCompleted:{
        type: Boolean,
        default: false
     }
}, {timestamps:true})

export default mongoose.model("Todo", todoSchema);


