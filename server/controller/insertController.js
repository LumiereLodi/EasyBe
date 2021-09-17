const db = require("../Models/db");


module.exports = {



  assigningTasks: async (req, res) => {
    try {
      const insertion = await db.query("INSERT INTO task\n" +
        " (Name, StartDate, EndDate, Description,\n" +
        " createdBy, Status, staff, projectid)\n" +
        " VALUES($1,$2, $3,$4,$5,$6,$7,$8) RETURNING *",
        [req.body.Name,
        req.body.StartDate,
        req.body.EndDate,
        req.body.Description,
        req.body.createdBy,
        req.body.Status,
        req.body.staff,
        req.body.projectid]);

      res.json(insertion);

    } catch (err) {
      console.error(err.message)
    }
  }
}