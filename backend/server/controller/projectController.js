const db = require("../models/db");

module.exports = {

    //NOTE FOR DEV TEAM: project file table will be joined to the project table in the query below.

    projectList: async (req, res)=> {

        //location = departmentid
        try {
            const results = await db.query("SELECT name from project where location = $1 ORDER BY createdat DESC",
                [req.params.location]);

            res.json(results.rows);
        } catch (err) {
            console.error(err.message)
        }
    }

}