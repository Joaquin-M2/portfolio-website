import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test('will take to the "Portfolio" page after clicking on the "my portfolio" button', async ({
  page,
}) => {
  await page.getByRole("button", { name: "my portfolio" }).click();
  await expect(page).toHaveURL(/.*\/portfolio\/projects/);
});

test('will take to the "Contact" page after clicking on the "drop me a line" button', async ({
  page,
}) => {
  await page.getByRole("button", { name: "drop me a line" }).click();
  await expect(page).toHaveURL(/.*\/contact/);
});
