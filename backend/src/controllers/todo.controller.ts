import * as todoService from "../services/todo.service"
import { ITodo } from "../types/todo.types";

// Get All Todos
const getTodosHandler = async (ctx: any) => {
  const todos = await todoService.getAllTodos();
  if (!todos) {
    throw new Error("Not found todos");
  }
  ctx.body = todos;
}

// Get Todo
const getTodoHandler = async (ctx: any) => {
  const { id }: { id: string } = ctx.params;
  if (!id) {
    ctx.throw(400, "Todo id is required");
  }
  const todo: ITodo = await todoService.getTodo(id);
  if (!todo) {
    ctx.throw(400, "Todo id is required");
  }
  ctx.body = todo;
}

// Create Todo
const createTodoHandler = async (ctx: any) => {
  const { title }: { title: string } = ctx.request.body;
  if (!title) {
    ctx.throw(400, "Todo id is required");
  }
  ctx.status = 201;
  ctx.body = await todoService.createTodo({ title });
}

// Update Todo
const updateTodoHandler = async (ctx: any) => {
  const { id }: { id: string } = ctx.params;
  const { title, completed }: { title: string, completed: boolean } = ctx.request.body;
  if (!id) {
    ctx.throw(400, "Todo id is required");
  }
  const res = await todoService.updateTodo(id, { title, completed });
  ctx.body = res;
}

// Remove Todo
const removeTodoHandler = async (ctx: any) => {
  const { id }: { id: string } = ctx.params;
  if (!id) {
    ctx.throw(400, "Todo id is required");
  }

  const todo: ITodo = await todoService.removeTodo(id);
  console.log(`delted todo`, todo);
  ctx.status = 204
}


export { getTodosHandler, getTodoHandler, removeTodoHandler, createTodoHandler, updateTodoHandler }