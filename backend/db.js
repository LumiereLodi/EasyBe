const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "Ado@alasco1",
  host: "localhost",
  port: 5432,
  database: "testDB"
});


module.exports = pool;