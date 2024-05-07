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


app.get('/gossips', async (req, res)=> {
    try {
        const resultado = await pool.query('SELECT * FROM gossips');
        res.json({
            total: resultado.rowCount,
            gossips: resultado.rows,
        });
      } catch (error) {
        console.error('Erro ao obter os fofoqueiros:', error);
        res.status(500).send('Erro ao obter os fofoqueiros');
      }
})

app.post('/gossips', async (req, res) => {
    try {
      const { nome, level_of_gossip, elenco, hp, popularity } = req.body;
      await pool.query('INSERT INTO gossips (nome, level_of_gossip, elenco, hp, popularity) VALUES ($1, $2, $3, $4, $5)', [nome, level_of_gossip, elenco, hp, popularity]);
      res.status(201).send({ mensagem: 'Fofoqueiro adicionado com sucesso'});
    } catch (error) {
      console.error('Erro ao criar um fofoqueiro:', error);
      res.status(500).send('Erro ao criar um fofoqueiro');
    }
  });

  app.put('/gossips/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {nome, level_of_gossip, elenco, hp, popularity} = req.body;
      await pool.query('UPDATE gossips SET nome = $1, level_of_gossip =$2, elenco = $3, hp = $4, popularity = $5 WHERE id = $6', [nome, level_of_gossip, elenco, hp, popularity, id]);
      res.status(200).send({ mensagem: 'Fofoqueiro atualizado com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar fofoqueiro:', error);
      res.status(500).send('Erro ao atualizar fofoqueiro');
    }
  });


  app.delete('/gossips/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM gossips WHERE id = $1', [id]);
      res.status(200).send({ mensagem: 'Fofoqueiro excluído com sucesso'});
    } catch (error) {
      console.error('Erro ao excluir Fofoqueiro:', error);
      res.status(500).send('Erro ao excluir Fofoqueiro');
    }
  });

  app.get('/gossips/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM gossips WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send({ mensagem: 'Fofoqueiro não encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao obter Fofoqueiro por ID:', error);
      res.status(500).send('Erro ao obter Fofoqueiro por ID');
    }
  });
  

app.get('/',(req, res) =>{
    res.send('Servidor funcionando')
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})