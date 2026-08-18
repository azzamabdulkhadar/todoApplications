import { Router } from "express";
import { createTodo,getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from "../controller/todoController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const route = Router();

route.post('/', asyncHandler(createTodo));
route.get('/', asyncHandler(getTodos));
route.get('/:id', asyncHandler(getTodoById));
route.put('/:id', asyncHandler(updateTodo));
route.patch('/:id/toggle', asyncHandler(toggleTodo));
route.delete('/:id', asyncHandler(deleteTodo))


export default route;