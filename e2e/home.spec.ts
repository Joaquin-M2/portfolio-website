import { test, expect } from "@playwright/test";

test('"my portfolio" button takes to the right page', async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "my portfolio" }).click();
  await expect(page).toHaveURL(/.*\/portfolio\/projects/);
});

test('"drop me a line" button takes to the right page', async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "drop me a line" }).click();
  await expect(page).toHaveURL(/.*\/contact/);
});
