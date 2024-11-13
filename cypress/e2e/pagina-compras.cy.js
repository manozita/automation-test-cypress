// ============== PÁGINA DE COMPRAS ==============
describe('página de compras', () => {

  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon').click();
    cy.get('#menu-item-40').click();
  })

  it('deve aplicar filtro de preço máximo 450', () => {

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
})
// ===============================================