import * as todoService from "../services/todo.service"
import { ITodo } from "../types/todo.types";
import {
  createTodoBodySchema,
  todoIdParamSchema,
  updateTodoBodySchema,
} from "../validators/todo.schemas";

const formatZodError = (error: unknown) => {
  if (!error || typeof error !== "object" || !("issues" in error)) {
    return { message: "Validation failed", errors: [] };
  }
  return { message: "Validation failed", errors: (error as any).issues };
};

// Get All Todos
const getTodosHandler = async (ctx: any) => {
  const {search} = ctx.query;
 
  const todos = await todoService.getAllTodos(search);
  if (!todos) {
    throw new Error("Not found todos");
  }
  ctx.body = todos;
}

// Get Todo
const getTodoHandler = async (ctx: any) => {
  // validate params
  const paramsResult = todoIdParamSchema.safeParse(ctx.params);
  if (!paramsResult.success) {
    ctx.status = 400;
    ctx.body = formatZodError(paramsResult.error);
    return;
  }
  const { id }: { id: string } = paramsResult.data;
  const todo: ITodo = await todoService.getTodo(id);
  if (!todo) {
    ctx.throw(404, "Todo not found");
  }
  ctx.body = todo;
}

// Create Todo
const createTodoHandler = async (ctx: any) => {
  // validate Body values
  const bodyResult = createTodoBodySchema.safeParse(ctx.request.body);
  if (!bodyResult.success) {
    ctx.status = 400;
    ctx.body = formatZodError(bodyResult.error);
    return;
  }
  const { title }: { title: string } = bodyResult.data;
  ctx.status = 201;
  ctx.body = await todoService.createTodo({ title });
}

// Update Todo
const updateTodoHandler = async (ctx: any) => {
  // validate params
  const paramsResult = todoIdParamSchema.safeParse(ctx.params);
  if (!paramsResult.success) {
    ctx.status = 400;
    ctx.body = formatZodError(paramsResult.error);
    return;
  }
  // validate Body values
  const bodyResult = updateTodoBodySchema.safeParse(ctx.request.body);
  if (!bodyResult.success) {
    ctx.status = 400;
    ctx.body = formatZodError(bodyResult.error);
    return;
  }
  const { id }: { id: string } = paramsResult.data;
  const { title, completed }: { title?: string, completed?: boolean } = bodyResult.data;
  const res = await todoService.updateTodo(id, { title, completed });
  ctx.body = res;
}

// Remove Todo
const removeTodoHandler = async (ctx: any) => {
  // validate params
  const paramsResult = todoIdParamSchema.safeParse(ctx.params);
  if (!paramsResult.success) {
    ctx.status = 400;
    ctx.body = formatZodError(paramsResult.error);
    return;
  }
  const { id }: { id: string } = paramsResult.data;
  await todoService.removeTodo(id);
  ctx.status = 204
}


export { getTodosHandler, getTodoHandler, removeTodoHandler, createTodoHandler, updateTodoHandler }
