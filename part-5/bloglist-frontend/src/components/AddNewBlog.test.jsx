import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import AddNewBlog from "./AddNewBlog";

test("<AddNewBlog /> calls the event handler with the right details", async () => {
  const mockCreateBlog = vi.fn();
  const mockToggleVisibility = vi.fn();
  const user = userEvent.setup();

  render(
    <AddNewBlog
      onCreateBlog={mockCreateBlog}
      toggleVisibility={mockToggleVisibility}
    />
  );
  const inputTitle = screen.getByPlaceholderText("write title here");
  const inputAuthor = screen.getByPlaceholderText("write author here");
  const inputURL = screen.getByPlaceholderText("write url here");

  const submitButton = screen.getByText("create");

  const titleValue = "some random title here...";
  const authorValue = "some random author here...";
  const urlValue = "some random url here...";

  await user.type(inputTitle, titleValue);
  await user.type(inputAuthor, authorValue);
  await user.type(inputURL, urlValue);

  await user.click(submitButton);

  expect(mockCreateBlog.mock.calls).toHaveLength(1);
  expect(mockCreateBlog.mock.calls[0][0].title).toBe(titleValue);
  expect(mockCreateBlog.mock.calls[0][0].author).toBe(authorValue);
  expect(mockCreateBlog.mock.calls[0][0].url).toBe(urlValue);
});
