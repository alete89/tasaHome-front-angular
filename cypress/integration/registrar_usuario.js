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


describe('registrar usuario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/registrar-usuario')
  })

  it('cuando el formulario está vacio el bóton para registrar usuario está deshabilitado', () => {
    cy.get('[data-testid="registrar_usuario"]').should('be.disabled').should('have.text', " Registrar usuario ")
  })

  it('nombre es un campo requerido', () => {
    cy.get('[data-testid="input-nombre"]').focus().blur()
    cy.get('[data-testid="error-nombre"]').should('be.visible')
  })

  it('apellido es un campo requerido', () => {
    cy.get('[data-testid="input-apellido"]').focus().blur()
    cy.get('[data-testid="error-apellido"]').should('be.visible')
  })

  it('email es un campo requerido', () => {
    cy.get('[data-testid="input-email"]').focus().blur()
    cy.get('[data-testid="error-email"]').should('be.visible')
  })

  it('el email debe ser válido', () => {
    cy.get('[data-testid="input-email"]').type("sarasa").blur()
    cy.get('[data-testid="error-email"]').should('be.visible')
  })

  it('fecha de nacimiento es un campo requerido', () => {
    cy.get('[data-testid="input-fecha-nacimiento"]').focus().blur()
    cy.get('[data-testid="error-no-completo-fecha-nacimiento"]').should('be.visible')
  })

  it('no puede ser menor de edad', () => {
    cy.get('[data-testid="input-fecha-nacimiento"]').type("2021-01-02")
    cy.get('[data-testid="error-menor-de-edad"]').should('be.visible')
  })

  it('no puede superar la edad máxima permitida', () => {
    cy.get('[data-testid="input-fecha-nacimiento"]').type("1900-01-02")
    cy.get('[data-testid="error-supera-edad-maxima"]').should('be.visible')
  })

  it('contraseña es un campo requerido', () => {
    cy.get('[data-testid="input-contraseña"]').focus().blur()
    cy.get('[data-testid="error-contraseña"]').should('be.visible')
  })

  it('la contraseña debe tener al menos 8 caracteres', () => {
    cy.get('[data-testid="input-contraseña"]').type("123").blur()
    cy.get('[data-testid="error-contraseña"]').should('be.visible')
  })

  it('confirmar contraseña es un campo requerido', () => {
    cy.get('[data-testid="input-confirmar-contraseña"]').focus().blur()
    cy.get('[data-testid="error-confirmar-contraseña"]').should('be.visible')
  })

  it('las contraseñas deben coincidir', () => {
    cy.get('[data-testid="input-contraseña"]').type("12345678")
    cy.get('[data-testid="input-confirmar-contraseña"]').type("12345678910").blur()
    cy.get('[data-testid="error-contraseñas-no-coinciden"]').should('be.visible')
  })


  it('boton limpiar formulario funciona correctamente', () => {
    cy.get('[data-testid="input-nombre"]').type("Roberto")
    cy.get('[data-testid="input-apellido"]').type("Gomez")
    cy.get('[data-testid="input-nombre"]').should('have.value', "Roberto")
    cy.get('[data-testid="input-apellido"]').should('have.value', "Gomez")
    cy.get('[data-testid="boton-limpiar-formulario"]').click()
    cy.get('[data-testid="input-nombre"]').should('be.empty')
    cy.get('[data-testid="input-apellido"]').should('be.empty')
  })

  it('cuando se completa el formulario correctamente se habilita el bóton registrar usuario', () => {
    cy.get('[data-testid="registrar_usuario"]').should('be.disabled')
    cy.completarFormulario(getRandomEmail())
    cy.get('[data-testid="registrar_usuario"]').should('be.enabled')

  })

  it('registrar usuario', () => {
    cy.completarFormulario(getRandomEmail())
    cy.get('[data-testid="registrar_usuario"]').click()
    cy.get('[data-testid="mensaje-notificacion"]').should('be.visible')
  })


  // it('can add new todo items', () => {
  //   // We'll store our item text in a variable so we can reuse it
  //   const newItem = 'Feed the cat'

  //   // Let's get the input element and use the `type` command to
  //   // input our new list item. After typing the content of our item,
  //   // we need to type the enter key as well in order to submit the input.
  //   // This input has a data-test attribute so we'll use that to select the
  //   // element in accordance with best practices:
  //   // https://on.cypress.io/selecting-elements
  //   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

  //   // Now that we've typed our new item, let's check that it actually was added to the list.
  //   // Since it's the newest item, it should exist as the last element in the list.
  //   // In addition, with the two default items, we should have a total of 3 elements in the list.
  //   // Since assertions yield the element that was asserted on,
  //   // we can chain both of these assertions together into a single statement.
  //   cy.get('.todo-list li')
  //     .should('have.length', 3)
  //     .last()
  //     .should('have.text', newItem)
  // })

  // it('can check off an item as completed', () => {
  //   // In addition to using the `get` command to get an element by selector,
  //   // we can also use the `contains` command to get an element by its contents.
  //   // However, this will yield the <label>, which is lowest-level element that contains the text.
  //   // In order to check the item, we'll find the <input> element for this <label>
  //   // by traversing up the dom to the parent element. From there, we can `find`
  //   // the child checkbox <input> element and use the `check` command to check it.
  //   cy.contains('Pay electric bill')
  //     .parent()
  //     .find('input[type=checkbox]')
  //     .check()

  //   // Now that we've checked the button, we can go ahead and make sure
  //   // that the list element is now marked as completed.
  //   // Again we'll use `contains` to find the <label> element and then use the `parents` command
  //   // to traverse multiple levels up the dom until we find the corresponding <li> element.
  //   // Once we get that element, we can assert that it has the completed class.
  //   cy.contains('Pay electric bill')
  //     .parents('li')
  //     .should('have.class', 'completed')
  // })

  // context('with a checked task', () => {
  //   beforeEach(() => {
  //     // We'll take the command we used above to check off an element
  //     // Since we want to perform multiple tests that start with checking
  //     // one element, we put it in the beforeEach hook
  //     // so that it runs at the start of every test.
  //     cy.contains('Pay electric bill')
  //       .parent()
  //       .find('input[type=checkbox]')
  //       .check()
  //   })

  //   it('can filter for uncompleted tasks', () => {
  //     // We'll click on the "active" button in order to
  //     // display only incomplete items
  //     cy.contains('Active').click()

  //     // After filtering, we can assert that there is only the one
  //     // incomplete item in the list.
  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .first()
  //       .should('have.text', 'Walk the dog')

  //     // For good measure, let's also assert that the task we checked off
  //     // does not exist on the page.
  //     cy.contains('Pay electric bill').should('not.exist')
  //   })

  //   it('can filter for completed tasks', () => {
  //     // We can perform similar steps as the test above to ensure
  //     // that only completed tasks are shown
  //     cy.contains('Completed').click()

  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .first()
  //       .should('have.text', 'Pay electric bill')

  //     cy.contains('Walk the dog').should('not.exist')
  //   })

  //   it('can delete all completed tasks', () => {
  //     // First, let's click the "Clear completed" button
  //     // `contains` is actually serving two purposes here.
  //     // First, it's ensuring that the button exists within the dom.
  //     // This button only appears when at least one task is checked
  //     // so this command is implicitly verifying that it does exist.
  //     // Second, it selects the button so we can click it.
  //     cy.contains('Clear completed').click()

  //     // Then we can make sure that there is only one element
  //     // in the list and our element does not exist
  //     cy.get('.todo-list li')
  //       .should('have.length', 1)
  //       .should('not.have.text', 'Pay electric bill')

  //     // Finally, make sure that the clear button no longer exists.
  //     cy.contains('Clear completed').should('not.exist')
  //   })
  // })
})
