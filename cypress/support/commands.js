// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export const getRandomEmail = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for (var ii = 0; ii < 15; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + '@tasahome.com'
}


Cypress.Commands.add('login', () => {
    cy.get('[data-testid="login-email"]').type("elantra87@itgracevvx.com")
    cy.get('[data-testid="login-contraseña"]').type("123")
    cy.get('[data-testid="iniciar-sesion"]').click()
})

Cypress.Commands.add('completarFormularioTasacion', () => {
    cy.get('[data-testid="direccion"]').click()
    cy.get('[data-testid="input-direccion-mapa"]')
        .type("nazca 2000", { delay: 500 })
        .type('{downarrow}', { delay: 350 })
        .type('{enter}', { delay: 350 })
    cy.get('[data-testid="boton-confirmar-direccion"]').click()
    cy.get('[data-testid="superficie"]').type("70")
    cy.get('[data-testid="tipo-propiedad"]').select("Casa")
    cy.get('[data-testid="tipo-operacion-1"]').check({ force: true })
    cy.get('[data-testid="cantidad-ambientes"]').type("5", { force: true })
    cy.get('[data-testid="estado"]').select("Bueno")
})

Cypress.Commands.add('completarFormulario', (email) => {

    cy.get('[data-testid="input-nombre"]')
        .type("Nicolas")

    cy.get('[data-testid="input-apellido"]')
        .type("Viotti")

    cy.get('[data-testid="input-genero-masculino"]')
        .click()

    cy.get('[data-testid="input-fecha-nacimiento"]')
        .type("1990-08-10")

    cy.get('[data-testid="input-direccion"]')
        .type("nazca 2000", { delay: 300 })
        .type('{downarrow}', { delay: 350 })
        .type('{enter}', { delay: 350 })

    cy.get('[data-testid="input-email"]')
        .type(email)

    cy.get('[data-testid="input-contraseña"]')
        .type("12345678")

    cy.get('[data-testid="input-confirmar-contraseña"]')
        .type("12345678")
})