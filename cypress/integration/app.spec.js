/// <reference types="cypress" />
describe("test the whole app if it works", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("loads the first time comments", () => {
    cy.get(".comments-container").should("exist");
  });
  it.only("user can add new comment", () => {
    let typedComment = `comment ${Math.random()}`;
    cy.get(".add-comment-input").type(typedComment);
    cy.get("[data-test=send-comment]").click();
    cy.contains(typedComment);
  });
});
