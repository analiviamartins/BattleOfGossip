const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4001;

app.use(express.json());

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'battleofgossip', // Nome do seu banco de dados
  password: 'ds564', // senha do banco
  port: 7007 // Porta padrão do PostgreSQL
});

//Rota dos fofoqueiros
app.get('/gossips', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM gossips');
    res.status(200).json({
      count: resultado.rowCount,
      gossips: resultado.rows,
    });
  } catch (error) {
    console.error('Erro ao obter os fofoqueiros:', error);
    res.status(500).send('Erro ao obter os fofoqueiros');
  }
})

//Rota de filtrar os fofoqueiros pelo nome
app.get("/gossips/nome/:nome", async (req, res) => {
  const { nome } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM gossips WHERE nome = $1', [nome])
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
app.get('/battle/:gossips1_id/:gossips2_id', async (req, res) => {
  const { gossips1_id, gossips2_id } = req.params;

  try {
    // Aqui você implementaria a lógica de batalha
    // Por exemplo, comparando os atributos dos heróis
    const vencedor_id = await battle(gossips1_id, gossips2_id);

    // Inserir o resultado da batalha no banco de dados
    await pool.query(`INSERT INTO battle (gossips1_id, gossips2_id, winner_id) VALUES ($1, $2, $3)`, [gossips1_id, gossips2_id, vencedor_id]);

    const { rows } = await pool.query('SELECT * FROM gossips WHERE id = $1', [vencedor_id]);
    res.status(201).send({ winner: rows[0], message: 'Batalha registrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao registrar a batalha.' });
  }
});

// Função para saber o vencedor 
async function battle(gossips1_id, gossips2_id) {
  let gossip1 = await pool.query('SELECT * FROM gossips WHERE id = $1', [gossips1_id]);
  let gossip2 = await pool.query('SELECT * FROM gossips WHERE id = $1', [gossips2_id]);
  gossip1 = gossip1.rows[0];
  gossip2 = gossip2.rows[0];
const nivel1 = gossip1.level_of_gossip;
const nivel2 = gossip2.level_of_gossip
console.log(gossip1)
  console.log(nivel1)

   if (nivel1 > nivel2) {
    return gossips1_id;
   } else if (nivel1 < nivel2) {
    return gossips2_id;
  } else {
    if (gossip1.hp > gossip2.hp) {
      return gossips1_id;
    } else if (gossip1.hp < gossip2.hp) {
      return gossips2_id;
    } else {
      return gossips1_id;
    }
  }
}



app.get('/battles/gossips', async (req, res) => {
  try {
    const result = await pool.query(`SELECT battle.id, battle.gossips1_id, battle.gossips2_id, battle.winner_id, gossips.nome, gossips.level_of_gossip, gossips.elenco, gossips.hp, gossips.popularity FROM gossips INNER JOIN battle ON battle.winner_id = gossips.id`);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o histórico de batalhas' });
  }
});

app.get('/gossips/popularity/:popularity', async (req, res) => {
  const { popularity } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM gossips WHERE popularity = $1', [popularity])
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})