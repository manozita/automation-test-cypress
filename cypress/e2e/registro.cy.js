// ============== REGISTRO ==============
describe('página de registro', () => {

  beforeEach(() => {
    cy.acessarItemMenu('50');
  })

  it('registro com campos Email address e Password válidos', () => {
    cy.registro('meuemailvalido@solutis.com', '12senha34');
    cy.verificarURL('/my-account/'); // verificar se está na página de conta
  })
 
  it('registro com Email address inválido e Password válido', () => {
    cy.registro('email@invalido', '12senha34');
    cy.verificarTextoErro('Please provide a valid email address.');
  })

  it('registro com Email address vazio e Password válido', () => {
    cy.registro('', '12senha34');
    cy.verificarTextoErro('Please provide a valid email address.');
  })

  it('registro com Password vazio e Email address válido', () => {
    cy.registro('meuemailvalido@dominio.com', '');
    cy.verificarTextoErro('Please enter an account password.');
  })

  it('registro com Email addres e Password vazios', () => {
    cy.registro('', '');
    cy.verificarTextoErro('Please provide a valid email address.');
  })
 
})
// ==================================================