import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import TodoModel from './src/models/Todo.js'


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mernTodo')
    .then(() => console.log("database is connected"))
    .catch(err => console.log("database connection error:", err));

app.get('/', (req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});
app.post('/', (req,res) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task,
    }).then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/:id', async (req,res)=>{
    const {id} = req.params;
    try {
        const todo = await TodoModel.findById(id);
        const result = await TodoModel.findByIdAndUpdate(id, {isDone: !todo.isDone}, {new: true});
        res.json(result);
    } catch(err) {
        res.json(err);
    }
});
app.delete('/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result)).catch(err => res.json(err));
})

app.listen(3005, ()=>{
    console.log('server is running');
});