// ============== PÁGINA DE COMPRAS ==============
describe('página de compras', () => {

  beforeEach(() => {
    cy.acessarItemMenu('40');
  })

  it('arrastar slider para filtrar preço', () => {
    cy.arrastarSlider('85.7413'); // ação de arrastar slider para 450
    cy.deveTerValor('input[name="max_price"]', '450'); // verificação de preço máximo
    cy.clicar('button[type="submit"]');
    // verificação de produto com preço maior do que 450
    cy.naoDeveExistir('.post-160');
  })

  it('filtrar por categoria javascript', () => {
    // clicar no filtro JavaScript
    cy.clicar('.cat-item-21 > a');
    cy.verificarURL('/product-category/javascript/');
  })

  it('ordenar por popularidade', () => {
    cy.ordenarProdutosPor('popularity');
    // verificar dois primeiros itens
    cy.verificarProdutos(0, 'post-169');
    cy.verificarProdutos(1, 'post-160');
  })

  it('ordenar por avaliações', () => {
    cy.ordenarProdutosPor('rating');
    // verificar dois primeiros itens
    cy.verificarProdutos(0, 'post-160');
    cy.verificarProdutos(1, 'post-165');
  })

  it('ordenar por data', () => {
    cy.ordenarProdutosPor('date');
    // verificar dois primeiros itens
    cy.verificarProdutos(0, 'post-182');
    cy.verificarProdutos(1, 'post-181');
  })

  it('ordenar por preço em ordem crescente', () => {
    cy.ordenarProdutosPor('price');
    // verificar dois primeiros itens
    cy.verificarProdutos(0, 'post-180');
    cy.verificarProdutos(1, 'post-182');
  })

  it('ordenar por preço em ordem decrescente', () => {
    cy.ordenarProdutosPor('price-desc');
    // verificar dois primeiros itens
    cy.verificarProdutos(0, 'post-160');
    cy.verificarProdutos(1, 'post-169');
  })

  // TESTE COM ERRO
  it('botão de ler mais que indica produto fora de estoque', () => {
    // tentativa de procurar botão read more e clicar
    cy.clicar(cy.contains('button', 'read more'));
    // verificar se produto está fora de estoque
    cy.estaVisivel('Out Of Stock');
    cy.get('button[type="submit"]').should('be.disabled');
    // (ERRO) não existe produto fora de estoque
  })

  it('exibir desconto em produto', () => {
    // exemplo de elemento com SALE!
    cy.estaVisivel('.onsale');
    cy.clicar('.post-169');
    // verificando se possui preço antigo e preço novo
    cy.deveTerTamanho('.woocommerce-Price-amount', 2);
  })

  it('efetuar compra corretamente', () => {
    // acessar carrinho após adicionar elemento exemplo
    cy.clicar('.post-169 .add_to_cart_button');
    cy.clicar('.post-169 .added_to_cart');

    cy.estaVisivel('.cart_totals'); // verificar visibilidade da tabela

    cy.clicar('.checkout-button');

    // verificar componentes na página de checkout
    cy.estaVisivel('.woocommerce-billing-fields');
    cy.estaVisivel('.woocommerce-shipping-fields');
    cy.estaVisivel('.wc_payment_methods');

    cy.verificarSubtotalMenor();    // verificar se o subtotal é menor do que o preço total

    cy.preencherDetalhesFaturamento({
      nome: 'Nome',
      sobrenome: 'Sobrenome',
      email: 'meuemailvalido@dominio.com',
      telefone: '(11)99999-9999',
      pais: 'Brazil',
      endereco1: 'Meu Endereco',
      endereco2: 'em São Paulo',
      cidade: 'São Paulo',
      estado: 'São Paulo',
      cep: '99999999'
    });

    cy.clicar('#payment_method_cod'); // exemplo de alteração de método de pagamento
    cy.clicar('#place_order');        // prosseguir com compra

    // verificar nova URL
    cy.verificarURL('/checkout/order-received/');
  })

  it('visualizar informações de carrinho e acessar carrinho pelo menu', () => {
    cy.clicar('.post-169 .add_to_cart_button'); // adicionar elemento exemplo ao carrinho
    cy.clicar('#menu-icon');
    cy.deveConter('.cartcontents', '1 item');   // verificar se é possível consultar a quantidade de itens pelo menu
    cy.estaVisivel('.amount');                  // verificar se o preço está visível
    cy.clicar('.wpmenucartli');
    cy.verificarURL('/basket/');                // cesta de compras
  })

  it('verificar tipos de taxa: indiana (2%) e restantes (5%)', () => {
    // adicionar elemento exemplo ao carrinho
    cy.clicar('.post-169 .add_to_cart_button');
    // acessar carrinho via botão View Basket
    cy.clicar('.post-169 .added_to_cart');

    cy.clicar('.checkout-button');

    // verificar se existem os valores para subtotal, taxa e total
    cy.estaVisivel('.woocommerce-Price-amount');
    cy.estaVisivel('.order-total', '.woocommerce-Price-amount');
    cy.estaVisivel('.tax-rate', '.woocommerce-Price-amount');

    // verificar se o subtotal é menor do que o preço total
    cy.verificarSubtotalMenor();
    // verificar taxa indiana (padrão)
    cy.verificarTaxa(0.02);
    // alterar dados de envio para Brazil, São Paulo
    cy.alterarDadosDeEnvio('Brazil', 'São Paulo');
    // a taxa agora deve ser 5% do subtotal
    cy.verificarTaxa(0.05);
  })
})
// ===============================================