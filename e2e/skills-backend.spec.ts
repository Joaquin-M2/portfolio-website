import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/skills/backend");
});

test.describe("Node.js skills block", () => {
  test("opens a new tab when clicking on the skill 'Node.js'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Node.js", exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL("https://nodejs.org/en");
  });

  test("opens a new tab when clicking on the skill 'Express'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Express" }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL("https://expressjs.com/");
  });

  test("opens a new tab when clicking on the skill 'Mongoose'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Mongoose" }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL("https://mongoosejs.com/");
  });

  test("opens a new tab when clicking on the skill 'Sequelize'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Sequelize" }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL("https://sequelize.org/");
  });

  test("opens a new tab when clicking on the skill 'Postman'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Postman" }).nth(0).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL("https://www.postman.com/");
  });
});

test.describe("Python skills block", () => {
  test("opens a new tab when clicking on the skill 'Python'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Python" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://www.python.org/");
  });

  test("opens a new tab when clicking on the skill 'Django'", async ({
    page,
  }) => {
    // FIGURE OUT WHY PW ADDS 'Node.js' AT THE END OF SKILL NAMES.
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Django Node.js" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://www.djangoproject.com/");
  });

  test("opens a new tab when clicking on the skill 'Django REST'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Django REST" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://www.django-rest-framework.org/");
  });

  test("opens a new tab when clicking on a skill 'Postman'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Postman" }).nth(1).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://www.postman.com/");
  });
});
