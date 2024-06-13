const { test, expect, beforeEach, describe } = require("@playwright/test");
const {
  loginWith,
  createBlog,
  createUser,
  checkSorted,
  blogs,
} = require("./helper");
const { timeout } = require("../playwright.config");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/tests/reset");
    await createUser(request, "Test User", "testUser", "testPassword");
    await createUser(request, "Test User 2", "testUser2", "testPassword2");

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

      test("the blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();

        await page.waitForTimeout(1000);

        const likesLocator = page.locator(".likes");
        const likesText = await likesLocator.textContent();
        const likesMatch = likesText.match(/likes (\d+)/);
        const likesCount = likesMatch ? parseInt(likesMatch[1], 10) : NaN;

        await expect(likesCount).toBe(1);
      });

      test("the blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "delete" }).click();

        await page.waitForTimeout(1000);

        const blog = page.locator(".blog");

        await expect(blog).not.toBeVisible();
      });

      test("only the user who created the blog can delete it", async ({
        page,
      }) => {
        // log out and log in with another user
        await page.getByRole("button", { name: "log out" }).click();
        await expect(page.getByText("log in to application")).toBeVisible();

        await loginWith(page, "testUser2", "testPassword2");
        await expect(page.getByText("Test User 2 logged in")).toBeVisible();

        await page.getByRole("button", { name: "view" }).click();
        const deleteButton = await page.getByRole("button", { name: "delete" });

        await expect(deleteButton).not.toBeVisible();
      });
    });
  });

  describe("when various blogs are present", () => {
    beforeEach(async ({ page, request }) => {
      const token = await loginWith(page, "testUser", "testPassword");

      for (const blog of blogs) {
        await request.post("/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: blog,
        });
      }

      // refresh page
      await page.reload();
    });

    test("blogs are ordered by descending number of likes", async ({
      page,
    }) => {
      await page.waitForTimeout(1000);

      const viewButtons = await page.$$('[data-testid="button-view"]');
      const blogs = await page.$$(".blog");

      const likes = [];

      for (let i = 0; i < blogs.length; i++) {
        await viewButtons[i].click();

        await page.waitForTimeout(1000);

        const blogElement = blogs[i];
        const likesLocator = await blogElement.$(".likes");

        const likesText = await likesLocator.textContent();
        const likesMatch = likesText.match(/likes (\d+)/);
        const likesCount = likesMatch ? parseInt(likesMatch[1], 10) : NaN;

        likes.push(likesCount);
      }

      await expect(checkSorted(likes)).toBe(true);
    });
  });
});
