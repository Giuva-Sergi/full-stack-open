const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, writeNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Giovanni Sergi",
        username: "empedocle",
        password: "testPassword",
      },
    });

    await page.goto("/");
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

  test("user can log in", async ({ page }) => {
    loginWith(page, "empedocle", "testPassword");

    await expect(page.getByText("Giovanni Sergi logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    loginWith(page, "empedocle", "wrongPassword");

    const errorDiv = await page.locator(".error");

    await expect(errorDiv).toContainText("wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Giovanni Sergi logged in")).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "empedocle", "testPassword");
    });

    test("a note can be created", async ({ page }) => {
      writeNote(page, "a note written with playwright");

      await expect(
        page.getByText("a note written with playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        writeNote(page, "new note created by playwright");
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();

        await expect(
          page.getByRole("button", { name: "make important" })
        ).toBeVisible();
      });
    });

    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        writeNote(page, "first note", true);
        writeNote(page, "second note", true);
        writeNote(page, "third note", true);
      });

      test("the importance of a single note can be changed", async ({
        page,
      }) => {
        const otherNoteText = await page.getByText("second note");
        const otherNoteEl = await otherNoteText.locator("..");
        await otherNoteEl
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(otherNoteEl.getByText("make important")).toBeVisible();
      });
    });
  });
});
