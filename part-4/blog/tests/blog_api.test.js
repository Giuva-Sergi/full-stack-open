const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, initializeDB } = require("../utils/test_helper");

const api = supertest(app);

describe("when there are blogs in the database", () => {
  beforeEach(() => initializeDB(initialBlogs));

  test("blogs are returned as JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("unique identifier file is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert(
        Object.keys(blog).includes("id") && !Object.keys(blog).includes("_id")
      );
    });
  });
});

describe("addition of a new blog", () => {
  test("making a POST request successfully creates new blog post", async () => {
    const payload = {
      title: "Testing blog",
      author: "Robert C. Martin",
      url: "http://example.come",
      likes: 33,
    };

    await api
      .post("/api/blogs")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);
  });

  test("default value of likes is zero", async () => {
    const payload = {
      title: "Testing zero like blog",
      author: "Robert C. Martin",
      url: "http://example.come",
    };

    await api
      .post("/api/blogs")
      .send(payload)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.at(-1).likes, 0);
  });

  test("missing title or URL in a POST request ends up in 400 status code", async () => {
    const payloads = [
      {
        author: "Robert C. Martin",
        url: "http://example.come",
      },
      {
        title: "Testing missing content blog",
        author: "Robert C. Martin",
      },
    ];

    for (let payload of payloads) {
      await api.post("/api/blogs").send(payload).expect(400);
    }
  });
});

describe("deleting a blog", () => {
  beforeEach(() => initializeDB(initialBlogs));

  test("succeeds with status code 204 if id is valid", async () => {
    const res = await api.get("/api/blogs");
    const blogId = res.body.at(0).id;

    await api.delete(`/api/blogs/${blogId}`).expect(204);

    const blogsAtEnd = await Blog.find({});

    assert.strictEqual(initialBlogs.length - 1, blogsAtEnd.length);
  });

  test("fails with status code 400 if id is not valid", async () => {
    const invalidId = "95678";

    await api.delete(`/api/blogs/${invalidId}`).expect(400);

    const blogsAtEnd = await Blog.find({});

    assert.strictEqual(initialBlogs.length, blogsAtEnd.length);
  });
});

describe("updating a blog", () => {
  beforeEach(() => initializeDB(initialBlogs));

  test("succeeds with status code 201 if id is valid", async () => {
    const payload = {
      likes: 12,
    };

    const blogsAtStart = await Blog.find({});

    await api
      .put(`/api/blogs/${blogsAtStart.at(0).id}`)
      .send(payload)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await api.get("/api/blogs");

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.body.length);
  });

  test("failed with status code 400 if id is not valid", async () => {
    const payload = {
      likes: 12,
    };

    const malformattedId = 5;

    const blogsAtStart = await Blog.find({});

    await api.put(`/api/blogs/${malformattedId}`).send(payload).expect(400);

    const response = await api.get("/api/blogs");

    assert.strictEqual(blogsAtStart.length, response.body.length);
  });

  test("failed with status code 404 if id not found", async () => {
    const postContent = {
      title: "Test title",
      author: "Test author",
      url: "https://test.com",
    };

    const payload = {
      likes: 11,
    };

    const blogsAtStart = await Blog.find({});

    const postToDelete = await api.post("/api/blogs").send(postContent);
    const postToDeleteId = postToDelete.body.id;

    await Blog.findByIdAndDelete(postToDeleteId);

    await api.put(`/api/blogs/${postToDeleteId}`).send(payload).expect(404);

    const response = await api.get("/api/blogs");

    assert.strictEqual(blogsAtStart.length, response.body.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
