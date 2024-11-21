// -- comando de navegação para página de login/registro --
Cypress.Commands.add('acessarItemMenu', (item) => {
    cy.visit('https://practice.automationtesting.in/');
    cy.get('#menu-icon').click();
    cy.get(`#menu-item-${item}`).click();
});

// -- comando de clicar --
Cypress.Commands.add('clicar', (item) => {
    cy.get(item).click();
});

// -- comando para escrever --
Cypress.Commands.add('preencher', (campo, texto) => {
    cy.get(campo).type(texto);
});

// -- comando para verificar visibilidade --
Cypress.Commands.add('estaVisivel', (item) => {
    cy.get(item).should('be.visible');
});

// -- comando para verificar se contem --
Cypress.Commands.add('deveConter', (item, subitem) => {
    cy.get(item).should('contain', subitem);
});

// -- comando para verificar se tem valor --
Cypress.Commands.add('deveTerValor', (item, valor) => {
    cy.get(item).should('have.value', valor); 
});

// -- comando para verificar se não existe --
Cypress.Commands.add('naoDeveExistir', (item) => {
    cy.get(item).should('not.exist');
});

// -- comando para verificar tamanho --
Cypress.Commands.add('deveTerTamanho', (item, tamanho) => {
    cy.get(item).should('have.length', tamanho);
});

// -- comandos de verificação de mensagem --
Cypress.Commands.add('verificarTextoErro', (textoErro) => {
    cy.get('.woocommerce-error').should('be.visible').and('contain.text', textoErro);
});
Cypress.Commands.add('verificarMensagem', (conteudo) => {
    cy.get('.woocommerce-message').should('be.visible').and('contain.text', conteudo);
});

// -- comando de verificação de URL --
Cypress.Commands.add('verificarURL', (conteudo) => {
    cy.url().should('include', conteudo);
});

// -- comando de login --
Cypress.Commands.add('login', (email, senha) => {
    if (email)
        cy.get('#username').type(email);
    if (senha)
        cy.get('#password').type(senha);
    cy.get('input[name="login"]').click();
});

// -- comando de registro --
Cypress.Commands.add('registro', (email, senha) => {
    if (email)
        cy.get('#reg_email').type(email, { force: true });
    cy.wait(2000);
    if (senha)
        cy.get('#reg_password').type(senha, { force: true });
    cy.get('input[name="register"]').click();
});

// -- comando para arrastar slider de filtro da página de compras --
Cypress.Commands.add('arrastarSlider', (valorPorcentagem) => {
    cy.get('.price_slider.ui-slider-horizontal').then($slider => {
        const novaPosicao = (valorPorcentagem / 100) * $slider.width(); // calcular a nova posição correspondente a 85.7143%
      
        cy.get('.ui-slider-handle:last-child') // handle direito
            .trigger('mousedown', { which: 1 }) // ação de clique
            .invoke('attr', 'style', `left: ${valorPorcentagem}%`) // ajuste do estilo
            .trigger('mousemove', { clientX: novaPosicao }) // ação de mover
            .trigger('mouseup'); // ação de soltar
    });
});

// -- comando para selecionar criterio de reordenação --
Cypress.Commands.add('ordenarProdutosPor', (criterio) => {
    cy.get('select.orderby').select(criterio);
});

// -- comando para verificar posicao e classe esperada de produtos --
Cypress.Commands.add('verificarProdutos', (posicao, classeEsperada) => {
    cy.get('.products li').eq(posicao).should('have.class', classeEsperada);
});

// -- comando para adicionar detalhes de faturamento --
Cypress.Commands.add('preencherDetalhesFaturamento', (dados) => {
    cy.get('#billing_first_name').type(dados.nome);
    cy.get('#billing_last_name').type(dados.sobrenome);
    cy.get('#billing_email').type(dados.email);
    cy.get('#billing_phone').type(dados.telefone);
    cy.get('#select2-chosen-1').click();
    cy.get('#s2id_autogen1_search').type(dados.pais);
    cy.get('.select2-match').contains(dados.pais).click();
    cy.get('#billing_address_1').type(dados.endereco1);
    if (dados.endereco2) {
        cy.get('#billing_address_2').type(dados.endereco2);
    }
    cy.get('#billing_city').type(dados.cidade);
    cy.get('#select2-chosen-2').click();
    cy.get('#s2id_autogen2_search').type(dados.estado);
    cy.get('.select2-match').contains(dados.estado).click();
    cy.get('#billing_postcode').type(dados.cep);
});

// -- comando para adicionar endereço de entrega --
Cypress.Commands.add('preencherShippingAddress', (dados) => {
    cy.get('#shipping_first_name').type(dados.nome);
    cy.get('#shipping_last_name').type(dados.sobrenome);
    if (dados.company) {
        cy.get('#shipping_company').type(dados.company);
    }
    cy.get('#select2-chosen-1').click();
    cy.get('#s2id_autogen1_search').type(dados.pais);
    cy.get('.select2-match').contains(dados.pais).click();
    cy.get('#shipping_address_1').type(dados.endereco1);
    if (dados.endereco2) {
        cy.get('#shipping_address_2').type(dados.endereco2);
    }
    cy.get('#shipping_city').type(dados.cidade);
    cy.get('#select2-chosen-2').click();
    cy.get('#s2id_autogen2_search').type(dados.estado);
    cy.get('.select2-match').contains(dados.estado).click();
    cy.get('#shipping_postcode').type(dados.cep);
});

// -- comando para verificar se a taxa condiz com o valor esperado --
Cypress.Commands.add('verificarTaxa', (valorEsperado) => {
    cy.get('.cart-subtotal .woocommerce-Price-amount').invoke('text').then((subtotalText) => {
        const subtotalValue = parseFloat(subtotalText.replace(/[^\d.-]/g, ''));
        cy.get('.tax-rate .woocommerce-Price-amount').invoke('text').then((taxText) => {
            const taxValue = parseFloat(taxText.replace(/[^\d.-]/g, ''));
            // calcular a porcentagem esperada do subtotal e arredondar para 2 casas decimais
            const expectedTaxValue = parseFloat((subtotalValue * valorEsperado).toFixed(2));
            // verificar se a taxa calculada é igual ao valor da taxa exibida
            expect(taxValue).to.equal(expectedTaxValue);
        });
    });
});

// -- comando para verificar se o subtotal é menor do que o total --
Cypress.Commands.add('verificarSubtotalMenor', () => {
    cy.get('.cart-subtotal .woocommerce-Price-amount').invoke('text').then((subtotalText) => {
        const subtotalValue = parseFloat(subtotalText.replace(/[^\d.-]/g, ''));
        cy.get('.order-total .woocommerce-Price-amount').invoke('text').then((totalText) => {
            const totalValue = parseFloat(totalText.replace(/[^\d.-]/g, ''));
            // verificação
            expect(subtotalValue).to.be.lessThan(totalValue);
        });
    });
});

// -- comando para alterar a localização de envio  --
Cypress.Commands.add('alterarDadosDeEnvio', (pais, estado) => {
    cy.get('#select2-chosen-1').click();
    cy.get('#s2id_autogen1_search').type(pais);
    cy.get('.select2-match').contains(pais).click();   // Brazil
    cy.get('#select2-chosen-2').click();
    cy.get('#s2id_autogen2_search').type(estado);
    cy.get('.select2-match').contains(estado).click(); // São Paulo
});

// -- comando para limpar campos da minha conta  --
Cypress.Commands.add('limparCampos', () => {
    cy.get('#shipping_first_name').clear();
    cy.get('#shipping_last_name').clear();
    cy.get('#shipping_company').clear();
    cy.get('#shipping_address_1').clear();
    cy.get('#shipping_address_2').clear();
    cy.get('#shipping_city').clear();
    cy.get('#shipping_postcode').clear();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })