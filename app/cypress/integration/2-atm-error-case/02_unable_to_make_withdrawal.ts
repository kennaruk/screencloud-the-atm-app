/// <reference types="cypress" />

describe("the atm app", () => {
  it("should not able to login with 1112", () => {
    cy.visit("https://screen-cloud-the-atm-app.web.app/");
    cy.get("input").first().type("1112");
    cy.contains("Incorrect or missing PIN.").should("exist");
  });

  it("should able to make 3 withdrawals", () => {
    cy.visit("https://screen-cloud-the-atm-app.web.app/");
    cy.get("input").first().type("1111");
    cy.url().should("include", "/atm");

    cy.get("input").first().type("1");
    cy.contains("Withdraw").click();

    cy.contains("Don't have enough notes to withdraw").should("exist");
  });
});
