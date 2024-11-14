// ================ LOGIN ================
describe('página de login', () => {

  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon').click();
    cy.get('#menu-item-50').click();
  })

  it('deve preencher os campos corretamente para fazer login com sucesso', () => {
    // preencher campos para login
    cy.get('#username').type('manoelamartedi@hotmail.com');
    cy.get('#password').type('12senha34');
    cy.get('input[name="login"]').click();
    // verificar se está na página de conta
    cy.url().should('include', '/my-account/');
    
  })

  it('deve preencher os campos incorretamente para exibir mensagem de aviso', () => {
    // preencher campos para login
    cy.get('#username').type('meuUsernameInvalido');
    cy.get('#password').type('senhaIncorreta');
    cy.get('input[name="login"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'is not registered on this site. If you are unsure of your username, try your email address instead.');
  })

  it('deve preencher o campo Username corretamente e manter Password vazio para exibir mensagem de aviso', () => {
    // preencher campos para login
    cy.get('#username').type('meuemailvalido@dominio.com');
    cy.get('input[name="login"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Password is required.');
  })

  it('deve preencher o campo Password corretamente e manter Username vazio para exibir mensagem de aviso', () => {
    // preencher campos para login
    cy.get('#password').type('12senha34');
    cy.get('input[name="login"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Username is required.');
  })

  it('deve manter os campos vazios para exibir mensagem de aviso', () => {
    // pressionar botão de login
    cy.get('input[name="login"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Username is required.');
  })

})
// ===================================================