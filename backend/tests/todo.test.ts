import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import { connectDb } from "../src/config/database";

let server: any;

beforeAll(async () => {
  await connectDb();
  server = app.listen();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe("ToDo API", () => {
  let todoId: string;

  it("should create a todo", async () => {
    const res = await request(server)
      .post("/api/todos")
      .send({ title: "Test Todo" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Todo");
    expect(res.body.completed).toBe(false);

    todoId = res.body.id;
  });

  it("should get all todos", async () => {
    const res = await request(server).get("/api/todos");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a todo", async () => {
    const res = await request(server)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true }); 
      
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const res = await request(server).delete(`/api/todos/${todoId}`);

    expect(res.status).toBe(204);
  });
});
