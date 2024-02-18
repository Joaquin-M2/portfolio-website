import { test, expect } from "@playwright/test";
import { iconsFromBackend } from "@/data/backend-response-icons";
import { toolsFromBackend } from "@/data/backend-response-tools";
import { tagsFromBackend } from "@/data/backend-response-tags";
import { usersFromBackend } from "@/data/backend-response-users";

test.beforeEach(async ({ page }) => {
  // Mock the response (ICONS).
  await page.route("*/**/api/v1/icons", async (route) => {
    const json = iconsFromBackend;
    await route.fulfill({ json });
  });

  // Mock the response (TOOLS).
  await page.route("*/**/api/v1/tools", async (route) => {
    const json = toolsFromBackend;
    await route.fulfill({ json });
  });

  // Mock the response (TAGS).
  await page.route("*/**/api/v1/tags", async (route) => {
    const json = tagsFromBackend;
    await route.fulfill({ json });
  });

  // Mock the response (USERS).
  await page.route("*/**/api/v1/user", async (route) => {
    const json = usersFromBackend;
    await route.fulfill({ json });
  });

  // Go to the page.
  await page.goto("/tools");
});

test.describe("Common to ANY user (i.e. not logged in, logged in and admin)", () => {
  test("can filter tools by text and tag and open one of the results", async ({
    page,
  }) => {
    await page.getByRole("checkbox", { name: "FILTERS" }).click();
    await page.getByPlaceholder("Search by tool title - Case").click();
    await page.getByPlaceholder("Search by tool title - Case").fill("tool");
    await page
      .getByRole("complementary")
      .getByRole("option", { name: "Accessibility" })
      .click();
    await page.getByRole("checkbox", { name: "FILTERS" }).click();

    await expect(page.getByRole("main").getByRole("link")).toHaveCount(1);
  });
});

test.describe("User is NOT logged in", () => {
  test("'Log In' and 'Sign Up' buttons are visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("can save tools and keep them as favorite after reloading the page", async ({
    page,
  }) => {
    const favoriteButtonTool3 = await page
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { name: "Title #1234" }) })
      .getByTestId("iconsContainer")
      .getByRole("button")
      .first();

    const favoriteButtonTool8 = await page
      .getByRole("link")
      .filter({
        has: page.getByRole("heading", { name: "Tool found on Twitter - 17" }),
      })
      .getByTestId("iconsContainer")
      .getByRole("button")
      .first();

    await favoriteButtonTool3.click();
    await favoriteButtonTool8.click();
    await page.reload();

    // Favorite tools are arranged in descending order (i.e. last favorited goes first on the Tools list):
    await expect(
      page.getByRole("link").first().getByRole("heading")
    ).toContainText("Tool found on Twitter - 17");
    await expect(
      page.getByRole("link").nth(1).getByRole("heading")
    ).toContainText("Title #1234");
  });

  test("can let users to sign up", async ({ page }) => {
    // Mock the response (SIGN UP).
    await page.route("*/**/api/v1/user/signup", async (route) => {
      const json = {
        status: 201,
        message: "✅ User created successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page.getByRole("button", { name: "Sign Up" }).click();
    await page.getByLabel("Sign Up").getByPlaceholder("Email").click();
    await page
      .getByLabel("Sign Up")
      .getByPlaceholder("Email")
      .fill("test@test.com");
    await page.getByLabel("Sign Up").getByPlaceholder("Email").press("Tab");
    await page
      .getByLabel("Sign Up")
      .getByPlaceholder("Password")
      .fill("test1234");
    await page.getByRole("button", { name: "Accept" }).click();

    await expect(page.getByText("User created successfully")).toBeInViewport();
  });

  test("can let users to log in", async ({ page }) => {
    // Mock the response (LOG IN).
    await page.route("*/**/api/v1/user/login", async (route) => {
      const json = {
        status: 201,
        message: "✅ Logged in ✅",
        token: "1234",
        favoriteTools: [],
      };
      await route.fulfill({ json });
    });
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByLabel("Log In").getByPlaceholder("Email").click();
    await page
      .getByLabel("Log In")
      .getByPlaceholder("Email")
      .fill("test@test.com");
    await page.getByLabel("Log In").getByPlaceholder("Email").press("Tab");
    await page
      .getByLabel("Log In")
      .getByPlaceholder("Password")
      .fill("test1234");
    await page.getByRole("button", { name: "Accept" }).click();

    await expect(page.getByText("Logged in")).toBeInViewport();
  });
});
