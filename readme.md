
# Projeto de Testes Automatizados com Cypress - Automation Testing

Bem-vindo ao repositório de testes automatizados para o site Automation Testing. Este projeto utiliza o Cypress para validar e garantir a qualidade das principais funcionalidades do site, proporcionando cenários de teste abrangentes e exemplos práticos de automação de testes.

## Sobre o Projeto

O Automation Testing é um site de prática voltado para testadores que desejam aprimorar suas habilidades em automação de testes. Com uma ampla variedade de elementos interativos, como formulários, sliders e carrinhos de compras, é uma excelente ferramenta para desenvolvimento e validação de habilidades em automação.

## Pré-requisitos

Para utilizar este projeto, é necessário que você tenha o seguinte ambiente configurado:

- Node.js (versão 12 ou superior)
- Cypress (instalado como dependência do projeto)
- Mochawesome (instalação para gerar relatórios de testes)

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

## Instalação do Mochawesome
Execute o comando abaixo para instalar o Mochawesome e as dependências necessárias:


```
npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
```
**mochawesome**: Gera relatórios em HTML e JSON.

**mochawesome-merge**: Mescla vários arquivos JSON em um único arquivo.

**mochawesome-report-generator**: Gera o relatório HTML a partir dos arquivos JSON.


### Configurar o Mochawesome no Cypress
Configurar o Cypress para usar o Mochawesome
Abra o arquivo cypress.config.js e adicione as seguintes configurações para gerar os relatórios no formato Mochawesome:
```
{
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": true,
    "json": true
  }
}
```
- **reportDir** (diretório onde os arquivos de relatório JSON serão salvos)
- **overwrite** (define se os relatórios existentes serão sobrescritos)
- **html** (gera cada relatório em formato HTML)
- **json** (gera cada relatório em formato JSON) (necessário para mesclar relatórios)

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
|-- cypress
    |-- e2e
        |-- login.cy.js                  # Testes de login
        |-- minha-conta.cy.js            # Testes da página "Minha Conta"
        |-- pagina-compras.cy.js         # Testes da página de compras
        |-- registro.cy.js               # Testes de registro de usuários
    |-- results
        |-- mochawesome-report           # Relatório dos testes unificado em HTML
        |-- combined-report.json         # Arquivo JSON com os resultados combinados dos testes
        |-- mochawesome_11*.json         # Arquivos JSON individuais de resultados dos testes
    |-- screenshots                      # Capturas de tela dos erros encontrados
    |-- support
        |-- commands.js                  # Comandos personalizados para padronização
        |-- e2e.js                       # Configurações específicas para testes E2E
    |-- videos                           # Gravações em vídeo das execuções dos testes
|-- node_modules                         # Dependências do projeto gerenciadas pelo npm
|-- .gitignore                           # Arquivo para ignorar arquivos no repositório Git
|-- cypress.config.js                    # Configurações principais do Cypress
|-- package-lock.json                    # Informações de versão e consistência de dependências
|-- package.json                         # Dependências e scripts do projeto
|-- readme.md                            # Documentação do projeto
```

## Funcionalidades Testadas

Este projeto cobre uma ampla gama de funcionalidades disponíveis no site Automation Testing, organizadas em diferentes áreas do sistema:

### 1. Registro e Login de Usuário
- **Registro de Usuário:** Testes de criação de novos usuários, validação de campos obrigatórios e fluxos de erro ao registrar informações inválidas.
- **Login de Usuário:**
  - Verificação de autenticação com credenciais corretas.
  - Testes de login com informações incorretas, campos vazios e erros de validação.
  - Verificação de comportamento *case sensitive* nos campos de login.

### 2. Configurações de Conta
- **Página "Minha Conta":**
  - Validação da exibição correta dos dados do usuário após o login.
  - Testes relacionados à edição de informações pessoais, como nome, e-mail e senha.
  - Garantia de que dados privados (como senhas) são adequadamente protegidos e exibidos de forma segura.

### 3. Página de Compras
- **Filtro e Pesquisa de Produtos:**
  - Testes para verificar o funcionamento correto dos filtros de produtos, como categorias e ordenação.
  - Validação de pesquisa por palavras-chave e exibição correta dos resultados.
- **Gestão do Carrinho:**
  - Adição e remoção de produtos no carrinho.
  - Atualização de quantidades e valores totais.
  - Verificação de mensagens e comportamento correto para produtos fora de estoque.
- **Finalização de Compras:**
  - Testes do fluxo de finalização, incluindo a seleção de métodos de pagamento.
  - Validação de cálculos como subtotal, taxas e total.
  - Garantia de que o processo final de compra é executado corretamente.

## Documentação dos Testes
Encontre a documentação dos testes no arquivo ```combined-report.html``` localizado em:
```cypress/results/combined-report.html```