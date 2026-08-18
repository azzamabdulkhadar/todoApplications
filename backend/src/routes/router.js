import {Router} from 'express'
import { asyncFun } from '../middlewares/async.js';
import {addTodo, getAllTodos, getTodoById, updateTodo,toggleTodoState, deleteTodo} from '../controller/controller.js'


const route = Router()

route.get('/', asyncFun(getAllTodos));
route.post('/', asyncFun(addTodo));
route.get('/:id', asyncFun(getTodoById));
route.put('/:id', asyncFun(updateTodo));
route.patch('/:id/toggle', asyncFun(toggleTodoState) )
route.delete('/:id', asyncFun(deleteTodo));

export default route;