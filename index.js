const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

app.use(express.json());

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'battleofgossip', // Nome do seu banco de dados
  password: 'ds564', // senha do banco
  port: 5432, // Porta padrão do PostgreSQL
});
