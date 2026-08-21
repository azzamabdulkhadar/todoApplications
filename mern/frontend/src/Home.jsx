import { useState, useEffect } from "react";
import {BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill} from 'react-icons/bs'
import Create from './Create.jsx'
import axios from "axios";
import './App.css'


const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3005/').then(result => {
            if(Array.isArray(result.data)){
                setTodos(result.data)
            }
        }).catch(err => console.log(err));
    },[])

    const handleAdd = (newTodo) => {
        setTodos(prev => [...prev, newTodo])
    }

    const handleEdit = (id) => {
        axios.put('http://localhost:3005/'+id)
        .then(() => {
            setTodos(prev => prev.map(todo => todo._id === id ? {...todo, isDone: !todo.isDone} : todo))
        })
        .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3005/'+id)
        .then(() => {
            setTodos(prev => prev.filter(todo => todo._id !== id))
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="home">
            <h2>Todo List</h2>
            <Create onAdd={handleAdd}/>
                {
                    todos.length === 0 
                    ? 
                    <div> <h1>No Todos present</h1></div>
                    :
                    todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {
                                    todo.isDone ? <BsFillCheckCircleFill className='icon'/> : <BsCircleFill className='icon'/>
                                } 
                                <p style={todo.isDone ? {textDecoration: "line-through"} : {}}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>             
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;