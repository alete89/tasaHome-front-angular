/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

// Cypress.Commands.add('login', () => {
//     cy.get('[data-testid="login-email"]').type("elantra87@itgracevvx.com")
//     cy.get('[data-testid="login-contraseña"]').type("123")
//     cy.get('[data-testid="iniciar-sesion"]').click()
// })

describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/tasar-propiedad')
    })

    it('login correcto', () => {
        cy.url().should('eq', 'http://localhost:4200/')
        cy.login()
        cy.url().should('eq', 'http://localhost:4200/tasar-propiedad')
    })


    it('login credenciales incorrectas', () => {
        cy.get('[data-testid="login-email"]').type("no-existe@inexistente.com")
        cy.get('[data-testid="login-contraseña"]').type("12345")
        cy.get('[data-testid="iniciar-sesion"]').click()
        cy.url().should('eq', 'http://localhost:4200/')
        cy.get('[data-testid="notificacion-error"]').should('be.visible')
    })

    it('al completar campos requeridos se habilita el boton de login', () => {
        cy.get('[data-testid="login-email"]').type("sarasa@itgracevvx.com")
        cy.get('[data-testid="login-contraseña"]').type("123")
        cy.get('[data-testid="iniciar-sesion"]').should('be.enabled')
    })

    it('el bóton de login permanece deshabilitado hasta que complete los campos', () => {
        cy.get('[data-testid="iniciar-sesion"]').should('be.disabled')
    })

    it('validación email ', () => {
        cy.get('[data-testid="login-email"]').type("sarasa")
        cy.get('[data-testid="login-contraseña"]').type("123")
        cy.get('[data-testid="login-email-error"]').should('be.visible')
    })

    it('boton registrarse redirige a pantalla de registro ', () => {
        cy.get('[data-testid="boton-ir-a-registrarse"]').click()
        cy.url().should('eq', 'http://localhost:4200/registrar-usuario')
    })

    it('boton recuperar contraseña abre modal de recuperación ', () => {
        cy.get('[data-testid="boton-recuperar-contraseña"]').click()
        cy.get('[data-testid="formulario-recuperar-contraseña"]').should('be.visible')
    })



})
