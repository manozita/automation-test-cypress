// ================ LOGIN ================
describe('página de login', () => {

  beforeEach(() => {
    cy.acessarItemMenu('50');
  })

  it('login com campos Username e Password corretos', () => {
    cy.login('meuemailvalido@dominio.com', '12senha34');
    cy.verificarURL('/my-account/'); // verificar se está na página de conta
  })

  it('login com campos Username e Password incorretos', () => {
    cy.login('meuUsernameInvalido', 'senhaIncorreta');
    cy.verificarTextoErro('is not registered on this site. If you are unsure of your username, try your email address instead.');
  })

  it('login com campo Username correto e campo Password vazio', () => {
    cy.login('meuemailvalido@dominio.com', '');
    cy.verificarTextoErro('Password is required.');
  })

  it('login com campo Username vazio e campo Password correto', () => {
    cy.login('', '12senha34')
    cy.verificarTextoErro('Username is required.');
  })

  it('login com campos Username e Password vazios', () => {
    cy.login('','');
    cy.verificarTextoErro('Username is required.');
  })

  it('login com informações de Password escondidas', () => {
    cy.get('#password').type('12senha34');
    cy.get('#password').should('have.attr', 'type', 'password');
    // se o tipo é password, a senha está escondida
  });

  it('login com campos Username e Password sensíveis a maiúsculas', () => {
    cy.login('MEUemailVALIDO@hotmail.com', '12Senha34');
    cy.verificarTextoErro('The password you entered for the username');
  });

})
// ===================================================