**Projeto de Gerenciamento de Gossip Girls - README**

---

## Introdução

Bem-vindo ao projeto de Gerenciamento de Gossip Girls! Este projeto tem como objetivo desenvolver um sistema de gerenciamento de Gossip Girls utilizando Node.js com Express e PostgreSQL. O sistema oferece funcionalidades CRUD (Create, Read, Update, Delete) para manipular informações sobre os personagens, além de permitir batalhas entre eles e o registro de histórico de batalhas.

## Funcionalidades

### CRUD de Heróis

1. **Criação de personagens:** Permite a criação de novos personagens com nome, nível de fofoca, elenco, pontos de vida (HP) e sua popularidade.
   
2. **Recuperação de personagens:** Recupera todos os personagens cadastrados no sistema.
   
3. **Atualização de personagens:** Permite atualizar as informações de um personagem existente.
   
4. **Exclusão de personagens:** Permite excluir um personagem do sistema.
   
5. **Filtro por popularidade de personagem:** Possibilita filtrar personagens por popularidade.

### Batalhas entre personagens

1. **Simulação de Batalha:** Implementa uma rota para simular uma batalha entre dois personagens. A lógica de batalha está incorporada nesta rota.
   
2. **Registro de Batalha:** Registra o resultado da batalha no banco de dados.

### Histórico de Batalhas

1. **Consulta do Histórico de Batalhas:** Fornece uma rota para consultar o histórico de todas as batalhas registradas.
   
2. **Detalhes do Histórico de Batalhas:** Outra rota disponível para obter o histórico de batalhas com os dados dos heróis envolvidos.

## Banco de Dados

O banco de dados utilizado neste projeto é PostgreSQL, com uma estrutura simples contendo duas tabelas principais: `gossips` para armazenar os dados dos personagens e `battle` para registrar o histórico de batalhas entre eles.

## Como Executar

1. Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema.
   
2. Clone este repositório em sua máquina.
   
3. No terminal, navegue até o diretório do projeto e execute `npm install` para instalar as dependências.
   
4. Configure o banco de dados PostgreSQL de acordo com as credenciais definidas no arquivo `config.js`.
   
5. Execute o script SQL fornecido para criar as tabelas no banco de dados.
   
6. Execute o comando `npm start` para iniciar o servidor.
   
7. Acesse as rotas fornecidas através de uma ferramenta de teste de API como o Postman.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para sugerir melhorias, reportar problemas ou enviar pull requests.
