const express = require("express");
const app = express();
const port = 3008;
const cors = require('cors');
const pool = require("./db");


app.use(cors())
app.use(express())

// app.get('/IT', (req, res) => {
//   console.log("hello there")
// })

app.get("/IT", async (req, res) => {
  try {

    const retrieve = await pool.query("SELECT * FROM customer")

    res.json(retrieve.rows)
  } catch (err) {
    console.error(err.message)
  }
})


app.listen(port, (req, res) => {
  console.log(`Server up and running on port:${port}`)
})