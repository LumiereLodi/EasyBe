const db = require("../models/db");
module.exports={

    employeelist: async(req, res)=> {
        try{
            const result = await db.query("SELECT employeeid, givennames, lastname FROM members WHERE departmentid = $1 AND position='Staff' ORDER BY createdat DESC", [req.params.departmentid])
            res.status(200).json(result.rows)
        }catch (e) {
            res.status(400).json(err.message)
        }
    }
}