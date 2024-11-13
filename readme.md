
# Projeto de Testes Automatizados com Cypress - Automation Testing

Bem-vindo ao repositório de testes automatizados para o site Automation Testing. Este projeto utiliza o Cypress para validar e garantir a qualidade das principais funcionalidades do site, proporcionando cenários de teste abrangentes e exemplos práticos de automação de testes.

## Sobre o Projeto

O Automation Testing é um site de prática voltado para testadores que desejam aprimorar suas habilidades em automação de testes. Com uma ampla variedade de elementos interativos, como formulários, sliders e carrinhos de compras, é uma excelente ferramenta para desenvolvimento e validação de habilidades em automação.

## Pré-requisitos

Para utilizar este projeto, é necessário que você tenha o seguinte ambiente configurado:

- Node.js (versão 12 ou superior)
- Cypress (instalado como dependência do projeto)

## Instalação

## Configuração de ambiente

Siga os passos abaixo para clonar e instalar o projeto localmente:

### 1. Clone o repositório:

   ```bash
   git clone https://github.com/manozita/automation-test-cypress.git
   ```

### 2. Acesse o diretório do projeto:

    cd seu-repositorio

### 3. Instale as dependências necessárias:

```
npm install
```

## Configuração e Execução dos Testes

### Executando no Modo Interativo
Abra a interface gráfica do Cypress para visualizar e executar os testes de maneira interativa:

```
npx cypress open
```

### Executando no Modo Headless
Para executar todos os testes em modo headless (sem interface), ideal para integração contínua e execução em ambientes de CI/CD:

```
npx cypress run
```


## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

A FAZER (IMAGEM DO GUI)
![Screenshot_162](https://github.com/user-attachments/assets/574896b9-4f67-4864-9f17-e4d8d5b8c792)

## Funcionalidades Testadas
Este projeto cobre uma variedade de funcionalidades disponíveis no site Automation Testing:

EXEMPLO

- Autenticação e Login: Validação de fluxos de login, autenticação de usuários e controle de acesso.
- Formulários: Testes detalhados para entrada de dados em diferentes tipos de formulários.
- Sliders: Manipulação e validação de sliders com controle de valores.
- Filtros e Pesquisa: Verificação do comportamento correto de filtros e funções de pesquisa.
- Carrinho de Compras e Checkout: Validação do fluxo de compras, gerenciamento do carrinho e finalização de compras.