import Todo from "../models/todo.model"

// Get all todos 
const getAllTodos = async (_limit: number = 10) => {
  return Todo.find().sort({ createdAt: -1 }).limit(_limit);
}

// Get todo filter by id
const getTodo = async (id) => {
  return Todo.findById(id);
}

// Create todo
const createTodo = async (data: { title: string }) => {
  return Todo.create({ title: data?.title });
}

// Update todo
const updateTodo = async (id: string, data: { title?: string, completed?: boolean }) => {
  const todo = await Todo.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
}

// Remove todo
const removeTodo = async (id: string) => {
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
}

export { getAllTodos, getTodo, createTodo, updateTodo, removeTodo };