/// <reference types="cypress" />
describe("test the whole app if it works", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("loads the first time comments", () => {
    cy.get(".comments-container").should("exist");
  });
  it("user can add new comment and delete post", () => {
    let typedComment = `comment ${Math.random()}`;
    cy.get(".add-comment-input").type(typedComment);
    cy.get("[data-test=send-comment]").click();
    cy.contains(typedComment).should("exist");
    cy.contains(typedComment).find(".delete-button").click()
    cy.contains(typedComment).should("not.exist")
    
  });
  it("user can reply on comments", () => {
    let replyMessage = `replied ${Math.random()}`;
    cy.get("[data-test=reply-el]").should("exist");
    cy.get("[data-test='reply-el']").first().click();
    cy.get("[data-test=reply-value]").type(replyMessage);
    cy.get("[data-test=reply-value]").next().click();
    cy.contains(replyMessage);
  });
  it("user can delete replies ", () => {
    cy.get('[test-delete="1"]').click();
    cy.get(".test-delete").click();
    cy.get('[test-delete="1"]').should("not.exist");
  });
  it("user can add new comment and edit post", () => {
    let typedComment = `comment ${Math.random()}`;
    cy.get(".add-comment-input").type(typedComment);
    cy.get("[data-test=send-comment]").click();
    cy.contains(typedComment).should("exist");

    cy.get(`[data-comment="${typedComment}"]`).find(".edit-button:visible").click()
    let newTypedComment = `comment ${Math.random()}`;

    cy.get(".edit-reply-box").find("textarea").clear().type(newTypedComment)
    cy.get(".edit-reply-box").find(".send-edit").click()

    cy.contains(typedComment).should("not.exist");
    cy.contains(newTypedComment).should("exist");
    
    
  });
  it.only("user can reply to an reply",()=>{
    cy.get('[data-test="reply-test"]').first().find(".reply-button:visible").click()
    let replyMessage  =`reply ${Math.random()}`;
    cy.get(".reply-popup textarea").type(replyMessage);
    cy.get(".reply-popup .reply-button").click()
    cy.contains(replyMessage).should("exist");
  })
   
  
});
