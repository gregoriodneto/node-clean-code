# Projeto Node.js Clean Code

## Sobre
Este é um projeto de estudo focado em boas práticas de Node.js, utilizando TypeScript e Clean Code. O objetivo é evoluir na organização do código, compreensão dos conceitos do Node e integração com ferramentas e bancos de dados.

## Status Atual
✅ Módulos e Organização
- Uso correto de import/export para ESModules
- Entendimento da diferença entre CommonJS e ESModules no Node
- Manipulação de arquivos com fs e caminhos com path
- Configuração do projeto para suportar ESModules e TypeScript com ts-node/esm
- Imports usando extensão .js para compatibilidade com o loader do Node

## Roadmap - Próximos tópicos a estudar e implementar
### 🔄 Eventos e Assincronia
- Uso de async/await e Promises para controle assíncrono
- Entender o Event Loop do Node e como ele trata requisições concorrentes
- Explorar temporizadores como setTimeout, setImmediate e process.nextTick

### 🌐 HTTP e APIs
- Criar servidores HTTP nativos com o módulo http
- Usar o framework Express para criação rápida de APIs REST
- Trabalhar com middlewares, rotas, parsing de corpo da requisição e códigos de status

### 🗃 Manipulação de Dados
- Manipulação de JSON, objetos e arrays em JavaScript/TypeScript
- Utilizar métodos funcionais como map, filter e reduce
- Tratar erros com try/catch e tratamento de erros via middleware (ex: next(err) no Express)

### 🗄 Integração com Banco de Dados
- Consultas simples com bibliotecas como pg, mysql2 ou knex
- Gerenciamento de pool de conexões para otimizar performance
- Chamada de procedures armazenadas via Node.js

### 🛠 Ferramentas
- Uso do nodemon para reiniciar servidor automaticamente durante desenvolvimento
- Variáveis de ambiente com dotenv
- Execução de TypeScript com ts-node (fora do Nest.js)
- Debugging no VS Code
- Automação via scripts no package.json

## Como rodar o projeto
1. Instale as dependências:
```bash
npm install
```

2. Para rodar o projeto em modo desenvolvimento:
```bash
npm run dev
```

3. Para compilar TypeScript para JavaScript:
```bash
npm run build
```

4. Para rodar a versão compilada:
```bash
npm start
```