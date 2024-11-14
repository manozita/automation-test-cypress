// ============== PÁGINA DE COMPRAS ==============
describe('página de compras', () => {

  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon').click();
    cy.get('#menu-item-40').click();
  })

  it('deve arrastar slider para aplicar filtro de preço máximo 450', () => {

    // ação de arrastar slider para 450
    cy.get('.price_slider.ui-slider-horizontal').then($slider => {
      const novaPosicao = (85.7143 / 100) * $slider.width(); // calcular a nova posição correspondente a 85.7143%
    
      cy.get('.ui-slider-handle:last-child') // handle direito
        .trigger('mousedown', { which: 1 }) // ação de clique
        .invoke('attr', 'style', `left: 85.7143%`) // ajuste do estilo
        .trigger('mousemove', { clientX: novaPosicao }) // ação de mover
        .trigger('mouseup'); // ação de soltar
    });

    // verificação de preço máximo
    cy.get('input[name="max_price"]').should('have.value', '450');
    // botão de aplicar
    cy.get('button[type="submit"]').click();
    // verificação de produtos
    cy.get('.post-160').should('not.exist');
  })

  it('deve clicar no filtro JavaScript para filtrar categoria', () => {

    // clicar no filtro JavaScript
    cy.get('.cat-item-21 > a').click();

    // verificação de url
    cy.url().should('include', '/product-category/javascript/');

  })

  it('deve clicar em Sort by popularity para organizar por ordem de popularidade', () => {

    // clicar no select e escolher Sort by popularity
    cy.get('select.orderby').select('popularity');

    // verificar dois primeiros itens
    cy.get('.products li').eq(0).should('have.class', 'post-169');
    cy.get('.products li').eq(1).should('have.class', 'post-160');
  })

  it('deve clicar em Sort by average rating para organizar por média de notas', () => {

    // clicar no select e escolher Sort by popularity
    cy.get('select.orderby').select('rating');

    // verificar dois primeiros itens
    cy.get('.products li').eq(0).should('have.class', 'post-160');
    cy.get('.products li').eq(1).should('have.class', 'post-165');
  })

  it('deve clicar em Sort by newness rating para organizar por data', () => {

    // clicar no select e escolher Sort by popularity
    cy.get('select.orderby').select('date');

    // verificar dois primeiros itens
    cy.get('.products li').eq(0).should('have.class', 'post-182');
    cy.get('.products li').eq(1).should('have.class', 'post-181');
  })

  it('deve clicar em Sort by price: low to high para organizar em ordem crescente por preço', () => {

    // clicar no select e escolher Sort by popularity
    cy.get('select.orderby').select('price');

    // verificar dois primeiros itens
    cy.get('.products li').eq(0).should('have.class', 'post-180');
    cy.get('.products li').eq(1).should('have.class', 'post-182');
  })

  it('deve clicar em Sort by price: high to low para organizar em ordem descrescente por preço', () => {

    // clicar no select e escolher Sort by popularity
    cy.get('select.orderby').select('price-desc');

    // verificar dois primeiros itens
    cy.get('.products li').eq(0).should('have.class', 'post-160');
    cy.get('.products li').eq(1).should('have.class', 'post-169');
  })

  it('deve clicar em read more para exibir produto fora de estoque', () => {

    // tentativa de procurar botão read more e clicar
    cy.contains('button', 'read more').click();
    // verificar se produto está fora de estoque
    cy.contains('Out Of Stock').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    // (ERRO) não existe produto fora de estoque
  })

  it('deve clicar em produto com marca SALE! para exibir desconto', () => {
    // exemplo de elemento com SALE!
    cy.get('.post-169').find('.onsale').should('exist');
    cy.get('.post-169').click();
    // verificando se possui preço antigo e preço novo
    cy.get('.woocommerce-Price-amount').should('have.length', 2);
  })

  it('deve adicionar um produto ao carrinho e finalizar compra para efetuar compra', () => {
    // adicionar elemento exemplo ao carrinho
    cy.get('.post-169 .add_to_cart_button').click();
    // acessar carrinho via botão View Basket
    cy.get('.post-169 .added_to_cart').click();
    
    cy.get('table.shop_table').contains('th', 'Total').should('exist');
    cy.get('table.shop_table').contains('th', 'Subtotal').should('exist');
    cy.get('.cart-subtotal').find('.woocommerce-Price-amount').should('exist');
    cy.get('.order-total').find('.woocommerce-Price-amount').should('exist');
  })
})
// ===============================================