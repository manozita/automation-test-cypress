// ============== MINHA CONTA ==============
describe('página de minha conta', () => {

  beforeEach(() => {
    cy.acessarItemMenu('50');
    cy.login('minhaconta@dominio.com', '12senha34');
  })

  it('exibir Dashboard após login', () => {
    cy.verificarURL('/my-account/');
    // verificar se a dashboard está visível
    cy.estaVisivel('.woocommerce-MyAccount-navigation');
  })

  it('exibir pedidos ao navegar para Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    // verificar se a tabela de pedidos existe
    cy.estaVisivel('.account-orders-table');
  })
 
  it('exibir mais informações de pedido ao clicar em View em Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    cy.clicar(':nth-child(1) > .order-actions > .button');
    
    // verificar mais informações do pedido
    cy.estaVisivel('.order_details');
  })

  it('exibir número de pedido, data de pedido e status do pedido ao clicar em View em Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    cy.clicar(':nth-child(1) > .order-actions > .button');
    // verificar mais informações do pedido
    cy.estaVisivel('.order_details');
    cy.estaVisivel('.order-number');
    cy.estaVisivel('.order-date');
    cy.estaVisivel('.order-status');
  })

  it('exibir endereços ao clicar em Addresses', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--edit-address > a');
    // verificar se tabela de endereços está visível
    cy.estaVisivel('.woocommerce-Addresses');
    cy.deveConter('.woocommerce-Addresses', 'Billing Address');
    cy.deveConter('.woocommerce-Addresses', 'Shipping Address');
  })

  it('editar Shipping Address em Adresses', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--edit-address > a');
    cy.clicar('.u-column2 > .woocommerce-Address-title > .edit');

    cy.limparCampos();

    cy.preencherShippingAddress({
      nome: 'Nome Envio',
      sobrenome: 'Sobrenome',
      email: 'meuemailvalido@dominio.com',
      telefone: '(11)99999-9999',
      pais: 'Brazil',
      endereco1: 'Meu Endereco de Entrega',
      cidade: 'São Paulo',
      estado: 'São Paulo',
      cep: '99999999'
    });
    cy.clicar('.button');
    cy.verificarMensagem('Address changed successfully.');
  })

  it('fazer logout da conta', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--customer-logout > a');

    // verificação de logout
    cy.estaVisivel('.login');
    cy.estaVisivel('.register');
  })

  it('exibir detalhes de conta e alterar senha', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--edit-account > a');
    cy.estaVisivel('.woocommerce-EditAccountForm');

    // alterar senha
    cy.preencher('#password_current', '12senha34');
    cy.preencher('#password_1', '12Senha34');
    cy.preencher('#password_2', '12Senha34');
    cy.clicar('.woocommerce-Button');
    cy.verificarMensagem('Account details changed successfully.');
  })
})
// ==================================================