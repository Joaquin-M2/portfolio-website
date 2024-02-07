import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/skills/frontend");
});

test.describe("HTML skills block", () => {
  test("opens a new tab when clicking on the skill 'HTML'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "HTML", exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://developer.mozilla.org/en-US/docs/Web/HTML"
    );
  });

  test("opens a new tab when clicking on the skill 'Accessibility'", async ({
    page,
  }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Accessibility" }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility"
    );
  });

  test("opens a new tab when clicking on the skill 'SEO'", async ({ page }) => {
    const page1Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "SEO" }).click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
    );
  });
});

test.describe("CSS skills block", () => {
  test("opens a new tab when clicking on the skill 'CSS'", async ({ page }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "CSS" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://developer.mozilla.org/en-US/docs/Web/CSS"
    );
  });

  test("opens a new tab when clicking on the skill 'SASS'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "SASS" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://sass-lang.com/");
  });

  test("opens a new tab when clicking on the skill 'Tailwind'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Tailwind" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://tailwindcss.com/");
  });

  test("opens a new tab when clicking on a skill 'Bootstrap'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Bootstrap" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://getbootstrap.com/");
  });

  test("opens a new tab when clicking on a skill 'UX & UI'", async ({
    page,
  }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "UX & UI" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://web.dev/articles/ux-basics");
  });

  test("opens a new tab when clicking on a skill 'Figma'", async ({ page }) => {
    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Figma" }).click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL("https://www.figma.com/");
  });
});

test.describe("JavaScript skills block", () => {
  test("opens a new tab when clicking on a skill 'JavaScript'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "JavaScript" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    );
  });

  test("opens a new tab when clicking on a skill 'TypeScript'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "TypeScript" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://www.typescriptlang.org/");
  });

  test("opens a new tab when clicking on a skill 'React'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "React" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://react.dev/");
  });

  test("opens a new tab when clicking on a skill 'Redux'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Redux" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://redux.js.org/");
  });

  test("opens a new tab when clicking on a skill 'MUI'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "MUI" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://mui.com/");
  });

  test("opens a new tab when clicking on a skill 'RHF'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "RHF" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://react-hook-form.com/");
  });

  test("opens a new tab when clicking on a skill 'Next.js'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Next.js" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://nextjs.org/");
  });

  test("opens a new tab when clicking on a skill 'Vue.js'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Vue.js" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://vuejs.org/");
  });

  test("opens a new tab when clicking on a skill 'Storybook'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Storybook" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://storybook.js.org/");
  });

  test("opens a new tab when clicking on a skill 'Jest'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Jest" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://jestjs.io/");
  });

  test("opens a new tab when clicking on a skill 'RTL'", async ({ page }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "RTL" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL(
      "https://testing-library.com/docs/react-testing-library/intro/"
    );
  });

  test("opens a new tab when clicking on a skill 'Cypress'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Cypress" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://www.cypress.io/");
  });

  test("opens a new tab when clicking on a skill 'Playwright'", async ({
    page,
  }) => {
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Playwright" }).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL("https://playwright.dev/");
  });
});
