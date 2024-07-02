const { test, describe, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

describe("addition of a new user", () => {
  test("missing username ends up in 400 status code with a proper error message", async () => {
    const payload = {
      name: "test user",
      password: "testpassword",
    };

    const response = await api.post("/api/users").send(payload).expect(400);
    assert(response.body.error.includes("Path `username` is required."));
  });

  test("missing password ends up in 400 status code with a proper error message", async () => {
    const payload = {
      name: "test user",
      username: "testusername",
    };

    const response = await api.post("/api/users").send(payload).expect(400);
    assert(response.body.error.includes("password is required"));
  });

  test("password shorter than 3 characters ends up in 400 status code with a proper error message", async () => {
    const payload = {
      name: "test user",
      username: "testusername",
      password: "te",
    };

    const response = await api.post("/api/users").send(payload).expect(400);
    assert(
      response.body.error.includes(
        "password must be at least 3 characters long"
      )
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
