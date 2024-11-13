// ============== REGISTRO ==============
describe('página de registro', () => {

  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/');
    cy.get('#menu-icon').click();
    cy.get('#menu-item-50').click();
  })

  it('deve preencher os campos corretamente para fazer registro de usuário e direcionar para página da conta', () => {
    // preencher campos para registro
    cy.get('#reg_email').type('meuemailexistente@dominio.com');
    cy.get('#reg_password').type('12senha34');
    cy.get('input[name="register"]').click();
    // redirecionar para pagina da conta e verificar visibilidade dos componentes
    cy.get('.woocommerce-MyAccount-navigation-link--dashboard').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation-link--orders').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation-link--downloads').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation-link--edit-address').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account').should('be.visible');
    cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').should('be.visible');
  })
 
  it('deve preencher os campos com email inválido para exibir mensagem de aviso', () => {
    // preencher campos para registro
    cy.get('#reg_email').type('email@invalido');
    cy.get('#reg_password').type('12senha34');
    cy.get('input[name="register"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible');
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Please provide a valid email address.');
  })

  it('deve preencher apenas o campo Password para exibir mensagem de aviso', () => {
    // preencher campos para registro
    cy.get('#reg_password').type('12senha34');
    cy.get('input[name="register"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Please provide a valid email address.');
  })

  it('deve preencher apenas o campo Email adress para exibir mensagem de aviso', () => {
    // preencher campos para registro
    cy.get('#reg_email').type('meuemailvalido@dominio.com');
    cy.get('input[name="register"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Please enter an account password.');
  })

  it('deve manter campos vazios para exibir mensagem de aviso', () => {
    // clique direto no botão de registro
    cy.get('input[name="register"]').click();
    // verificação de mensagem
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', 'Please provide a valid email address.');
  })
 
})
// ==================================================