/// <reference types="cypress" />
describe("test the whole app if it works", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("loads the first time comments", () => {
    cy.get(".comments-container").should("exist");
  });
  it("user can add new comment", () => {
    let typedComment = `comment ${Math.random()}`;
    cy.get(".add-comment-input").type(typedComment);
    cy.get("[data-test=send-comment]").click();
    cy.contains(typedComment);
  });
  it("user can reply on comments", () => {
    let replyMessage = `replied ${Math.random()}`;
    cy.get("[data-test=reply-el]").should("exist");
    cy.get("[data-test='reply-el']").first().click();
    cy.get("[data-test=reply-value]").type(replyMessage);
    cy.get("[data-test=reply-value]").next().click();
    cy.contains(replyMessage);
  });
  it.only("user can delete replies ", () => {
    cy.get('[test-delete="1"]').click();
    cy.get(".test-delete").click();
    cy.get('[test-delete="1"]').should("not.exist");
  });
});
