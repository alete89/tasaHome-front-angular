/// <reference types="cypress" />

import { getRandomEmail } from "../support/commands"

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



describe('tasar propiedad', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/tasar-propiedad')
    })

    it('cuando el formulario está vacio el bóton para tasar está deshabilitado', () => {
        cy.get('[data-testid="boton-tasar"]').should('be.disabled').should('have.text', " Tasar ")
    })

    it('al completar el formulario correctamente el bóton para tasar se habilita', () => {
        cy.login()
        cy.get('[data-testid="boton-tasar"]').should('be.disabled').should('have.text', " Tasar ")
        cy.completarFormularioTasacion()
        cy.get('[data-testid="boton-tasar"]').should('be.enabled').should('have.text', " Tasar ")
    })

    it('al tasar una propiedad muestra su valor', () => {
        cy.login()
        cy.completarFormularioTasacion()
        cy.get('[data-testid="boton-tasar"]').click()
        cy.get('[data-testid="valor-tasacion"]').should("contain.text", "176,957")

    })

    it('al registrar un usuario, tasar una propiedad y luego guardarla, aparece en tasaciones anteriores', () => {
        cy.visit('http://localhost:4200/registrar-usuario')
        const email = getRandomEmail()
        cy.completarFormulario(email)
        cy.get('[data-testid="registrar_usuario"]').click()
        cy.wait(500)
        cy.visit('http://localhost:4200/tasaciones-anteriores')
        cy.get('[data-testid="login-email"]').type(email)
        cy.get('[data-testid="login-contraseña"]').type("12345678")
        cy.get('[data-testid="iniciar-sesion"]').click()
        cy.get('tbody>tr').should('have.length', "0")
        cy.visit('http://localhost:4200/tasar-propiedad')
        cy.completarFormularioTasacion()
        cy.get('[data-testid="boton-tasar"]').click()
        cy.get('[data-testid="boton-guardar-tasacion"]').click()
        cy.visit('http://localhost:4200/tasaciones-anteriores')
        cy.get('tbody>tr').should('have.length', "1")

    })

})
