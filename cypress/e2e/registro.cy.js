// ============== REGISTRO ==============
describe('página de registro', () => {

  beforeEach(() => {
    cy.acessarItemMenu('50');
  })

  it('deve preencher os campos corretamente para fazer registro de usuário e direcionar para página da conta', () => {
    cy.registro('meuemailexistente2@dominio.com', '12senha34');
    cy.verificarURL('/my-account/'); // verificar se está na página de conta
  })
 
  it('deve preencher os campos com email inválido para exibir mensagem de aviso', () => {
    cy.registro('email@invalido', '12senha34');
    cy.verificarTextoErro('Please provide a valid email address.');
  })

  it('deve preencher apenas o campo Password para exibir mensagem de aviso', () => {
    cy.registro('', '12senha34');
    cy.verificarTextoErro('Please provide a valid email address.');
  })

  it('deve preencher apenas o campo Email adress para exibir mensagem de aviso', () => {
    cy.registro('meuemailvalido@dominio.com', '');
    cy.verificarTextoErro('Please enter an account password.');
  })

  it('deve manter campos vazios para exibir mensagem de aviso', () => {
    cy.registro('', '');
    cy.verificarTextoErro('Please provide a valid email address.');
  })
 
})
// ==================================================