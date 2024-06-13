const { test, expect, beforeEach, describe } = require("@playwright/test");
const loginWith = require("./helper");

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
      await loginWith(page, "testUser", "testPassword");

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("login fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testUser", "wrongPassword");

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();

      await expect(page.getByText("invalid username or password")).toHaveCSS(
        "border",
        "5px solid rgb(255, 0, 0)"
      );

      await expect(page.getByText("invalid username or password")).toHaveCSS(
        "background-color",
        "rgba(244, 24, 24, 0.3)"
      );
    });
  });
});
