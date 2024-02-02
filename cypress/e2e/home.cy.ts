describe("Home page", () => {
  it("has a <h1> heading", () => {
    cy.visit("/");
    cy.get("[data-test='hero-heading']")
      .should("exist")
      .contains("Welcome to Joaquín M2's Website");
  });
});
