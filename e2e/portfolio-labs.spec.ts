import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/portfolio/labs");
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

test.describe("Labs links", () => {
  test("will check the links related to the 'Cinema Seats Booking' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/cinema-seats-booking/cinema-seats-booking",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/movie-seats-booking"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/cinema-seats-booking/cinema-seats-booking",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/movie-seats-booking"
    );
  });

  test("will check the links related to the 'Breakout Game' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/breakout-game/breakout-game",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/breakout-game"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/breakout-game/breakout-game",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/breakout-game"
    );
  });

  test("will check the links related to the 'Custom Video Player' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/custom-video-player/custom-video-player",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/custom-video-player"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/custom-video-player/custom-video-player",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/custom-video-player"
    );
  });

  test("will check the links related to the 'Custom Audio Player' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/custom-audio-player/custom-audio-player",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/custom-audio-player"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/custom-audio-player/custom-audio-player",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/custom-audio-player"
    );
  });

  test("will check the links related to the 'Real Time Search' project work as expected", async ({
    page,
  }) => {
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/real-time-search/real-time-search",
      })
      .click();
    await page.getByRole("button", { name: "Check the Project" }).click();
    const page1Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "GitHub Logo Check the code" })
      .click();
    const page1 = await page1Promise;
    await expect(page1).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/real-time-search"
    );

    await page.getByRole("link", { name: "Return logo Return" }).click();
    await page
      .getByRole("img", {
        name: "Thumbnail image for /labs/real-time-search/real-time-search",
      })
      .click();
    await page.getByText("Details").click();
    const page2Promise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Click here to check the code" })
      .click();
    const page2 = await page2Promise;
    await expect(page2).toHaveURL(
      "https://github.com/Joaquin-M2/portfolio-website/tree/master/src/app/portfolio/labs/real-time-search"
    );
  });
});
