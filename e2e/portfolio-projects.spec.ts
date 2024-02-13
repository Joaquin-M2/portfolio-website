import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/portfolio/projects");
});

test("will show a selected thumbnail every time the user selects another thumbnail", async ({
  page,
}) => {
  // The locator '.false' references to the lack of the CSS class 'inactiveThumbnail' in the <Image> component.
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡄 Previous" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡄 Previous" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡄 Previous" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByTestId("sliderThumbnail").first().click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByTestId("sliderThumbnail").nth(2).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByTestId("sliderThumbnail").nth(3).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("checkbox", { name: "FILTERS" }).click();
  await page
    .locator("li")
    .filter({ hasText: "ReactOnOff" })
    .getByRole("button")
    .first()
    .click();

  await page.getByTestId("backdrop").click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByTestId("sliderThumbnail").nth(1).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡆 Next" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await page.getByRole("button", { name: "🡄 Previous" }).click();
  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();

  await expect(
    page.getByTestId("sliderThumbnail").filter({ has: page.locator(".false") })
  ).toBeInViewport();
});

test.describe("Projects links", () => {
  test("will check the links related to the 'Portfolio' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /projects/portfolio-website/portfolio-website",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    await page
      .getByTestId("navBarWrapperDiv")
      .getByRole("button", { name: "Portfolio" })
      .click();
    await page.getByText("Details").click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website"
    );
  });

  test("will check the links related to the 'Tattoo Parlor' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /projects/tattoo-parlor/tattoo-parlor",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/projects/tattoo-parlor"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /projects/tattoo-parlor/tattoo-parlor",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/projects/tattoo-parlor"
    );
  });

  test("will check the links related to the 'Legal Hub' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /projects/legal-hub/legal-hub",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/projects/legal-hub"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /projects/legal-hub/legal-hub",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/projects/legal-hub"
    );
  });
});
