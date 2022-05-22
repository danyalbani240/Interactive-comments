/// <reference types="cypress" />
describe("test the whole app if it works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });
  it("loads the first time comments", () => {
    cy.get(".comments-container").should("exist");
  });
});
