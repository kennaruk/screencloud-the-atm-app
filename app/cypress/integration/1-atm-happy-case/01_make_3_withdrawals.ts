/// <reference types="cypress" />

describe("the atm app", () => {
  it("should able to login with 1111", () => {
    cy.visit("https://screen-cloud-the-atm-app.web.app/");
    cy.get("input").first().type("1111");
    cy.url().should("include", "/atm");
  });

  it("should able to make 3 withdrawals", () => {
    cy.visit("https://screen-cloud-the-atm-app.web.app/");
    cy.get("input").first().type("1111");
    cy.url().should("include", "/atm");

    cy.get("input").first().type("140");
    cy.contains("Withdraw").click();

    cy.get("input").first().type("50");
    cy.contains("Withdraw").click();

    cy.get("input").first().type("90");
    cy.contains("Withdraw").click();

    cy.contains("Don't have enough notes to withdraw").should("not.exist");
  });
});
