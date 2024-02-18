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

test.describe("User is NOT logged in", () => {
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
});
