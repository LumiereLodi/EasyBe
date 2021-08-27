const { Pool } = require('pg');
require("dotenv").config();

/*
const pool = new Pool();

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}
*/

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;


const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString:
      process.env.NODE_ENV === "production" ? proConfig : devConfig,
      ssl: process.env.NODE_ENV === "production" ? {
        rejectUnauthorized: false
      } : undefined
  });


module.exports =  {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}
;

