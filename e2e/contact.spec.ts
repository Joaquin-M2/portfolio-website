import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
});

test("can send a contact form", async ({ page }) => {
  // Mock the email webform api call
  await page.route("https://api.web3forms.com/submit", async (route) => {
    const json = {
      status: 201,
      success: true,
    };
    await route.fulfill({ json });
  });

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

test("can send users to alternative means of contact", async ({ page }) => {
  // EMAIL BUTTON
  const emailButton = await page.getByRole("link", {
    name: "Email logo Email",
  });
  await expect(emailButton).toHaveAttribute(
    "href",
    "mailto:joaquin.mmol@gmail.com"
  );

  // LINKEDIN BUTTON - Opens new tab
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "LinkedIn logo LinkedIn" }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL("https://www.linkedin.com/in/joaquin-m2/");

  // GITHUB BUTTON - Opens new tab
  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "GitHub Logo GitHub" }).click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL("https://github.com/Joaquin-M2");
});
