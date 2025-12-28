import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { connectDb } from "../src/config/database";

let server: any;

beforeAll(async () => {
  await connectDb();
  server = app.listen();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("ToDo API", () => {
  const createTodo = async (title = "Test Todo") =>
    request(server).post("/api/todos").send({ title });

  it("should create a todo", async () => {
    const res = await createTodo();

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Todo");
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeTruthy();
  });

  it("should reject invalid todo payloads", async () => {
    const res = await request(server).post("/api/todos").send({ title: "" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("should get all todos", async () => {
    await createTodo("First Todo");
    await createTodo("Second Todo");

    const res = await request(server).get("/api/todos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("should get a todo by id", async () => {
    const created = await createTodo("Fetch Todo");
    const todoId = created.body.id;

    const res = await request(server).get(`/api/todos/${todoId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(todoId);
    expect(res.body.title).toBe("Fetch Todo");
  });

  it("should update a todo", async () => {
    const created = await createTodo("Update Todo");
    const todoId = created.body.id;

    const res = await request(server)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true, title: "Updated Todo" }); 
      
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.title).toBe("Updated Todo");
  });

  it("should reject empty update payloads", async () => {
    const created = await createTodo("No Update");
    const todoId = created.body.id;

    const res = await request(server).put(`/api/todos/${todoId}`).send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("should delete a todo", async () => {
    const created = await createTodo("Delete Todo");
    const todoId = created.body.id;

    const res = await request(server).delete(`/api/todos/${todoId}`);

    expect(res.status).toBe(204);

    const listRes = await request(server).get("/api/todos");
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBe(0);
  });
});
