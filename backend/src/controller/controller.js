
import Todo from '../models/model.js'
import mongoose from 'mongoose';

export const addTodo = async(req,res) =>{
    const {title, description} = req.body;
    if(!title || title.trim() === ""){
        return res.status(400).json({
            success: false,
            message:"Title is required",
        });
    }
    const todo = await Todo.create({
        title,
        description
    });
    if(!todo){
        return res.status(404).json({
            success:false,
            message:"Todo is not found"
        });
    }
    return res.status(201).json({
        success:true,
        message:"Todo created successfully",
        data: todo
    });
}

//Get All Todos

export const getAllTodos = async(req,res) => {
    // seach sort page limit 
    //Params
    const {search, sort} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //query
    const query={};
    if(search){
        query.title = {$regex: search, $options:"i"};
    }

    // sort
    const sortQ = {createdAt: sort === "asc" ? 1 : -1};
    
    //skip
    const skip = (page -1)*limit;

    // Todo seach
    const todo = await Todo.find(query).sort(sortQ).skip(skip).limit(limit);
    const totalTodo = await Todo.countDocuments(query);

    if(!todo){
        return res.status(404).json({
            success:false,
            message:"Todo is not found."
        });
    }
    return res.status(200).json({
        success:true,
        message:"Todo found successfully",
        total:totalTodo,
        page:page,
        limit:limit,
        data: todo,
    });
}

//Get Todo by ID

export const getTodoById = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid Todo ID"
        });
    }
    const todo = await Todo.findById(id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:"Todo not found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Todo get successfully",
        data:todo,
    });
}

//Update Todo by ID
export const updateTodo = async (req,res) => {
     const {id} = req.params;
     const {title, description} = req.body;
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid Todo ID",
        });
     }

     if(!title || title.trim() === ""){
        return res.status(400).json({
            success:false,
            message:"Title is required",
        });
     }
      const todo = await Todo.findByIdAndUpdate(id,{
        title,
        description,
     },{returnDocuments:true, runValidators:true});

     if(!todo){
        return res.status(404).json({
             success:false,
            message:"Toso is found",
        });
     }
    return res.status(201).json({ 
        success:true,
        message:"Todo updated successfully",
        data:todo,
    });
}

//isCompleted toggle logic
export const toggleTodoState= async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        success:false,
        message:"Invalid Todo ID",
    });
    const todo = await Todo.findById(id);

    if(!todo){
        return res.status(404).json({
            success:false,
            message:"Todo not found"
        });
    }
    
    //flip the isCompleted check
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return res.status(200).json({
        success:true,
        message:"isCompleted is toggled",
        data:todo,
    })
}


//Delete Tod by Id
export const deleteTodo = async(req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        success:false,
        message:"Invalid Todo ID",
    });
    const todo = await Todo.findByIdAndDelete(id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:"Todo not found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Todo deleted successfully",
        data:todo,
    });
}