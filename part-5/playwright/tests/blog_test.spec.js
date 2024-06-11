const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/tests/reset");
    await request.post("api/users", {
      data: {
        name: "Test User",
        username: "testUser",
        password: "testPassword",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("log in to application");

    await expect(locator).toBeVisible();
  });

  describe("login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("testUser");
      await page.getByTestId("password").fill("testPassword");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });
  });
});
