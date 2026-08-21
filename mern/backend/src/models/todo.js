import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({ 
    task: {
        type: String,
        required:true
    },
    isDone:{
        type: Boolean,
        default: false
    },
});

export default mongoose.model('todos', todoSchema);