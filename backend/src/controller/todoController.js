
import todoDB from '../models/todo.model.js'
import mongoose from 'mongoose';

export const createTodo = async(req,res) => {
    // try{}catch(error){}   // no need to wrap anymore every controller in 
    // try catch block instead of it we are using asyncHndler wrapper funtion

        const {title, description} = req.body;
        if(!title || title.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
         const todo = await todoDB.create({
            title,
            description
        });
        return res.status(201).json({
            success: true,
            message: "Todo created successfully.",
            todo,
        });
    
}

// Get all todos
export const getTodos = async (req,res) => {
        // Query params
        const {search, sort} = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Base query
        let query = {};

        // Search by title
        if(search){
            query.title = {$regex: search, $options: "i"}; // i is case insensitive
        }
        
        //sorting 
        let querySort = { createdAt: sort === "asc" ? 1 : -1 }; // 1 is for ascending order and -1 is for descending order

        // Pagination
        const pageSkip = (page - 1)*limit;
        
        // It fetches a filtered, sorted, paginated list of todos from MongoDB and stores the result in todo.
        const todos = await todoDB.find(query).sort(querySort).skip(pageSkip).limit(limit);

        // totalTodos
        const totalTodos = await todoDB.countDocuments(query);

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            total: totalTodos,
            page: page,
            limit: limit,
            data: todos,
        })
    }
    

// Get todo by Id
export const getTodoById = async (req,res) => { 
        const {id} = req.params;
        // Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Todo ID",
            });
        }
        const todo = await todoDB.findById(id);

        // if Todo is not found
        if(!todo){
        return res.status(404).json({
            success:false,
            message: "Todo not found",
        })
        }

        // if Todo found
        return res.status(200).json({
        success:true,
        message:"Todo get successfully",
        data: todo,
        });
   
}

// update Todo title and description
export const updateTodo = async(req, res) => {
        const {id} = req.params;
        const {title, description} = req.body;

        // Validate Id based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
            success:false,
            message:"Invalid Todo ID",
        });
        }
        // Valid content data
        if(!title || title.trim()===""){
            return res.status(400).json({
                success:false,
                message: "Title is required."
            })
        }

        //Update Todo logic
        const todo = await todoDB.findByIdAndUpdate(
            id,
            {title, description},
            {returnDocument:true, runValidators:true} // returnDocument: 'after' or new: true will return updated document
        );
        if(!todo){
            return res.status(404).json({
            success:false,
            message:"Todo not found",
        });
        }
            return res.status(201).json({
            success:true,
            message:"Todo updated successfully",
            data: todo
        });
   
}

//toggle Todo by ID - PATCH API
export const toggleTodo = async(req,res) =>{
        const {id} = req.params;
        // validate Todo ID
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Todo ID",
            });
        }
        const todo = await todoDB.findById(id);

        //Validate Todo is found or not
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo is not found."
            });
        }

        // Flip the isCompleted field - toggel logic
        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        //success data
        return res.status(200).json({
            success:true,
            message:"Todo toggle successfully",
            data: todo,
        })

    
}

// delete a todo by id
export const deleteTodo = async(req,res) => {
    // try{}catch(error){}   // no need to wrap anymore every controller in 
    // try catch block instead of it we are using asyncHndler wrapper funtion
        const {id} = req.params;
        // validate Todo id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Todo ID"
            });
        }
        // Delete Todo
        const todo = await todoDB.findByIdAndDelete(id);

        // Validate Todo is found or not
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo is not found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Todo deleted successfully",
            data: todo
        });
}