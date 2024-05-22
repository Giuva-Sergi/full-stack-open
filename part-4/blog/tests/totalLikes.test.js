const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("totalLikes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const blogs = [
    {
      _id: "664caea772007a6fe6f029e8",
      title: "Test title",
      author: "Giovanni",
      url: "https://example.com",
      likes: 33,
      __v: 0,
    },
    {
      _id: "664caf7fc5a5e35ddb2900ba",
      title: "Another random title",
      author: "Giovanni",
      url: "https://example.com",
      likes: 46,
      __v: 0,
    },
    {
      _id: "664cb0978c1a56fc9366d5c7",
      title: "keep testing",
      author: "Giovanni",
      url: "https://example.com",
      likes: 46,
      __v: 0,
    },
    {
      _id: "664cb186038d6d18c4ea40b8",
      title: "keep testing again",
      author: "Giovanni",
      url: "https://example.com",
      likes: 46,
      __v: 0,
    },
    {
      _id: "664cb3e970b485e50deee4c3",
      title: "keep testing again and again and again",
      author: "Giovanni",
      url: "https://example.com",
      likes: 22,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 193);
  });
});
