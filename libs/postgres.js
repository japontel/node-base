const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    hots: 'localhost',
    port: 5432,
    user: 'jose',
    password: '123456',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
