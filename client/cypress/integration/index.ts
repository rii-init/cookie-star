describe("Index page", () => {



    it("should render a canvas for rendering webgl", () => {
        cy.visit("/")
        cy.get("#r3f-canvas").should("be.visible");
    });

    it("navigates to the CV page when clicking 'CV'", () => {
        cy.visit("/")
        
    });

})