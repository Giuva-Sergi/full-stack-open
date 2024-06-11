const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "log in" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const writeNote = async (page, noteContent) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByRole("textbox").fill(noteContent);
  await page.getByRole("button", { name: "save" }).click();

  await page.getByText(noteContent).waitFor();
};

module.exports = { loginWith, writeNote };
