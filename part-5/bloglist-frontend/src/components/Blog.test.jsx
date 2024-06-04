import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Blog from "./Blog";

test("by default Blog renders only the author and title", async () => {
  const blog = {
    author: "Test author",
    title: "Test title",
    url: "https://test.com",
    user: {
      username: "testUsername",
      name: "Test name",
    },
  };

  const { container } = render(<Blog blog={blog} />);
  const blogEl = container.querySelector(".blog");

  const authorEl = blogEl.querySelector(".author");
  const titleEl = blogEl.querySelector(".title");

  const urlEl = blogEl.querySelector(".url");
  const likesEl = blogEl.querySelector(".likes");

  expect(authorEl).not.toBeNull();
  expect(titleEl).not.toBeNull();
  expect(urlEl).toBeNull();
  expect(likesEl).toBeNull();
});
