describe("Contact page", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("can send a contact form", () => {
    cy.intercept("POST", "https://api.web3forms.com/submit", {
      status: 201,
      success: true,
    }).as("submit");
    cy.getByData("contact-name-input").type("Joaquín");
    cy.getByData("contact-email-input").type("test-email@test.com");
    cy.getByData("contact-subject-input").type("E2E contact form testing");
    cy.getByData("contact-message-input").type(
      "This is a test made with Cypress."
    );
    cy.get('[type="submit"]').click({ force: true });
    cy.wait("@submit"); // Not really necessary in this case.
    cy.getByData("alert-message").should("exist");
  });
});
