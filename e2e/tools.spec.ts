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
  test("shows a 'Loading...' state while tools are being retrieved from the backend", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Loading..." })
    ).toBeInViewport();
    const tools = page.getByRole("main").getByRole("link");
    await tools.first().waitFor();
    await expect(
      page.getByRole("heading", { name: "Loading..." })
    ).not.toBeInViewport();
  });

  test("can filter tools by text (tool title) and tag (include and exclude) and open one of the results", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "Playwright has troubles finding <option> elements on webkit browsers."
    );
    await page.getByRole("checkbox", { name: "FILTERS" }).click();
    await page.getByPlaceholder("Search by tool title - Case").fill("tool");
    await page
      .getByRole("complementary")
      .getByRole("option", { name: "UX" })
      .nth(0)
      .click();

    await page
      .getByRole("complementary")
      .getByRole("option", { name: "Accessibility" })
      .nth(1)
      .click();
    await page.getByRole("checkbox", { name: "FILTERS" }).click();

    await expect(page.getByRole("main").getByRole("link")).toHaveCount(1);
  });

  test("can filter tools by text (tool description) and tag (include and exclude) and open one of the results", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "Playwright has troubles finding <option> elements on webkit browsers."
    );
    await page.getByRole("checkbox", { name: "FILTERS" }).click();
    await page.getByRole("radio", { name: "By Description" }).click();
    await page
      .getByPlaceholder("Search by tool description - Case")
      .fill("description");
    await page
      .getByRole("complementary")
      .getByRole("option", { name: "Accessibility" })
      .nth(0)
      .click();

    await page
      .getByRole("complementary")
      .getByRole("option", { name: "UX" })
      .nth(1)
      .click();
    await page.getByRole("checkbox", { name: "FILTERS" }).click();

    await expect(page.getByRole("main").getByRole("link")).toHaveCount(1);
  });

  test("shows 'No tools found.' message if filters show no results", async ({
    page,
  }) => {
    await page.getByRole("checkbox", { name: "FILTERS" }).click();
    await page.getByPlaceholder("Search by tool title - Case").click();
    await page.getByPlaceholder("Search by tool title - Case").fill("t00l");
    await page.getByRole("checkbox", { name: "FILTERS" }).click();

    await expect(page.getByText("No tools found.")).toBeInViewport();
  });

  test("shows all tools after removing filters", async ({ page }) => {
    const tools = page.getByRole("main").getByRole("link");
    await tools.first().waitFor();
    const toolsQuantity = await tools.count();

    await page.getByRole("checkbox", { name: "FILTERS" }).click();
    await page.getByPlaceholder("Search by tool title - Case").click();
    await page.getByPlaceholder("Search by tool title - Case").fill("t00l");
    await page.getByPlaceholder("Search by tool title - Case").fill("");
    await page.getByRole("checkbox", { name: "FILTERS" }).click();

    await expect(page.getByRole("main").getByRole("link")).toHaveCount(
      toolsQuantity
    );
  });

  test("opens a new tab with the tool address when clicking on a tool", async ({
    page,
  }) => {
    const firstTool = page.getByRole("main").getByRole("link").first();
    await firstTool.waitFor();

    const page1Promise = page.waitForEvent("popup");
    await firstTool.click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple"
    );
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

test.describe("User IS logged in", () => {
  test.beforeEach(async ({ page }) => {
    // Mock JWT (user with role 'user').
    await page.evaluate(() => {
      window.localStorage.setItem(
        "userToken",
        JSON.stringify(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvcnRmb2xpby13ZWItOUB0ZXN0LmNvbSIsInVzZXJJZCI6IjY1MmU2OTQ3ZjUzZDE1ZDk4YWI5NmI0NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2NTU3NTMxLCJleHAiOjE3MDY1NjExMzF9.alTlweQsc_nSVp-3KGw2INnJti-eXYvzxeb4XQoqM7o"
        )
      );
      window.localStorage.setItem(
        "accountFavoriteToolsId",
        JSON.stringify([
          "654cd4e74b3cba38c11b3618",
          "654cd3a54b3cba38c11b3611",
          "6529d4eb2190cd511fc2b378",
          "654686604eb64a3aad849d0d",
          "652ce2fe8655c5eae57a8160",
          "654cc0764b3cba38c11b35c3",
        ])
      );
    });
  });

  test("will show a 'Log Out' button but NOT a 'Log in' nor 'Sign Up' buttons", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Log In" })
    ).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign Up" })
    ).not.toBeVisible();
  });

  test("will show the 'Log In' and 'Sign Up' after the user logs out", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Log Out" }).click();
    await expect(
      page.getByRole("button", { name: "Log Out" })
    ).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("localStorage property 'accountFavoriteToolsId' sets favorite tools correctly", async ({
    page,
  }) => {
    const tools = await page.getByRole("main").getByRole("link");
    const userFavoriteTools = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("accountFavoriteToolsId"))
    );

    for (let i = 0; i < userFavoriteTools.length; i++) {
      await expect(tools.nth(i).locator("input")).toHaveAttribute(
        "id",
        userFavoriteTools.at((i + 1) * -1) // Last tool set as "favorite" by the user goes first on the tools list:
      );
    }
  });
});

test.describe("User IS logged in AND has 'admin' role", () => {
  test.beforeEach(async ({ page }) => {
    // Mock JWT (user with role 'admin').
    await page.evaluate(() => {
      window.localStorage.setItem(
        "userToken",
        JSON.stringify(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4NDYyNDI3LCJleHAiOjk3MDg0NjYwMjd9.CIoTt61-ASsuZ6Ou9QD5LVeA2Ty4jIQ0oGtvMRkNB7g"
        )
      );
    });
  });
  test("shows a configuration button on each tool", async ({ page }) => {
    const configureToolButton = await page
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { name: "Title #1234" }) })
      .getByTestId("iconsContainer")
      .getByRole("button")
      .nth(1);

    await configureToolButton.click();
    await expect(configureToolButton.getByText("Modify tool")).toBeInViewport();
    await expect(configureToolButton.getByText("Delete tool")).toBeInViewport();
  });
  test("'Modify Tool'", async ({ page }) => {
    await page.route("*/**/api/v1/tools/*", async (route) => {
      const json = {
        _id: "654cc0764b3cba38c11b35c3",
        title: "title test UPDATED",
        description: "desc testtt - Updated too",
        tags: [
          "652cd5da8f02277a97b76e01",
          "652cd6008f02277a97b76e0b",
          "652cd6068f02277a97b76e0d",
          "652cd60c8f02277a97b76e0f",
          "652cd61b8f02277a97b76e13",
          "652cd6228f02277a97b76e15",
          "652cd6268f02277a97b76e17",
        ],
        iconUrl: "https://account.mongodb.com/static/images/favicon.ico",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple",
        __v: 0,
      };
      await route.fulfill({ json });
    });

    const configureToolButton = await page
      .getByRole("link")
      .filter({
        has: page.getByRole("heading", { name: "title test UPDATED" }),
      })
      .getByTestId("iconsContainer")
      .getByRole("button")
      .nth(1);

    await configureToolButton.click();
    await configureToolButton.getByText("Modify tool").click();
    // PATCHing the tool goes to the same endpoint, but using the PATCH method instead of GET:
    await page.route("*/**/api/v1/tools/*", async (route) => {
      const json = {
        status: 201,
        message: "✅ Tool updated successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator(
        "div[aria-labelledby='update-tool-form-654cc0764b3cba38c11b35c3-modal-title']"
      )
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tool updated successfully")).toBeInViewport();
  });
  test("'Delete Tool'", async ({ page }) => {
    await page.route("*/**/api/v1/tools/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ Tool deleted successfully ✅",
      };
      await route.fulfill({ json });
    });

    const configureToolButton = await page
      .getByRole("link")
      .filter({
        has: page.getByRole("heading", { name: "title test UPDATED" }),
      })
      .getByTestId("iconsContainer")
      .getByRole("button")
      .nth(1);

    await configureToolButton.click();
    await configureToolButton.getByText("Delete tool").click();
    await page
      .locator(
        "div[aria-labelledby='delete-tool-form-654cc0764b3cba38c11b35c3-modal-title']"
      )
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tool deleted successfully")).toBeInViewport();
  });
  test("'Add Tool'", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit",
      "Playwright has troubles finding <option> elements on webkit browsers."
    );
    await page.getByRole("button", { name: "Add Tool" }).click();

    await page
      .getByLabel("Add Tool")
      .getByPlaceholder("Tool URL")
      .fill("https://toolurl.com");
    await page
      .getByLabel("Add Tool")
      .getByPlaceholder("Title")
      .fill("New tool title");
    await page
      .getByLabel("Add Tool")
      .getByPlaceholder("Description")
      .fill("Description for the new tool.");

    await page
      .locator("div[aria-labelledby='add-tool-form-modal-title']")
      .getByRole("option", { name: "Accessibility" })
      .click();

    await page.route("*/**/api/v1/tools", async (route) => {
      const json = {
        status: 201,
        message: "✅ Tool added successfully ✅",
      };
      await route.fulfill({ json });
    });

    await page
      .locator("div[aria-labelledby='add-tool-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tool added successfully")).toBeInViewport();
  });
  test("'Add Icon'", async ({ page }) => {
    await page.getByRole("button", { name: "Icons" }).click();
    await page.getByTestId("menuCardWrapperDiv").getByText("Add icon").click();

    await page
      .getByLabel("Add Icon")
      .getByPlaceholder("Icon name")
      .fill("New icon name");

    await page
      .getByLabel("Add Icon")
      .getByPlaceholder("Icon url")
      .fill(
        "https://raw.githubusercontent.com/Joaquin-M2/portfolio-website-backend/master/public/tools-icons/X%20(Twitter).jpg"
      );
    await page.route("*/**/api/v1/icons", async (route) => {
      const json = {
        status: 200,
        message: "✅ Icon added successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='add-icon-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Icon added successfully")).toBeInViewport();
  });
  test("'Modify Icon'", async ({ page }) => {
    await page.getByRole("button", { name: "Icons" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Update icon")
      .click();

    await page
      .getByLabel("Update Icon")
      .getByPlaceholder("Update icon name")
      .fill("Updated icon name");

    await page
      .getByLabel("Update Icon")
      .getByPlaceholder("Update icon url")
      .fill(
        "https://raw.githubusercontent.com/Joaquin-M2/portfolio-website-backend/master/public/tools-icons/X%20(Twitter).jpg"
      );
    await page.route("*/**/api/v1/icons/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ Icon updated successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='update-icon-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Icon updated successfully")).toBeInViewport();
  });
  test("'Delete Icon'", async ({ page }) => {
    await page.getByRole("button", { name: "Icons" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Delete icon")
      .click();

    await page.route("*/**/api/v1/icons/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ Icon deleted successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='delete-icon-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Icon deleted successfully")).toBeInViewport();
  });
  test("'Add Tag'", async ({ page }) => {
    await page.getByRole("button", { name: "Tags" }).click();
    await page.getByTestId("menuCardWrapperDiv").getByText("Add tag").click();

    await page
      .getByLabel("Add Tag")
      .getByPlaceholder("New tag name")
      .fill("Name for new tag");

    await page.route("*/**/api/v1/tags", async (route) => {
      const json = {
        status: 200,
        message: "✅ Tag added successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='add-tag-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tag added successfully")).toBeInViewport();
  });
  test("'Modify Tag'", async ({ page }) => {
    await page.getByRole("button", { name: "Tags" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Update tag")
      .click();

    await page
      .getByLabel("Update Tag")
      .getByPlaceholder("Update tag name")
      .fill("Updated tag name");

    await page.route("*/**/api/v1/tags/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ Tag updated successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='update-tag-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tag updated successfully")).toBeInViewport();
  });
  test("'Delete Tag'", async ({ page }) => {
    await page.getByRole("button", { name: "Tags" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Delete tag")
      .click();

    await page.route("*/**/api/v1/tags/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ Tag deleted successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='delete-tag-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("Tag deleted successfully")).toBeInViewport();
  });
  test("'Modify User'", async ({ page }) => {
    await page.getByRole("button", { name: "Users" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Update User")
      .click();

    await page
      .getByLabel("Update User")
      .getByPlaceholder("Update user email")
      .fill("new@user.email");

    await page.route("*/**/api/v1/user/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ User updated successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='update-user-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("User updated successfully")).toBeInViewport();
  });
  test("'Delete User'", async ({ page }) => {
    await page.getByRole("button", { name: "Users" }).click();
    await page
      .getByTestId("menuCardWrapperDiv")
      .getByText("Delete User")
      .click();

    await page.route("*/**/api/v1/user/*", async (route) => {
      const json = {
        status: 200,
        message: "✅ User deleted successfully ✅",
      };
      await route.fulfill({ json });
    });
    await page
      .locator("div[aria-labelledby='delete-user-form-modal-title']")
      .getByRole("button", { name: "Accept" })
      .click();

    await expect(page.getByText("User deleted successfully")).toBeInViewport();
  });
});
