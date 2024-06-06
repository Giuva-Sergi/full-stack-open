import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const mockCreateNote = vi.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={mockCreateNote} />);

  const input = screen.getByPlaceholderText("write note content here");
  const submitButton = screen.getByText("save");

  await user.type(input, "sending a form...");
  await user.click(submitButton);

  expect(mockCreateNote.mock.calls).toHaveLength(1);
  expect(mockCreateNote.mock.calls[0][0].content).toBe("sending a form...");
});
