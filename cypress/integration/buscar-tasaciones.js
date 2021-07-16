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
        cy.visit('http://localhost:4200/buscar-tasaciones')
        cy.login()
    })

    it('cuando el formulario está vacio el bóton para buscar está deshabilitado', () => {
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
    })

    it('al definir algún criterio de búsqueda se habilita el boton buscar', () => {
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="boton-buscar-similares"]').should('be.enabled')
    })

    it('buscar tasaciones similiares devuelve resultados', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="select-barrio"]').type("Recoleta")
        cy.get('[data-testid="select-barrio"]').type("{enter}")
        cy.get('[data-testid="select-tipo-propiedad"]').type("Departamento")
        cy.get('[data-testid="select-tipo-propiedad"]').type("{enter}")
        cy.get('[data-testid="boton-buscar-similares"]').click()
        cy.get('tbody>tr').should('have.length', 1)
    })
    
    it('buscar tasaciones similiares no devuelve resultados', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="select-barrio"]').type("Recoleta")
        cy.get('[data-testid="select-barrio"]').type("{enter}")
        cy.get('[data-testid="cantidad-ambientes"]').type("7", { force: true })
        cy.get('[data-testid="boton-buscar-similares"]').click()
        cy.get('[data-testid="no-hubo-resultados"]').should('be.visible')
    })

    it('la cantidad de ambientes debe ser mayor a 0', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="cantidad-ambientes"]').type("0", { force: true })
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
        cy.get('[data-testid="ambientes-error"]').should('be.visible')
    })

    it('la cantidad de ambientes debe ser menor a 15', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="cantidad-ambientes"]').type("16", { force: true })
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
        cy.get('[data-testid="ambientes-error"]').should('be.visible')
    })

    it('la superficie debe ser mayor o igual a 15', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="superficie-minima"]').type("14", { force: true })
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
        cy.get('[data-testid="superficie-error"]').should('be.visible')
    })

    it('la superficie debe ser menor o igual a 2000', () => {
        cy.get('[data-testid="boton-tipo-operacion"]').first().click()
        cy.get('[data-testid="superficie-minima"]').type("2001", { force: true })
        cy.get('[data-testid="boton-buscar-similares"]').should('be.disabled').should('have.text', " Buscar ")
        cy.get('[data-testid="superficie-error"]').should('be.visible')
    })


})
