import { test, expect } from "@playwright/test";

test("can send a contact form", async ({ page }) => {
  // Mock the api call before navigating
  await page.route("https://api.web3forms.com/submit", async (route) => {
    const json = {
      status: 201,
      success: true,
    };
    await route.fulfill({ json });
  });

  await page.goto("/contact");
  await page.getByPlaceholder("Your name").click();
  await page.getByPlaceholder("Your name").fill("Joaquín");
  await page.getByPlaceholder("Your email").click();
  await page.getByPlaceholder("Your email").fill("test-email@test.com");
  await page.getByPlaceholder("Message subject").click();
  await page.getByPlaceholder("Message subject").fill("E2E testing form");
  await page.getByPlaceholder("Message subject").press("Tab");
  await page
    .getByPlaceholder("Message", { exact: true })
    .fill("This is an E2E test made with Playwright.");
  await page.getByRole("button", { name: "Send" }).click();

  await expect(
    page.getByRole("alert", { name: "Form sent successfully!" })
  ).toBeVisible();
});
