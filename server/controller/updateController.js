const db = require("../Models/db");


module.exports = {

  editingProject: async (req, res) => {
    try {
      // console.log(req.body);
      const insertion = await db.query("UPDATE project set customerid = $1 name = $2,\n" +
        " startdate = $3, enddate = $4, location = $5, timeline = $6, staff= $7, status = $8, createdby = $9\n" +
        " where projectid = $10,\n" +
        " RETURNING *",
        [req.body.customerid,
        req.body.name,
        req.body.startdate,
        req.body.enddate,
        req.body.location,
        req.body.timeline,
        req.body.staff,
        req.body.status,
        req.body.createdby,
        req.params.projectid]);

      res.json(insertion);

    } catch (err) {
      console.error(err.message)
    }
  },

  editingTask: async (req, res) => {
    try {
      const updating = await db.query("UPDATE task set name = $1, description = $2,\n" +
        " startdate = $3, enddate = $4, createdby = $5, status = $6, staff = $7\n" +
        " where taskid = $7\n" +
        " RETURNING *",
        [req.body.name,
        req.body.description,
        req.body.startdate,
        req.body.enddate,
        req.body.status,
        req.body.staff,
        req.params.taskid]);

      res.json(updating);
    } catch (err) {
      console.error(err.message)
    }
  },


  updateDepartment: async (req, res) => {
    try {
      const updating = await db.query("UPDATE department set departmentname = $1, createdby = $2\n" +
        " where departmentid = $3\n" +
        " RETURNING *",
        [req.body.departmentname,
        req.body.createdby,
        req.params.departmentid]);

      res.json(updating);
    } catch (err) {
      console.error(err.message)
    }
  },



}