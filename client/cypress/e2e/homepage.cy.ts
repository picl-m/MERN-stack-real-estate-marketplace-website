describe("Search real estate test", () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.visit("/");
  });
  it("can search real estate", () => {
    cy.getBySel("card-button-apartments").click();
    cy.location("pathname").should("contain", "/search/apartments");
    cy.getBySel("apartments-form").within(() => {
      cy.getBySel("type-checkbox").within(() => {
        cy.contains("1+1").click();
      });
    });
    cy.getBySel("search-button").click();
    cy.location("pathname").should("contain", "/search/apartments/results");
  });
});
