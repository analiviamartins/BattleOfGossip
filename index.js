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

//Rota dos fofoqueiros
app.get('/gossips', async (req, res) => {
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

//Rota de filtrar os fofoqueiros pelo nome
app.get("/gossips", (req, res) => {
  const nome = req.query.nome;
  const query = `SELECT * FROM heroes WHERE nome LIKE $1`;
  pool.query(query, [`%${nome}%`], (err, results) => {
     if (err) {
       throw err;
     }
     res.status(200).json(results.rows);
  });
 });

//Rota de criar os fofoqueiros
app.post('/gossips', async (req, res) => {
  try {
    const { nome, level_of_gossip, elenco, hp, popularity } = req.body;
    await pool.query('INSERT INTO gossips (nome, level_of_gossip, elenco, hp, popularity) VALUES ($1, $2, $3, $4, $5)', [nome, level_of_gossip, elenco, hp, popularity]);
    res.status(201).send({ mensagem: 'Fofoqueiro adicionado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar um fofoqueiro:', error);
    res.status(500).send('Erro ao criar um fofoqueiro');
  }
});

//Rota de editar os fofoqueiros
app.put('/gossips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, level_of_gossip, elenco, hp, popularity } = req.body;
    await pool.query('UPDATE gossips SET nome = $1, level_of_gossip =$2, elenco = $3, hp = $4, popularity = $5 WHERE id = $6', [nome, level_of_gossip, elenco, hp, popularity, id]);
    res.status(200).send({ mensagem: 'Fofoqueiro atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar fofoqueiro:', error);
    res.status(500).send('Erro ao atualizar fofoqueiro');
  }
});

//Rota de deletar os fofoqueiros
app.delete('/gossips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM gossips WHERE id = $1', [id]);
    res.status(200).send({ mensagem: 'Fofoqueiro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir Fofoqueiro:', error);
    res.status(500).send('Erro ao excluir Fofoqueiro');
  }
});

//Rota dos fofoqueiros por id
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

//Rota de batalha
app.post('/battle', async (req, res) => {
  const { gossips1_id, gossips2_id } = req.body;

  try {
    // Aqui você implementaria a lógica de batalha
    // Por exemplo, comparando os atributos dos heróis
    const vencedor_id = battle(gossips1_id, gossips2_id);

    // Inserir o resultado da batalha no banco de dados
    const query = `INSERT INTO battle (gossips1_id, gossips2_id, winner_id) VALUES ($1, $2, $3)`;
    const values = [gossips1_id, gossips2_id, vencedor_id];
    await pool.query(query, values);

    res.status(201).send({ message: 'Batalha registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao registrar a batalha.' });
  }
});

// Função para saber o vencedor 
async function battle(gossips1_id, gossips2_id) {
  // Aqui você pode implementar sua lógica de batalha
  // Por exemplo, determinar o vencedor com base em atributos
  const winner = gossips1_id.level_of_gossip > gossips2_id.level_of_gossip ? gossips1_id : gossips2_id;
 
  // Registre a batalha no banco de dados
  const query = `
     INSERT INTO battles (gossips1_id, gossips2_id, winner_id)
     VALUES ($1, $2, $3)
     RETURNING *;
  `;
  const values = [gossips1_id.id, gossips2_id.id, winner.id];
 
  try {
     const result = await pool.query(query, values);
     return result.rows[0];
  } catch (err) {
     console.error(err);
     throw err;
  }
 }
 
 battle(gossips1_id, gossips2_id)
  .then(battleResult => console.log('Batalha registrada:', battleResult))
  .catch(err => console.error('Erro ao registrar batalha:', err));

  //Rota de todas asbatalhas
  router.get('/battles', async (req, res) => {
    try {
       const result = await pool.query('SELECT * FROM battles');
       res.status(200).json(result.rows);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Erro ao buscar o histórico de batalhas' });
    }
   });
   
  

app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})