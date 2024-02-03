describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has a <h1> heading", () => {
    cy.getByData("home-heading")
      .should("exist")
      .contains("Welcome to Joaquín M2's Website");
  });
});
