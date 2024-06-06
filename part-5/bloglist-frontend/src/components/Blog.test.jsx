import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("by default Blog renders only the author and title", () => {
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

test("url and likes are shown only if button is clicked", async () => {
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

  const button = screen.getByText("view");

  const urlEl = blogEl.querySelector(".url");
  const likesEl = blogEl.querySelector(".likes");

  // before clicking the button elements are null
  expect(urlEl).toBeNull();
  expect(likesEl).toBeNull();

  const user = userEvent.setup();

  await user.click(button);

  // after clicking elements are defined
  expect(urlEl).toBeDefined();
  expect(likesEl).toBeDefined();
});

test("if like button is clicked twice, event handler is called twice", async () => {
  const blog = {
    author: "Test author",
    title: "Test title",
    url: "https://test.com",
    user: {
      username: "testUsername",
      name: "Test name",
    },
  };

  const numberOfCalls = 2;

  const mockHandler = vi.fn();

  render(<Blog blog={blog} onUpdateLikes={mockHandler} />);

  const viewButton = screen.getByText("view");

  const user = userEvent.setup();
  await user.click(viewButton);

  const likeBtn = screen.getByText("like");

  for (let i = 0; i < numberOfCalls; i++) {
    await user.click(likeBtn);
  }

  expect(mockHandler.mock.calls).toHaveLength(2);
});
