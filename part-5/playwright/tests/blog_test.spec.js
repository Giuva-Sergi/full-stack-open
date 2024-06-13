const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

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

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testUser", "testPassword");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "some title here...",
        "some author here...",
        "some url here..."
      );

      const titleLoc = await page.locator(".title");
      const authorLoc = await page.locator(".author");

      await expect(titleLoc.getByText("some title here...")).toBeVisible();
      await expect(authorLoc.getByText("some author here...")).toBeVisible();
    });

    describe("and a blog is present", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "some title here...",
          "some author here...",
          "some url here..."
        );
      });

      test.only("the blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();

        await page.waitForTimeout(1000);

        const likesLocator = page.locator(".likes");
        const likesText = await likesLocator.textContent();
        const likesMatch = likesText.match(/likes (\d+)/);
        const likesCount = likesMatch ? parseInt(likesMatch[1], 10) : NaN;

        await expect(likesCount).toBe(1);
      });
    });
  });
});
