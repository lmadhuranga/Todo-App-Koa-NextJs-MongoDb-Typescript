import Router from "koa-router"
import * as todoController from "../controllers/todo.controller";

const router = new Router({ prefix: "/api/todos" });

router.get('/', todoController.getTodosHandler);
router.get('/:id', todoController.getTodoHandler);
router.post('/', todoController.createTodoHandler);
router.put('/:id', todoController.updateTodoHandler);
router.delete('/:id', todoController.removeTodoHandler);


export default router;