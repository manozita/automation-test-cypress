// ============== MINHA CONTA ==============
describe('página de minha conta', () => {

  beforeEach(() => {
    cy.acessarItemMenu('50');
    cy.login('meuemailexistente@dominio.com', '12senha34');
  })

  it('exibir Dashboard após login', () => {
    cy.verificarURL('/my-account/');
    // verificar se a dashboard está visível
    cy.deveExistirElemento('.woocommerce', '.woocommerce-MyAccount-navigation');
  })

  it('exibir pedidos ao navegar para Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    // verificar se a tabela de pedidos existe
    cy.deveExistirElemento('.woocommerce-MyAccount-content', '.account-orders-table');
  })
 
  it('exibir mais informações de pedido ao clicar em View em Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    cy.clicar(':nth-child(1) > .order-actions > .button');
    
    // verificar mais informações do pedido
    cy.estaVisivel('.shop_table.order_details');
  })

  it('exibir mais informações de pedido ao clicar em View em Orders', () => {
    cy.clicar('.woocommerce-MyAccount-navigation-link--orders > a');
    cy.clicar(':nth-child(1) > .order-actions > .button');
    // verificar mais informações do pedido
    cy.estaVisivel('.shop_table.order_details');
    cy.deveExistirElemento('.woocommerce-MyAccount-content', '.order-number');
    cy.deveExistirElemento('.woocommerce-MyAccount-content', '.order-date');
    cy.deveExistirElemento('.woocommerce-MyAccount-content', '.order-status');
  })
})
// ==================================================