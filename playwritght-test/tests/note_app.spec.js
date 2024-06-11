const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("frontpage can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");

    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2023"
      )
    ).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "log in" }).click();
      await page.getByTestId("username").fill("empedocle");
      await page.getByTestId("password").fill("testPassword");
      await page.getByRole("button", { name: "login" }).click();
    });
  });

  test("a new note can be created", async ({ page }) => {
    await page.getByRole("button", { name: "new note" }).click();
  });
});
